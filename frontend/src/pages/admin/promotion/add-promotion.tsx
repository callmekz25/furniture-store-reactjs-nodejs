import { useForm } from "react-hook-form";
import IPromotion from "@/interfaces/promotion/promotion.interface";
import { useAddPromotion } from "@/hooks/use-promotion";
import { toast } from "sonner";
import PromotionForm from "@/components/admin/forms/promotion-form";
const AddPromotion = () => {
  const form = useForm<IPromotion>({
    defaultValues: {
      name: "",
      descr: "",
      scope: {
        type: "all",
        ids: [],
      },
      startDate: "",
      endDate: "",
      discountValue: 0,
      isActive: false,
    },
  });
  const { reset } = form;

  const { mutate: addPromotion, isPending } = useAddPromotion();

  const handleAddPromotion = (data: IPromotion) => {
    const ids = data.scope.ids.map((d) => d._id);
    const payload: IPromotion = {
      ...data,
      scope: {
        ...data.scope,
        ids,
      },
    };
    addPromotion(payload, {
      onSuccess: () => {
        toast.success("Thêm mới thành công", {
          position: "top-right",
        });
        reset();
      },
      onError: () =>
        toast.error("Oops xảy ra lỗi", {
          position: "top-right",
        }),
    });
  };

  return (
    <PromotionForm
      title="Tạo khuyến mãi"
      form={form}
      isPending={isPending}
      onSubmit={handleAddPromotion}
    />
  );
};

export default AddPromotion;
