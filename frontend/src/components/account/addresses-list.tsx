import { IAddress } from "@/interfaces/address/address.interface";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import AddressForm from "./address-form";

const AddressesList = () => {
  const [targetAddressId, setTargetAddressId] = useState<string[]>([]);
  const [addAddress, setAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState<IAddress>({
    _id: "",
    name: "",
    phoneNumber: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    isDefault: false,
  });

  const [addresses, setAddresses] = useState<IAddress[]>([
    {
      _id: "123",
      name: "Khánh Vinh",
      phoneNumber: "0123456789",
      address: "220 Nguyễn Đức Cảnh",
      province: "",
      district: "",
      ward: "",
      isDefault: false,
    },
    {
      _id: "321",
      name: "Kz",
      phoneNumber: "0123456789",
      address: "11/A LTT",
      province: "",
      district: "",
      ward: "",
      isDefault: false,
    },
    {
      _id: "456",
      name: "Mai Phương",
      phoneNumber: "0123456789",
      address: "45 LHP",
      province: "",
      district: "",
      ward: "",
      isDefault: false,
    },
  ]);

  const handleNewAddressChange = (field: keyof IAddress, value: string) => {
    setNewAddress((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "province") {
        updated.district = "";
        updated.ward = "";
      }
      if (field === "district") {
        updated.ward = "";
      }
      return updated;
    });
  };

  return (
    <div className="w-full flex flex-wrap -ml-[15px] -mr-[15px]">
      <div className=" lg:flex-[0_0_50%] lg:max-w-[50%] w-full px-[15px]">
        {addresses.map((addr) => {
          return (
            <div key={addr._id} className="w-full mb-5">
              <div className="flex px-4 py-3 items-center justify-between bg-[#d9edf7] ">
                <h3 className=" color-red text-sm font-semibold">
                  {addr.name} (Địa chỉ mặc định)
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setTargetAddressId((prev) =>
                        prev.includes(addr._id)
                          ? prev.filter((id) => id !== addr._id)
                          : [...prev, addr._id]
                      )
                    }
                  >
                    <EditIcon className="size-4 hover:text-red-700 transition-all duration-200" />
                  </button>
                  <button>
                    <XMarkIcon className="size-5 hover:text-red-700 transition-all duration-200" />
                  </button>
                </div>
              </div>
              {targetAddressId.includes(addr._id) ? (
                <AddressForm
                  addr={addr}
                  onChange={(field, value) => {
                    setAddresses((prev) =>
                      prev.map((item) => {
                        if (item._id === addr._id) {
                          const updatedItem = { ...item, [field]: value };
                          if (field === "province") {
                            updatedItem.district = "";
                            updatedItem.ward = "";
                          }
                          if (field === "district") {
                            updatedItem.ward = "";
                          }
                          return updatedItem;
                        }
                        return item;
                      })
                    );
                  }}
                  onClose={() =>
                    setTargetAddressId((prev) =>
                      prev.filter((id) => id !== addr._id)
                    )
                  }
                />
              ) : (
                <div className="px-4 py-2 bg-white">
                  <div className="flex items-center text-sm mb-2.5">
                    <div className=" font-bold  w-[35%] pr-2.5">Họ tên:</div>
                    <span>{addr.name}</span>
                  </div>
                  <div className="flex items-center text-sm mb-2.5">
                    <div className="w-[35%] pr-2.5 font-bold">Địa chỉ:</div>
                    <span>{addr.address}</span>
                  </div>
                  <div className="flex items-center text-sm mb-2.5">
                    <div className="w-[35%] pr-2.5 font-bold ">
                      Số điện thoại:
                    </div>
                    <span>{addr.phoneNumber}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className=" lg:flex-[0_0_50%] lg:max-w-[50%] w-full px-[15px]">
        <button
          onClick={() => setAddAddress(!addAddress)}
          className=" text-white font-bold p-2.5 bg-[#323232] w-full uppercase text-sm"
        >
          Nhập địa chỉ mới
        </button>
        <div
          className={` overflow-hidden  ${
            addAddress ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          <AddressForm
            addr={newAddress}
            onChange={handleNewAddressChange}
            onClose={setAddAddress}
            isNew={true}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressesList;
