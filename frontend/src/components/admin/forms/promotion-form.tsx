import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import MultiSelect from "@/components/ui/multi-select";
import { useForm, Controller, UseFormReturn } from "react-hook-form";
import IPromotion from "@/interfaces/promotion/promotion.interface";
import { useGetProducts } from "@/hooks/use-product";
import Loading from "@/components/loading/loading";
import { useGetCollections } from "@/hooks/use-collection";
import { IOptionMultiSelect } from "@/interfaces/multi-select/option.interface";
const PromotionForm = ({
  title,
  form,
  onSubmit,
  isPending,
}: {
  title: string;
  form: UseFormReturn<IPromotion>;
  onSubmit: (payload: IPromotion) => void;
  isPending: boolean;
}) => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const { data: products, isLoading: ilp } = useGetProducts(["title", "_id"]);
  const { data: collections, isLoading: ilc } = useGetCollections();

  const scopeType = watch("scope.type");

  if (ilp || ilc) {
    return <Loading />;
  }
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-6 font-semibold"
      >
        <div className=" col-span-3 h-fit flex flex-col gap-4 ">
          <div className=" border bg-white border-gray-200 rounded-xl p-4 flex flex-col gap-4">
            <h4>Thông tin cơ bản</h4>
            <div className="">
              <Label htmlFor="name" className="opacity-60">
                Tên
              </Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Tên không được để trống" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="name"
                    className="outline-none py-[2px] text-sm px-2 mt-1 w-[50%]"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-[12px] mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="">
              <Label htmlFor="descr" className="opacity-60">
                Mô tả
              </Label>
              <Controller
                name="descr"
                rules={{ required: "Mô tả không được để trống" }}
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="descr"
                    className="mt-1 outline-none py-1 text-sm px-2"
                  />
                )}
              />
              {errors.descr && (
                <p className="text-red-500 text-[12px] mt-1">
                  {errors.descr.message}
                </p>
              )}
            </div>
          </div>
          <div className=" border bg-white border-gray-200 rounded-xl p-4 flex flex-col gap-4">
            <h4>Cấu hình khuyến mãi</h4>
            <div className="flex items-center">
              <div className="w-[50%] pr-1">
                <Label htmlFor="name" className="opacity-60">
                  Phạm vi
                </Label>
                <Controller
                  name="scope.type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        setValue(
                          "scope.type",
                          value as "all" | "products" | "collections"
                        );
                        setValue("scope.ids", []);
                      }}
                      defaultValue="all"
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Chọn.." />
                      </SelectTrigger>
                      <SelectContent className="font-semibold">
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="collections">
                          Bộ sưu tập cụ thể
                        </SelectItem>
                        {/* <SelectItem value="categories">
                          Danh mục cụ thể
                        </SelectItem> */}
                        <SelectItem value="products">
                          Sản phẩm cụ thể
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="w-[50%] pl-1">
                <Label htmlFor="name" className="opacity-60">
                  Giá trị khuyến mãi (%)
                </Label>
                <Controller
                  name="discountValue"
                  rules={{ required: "Giảm giá không được để trống" }}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        id="name"
                        type="number"
                        className=" outline-none py-[2px] text-sm px-2 mt-1 "
                      />
                    );
                  }}
                />
                {errors.discountValue && (
                  <p className="text-red-500 text-[12px] mt-1">
                    {errors.discountValue.message}
                  </p>
                )}
              </div>
            </div>
            <div className="">
              <Label className="font-bold">Phạm vi áp dụng</Label>
              <br />
              {scopeType === "all" && (
                <Label className="mt-4">Áp dụng cho tất cả sản phẩm</Label>
              )}

              {scopeType !== "all" && (
                <Controller
                  name="scope.ids"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => {
                    return (
                      <MultiSelect
                        selected={
                          Array.isArray(field.value) &&
                          typeof field.value[0] === "string"
                            ? ((field.value as string[])
                                .map((id) => {
                                  const listBaseOnScopeType =
                                    scopeType === "products"
                                      ? products
                                      : collections;
                                  const find = listBaseOnScopeType.find(
                                    (item) => item._id === id
                                  );
                                  return find
                                    ? ({
                                        _id: find._id,
                                        name: find.title ?? find.name,
                                      } as IOptionMultiSelect)
                                    : null;
                                })
                                .filter(Boolean) as IOptionMultiSelect[])
                            : (field.value as IOptionMultiSelect[])
                        }
                        options={
                          scopeType === "products"
                            ? products.map((p) => {
                                return {
                                  _id: p._id,
                                  name: p.title,
                                };
                              })
                            : collections.map((c) => {
                                return {
                                  _id: c._id,
                                  name: c.name,
                                };
                              })
                        }
                        onChange={field.onChange}
                        className="w-full"
                      />
                    );
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="">
          <div className="border h-fit bg-white border-gray-200 rounded-xl p-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="published">Hoạt động</Label>
              <Controller
                name="isActive"
                control={control}
                render={({ field: { value, onChange, ...rest } }) => (
                  <Switch
                    id="published"
                    checked={value}
                    onCheckedChange={onChange}
                    {...rest}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <Label htmlFor="start">Ngày bắt đầu</Label>
                <Controller
                  name="startDate"
                  rules={{ required: "Ngày không được để trống" }}
                  control={control}
                  render={({ field }) => {
                    const date =
                      field.value instanceof Date
                        ? field.value
                        : field.value
                        ? new Date(field.value)
                        : null;
                    return (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="rounded-md mt-2 cursor-pointer flex justify-start"
                          >
                            <CalendarIcon className=" h-4 w-4" />
                            {date ? (
                              date.toLocaleDateString("vi-VN")
                            ) : (
                              <span className="font-normal text-muted-foreground">
                                Chọn ngày
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(selectedDate) => {
                              field.onChange(selectedDate ?? undefined);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    );
                  }}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-[12px] mt-1">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="start">Ngày kết thúc</Label>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{ required: "Ngày không được để trống" }}
                  render={({ field }) => {
                    const date =
                      field.value instanceof Date
                        ? field.value
                        : field.value
                        ? new Date(field.value)
                        : null;
                    return (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="rounded-md mt-2 cursor-pointer flex justify-start"
                          >
                            <CalendarIcon className=" h-4 w-4" />
                            {date ? (
                              date.toLocaleDateString("vi-VN")
                            ) : (
                              <span className="font-normal text-muted-foreground">
                                Chọn ngày
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(selectedDate) => {
                              field.onChange(selectedDate ?? undefined);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    );
                  }}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-[12px] mt-1">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className={`bg-blue-600 mt-4 flex items-center gap-2 font-semibold hover:bg-blue-600 ${
              isPending ? " opacity-60 cursor-not-allowed" : ""
            }`}
          >
            Lưu
            {isPending && (
              <Loader2 className="animate-spin size-[18px]  text-white" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;
