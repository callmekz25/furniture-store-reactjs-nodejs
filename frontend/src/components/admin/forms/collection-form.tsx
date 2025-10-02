import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const CollectionForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Tạo bộ sưu tập</h3>
      <form className="grid grid-cols-4 gap-6 font-semibold">
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
                rules={{ required: 'Tên không được để trống' }}
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
              <Label htmlFor="name" className="opacity-60">
                Slug
              </Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Tên không được để trống' }}
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default CollectionForm;
