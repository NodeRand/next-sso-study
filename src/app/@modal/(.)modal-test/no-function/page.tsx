'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ClickButton from '@/components/click-button';
import Modal from '@/components/modal';

export default function Page() {
  const router = useRouter();
  const [information, setInformation] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') setInformation(sessionStorage.getItem('information') || '');
  }, []);

  return (
    <Modal>
      <div className="utility-fixed-center utility-z-above component-white-container w-[80%] max-w-[500px]">
        <div className="flex items-center mb-[8px]">
          <h2 className="component-white-container-title-title2-h2 text-[24px] font-eb">
            개인정보 수집 및 활용 동의
          </h2>
        </div>
        <div className="component-white-container-content mb-[32px] max-h-[50dvh] overflow-y-auto">
          {information}
        </div>
        <ClickButton
          text="닫기"
          onClick={() => {
            sessionStorage.removeItem('information');
            router.back();
          }}
        />
      </div>
    </Modal>
  );
}
