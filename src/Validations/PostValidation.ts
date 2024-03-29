import Joi from "joi";

export const PostValidation = Joi.object({
  title: Joi.string().min(6).required(),
  description: Joi.string().min(6).required(),
  image:Joi.object().required(),
  author:Joi.string().min(4).required(),
  categories: Joi.array().required(),
});

export const PostIdValidation = Joi.string().alphanum().required();

export const UpdatePostValidation = Joi.object({
  postId: Joi.string().alphanum().required(),
  title: Joi.string().min(6).required(),
  description: Joi.string().min(6).required(),
  image:Joi.object().required(),
});
