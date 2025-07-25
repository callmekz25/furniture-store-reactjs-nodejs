import { XMarkIcon } from "@heroicons/react/24/outline";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import AddressForm from "../../components/account/address-form";
import { useDeleteAddress, useGetUser } from "@/hooks/use-account";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/loading/loading";

const AddressesList = () => {
  const { data: user, isLoading } = useGetUser();
  const queryClient = useQueryClient();
  const [targetAddressId, setTargetAddressId] = useState<string[]>([]);
  const [addAddress, setAddAddress] = useState(false);
  const { mutate: deleteAddress, isPending: isPendingDelete } =
    useDeleteAddress();
  const handleDeleteAddress = (id: string) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xoá địa chỉ này?");
    if (confirm) {
      deleteAddress(id, {
        onSuccess: () => {
          toast.success("Xoá địa chỉ thành công", {
            position: "top-right",
          });
          queryClient.invalidateQueries({ queryKey: ["user"] });
        },
      });
    }
  };
  if (isLoading) {
    <Loading />;
  }

  return (
    <div className="w-full flex flex-wrap -ml-[15px] -mr-[15px]">
      <div className=" lg:flex-[0_0_50%] lg:max-w-[50%] w-full px-[15px]">
        {isPendingDelete && <Loading />}
        {user &&
          user?.addresses?.length > 0 &&
          user.addresses.map((addr) => {
            return (
              <div key={addr._id} className="w-full mb-5">
                <div className="flex px-4 py-3 items-center justify-between bg-[#d9edf7] ">
                  <h3 className=" color-red text-sm font-semibold">
                    {addr.name} {addr.isDefault && "(Địa chỉ mặc định)"}
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
                    <button onClick={() => handleDeleteAddress(addr._id)}>
                      <XMarkIcon className="size-5 hover:text-red-700 transition-all duration-200" />
                    </button>
                  </div>
                </div>
                {targetAddressId.includes(addr._id) ? (
                  <AddressForm
                    addr={addr}
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
                      <p className="flex-1">{addr.name}</p>
                    </div>
                    <div className="flex items-center text-sm mb-2.5">
                      <div className="w-[35%] pr-2.5 font-bold">Địa chỉ:</div>
                      <p className="flex-1">
                        {addr.address}, {addr.ward.name}, {addr.district.name},{" "}
                        {addr.province.name}
                      </p>
                    </div>
                    <div className="flex items-center text-sm mb-2.5">
                      <div className="w-[35%] pr-2.5 font-bold ">
                        Số điện thoại:
                      </div>
                      <p className="flex-1">{addr.phoneNumber}</p>
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
          <AddressForm addr={undefined} onClose={setAddAddress} isNew={true} />
        </div>
      </div>
    </div>
  );
};

export default AddressesList;
