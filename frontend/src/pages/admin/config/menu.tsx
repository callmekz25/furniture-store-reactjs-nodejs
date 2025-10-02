import MenuModal from '@/components/admin/menu/menu-form.modal';
import MenuGroup from '@/components/admin/menu/menu-group';
import MenuItem from '@/components/admin/menu/menu-item';
import Loading from '@/components/loading/loading';
import { Button } from '@/components/ui/button';
import { useGetMenu, useUpsertMenu } from '@/hooks/use-menu';
import { IMenu } from '@/interfaces/menu/menu.interface';
import { ISubMenu } from '@/interfaces/menu/sub-menu.interface';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const MenuConfig = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useGetMenu();
  const { mutate: upsertMenu, isPending } = useUpsertMenu();
  const [menus, setMenus] = React.useState<IMenu[] | []>([]);
  const [editing, setEditing] = React.useState<{
    type: 'group' | 'item';
    groupMenuId?: string;
    data: { _id: string; name: string; slug: string };
  } | null>(null);

  React.useEffect(() => {
    if (data) {
      setMenus(data.data);
    }
  }, [data]);

  const [activeMenu, setActiveMenu] = React.useState<ISubMenu | IMenu | null>(
    null
  );

  const findMenuActiveById = (id: string) => {
    for (const menu of menus) {
      if (menu._id === id) return menu;
      const subMenu = menu.subMenu.find((c) => c._id === id);
      if (subMenu) return subMenu;
    }
    return null;
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;

    // Menu group
    if (menus.some((m) => m._id === active.id)) {
      const oldIndex = menus.findIndex((m) => m._id === active.id);
      const newIndex = menus.findIndex((m) => m._id === over.id);
      setMenus(arrayMove(menus, oldIndex, newIndex));
      return;
    }

    // Sub menu
    let sourceGroupIndex = -1;
    let targetGroupIndex = -1;
    let draggedItem;

    menus.forEach((menu, i) => {
      if (menu.subMenu.some((m) => m._id === active.id)) {
        sourceGroupIndex = i;
        draggedItem = menu.subMenu.find((m) => m._id === active.id);
      }
      if (menu.subMenu.some((m) => m._id === over.id)) {
        targetGroupIndex = i;
      }
    });

    if (!draggedItem || sourceGroupIndex === -1 || targetGroupIndex === -1)
      return;

    const updatedMenus = [...menus];

    // Same menu group
    if (sourceGroupIndex === targetGroupIndex) {
      const oldIndex = updatedMenus[sourceGroupIndex].subMenu.findIndex(
        (c) => c._id === active.id
      );
      const newIndex = updatedMenus[sourceGroupIndex].subMenu.findIndex(
        (c) => c._id === over.id
      );

      updatedMenus[sourceGroupIndex] = {
        ...updatedMenus[sourceGroupIndex],
        subMenu: arrayMove(
          updatedMenus[sourceGroupIndex].subMenu,
          oldIndex,
          newIndex
        ),
      };
    }
    // Different menu group
    else {
      updatedMenus[sourceGroupIndex] = {
        ...updatedMenus[sourceGroupIndex],
        subMenu: updatedMenus[sourceGroupIndex].subMenu.filter(
          (c) => c._id !== active.id
        ),
      };

      const targetChildren = [...updatedMenus[targetGroupIndex].subMenu];
      let newIndex = targetChildren.findIndex((c) => c._id === over.id);

      if (newIndex === -1) {
        newIndex = targetChildren.length;
      }

      targetChildren.splice(newIndex, 0, draggedItem);

      updatedMenus[targetGroupIndex] = {
        ...updatedMenus[targetGroupIndex],
        subMenu: targetChildren,
      };
    }

    setMenus(updatedMenus);
  };

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    const item = findMenuActiveById(active.id.toString());
    setActiveMenu(item);
  };

  const handleDeleteMenu = (deleting: {
    type: 'item' | 'group';
    groupMenuId?: string;
    data: IMenu | ISubMenu;
  }) => {
    if (!deleting) return;

    let updatedMenu = [...menus];
    if (deleting.type === 'group') {
      updatedMenu = updatedMenu.filter((m) => m._id !== deleting.data._id);
    } else {
      const groupMenuIndex = updatedMenu.findIndex(
        (m) => m._id === deleting.groupMenuId
      );
      if (groupMenuIndex === -1) return;
      const newSubMenu = updatedMenu[groupMenuIndex].subMenu.filter(
        (m) => m._id !== deleting.data._id
      );

      updatedMenu[groupMenuIndex] = {
        ...updatedMenu[groupMenuIndex],
        subMenu: newSubMenu,
      };
    }
    setMenus(updatedMenu);
  };

  const handleUpsertMenu = () => {
    if (!menus) return;
    upsertMenu(
      {
        menu: menus,
        id: data._id,
      },
      {
        onSuccess: () => {
          toast.success('Cập nhật menu thành công', {
            position: 'top-right',
          });
          queryClient.invalidateQueries({
            queryKey: ['menu'],
          });
        },
      }
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Quản lý menu</h3>
      <div className="grid grid-cols-4 gap-6 font-semibold">
        <div className=" col-span-3 h-fit flex flex-col gap-4 ">
          <div className=" border bg-white border-gray-200 rounded-xl p-4 flex flex-col gap-4">
            <DndContext
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={menus.map((menu) => menu._id)}
                strategy={verticalListSortingStrategy}
              >
                {menus.map((menu) => {
                  return (
                    <MenuGroup
                      key={menu._id}
                      menu={menu}
                      onDeleteGroup={(group) =>
                        handleDeleteMenu({ type: 'group', data: group })
                      }
                      onDeleteItem={(item) =>
                        handleDeleteMenu({
                          type: 'item',
                          groupMenuId: menu._id,
                          data: item,
                        })
                      }
                      onEditGroup={(group) =>
                        setEditing({ type: 'group', data: group })
                      }
                      onEditItem={(item) =>
                        setEditing({
                          type: 'item',
                          groupMenuId: menu._id,
                          data: item,
                        })
                      }
                    />
                  );
                })}
              </SortableContext>
              <DragOverlay>
                {activeMenu ? <MenuItem menuItem={activeMenu} /> : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
        <div className=" sticky border top-4 bg-white border-gray-200 rounded-xl p-4 h-fit flex items-center justify-end gap-4">
          <Button
            onClick={() => setMenus(data.data)}
            className="bg-gray-100 text-black font-medium hover:bg-gray-100"
          >
            Huỷ
          </Button>
          <Button
            onClick={() => handleUpsertMenu()}
            disabled={isPending}
            className={`bg-blue-600 font-medium hover:bg-blue-600 flex items-center gap-1 ${
              isPending ? 'opacity-70' : ''
            }`}
          >
            Lưu
            {isPending && <Loader2Icon className="size-4 animate-spin " />}
          </Button>
        </div>
      </div>
      <MenuModal
        open={!!editing}
        onClose={() => setEditing(null)}
        defaultValues={editing?.data}
        onSave={(data) => {
          if (!editing) return;
          const updatedMenu = [...menus];
          if (editing.type === 'group') {
            const index = updatedMenu.findIndex(
              (m) => m._id === editing.data._id
            );
            if (index === -1) return;

            updatedMenu[index] = {
              ...updatedMenu[index],
              name: data.name,
              slug: data.slug,
            };
          } else {
            const groupMenuIndex = updatedMenu.findIndex(
              (m) => m._id === editing.groupMenuId
            );
            if (groupMenuIndex === -1) return;
            const subIndex = updatedMenu[groupMenuIndex].subMenu.findIndex(
              (m) => m._id === editing.data._id
            );
            if (subIndex === -1) return;
            const newSubMenu = [...updatedMenu[groupMenuIndex].subMenu];

            newSubMenu[subIndex] = {
              ...newSubMenu[subIndex],
              name: data.name,
              slug: data.slug,
            };

            updatedMenu[groupMenuIndex] = {
              ...updatedMenu[groupMenuIndex],
              subMenu: newSubMenu,
            };
          }
          setMenus(updatedMenu);
          setEditing(null);
        }}
      />
    </div>
  );
};

export default MenuConfig;
