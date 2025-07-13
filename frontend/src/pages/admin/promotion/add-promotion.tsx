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
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import MultiSelect from "@/components/ui/multi-select";
import { useForm, Controller } from "react-hook-form";
import IPromotion from "@/interfaces/promotion/promotion.interface";
import { useGetProducts } from "@/hooks/use-product";
import Loading from "@/components/loading/loading";
const AddPromotion = () => {
  const { handleSubmit, control } = useForm<IPromotion>();
  const { data: products, isLoading } = useGetProducts(["title", "_id"]);
  const options = [
    { name: "Bàn học", _id: "all" },
    { name: "Ghế ngồi học", _id: "collection" },
    { name: "Tủ giày", _id: "category" },
    { name: "Nến thơm", _id: "product" },
  ];
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Tạo chương trình khuyến mãi</h3>
      <div className="grid grid-cols-4 gap-6 font-semibold">
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
                render={({ field }) => (
                  <Input
                    {...field}
                    id="name"
                    className="outline-none py-[2px] text-sm px-2 mt-1 w-[50%]"
                  />
                )}
              />
            </div>
            <div className="">
              <Label htmlFor="descr" className="opacity-60">
                Mô tả
              </Label>
              <Controller
                name="descr"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="descr"
                    className="mt-1 outline-none py-1 text-sm px-2"
                  />
                )}
              />
            </div>
          </div>
          <div className=" border bg-white border-gray-200 rounded-xl p-4 flex flex-col gap-4">
            <h4>Cấu hình khuyến mãi</h4>
            <div className="flex items-center">
              <div className="w-[50%] pr-1">
                <Label htmlFor="name" className="opacity-60">
                  Loại giảm giá
                </Label>
                <Controller
                  name="discountType"
                  control={control}
                  defaultValue="percent"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-1">
                        {field.value === "percent" ? "Phần trăm" : "Giá tiền"}
                      </SelectTrigger>
                      <SelectContent className=" font-semibold">
                        <SelectItem value="percent">Phần trăm</SelectItem>
                        <SelectItem value="fixed">Giá tiền</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="w-[50%] pl-1">
                <Label htmlFor="name" className="opacity-60">
                  Phạm vi
                </Label>
                <Controller
                  name="scope.type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
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
                        <SelectItem value="categories">
                          Danh mục cụ thể
                        </SelectItem>
                        <SelectItem value="products">
                          Sản phẩm cụ thể
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="">
              <Label className="font-bold">Phạm vi áp dụng</Label>
              <br />
              <Label className="mt-4">Áp dụng cho tất cả sản phẩm</Label>
              <br />
              <Controller
                name="scope.ids"
                control={control}
                defaultValue={[]}
                render={({ field }) => {
                  return (
                    <MultiSelect
                      selected={field.value}
                      options={products.map((p) => {
                        return {
                          _id: p._id,
                          name: p.title,
                        };
                      })}
                      onChange={field.onChange}
                      className="w-full"
                    />
                  );
                }}
              />
            </div>
            <div className="w-[50%]">
              <Label htmlFor="name" className="opacity-60">
                Giá trị khuyến mãi (% | đ)
              </Label>
              <Controller
                name="discountValue"
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
            </div>
          </div>
        </div>
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
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="start">Ngày kết thúc</Label>
              <Controller
                name="endDate"
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
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPromotion;
