import { Benefits } from "@/components/benefits";
import { Brands } from "@/components/brands";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";

const Home = () => (
  <>
    <Hero />
    <main>
      <Benefits />
      <Brands />
      <HowItWorks />
      <Faq />
      <FinalCta />
    </main>
    <Footer />
  </>
);

export default Home;
