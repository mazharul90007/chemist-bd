import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedMedicines from "@/components/home/FeaturedMedicines";
import HealthTips from "@/components/home/HealthTips";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <CategorySection />
      <FeaturedMedicines />
      <HealthTips />
      <Footer />
    </div>
  );
}
