import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/navigation/Navbar";
import HeroSection from "@/components/Hero";
import Category from "@/components/Category";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromotionalSection from "@/components/PromoSection";
import CallToAction from "@/components/CallToAction";

export default function Home() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <Category />
            <FeaturedProducts />
            <PromotionalSection />
            <CallToAction />
            <Footer />
        </>
    );
}
