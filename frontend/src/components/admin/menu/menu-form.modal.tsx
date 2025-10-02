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
import { useForm } from 'react-hook-form';

interface MenuFormValues {
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
  const { register, handleSubmit, reset } = useForm<MenuFormValues>({
    defaultValues: defaultValues || { name: '', slug: '' },
  });

  React.useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = (data: MenuFormValues) => {
    onSave(data);
    onClose();
  };

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
            <label className="text-sm font-medium">Tên menu</label>
            <Input
              {...register('name', { required: true })}
              placeholder="Tên menu"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Slug</label>
            <Input
              {...register('slug', { required: true })}
              placeholder="slug-menu"
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
