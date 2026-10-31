import { useRef, useState } from 'react';
import { AiFillBell, AiOutlineBell } from 'react-icons/ai';
import { LogService } from '@/services/log/LogService';
import { NotifyItems } from '@/features/Notify/NotifyItems';
import { useFetchAllNotify } from '@/features/Notify/hooks/useFetchAllNotify';
import { tailwindMerge } from '@/facades/tailwindMerge';
import { useOnUnmount } from '@/modules/musicCards/hooks/useOnUnmount';
import { useTranslation } from '@/hooks/useTranslation';

const TIME_TO_MARK_VIEWED_NOTIFICATIONS_IN_MS = 3000;

export const Notify = () => {
  const [notifyIsOpen, setNotifyIsOpen] = useState(false);
  const { notifications, viewedNotificationIds, updateViewedNotifications } = useFetchAllNotify();
  const { t } = useTranslation();
  const resetTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  useOnUnmount(() => {
    if (resetTimeout.current) {
      clearTimeout(resetTimeout.current);
    }
  });

  const handleClickBell = () => {
    LogService.addBreadcrumb({ type: 'click', level: 'info', message: 'open notify' });
    setNotifyIsOpen((prev) => !prev);

    const idsAllNotifications = notifications.map((notification) => notification.id);

    resetTimeout.current = setTimeout(() => {
      updateViewedNotifications(idsAllNotifications);
    }, TIME_TO_MARK_VIEWED_NOTIFICATIONS_IN_MS);
  };

  const newNotificationCount = notifications.length - viewedNotificationIds.length;
  const styleBellOnNotifyIsOpen = notifyIsOpen ? 'bg-dark-grey' : '';
  return (
    <div className="ml-2 w-14 h-full flex items-center justify-center relative z-50" role="alert">
      <button
        type="button"
        id="open-notify"
        aria-label={newNotificationCount ? t('Open notifications, {count} new', { count: newNotificationCount }) : t('Open notifications')}
        onClick={handleClickBell}
        className={tailwindMerge(
          'hidden md:flex items-center justify-center h-6 w-6 hover:h-8 hover:w-8 rounded-full text-xl cursor-pointer select-none hover:bg-dark-grey transition-all duration-150 relative',
          styleBellOnNotifyIsOpen,
        )}>
        {notifyIsOpen ? <AiFillBell /> : <AiOutlineBell />}

        {newNotificationCount ? (
          <div className="w-3 h-3 bg-red-bright2 text-white font-bold rounded-full flex items-center justify-center absolute top-0 right-0 text-[0.7rem]">
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
