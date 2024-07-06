import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import { UserProvider } from "~/utils/context/userContextProvider";
import { Providers } from "./provider";
import NavBar from "~/app/_components-ui/navbar";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <Providers>
            <UserProvider>
              <NavBar />
              {children}
            </UserProvider>
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
