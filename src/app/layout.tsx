import type { Viewport } from 'next';
import '@/styles/global.css';
import { suite } from '@/assets/fonts/font';
import ReduxProviderWrapper from '@/components/redux-provider-wrapper';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  userScalable: false,
  maximumScale: 1,
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={suite.className}>
        <ReduxProviderWrapper>
          <>
            <div style={{ backgroundColor: 'white' }} className="base-wrapper">
              <div className="base-wrapper-max-width">
                {children}
                {modal}
                <div id="modal-root"></div>
              </div>
            </div>
          </>
        </ReduxProviderWrapper>
      </body>
    </html>
  );
}
