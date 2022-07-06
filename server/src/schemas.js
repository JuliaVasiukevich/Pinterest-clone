import { Schema } from "mongoose";

export const deskSchema = new Schema({
  title: String,
  pictures: [{
    type: Schema.Types.ObjectId,
    ref: "Pictures",
  }, ],
});

export const pictureSchema = new Schema({
  url: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "Authors",
  },
});

export const authorSchema = new Schema({
  name: String,
  avatar: String,
});