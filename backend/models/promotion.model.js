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
        enum: ["all", "product", "category", "collection"],
        required: true,
      },
      productIds: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      categoryIds: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
        },
      ],
      collectionIds: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Collection",
        },
      ],
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
