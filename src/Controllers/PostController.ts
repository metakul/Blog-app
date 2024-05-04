import { Request, Response, NextFunction } from "express";
import Post from "../Models/Post";
import { Ipost } from "../Types/Ipost";
import { PostValidation, cryptoIdValidation } from "../Validations/PostValidation";
import { isJoiError } from "../Types/Ipost";
import {
  PostIdValidation,
  UpdatePostValidation,
} from "../Validations/PostValidation";
import { IUpadatePost } from "../Types/IUpadatePost";
import {fetchCryptoData} from "../Axios/axiosCall"

/**
 * add new post
 * @param postModelValidation
 */
const addPost = async (postModelValidation: Ipost) => {
  try {
    const post = new Post({
      title: postModelValidation.title,
      description: postModelValidation.description,
      image: postModelValidation.image,
      author: postModelValidation.author,
      categories: postModelValidation.categories,
      cryptoSymbol:postModelValidation.cryptoSymbol
    });
    const savedPost = await post.save();

    return savedPost;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Create a new post
 * @param req
 * @param res
 * @param next
 */
export const CreatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("asd", req.body)
    const postModelValidation: Ipost = await PostValidation.validateAsync(
      req.body
    );

    if (!postModelValidation) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    } else {
      const newPost = await addPost(postModelValidation);
      if (newPost) {
        res.status(201).json({
          newPost,
        });
      } else {
        return next(
          res.status(400).json({
            message: "Error Adding Post",
          })
        );
      }
    }
  } catch (error) {
    if (isJoiError(error)) {
      return next(
        res.status(400).json({
          message:error,
        })
        
      );
    }
    console.log(error);

    next(error);
  }
};

/**
 * Get all post
 * @param req
 * @param res
 * @param next
 */
export const getAllPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract page size from query parameter or use a default value
    const pageSize = parseInt(req.query.pagesize as string, 10) || 10;
    
    // Extract page number from query parameter or use a default value
    const page = parseInt(req.query.page as string, 10) || 1;
    
    // Calculate skip value based on page size and page number
    const skip = (page - 1) * pageSize;

    // Fetch posts with pagination
    const getPosts = await Post.find()
      .select("_id title description cryptoSymbol image author categories createdAt updatedAt")
      .skip(skip)
      .limit(pageSize);

    if (getPosts.length > 0) {
      res.status(200).json(getPosts);
    } else {
      return next(
        res.status(404).json({
          message: "Not Found",
        })
      );
    }
  } catch (error) {
    if (isJoiError(error)) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};


/**
 * get one post
 * @param req
 * @param res
 * @param next
 */
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postIdValidation = await PostIdValidation.validateAsync(
      req.params.postId
    );

    if (!postIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const getPosts = await Post.findById(postIdValidation)
        .select("_id title description cryptoSymbol image author categories createdAt updatedAt")
        .populate("user", "username name surname");

      if (getPosts) {
        res.status(200).json(getPosts);
      } else {
        return next(
          res.status(404).json({
            message: "Not found.",
          })
        );
      }
    }
  } catch (error) {
    if (isJoiError(error)) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};


/**
 * delete post
 * @param req
 * @param res
 * @param next
 */
export const detelePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postIdValidation = await PostIdValidation.validateAsync(
      req.params.postId
    );

    if (!postIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const deletePosts = await Post.findByIdAndDelete(postIdValidation);

      if (deletePosts) {
        res.status(200).json(deletePosts);
      } else {
        return next(
          res.status(404).json({
            message: "Not found.",
          })
        );
      }
    }
  } catch (error) {
    if (isJoiError(error)) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * Update post
 * @param req
 * @param res
 * @param next
 */
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resUpdatePostValidation: IUpadatePost = await UpdatePostValidation.validateAsync(
      req.body
    );
console.log(resUpdatePostValidation);

    if (!UpdatePostValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const updatedPosts = await Post.findByIdAndUpdate(
        {
          _id: resUpdatePostValidation.postId,
        },
        {
          $set: {
            title: resUpdatePostValidation.title,
            description: resUpdatePostValidation.description,
            image:resUpdatePostValidation.image,
            author:resUpdatePostValidation.author,
            categories:resUpdatePostValidation.categories,
            cryptoSymbol:resUpdatePostValidation.cryptoSymbol
          },
        }
      );

      if (updatedPosts) {
        res.status(200).json(updatedPosts);
      } else {
        return next(
          res.status(404).json({
            message: "Not found.",
          })
        );
      }
    }
  } catch (error) {
    if (isJoiError(error)) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * get one Crypto
 * @param req
 * @param res
 * @param next
 */
interface CryptoDataError {
  timestamp: string;
  error_code: number;
  error_message: string;
  elapsed: number;
  credit_count: number;
}

export const getCryptoInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postIdValidation = await cryptoIdValidation.validateAsync(
      req.params.cryptoId
    );
    fetchCryptoData(req.params.cryptoId)
  .then((data: any) => {
     res.status(200).json(data);

  })
  .catch((error: CryptoDataError) => {
    res.status(400).json({
      error:error,
      message: "Unable to Load Crypto Data.",
    })
  });
   
  } catch (error) {
    if (isJoiError(error)) {
      return next(
        res.status(400).json({
          message: "Unable to Load Crypto Data.",
        })
      );
    }
    next(error);
  }
};
