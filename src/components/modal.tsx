'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { createPortal } from 'react-dom';

export default function Modal({
  children,
}: {
  children: React.ReactNode | ((ref: React.RefObject<HTMLDialogElement | null>) => React.ReactNode);
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const onKeyDownClose = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    // Escape 키를 누르면 모달을 닫고 이전 페이지로 이동
    if (e.key === 'Escape') {
      dialogRef.current?.close();
      router.back();
    }
  };
  const onClickClose = (e: React.MouseEvent<HTMLDialogElement>) => {
    // 모달 외부를 클릭을 의미
    // target에 대한 타입이 제공되지 않고 있어서 일단은 any로 처리
    if ((e.target as any).nodeName === 'DIALOG') {
      dialogRef.current?.close();
      router.back();
    }
  };
  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, []);

  return createPortal(
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog
      className="utility-z-05 fixed inset-0"
      ref={dialogRef}
      onKeyDown={onKeyDownClose}
      onClick={onClickClose}
    >
      {typeof children === 'function' ? children(dialogRef) : children}
    </dialog>,

    document.getElementById('modal-root') as HTMLElement
  );
}
