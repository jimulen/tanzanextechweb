import About from "@/components/About";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Contact from "@/components/Contacts";
import Footer from "@/components/Footer";
import Staff from "@/components/Staff";
import Cart from "@/components/Cart";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Products />
      <Staff />
      <Contact />
      <Footer />
      <Cart />
    </>
  );
}
