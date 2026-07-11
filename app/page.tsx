import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Staff from "@/components/Staff";
import Contact from "@/components/Contacts";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";

export default function Home() {
  return (
   <>
      <Navbar />
      <Cart />
      <Hero />
      <About />
      <Products />
      <Services />
      <Staff />
      <Contact />
      <Footer />
   </>
  );
}
