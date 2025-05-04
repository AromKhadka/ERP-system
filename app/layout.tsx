import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ERP System",
  description: "An integrated ERP platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />

        <div className="flex flex-1">
          {/* Sidebar on the left */}
          <Sidebar />

          {/* Main content area */}
          <main className="flex-1 p-4 overflow-y-auto">{children}</main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
