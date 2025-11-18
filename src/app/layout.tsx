import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>

        <SessionProvider>
          <Providers>
            <Navbar />
            <main>
              {children}
            </main>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}