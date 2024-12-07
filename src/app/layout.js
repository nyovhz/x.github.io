import localFont from "next/font/local";
import "./globals.css";

const trenchFont = localFont({
  src: "./fonts/TrenchThin.ttf",
  variable: "--font-trench",
  weight: "100 900",
});

export const metadata = {
  title: "nyovhz",
  description: "Digital Artist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
   
      <body
        className={`${trenchFont.variable} antialiased select-none`}
      >
        {children}
      
      </body>
    </html>
  );
}
