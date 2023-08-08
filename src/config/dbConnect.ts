import mongoose from "mongoose";

export default async (uri: string) => await mongoose.connect(uri);
