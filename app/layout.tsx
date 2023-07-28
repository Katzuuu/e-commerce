import "./globals.css";
import Nav from "./components/Nav";
import CartContextProvider from "./components/CartContext";
import Provider from "./components/Provider";
import ScrollTop from "./components/ScrollTop";

export const metadata = {
  title: "e-commerce",
  description: "Developed by Katzu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ScrollTop />
      <body className="bg-[#eee] h-screen overflow-x-hidden">
        <CartContextProvider>
          <Provider>
            <Nav />
            {children}
          </Provider>
        </CartContextProvider>
      </body>
    </html>
  );
}
