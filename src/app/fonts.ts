import { Cinzel, Inter } from "next/font/google";

export const fontSerif = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});