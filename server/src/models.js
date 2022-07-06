import{
    deskSchema,
    pictureSchema,
    authorSchema
  } from "./schemas.js"

export const deskModel = mongoose.model("Desks", deskSchema);
export const authorModel = mongoose.model("Authors", authorSchema);
export const pictureModel = mongoose.model("Pictures", pictureSchema);