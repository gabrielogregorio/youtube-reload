/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { NotifyFromApiMapper } from '@/features/Notify/mappers/fromApi';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRef } from 'react';

interface IProps {
  closeNotify: () => void;
  notifyIsOpen: boolean;
  notifications: NotifyFromApiMapper[];
  viewedNotificationIds: number[];
}

export const NotifyItems = ({ closeNotify, notifyIsOpen, notifications, viewedNotificationIds }: IProps) => {
  const refComponent = useRef<HTMLDivElement>(null);

  useOutsideClick(refComponent, () => {
    closeNotify();
  });

  if (!notifyIsOpen) {
    return <div />;
  }

  return (
    <div
      role="dialog"
      aria-label="Notifications"
      className="absolute right-10 top-3 z-50 hidden md:flex flex-col rounded-md h-96 px-3 py-3 w-96 bg-dark-charcoal backdrop-blur-3xl shadow-2xl"
      ref={refComponent}>
      <h3 className="text-base mb-1 select-none">Notificações</h3>

      <div className="border-b border-gray-500" />

      <ul className="overflow-y-scroll flex-1 scrollbar-inverse w-full" tabIndex={0} aria-label="Lista de notificações">
        {notifications.map((notification) => {
          return (
            <li
              key={notification.id}
              className="hover:bg-dark-slate cursor-pointer flex items-center justify-center py-2 px-2 transition-all duration-150 select-none">
              <div className="h-10 text-2xl flex items-center justify-center aspect-square mr-2">{notification.emoji}</div>
              <div className="flex-1">
                <h4 className="text-sm hover:text-blue-cerulean">{notification.title}</h4>
                <time className="text-[0.7rem] text-gray-400">{notification.date}</time>
              </div>

              {!viewedNotificationIds.includes(notification.id) ? (
                <div className="flex items-center justify-center ml-2" role="status" aria-label="Unread notification">
                  <div className="p-1 bg-red-bright rounded-full" />
                </div>
              ) : undefined}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
