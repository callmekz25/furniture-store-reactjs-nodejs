import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetCollections } from '@/hooks/use-collection';
import { ICollection } from '@/interfaces/collection/collection.interface';

interface MenuFormValues {
  _id: string;
  name: string;
  slug: string;
}

interface MenuModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: MenuFormValues) => void;
  defaultValues?: MenuFormValues;
}

const MenuModal: React.FC<MenuModalProps> = ({
  open,
  onClose,
  onSave,
  defaultValues,
}) => {
  const { handleSubmit, reset, control, setValue, watch } =
    useForm<MenuFormValues>({
      defaultValues: defaultValues || { _id: '', name: '', slug: '' },
    });
  const { data: collections, isLoading: ilc } = useGetCollections();

  React.useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  React.useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = (data: MenuFormValues) => {
    onSave(data);
    onClose();
  };
  console.log(watch('name'));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? 'Cập nhật menu' : 'Thêm menu mới'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Bộ sưu tập</label>
            <Controller
              name="_id"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    const selected = collections?.find(
                      (c: ICollection) => c._id === value
                    );
                    if (selected) {
                      setValue('_id', selected._id);
                      setValue('name', selected.name);
                      setValue('slug', selected.slug);
                    }
                  }}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Chọn.." />
                  </SelectTrigger>
                  <SelectContent className="font-semibold">
                    {collections?.map((col: ICollection) => (
                      <SelectItem key={col._id} value={col._id}>
                        {col.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">Lưu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MenuModal;
