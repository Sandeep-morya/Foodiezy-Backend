import { connect } from "mongoose";

const connectDB = async (uri) => await connect(uri);

export default connectDB;
