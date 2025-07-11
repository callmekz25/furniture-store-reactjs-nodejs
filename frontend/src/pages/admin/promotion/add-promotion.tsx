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
import { useState } from "react";
const AddPromotion = () => {
  const [selectedRangePromotion, setSelectedRangePromotion] = useState([]);
  const options = [
    { label: "Bàn học", value: "all" },
    { label: "Ghế ngồi học", value: "collection" },
    { label: "Tủ giày", value: "category" },
    { label: "Nến thơm", value: "product" },
  ];
  return (
    <div>
      <h3>Tạo chương trình khuyến mãi</h3>
      <div className="grid grid-cols-4 gap-6 font-semibold">
        <div className=" col-span-3 h-fit flex flex-col gap-4 ">
          <div className=" border bg-white border-gray-200 rounded-xl p-4 flex flex-col gap-4">
            <h4>Thông tin cơ bản</h4>
            <div className="">
              <Label htmlFor="name" className="opacity-60">
                Tên
              </Label>
              <Input
                id="name"
                className=" outline-none py-[2px] text-sm px-2 mt-1 w-[50%]"
              />
            </div>
            <div className="">
              <Label htmlFor="name" className="opacity-60">
                Mô tả
              </Label>
              <Textarea
                id="name"
                className="mt-1 outline-none py-1 text-sm px-2"
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
                <Select defaultValue="all">
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[50%] pl-1">
                <Label htmlFor="name" className="opacity-60">
                  Phạm vi
                </Label>
                <Select defaultValue="all">
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Chọn.." />
                  </SelectTrigger>
                  <SelectContent className="font-medium">
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="category">Bộ sưu tập cụ thể</SelectItem>
                    <SelectItem value="collection">Danh mục cụ thể</SelectItem>
                    <SelectItem value="product">Sản phẩm cụ thể</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="">
              <Label className="font-bold">Phạm vi áp dụng</Label>
              <br />
              <Label className="mt-4">Áp dụng cho tất cả sản phẩm</Label>
              <br />
              <MultiSelect
                options={options}
                value={selectedRangePromotion}
                onChange={setSelectedRangePromotion}
                className="w-full"
              />
            </div>
            <div className="w-[50%]">
              <Label htmlFor="name" className="opacity-60">
                Giá trị khuyến mãi (%)
              </Label>
              <Input
                id="name"
                type="number"
                className=" outline-none py-[2px] text-sm px-2 mt-1 "
              />
            </div>
          </div>
        </div>
        <div className="border h-fit bg-white border-gray-200 rounded-xl p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="published">Hoạt động</Label>
            <Switch id="published" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Label htmlFor="start">Ngày bắt đầu</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-md mt-2 cursor-pointer flex justify-start"
                  >
                    {/* {date ? (
                    date.toLocaleDateString("vi-VN")
                  ) : (
                    <span className="font-normal text-muted-foreground">
                      Chọn ngày
                    </span>
                  )} */}
                    <CalendarIcon className=" h-4 w-4" />
                    <span className="font-medium text-muted-foreground">
                      Chọn ngày
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    // selected={date!}
                    // onSelect={(selectedDate) => {
                    //   field.onChange(selectedDate ?? undefined);
                    // }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="start">Ngày kết thúc</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-md mt-2 cursor-pointer flex justify-start"
                  >
                    {/* {date ? (
                    date.toLocaleDateString("vi-VN")
                  ) : (
                    <span className="font-normal text-muted-foreground">
                      Chọn ngày
                    </span>
                  )} */}
                    <CalendarIcon className=" h-4 w-4" />
                    <span className="font-medium text-muted-foreground">
                      Chọn ngày
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    // selected={date!}
                    // onSelect={(selectedDate) => {
                    //   field.onChange(selectedDate ?? undefined);
                    // }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPromotion;
