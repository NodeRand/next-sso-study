import { clsx } from 'clsx';

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx([['w-full', 'utility-absolute-center', 'flex items-center justify-center']])}
    >
      {children}
    </div>
  );
}
