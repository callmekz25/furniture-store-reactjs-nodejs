import { useForm } from "react-hook-form";
import IPromotion from "@/interfaces/promotion/promotion.interface";
import { useGetPromotionById, useUpdatePromotion } from "@/hooks/use-promotion";
import { toast } from "sonner";
import PromotionForm from "@/components/admin/forms/promotion-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "@/components/loading/loading";
import Error from "@/pages/shared/error";
import { useQueryClient } from "@tanstack/react-query";
const EditPromotion = () => {
  const queryClient = useQueryClient();
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
  const { id } = useParams();
  const { mutate: updatePromotion, isPending } = useUpdatePromotion();
  const { data, isLoading, error } = useGetPromotionById(id);

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);
  const handleUpdatePromotion = (data: IPromotion) => {
    const ids =
      typeof data.scope.ids[0] === "string"
        ? data.scope.ids
        : data.scope.ids.map((d) => d._id);
    const payload: IPromotion = {
      ...data,
      scope: {
        ...data.scope,
        ids,
      },
    };
    updatePromotion(payload, {
      onSuccess: () => {
        toast.success("Cập nhật thành công", {
          position: "top-right",
        });
        queryClient.setQueryData(["promotions", payload._id], payload);
        reset();
      },
      onError: () =>
        toast.error("Oops xảy ra lỗi", {
          position: "top-right",
        }),
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <PromotionForm
      title="Cập nhật khuyến mãi"
      form={form}
      isPending={isPending}
      onSubmit={handleUpdatePromotion}
    />
  );
};

export default EditPromotion;
