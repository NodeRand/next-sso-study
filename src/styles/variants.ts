import { tv } from 'tailwind-variants';

export const ButtonComponentBoxVariants = tv(
  {
    base: ['gap-[8px]', 'rounded-full'],
    variants: {
      buttonLayout: {
        NONE: 'hidden',
        ONE: '!bg-transparent',
        TWO_SYM: 'flex justify-center items-center',
        TWO_ASYM: [
          'flex justify-center items-center gap-[8px] h-[75px] p-[4px]',
          'bg-active-background-white-07 shadow-button-huge-regular',
          '[&>button]:!w-max',
          '[&>button]:h-full',
          '[&>button]:rounded-full',
          '[&>button:nth-child(2)]:min-w-[120px]',
        ],
        TWO_UP_DOWN: 'flex flex-col justify-center items-center',
      },
    },
    defaultVariants: {
      buttonLayout: 'TWO_UP_DOWN',
    },
  },
  { twMerge: false }
);

export const MediaSpecVariants = tv({
  base: '',
  variants: {
    mediaSpec: {
      NONE: 'hidden',
      ONE_TO_ONE: 'w-[280px] h-[280px]',
      SIXTEEN_TO_NINE: 'w-[280px] aspect-[16/9]',
      RATIO_NO_CHANGE: 'w-[280px] h-auto',
    },
  },
  defaultVariants: {
    mediaSpec: 'RATIO_NO_CHANGE',
  },
});
