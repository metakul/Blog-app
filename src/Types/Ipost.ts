import { Document } from "mongoose";

export interface Ipost extends Document {
  title: string;
  description: string;
  image:object;
  author:string;
  categories:Array<any>;
  cryptoSymbol:string;
  status:string
}

export function isJoiError(obj: any): obj is { isJoi: boolean } {
  return typeof obj === 'object' && obj !== null && 'isJoi' in obj;
}