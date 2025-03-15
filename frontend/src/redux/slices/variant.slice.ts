import { arrayMove } from "@dnd-kit/sortable";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OptionValue {
  id: string;
  value: string;
}

interface Variant {
  id: string;
  name: string;
  value: OptionValue[];
}

interface VariantState {
  variant: Variant[];
}
const initialState: VariantState = {
  variant: [{ id: Date.now().toString(), name: "", value: [] }],
};
const variantSlice = createSlice({
  name: "variant-product",
  initialState,
  reducers: {
    resetVariant: (state) => {
      state.variant = [{ id: Date.now().toString(), name: "", value: [] }];
    },
    addVariant: (state) => {
      state.variant.push({
        id: (Date.now() + 1).toString(),
        name: "",
        value: [],
      });
    },
    addNameVariant: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const { id, name } = action.payload;
      state.variant = state.variant.map((vr) =>
        vr.id === id ? { ...vr, name } : vr
      );
    },
    updateIndexVariant: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      state.variant = arrayMove(
        state.variant,
        action.payload.oldIndex,
        action.payload.newIndex
      );
    },
    updateIndexOption: (
      state,
      action: PayloadAction<{
        variantId: string;
        oldIndex: number;
        newIndex: number;
      }>
    ) => {
      state.variant = state.variant.map((vr) =>
        vr.id === action.payload.variantId
          ? {
              ...vr,
              value: arrayMove(
                vr.value,
                action.payload.oldIndex,
                action.payload.newIndex
              ),
            }
          : vr
      );
    },
    addOptionValue: (
      state,
      action: PayloadAction<{ variantId: string; value: string }>
    ) => {
      const { variantId, value = "" } = action.payload;
      state.variant = state.variant.map((vr) =>
        vr.id === variantId
          ? {
              ...vr,
              value: [...vr.value, { id: (Date.now() + 1).toString(), value }],
            }
          : vr
      );
    },
    updateOptionValue: (
      state,
      action: PayloadAction<{
        variantId: string;
        optionId: string;
        value: string;
      }>
    ) => {
      const { variantId, optionId, value } = action.payload;
      state.variant = state.variant.map((vr) =>
        vr.id === variantId
          ? {
              ...vr,
              value: vr.value.map((opt) =>
                opt.id === optionId ? { ...opt, value } : opt
              ),
            }
          : vr
      );
    },
  },
});

export const {
  addVariant,
  addOptionValue,
  updateIndexVariant,
  updateIndexOption,
  addNameVariant,
  resetVariant,
  updateOptionValue,
} = variantSlice.actions;
export default variantSlice.reducer;
