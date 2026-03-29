import mongoose from "mongoose";

const RuleSchema = new mongoose.Schema({
  name: String,
  minAmount: Number,
  approvers: [String], // ["manager", "admin"]
  isManagerRequired: Boolean
});

export default mongoose.model("Rule", RuleSchema);