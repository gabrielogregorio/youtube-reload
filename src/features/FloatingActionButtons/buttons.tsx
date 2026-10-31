import { ReactElement } from 'react';

export enum LateralButtonEnum {
  Dark = 'Dark',
  Red = 'Red',
  Blue = 'Blue',
}

const variantLateralButtonStyle: { [key in LateralButtonEnum]: string } = {
  [LateralButtonEnum.Dark]: 'bg-dark-grey text-white-ultra-light hover:bg-dark-grey',
  [LateralButtonEnum.Red]: 'bg-red-bright text-white-ultra-light hover:bg-red-bright',
  [LateralButtonEnum.Blue]: 'bg-blue-vivid text-white-ultra-light hover:bg-blue-deep',
};

interface ILateralButtonProps {
  title: string;
  icon: ReactElement;
  action: () => void;
  variant: LateralButtonEnum;
  bottomPosition: string;
}

export const LateralButton = ({ title, icon, action, variant, bottomPosition }: ILateralButtonProps) => {
  const styleVariant: string = variantLateralButtonStyle[variant] || '';

  return (
    <div className={`fixed ${bottomPosition} right-2`}>
      <button
        onClick={() => action()}
        type="button"
        title={title}
        className={`${styleVariant} p-3 rounded-full transition-all duration-150 shadow-xl md:hover:scale-110`}>
        {icon}
      </button>
    </div>
  );
};
