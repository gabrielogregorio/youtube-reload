import { Navbar } from '@/layouts/navbar';
import { ReactElement } from 'react';
import { EnvironmentName } from '@/layouts/header/EnvironmentName';
import { Notify } from '../../features/Notify';
import { Profile } from '../../features/Profile';
import { LanguageSwitcher } from '../../features/LanguageSwitcher';

interface ITemplateDefaultProps {
  children: ReactElement;
}

export const MainTemplate = ({ children }: ITemplateDefaultProps) => {
  return (
    <div className="relative mt-[120px]">
      <EnvironmentName />

      <div role="banner" className="fixed top-0 left-0 z-50 w-full flex items-center justify-end bg-dark-slate shadow-md h-14 ">
        <div className="ml-6 hidden md:block" />
        <div className="ml-2 w-14 h-full hidden md:block" />
        <div className="ml-2 w-14 h-full hidden md:block" />

        <Navbar />

        <LanguageSwitcher />

        <Notify />

        <Profile className="mr-6" />
      </div>

      <div className="pb-48">{children}</div>
    </div>
  );
};
