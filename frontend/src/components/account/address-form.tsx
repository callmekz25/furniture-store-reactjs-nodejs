import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  useGetDistricts,
  useGetProvinces,
  useGetWards,
} from "@/hooks/use-location";
import Loading from "../loading/loading";
import { useAddAddress, useUpdateAddress } from "@/hooks/use-account";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { getLocationNameById } from "@/utils/get-location-name";
import { IAddress } from "@/interfaces/address/address.interface";

const AddressForm = ({
  addr,
  onClose,
  isNew,
}: {
  addr: IAddress;
  onClose: (value: boolean) => void;
  isNew?: boolean;
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<IAddress>({
    defaultValues: addr ?? {
      _id: "",
      name: "",
      phoneNumber: "",
      address: "",
      province: { id: "", name: "" },
      district: { id: "", name: "" },
      ward: { id: "", name: "" },
      isDefault: false,
    },
  });
  const { data: provinces, isLoading: loadingProvinces } = useGetProvinces();
  const { data: districts, isLoading: loadingDistricts } = useGetDistricts(
    watch("province.id")
  );
  const { data: wards, isLoading: loadingWards } = useGetWards(
    watch("district.id")
  );
  const { mutate: addAddress, isPending: isPendingAdd } = useAddAddress();
  const { mutate: updateAddress, isPending: isPendingUpdate } =
    useUpdateAddress();

  const onSubmit = () => {
    const values = getValues();
    const province = getLocationNameById(provinces, values.province.id);
    const district = getLocationNameById(districts, values.district.id);
    const ward = getLocationNameById(wards, values.ward.id);

    const payload: IAddress = {
      ...values,
      province,
      district,
      ward,
    };
    if (isNew) {
      addAddress(payload, {
        onSuccess: () => {
          toast.success("Thêm địa chỉ mới thành công", {
            position: "top-right",
          });
          queryClient.invalidateQueries({ queryKey: ["user"] });
          reset();
          onClose(false);
        },
      });
    } else {
      updateAddress(payload, {
        onSuccess: () => {
          toast.success("Cập nhật địa chỉ thành công", {
            position: "top-right",
          });
          queryClient.invalidateQueries({ queryKey: ["user"] });
          reset();
          onClose(false);
        },
      });
    }
  };

  if (loadingProvinces) return <Loading />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`p-4 py-6 bg-white ${
        isPendingAdd || isPendingUpdate ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      {(isPendingAdd ||
        loadingDistricts ||
        loadingWards ||
        isPendingUpdate) && <Loading />}

      <input
        type="text"
        placeholder="Họ tên"
        className="py-[5px] h-[34px] text-sm px-2 w-full border mb-3"
        {...register("name")}
      />
      <input
        type="text"
        placeholder="Số điện thoại"
        className="py-[5px] h-[34px] text-sm px-2 w-full border mb-3"
        {...register("phoneNumber")}
      />

      <Select
        value={watch("province.id")}
        onValueChange={(value) => {
          setValue("province.id", value);
          setValue("district.id", "");
        }}
      >
        <SelectTrigger className="text-sm text-black rounded-none shadow-none mb-3">
          <SelectValue placeholder="Chọn tỉnh thành" />
        </SelectTrigger>
        <SelectContent>
          {provinces.map((province) => (
            <SelectItem value={province.id} key={province.id}>
              {province.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={watch("district.id")}
        onValueChange={(value) => {
          setValue("district.id", value);
          setValue("ward.id", "");
        }}
        disabled={!watch("province.id")}
      >
        <SelectTrigger className="text-sm text-black rounded-none shadow-none mb-3">
          <SelectValue placeholder="Chọn quận/huyện" />
        </SelectTrigger>
        <SelectContent>
          {districts?.map((d) => (
            <SelectItem key={d.id} value={d.id}>
              {d.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={watch("ward.id")}
        onValueChange={(value) => setValue("ward.id", value)}
        disabled={!watch("district.id")}
      >
        <SelectTrigger className="text-sm text-black rounded-none shadow-none mb-3">
          <SelectValue placeholder="Chọn phường/xã" />
        </SelectTrigger>
        <SelectContent>
          {wards?.map((w) => (
            <SelectItem key={w.id} value={w.id}>
              {w.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <input
        type="text"
        placeholder="Địa chỉ"
        className="py-[5px] h-[34px] text-sm px-2 w-full border mb-3"
        {...register("address")}
      />

      <div className="flex items-center gap-2">
        <Checkbox
          checked={watch("isDefault")}
          onCheckedChange={(checked) => setValue("isDefault", !!checked)}
          id={`default-${watch("_id") || "new"}`}
        />
        <Label htmlFor={`default-${watch("_id") || "new"}`}>
          Đặt làm địa chỉ mặc định
        </Label>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className=" text-white font-medium py-2 px-6 bg-[#323232] uppercase text-sm"
        >
          {isNew ? "Thêm mới" : "Cập nhật"}
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => onClose(false)}
        >
          Huỷ
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
