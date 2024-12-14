/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Products from "@/components/Products";
import Footer from "@/components/Footer/Footer";
import Category from "@/components/Category";
export default function Home() {
  return (
    <>
      <Category />
      <Products />
      <Footer />
    </>
  );
}
