import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Navbar from "@/components/NavBar";
import { AuthProvider } from "@/hooks/useAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant Tracker",
  description: "Restaurant Tracker is a simple app to track your favorite restaurants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <script defer src="http://192.168.3.219:3300/script.js" data-website-id="e56a84da-e3df-41c3-9505-d2ded6c654ff"></script>
        <link 
        rel="stylesheet" 
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""/>
      </head>
      <body className={`${inter.className} bg-slate-300`}>
        <AuthProvider>
          <Navbar/>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}