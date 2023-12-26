import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    // type: {
    //   type: String,
    //   //   required: true,
    //   enum: ["admin", "read-only", "temp"],
    // },
    // phoneNumber: {
    //   type: Number,
    //   required: true,
    // },
    // address: {
    //   no: {
    //     type: String,
    //   },
    //   street: {
    //     type: String,
    //   },
    //   addr_1: {
    //     type: String,
    //   },
    //   addr_2: {
    //     type: String,
    //   },
    //   city: {
    //     type: String,
    //   },
    //   zip: {
    //     type: String,
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("userModal", userSchema);
