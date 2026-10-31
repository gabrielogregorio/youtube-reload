import { useTranslation } from '@/hooks/useTranslation';

export const Logo = () => {
  const { t } = useTranslation();

  return (
    <div>
      <article className="w-full flex items-center justify-center">
        <h1
          title={t('Youtube Reload logo')}
          className="py-6 px-[2%] text-center text-red-bright text-[1.5rem] transition-all duration-150 hover:scale-110 cursor-grab font-extrabold select-none">
          Youtube{` `}
          <span className="text-blue-vivid text-[1.5rem] font-extrabold font-cursive">Reload</span>
        </h1>
      </article>
    </div>
  );
};
