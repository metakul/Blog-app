import Joi from 'joi';
import htmlInput from 'joi-html-input';

// Extend Joi with htmlInput
const extendedJoi = Joi.extend(htmlInput);

export const PostValidation = extendedJoi.object({
  title: extendedJoi.string().min(6).required(),
  description: extendedJoi.htmlInput().allowedTags(),
  image:extendedJoi.string().required(),
  author:extendedJoi.string().min(4).required(),
  categories: extendedJoi.array().required(),
  cryptoSymbol:extendedJoi.string().required(),
});

export const PostIdValidation = extendedJoi.string().alphanum().required();

export const cryptoIdValidation=extendedJoi.string().required();

export const UpdatePostValidation = extendedJoi.object({
  postId: extendedJoi.string().alphanum().required(),
  title: extendedJoi.string().min(6).required(),
  description: extendedJoi.htmlInput().allowedTags(),
  image:extendedJoi.string().required(),
  cryptoSymbol:extendedJoi.string().required(),
});
