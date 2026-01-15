import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CuraHome - Phenotype-Guided Medical Assistant",
  description: "A decision-support platform providing first-line medical guidance based on symptoms, age, and phenotype factors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
