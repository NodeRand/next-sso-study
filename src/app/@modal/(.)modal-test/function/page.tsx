'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from '@/components/modal';
import TitleContentModal from '@/components/molecules/title-content-modal';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const query = useSearchParams();
  const stampId = Number(params?.['stamp-id']);
  const [type, setType] = useState<'duplicated' | 'fail' | ''>('');
  const [missionName, setMissionName] = useState('');

  useEffect(() => {
    if (query) {
      const typeParam = query?.get('type') || '';
      const missionNameParam = query?.get('name') || '';
      setType(typeParam as 'duplicated' | 'fail' | '');
      setMissionName(missionNameParam);
    }
  }, [query]);

  return (
    <Modal>
      {(dialogRef) => (
        <>
          {type === 'duplicated' && (
            <TitleContentModal
              title="미션 중복 인증 오류"
              content={`해당 미션(${missionName})은\n이미 완료된 상태입니다.\n스탬프 판으로 돌아갑니다.`}
              onClick={() => {
                dialogRef.current?.close();
                router.push(`/${stampId}/stamp-board`);
              }}
              buttonText="닫기"
            />
          )}

          {type === 'fail' && (
            <TitleContentModal
              title="미션 인증 오류"
              content="홈 화면으로 이동합니다."
              onClick={() => {
                dialogRef.current?.close();
                router.push(`/${stampId}`);
              }}
              buttonText="닫기"
            />
          )}
        </>
      )}
    </Modal>
  );
}
