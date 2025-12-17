'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function Page() {
  const testId = useSelector((state: RootState) => state.testInfo.testId);
  console.warn('testId', testId);
  return <div className="w-full h-full">홈페이지</div>;
}
