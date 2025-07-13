import mongoose, { Schema } from "mongoose";

const PromotionSchema = new Schema(
  {
    name: { type: String, required: true },
    descr: String,
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: { type: Number, required: true },
    scope: {
      type: {
        type: String,
        enum: ["all", "products", "categories", "collections"],
        required: true,
      },
      ids: [String],
    },

    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Promotion", PromotionSchema);
