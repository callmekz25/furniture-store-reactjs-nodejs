import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  ChevronDownIcon,
  EditIcon,
  GripVerticalIcon,
  TrashIcon,
} from 'lucide-react';
import React from 'react';
import MenuItem from './menu-item';
import { IMenu } from '@/interfaces/menu/menu.interface';
import { ISubMenu } from '@/interfaces/menu/sub-menu.interface';

const MenuGroup = ({
  menu,
  onEditGroup,
  onEditItem,
  onDeleteGroup,
  onDeleteItem,
}: {
  menu: IMenu;
  onEditGroup: (item: IMenu) => void;
  onEditItem: (item: ISubMenu) => void;
  onDeleteGroup: (item: IMenu) => void;
  onDeleteItem: (item: ISubMenu) => void;
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: menu._id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className={`flex flex-col gap-4 py-3 px-4 border rounded-lg 
        ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center gap-4 w-full">
        <button
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className=" hover:cursor-grab"
          {...attributes}
          {...listeners}
        >
          <GripVerticalIcon className="size-5" />
        </button>
        <div className="flex items-center justify-between flex-1 ">
          <div className=" flex items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="font-bold">{menu.name}</span>
                <span className="font-medium text-sm">
                  ({menu.subMenu.length} menu)
                </span>
              </div>
              <div className="text-[12px] py-1 w-fit px-2 rounded-md bg-gray-200">
                {menu.slug}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ChevronDownIcon
              className={`size-4 hover:cursor-pointer transition-all duration-200 ${
                expanded ? ' rotate-180' : ''
              }`}
              onClick={() => setExpanded(!expanded)}
            />
            <EditIcon
              onClick={() => onEditGroup(menu)}
              className="size-4 hover:cursor-pointer"
            />
            <TrashIcon
              onClick={() => onDeleteGroup(menu)}
              className="size-4 hover:cursor-pointer text-red-600"
            />
          </div>
        </div>
      </div>
      {expanded && (
        <div className="ml-4  flex flex-col gap-4">
          <SortableContext
            items={menu.subMenu.map((m) => m._id)}
            strategy={verticalListSortingStrategy}
          >
            {menu.subMenu &&
              menu.subMenu.length > 0 &&
              menu.subMenu.map((item) => {
                return (
                  <MenuItem
                    key={item._id}
                    menuItem={item}
                    onEdit={() => onEditItem(item)}
                    onDelete={() => onDeleteItem(item)}
                  />
                );
              })}
          </SortableContext>
        </div>
      )}
    </div>
  );
};

export default MenuGroup;
