import { Benefits } from "@/components/benefits";
import { Brands } from "@/components/brands";
import { DirectContact } from "@/components/direct-contact";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { VisitTracker } from "@/components/visit-tracker";

const Home = () => (
  <>
    <VisitTracker />
    <Hero />
    <main>
      <Benefits />
      <Brands />
      <HowItWorks />
      <DirectContact />
      <Faq />
      <FinalCta />
    </main>
    <Footer />
  </>
);

export default Home;
