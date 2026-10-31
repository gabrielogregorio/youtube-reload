import React, { ReactElement } from 'react';
import { ScreenEnum } from '@/contracts/homeScreens';
import { useCurrentScreen } from '@/hooks/useCurrentScreen';
import { useAuthConfigure } from '@/hooks/useAuthConfigure';
import { useDocumentLanguage } from '@/hooks/useDocumentLanguage';
import { UnLikesPage } from '@/screens/unlikes';
import { LikesPage } from '@/screens/likes';
import { HomePage } from '@/screens/home';
import { MainTemplate } from '@/templates/index';

const screens: { [screen in ScreenEnum]: ReactElement } = {
  [ScreenEnum.home]: <HomePage />,
  [ScreenEnum.likes]: <LikesPage />,
  [ScreenEnum.unLikes]: <UnLikesPage />,
};

export const MainContainer = () => {
  const { currentScreen } = useCurrentScreen();

  useAuthConfigure();
  useDocumentLanguage();

  return <MainTemplate>{screens[currentScreen]}</MainTemplate>;
};
