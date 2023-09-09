import { useState } from 'react';
import { AiFillBell, AiOutlineBell } from 'react-icons/ai';
import { LogService } from '@/services/log/LogService';
import { tailwindMerge } from '@/libs/tailwindMerge';
import { NotifyItems } from '@/layouts/Notify/NotifyItems';
import { useFetchAllNotify } from '@/layouts/Notify/hooks/useFetchAllNotify';

const TIME_TO_MARK_VIEWED_NOTIFICATIONS_IN_MS = 3000;

export const Notify = () => {
  const [notifyIsOpen, setNotifyIsOpen] = useState(false);
  const { notifications, viewedNotificationIds, updateViewedNotifications } = useFetchAllNotify();

  const handleClickBell = () => {
    LogService.addBreadcrumb({ type: 'click', level: 'info', message: 'open notify' });
    setNotifyIsOpen((prev) => !prev);

    const idsAllNotifications = notifications.map((notification) => notification.id);

    setTimeout(() => {
      updateViewedNotifications(idsAllNotifications);
    }, TIME_TO_MARK_VIEWED_NOTIFICATIONS_IN_MS);
  };

  const newNotificationCount = notifications.length - viewedNotificationIds.length;
  const styleBellOnNotifyIsOpen = notifyIsOpen ? 'bg-dark-light' : '';
  return (
    <div
      className="ml-2 w-14 h-full flex items-center justify-center relative z-50"
      role="alert"
      aria-label="Notifications">
      <button
        type="button"
        aria-label="Abrir notificações"
        onClick={handleClickBell}
        className={tailwindMerge(
          'hidden md:flex items-center justify-center h-6 w-6 hover:h-8 hover:w-8 rounded-full text-xl cursor-pointer select-none hover:bg-dark-light transition-all duration-150 relative',
          styleBellOnNotifyIsOpen,
        )}>
        {notifyIsOpen ? <AiFillBell /> : <AiOutlineBell />}

        {newNotificationCount ? (
          <div className="w-3 h-3 bg-red rounded-full flex items-center justify-center absolute top-0 right-0 text-[0.7rem]">
            {newNotificationCount}
          </div>
        ) : undefined}
      </button>

      <NotifyItems
        closeNotify={() => setNotifyIsOpen(false)}
        notifyIsOpen={notifyIsOpen}
        notifications={notifications}
        viewedNotificationIds={viewedNotificationIds}
      />
    </div>
  );
};
