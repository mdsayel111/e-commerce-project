import MuiConfig from "@/configaration/MUI.config";
import AuthProvider from "@/context/AuthContext";
import PrivateRoute from "@/Routes/PrivateRoute";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Digital Dokan",
  description: "This website is e-commerce website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/image/logo.jpeg"></link>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <MuiConfig>
            <PrivateRoute>{children}</PrivateRoute>
            <Toaster />
          </MuiConfig>
        </AuthProvider>
      </body>
    </html>
  );
}
