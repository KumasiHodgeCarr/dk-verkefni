import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/navigation/dashboard-navbar";
import { Home, BarChart2 } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Conflict Lens",
  description: "Analyzing US military interventions through Reddit's lens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {/* set the links for left side */}
          <Navbar
            leftLinks={[
              { label: "Home", path: "/", icon: <Home size={16} /> },
              {
                label: "Innsyni",
                path: "/innsyni",
                icon: <BarChart2 size={16} />,
              },
            ]}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
