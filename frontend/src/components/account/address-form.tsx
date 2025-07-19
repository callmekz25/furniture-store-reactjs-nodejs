import { IAddress } from "@/interfaces/address/address.interface";
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

const AddressForm = ({
  addr,
  onChange,
  onClose,
  isNew,
}: {
  addr: IAddress;
  onChange: (field: keyof IAddress, value: string | boolean) => void;
  onClose: (value: boolean) => void;
  isNew?: boolean;
}) => {
  const { data: provinces, isLoading: loadingProvinces } = useGetProvinces();
  const { data: districts, isLoading: loadingDistricts } = useGetDistricts(
    addr.province
  );
  const { data: wards, isLoading: loadingWards } = useGetWards(addr.district);

  if (loadingProvinces || loadingDistricts || loadingWards) return <Loading />;
  return (
    <div className="p-4 py-6 bg-white">
      <input
        type="text"
        placeholder="Họ tên"
        className="py-[5px] h-[34px] text-sm px-2 w-full border mb-3"
        value={addr.name}
        onChange={(e) => onChange("name", e.target.value)}
      />
      <input
        type="text"
        placeholder="Số điện thoại"
        className="py-[5px] h-[34px] text-sm px-2 w-full border mb-3"
        value={addr.phoneNumber}
        onChange={(e) => onChange("phoneNumber", e.target.value)}
      />

      <Select
        value={addr.province}
        onValueChange={(value) => onChange("province", value)}
      >
        <SelectTrigger className=" text-sm text-black rounded-none shadow-none mb-3">
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
        value={addr.district}
        onValueChange={(value) => onChange("district", value)}
        disabled={!addr.province}
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
        value={addr.ward}
        onValueChange={(value) => onChange("ward", value)}
        disabled={!addr.district}
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
        value={addr.address}
        onChange={(e) => onChange("address", e.target.value)}
      />
      <div className="flex items-center gap-2">
        <Checkbox
          checked={!!addr.isDefault}
          onCheckedChange={(checked) => onChange("isDefault", !!checked)}
          id={`default-${addr._id}`}
        />
        <Label htmlFor={`default-${addr._id}`}>Đặt làm địa chỉ mặc định</Label>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => {
            console.log(addr);
          }}
          className=" text-white font-medium py-2 px-6 bg-[#323232] uppercase text-sm"
        >
          {isNew ? "Thêm mới" : "Cập nhật"}
        </button>
        <button onClick={() => onClose(false)}>Huỷ</button>
      </div>
    </div>
  );
};

export default AddressForm;
