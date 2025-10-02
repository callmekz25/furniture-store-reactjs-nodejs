import { ISubMenu } from '@/interfaces/menu/sub-menu.interface';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EditIcon, GripVerticalIcon, TrashIcon } from 'lucide-react';
const MenuItem = ({
  menuItem,
  onEdit,
  onDelete,
}: {
  menuItem: ISubMenu;
  onEdit?: (item: ISubMenu) => void;
  onDelete?: (item: ISubMenu) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: menuItem._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 py-3 px-4 border rounded-lg 
        ${isDragging ? 'opacity-50' : ''}`}
    >
      <button
        type="button"
        className=" cursor-grab"
        {...attributes}
        {...listeners}
      >
        <GripVerticalIcon className="size-4" />
      </button>
      <div className="flex items-center justify-between flex-1">
        <div className="flex flex-col">
          <div className="text-[15px]">{menuItem.name}</div>
          <div className="text-[12px] py-1 px-2 rounded-md bg-gray-200">
            {menuItem.slug}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <EditIcon
            onClick={() => onEdit?.(menuItem)}
            className="size-4 hover:cursor-pointer"
          />
          <TrashIcon
            onClick={() => onDelete?.(menuItem)}
            className="size-4 hover:cursor-pointer text-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
