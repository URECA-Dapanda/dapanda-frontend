import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Slide, ToastContainer } from "react-toastify";
import ProviderWrapper from "@components/common/ProviderWrapper";
import FcmInitializer from "@components/common/FcmInitializer";
import "./globals.css";

export const metadata: Metadata = {
  title: "DaPanDa",
  description: "URECA final project DaPanDa",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:6480256,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              });
            `,
          }}
        />
      </head>
      <body className="flex flex-col box-border w-full bg-gray-300 justify-center items-center">
        <ProviderWrapper>
          <FcmInitializer />
          <Analytics />
          <SpeedInsights />
          {children}
        </ProviderWrapper>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme="light"
          transition={Slide}
          closeButton={false}
          stacked
        />
      </body>
    </html>
  );
}
