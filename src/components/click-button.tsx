import { clsx } from 'clsx';
import Image from 'next/image';
import { tv } from 'tailwind-variants';
import { MAIN_COLOR, SUB_COLOR } from '@/assets/database';

type ClickButtonProps = {
  flex?: 'row' | 'column';
  variant?: 'black' | 'white' | 'gray' | 'main';
  icon?: string;
  iconColor?: 'original' | 'black' | 'white' | 'red' | 'main';
  onClick?: () => void;
  size?: 40 | 60;
  text?: string;
  disabled?: boolean;
  className?: string;
};

export default function ClickButton({
  flex = 'row',
  variant = 'black',
  onClick = () => {},
  text,
  icon = '',
  size = 60,
  disabled = false,
  className = '',
}: ClickButtonProps) {
  return (
    <button
      style={(variant === 'main' && { backgroundColor: MAIN_COLOR, borderColor: SUB_COLOR }) || {}}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        buttonVariants({ flex, variant, size }),
        className,
        'flex justify-center items-center gap-[4px]'
      )}
    >
      {icon && (
        <Image
          width={0}
          height={0}
          src={icon}
          alt=""
          unoptimized
          className={iconVariants({
            size,
          })}
        />
      )}
      {text}
    </button>
  );
}

const buttonVariants = tv(
  {
    base: ['w-full font-b', 'shadow-button-huge-regular', 'disabled:opacity-70', 'border-[1px]'],
    variants: {
      flex: {
        row: 'flex flex-row gap-[8px]',
        column: 'flex flex-col',
      },
      variant: {
        black: 'bg-active-background-black-01 text-font-white-05  border-active-line-dark-gray-02',
        white: 'bg-active-background-white-07 text-font-black-01 border-active-line-light-gray-04',
        gray: 'bg-active-background-light-gray-05 text-font-black-01 border-active-line-light-gray-04',
        main: 'text-font-white-05',
        none: '',
      },
      size: {
        40: 'text-body1 px-[18px] py-[10px] rounded-[12px]',
        60: 'text-title3 px-[28px] py-[17.5px] rounded-[18px]',
      },
    },
    compoundVariants: [
      { flex: 'column', size: 40, class: '!text-cap1 !px-[16px] !py-[8px]' },
      { flex: 'column', size: 60, class: '!text-body4 !px-[18px] !py-[9.5px]' },
    ],
    defaultVariants: { variant: 'black', size: 40 },
  },
  { twMerge: false }
);
const iconVariants = tv(
  {
    base: '',
    variants: {
      size: {
        40: 'w-[20px] h-[20px]',
        60: 'w-[28px] h-[28px]',
      },
    },
  },
  { twMerge: false }
);
