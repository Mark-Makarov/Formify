import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { ruRU } from "@clerk/localizations";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import DesignContextProvider from "@/components/context/DesignContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Formify",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider localization={ruRU}>
      <html lang="ru">
        <body className={inter.className}>
          <DesignContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </DesignContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
