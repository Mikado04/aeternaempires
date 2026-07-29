import Footer from "../components/Footer";
import Header from "../components/Header";
import { GoDotFill } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { motion } from "motion/react";
import Services from "../components/Services";
import Offres from "../components/Offres";
import Process from "../components/Process";
import Fondateur from "../components/Fondateur";
import Contact from "../components/Contact";
import WhatsAppFloat from "../components/WhatsAppFloat";
import {useTranslation, Trans } from "react-i18next";
import { span } from "motion/react-client";
import { CardSmall } from "@/hooks/CardSmall";
import Realisations from "@/components/Realisations";
import HeroParticles from "../components/ui/particle-effect-for-hero";
import HeroCard from "../components/HeroCard";
import { WHATSAPP_URL } from "../lib/whatsapp";

function Home() {
  const {t} = useTranslation();
  return (
    <div>
      <Header />

      <section
        className="relative bg-noir text-ivoire overflow-hidden flex flex-col md:flex-row pt-32 md:pt-40 pb-16 justify-around items-center md:items-center px-4 md:px-0 gap-12 md:gap-0 "
        id="accueil"
      >
        <HeroParticles />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 mt-8 text-center md:text-left max-w-xl "
        >
          <p className="bg-ivoire/10 border border-ivoire/15 text-ivoire rounded-2xl text-sm md:text-xl inline-flex items-center justify-center p-2">
            <span className="text-rouge">
              <GoDotFill />
            </span>{" "}
            <Trans i18nKey="hero.badge"/>
          </p>

          <h1 className="font-black text-ivoire text-4xl sm:text-5xl md:text-6xl mt-8 ">
            <Trans i18nKey="hero.titre"
              components={{ red: <span className="text-rouge" />, br: <br /> }}
            />
              
            
          </h1>

          <p className="mt-8 text-ivoire/60 text-base md:text-xl">
            <Trans i18nKey="hero.texte_first"/>
          </p>

          <h2 className="font-semibold text-ivoire text-xl md:text-2xl mt-8">
            <Trans i18nKey="hero.texte_second" />
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rouge text-ivoire rounded-4xl p-2 flex items-center w-fit hover:bg-red-800 transition duration-300"
            >
              <Trans i18nKey="hero.cta_whatsapp"/>
              <span className="bg-ivoire/30 rounded-4xl p-2 ml-4 font-semibold">
                <GoArrowRight />
              </span>
            </a>
            <a
              href="#offres"
              className="border-2 rounded-4xl border-ivoire/40 text-ivoire p-2 font-semibold hover:bg-ivoire hover:text-noir transition duration-300"
            >
              <Trans i18nKey="hero.cta_offres"/>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-6">
            <div className="flex">
              <p className="bg-anthracite border border-ivoire/20 w-8 h-8 rounded-full flex justify-center items-center text-ivoire">
                A
              </p>
              <p className="bg-rouge w-8 h-8 rounded-full flex justify-center items-center text-ivoire border-2 border-ivoire relative right-2">
                E
              </p>
              <p className="border w-8 h-8 rounded-full flex justify-center items-center border-ivoire/20 font-semibold text-ivoire/50 relative right-4 bg-anthracite">
                +9
              </p>
            </div>
            <p className="font-semibold text-ivoire/50 text-sm md:text-base">
              <Trans i18nKey="hero.texte_fin"/>
            </p>
          </div>
        </motion.div>

        {/* Carte de visite premium (remplace le carrousel d'affiches) */}
        <HeroCard />
      </section>

      <div className="w-full bg-ivoire/60 p-6 md:p-8 mt-24 flex justify-center">
        <div className="w-11/12 md:w-5/6 flex flex-col md:flex-row items-center md:justify-around gap-4 md:gap-6 font-semibold text-noir/60 text-center">
          <p className="font-light text-sm md:text-base shrink-0">
            <Trans i18nKey="hero.texte_bas"/>
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm md:text-base">
            <p className="shadow-lg p-1 rounded-full">ATELIER NOIR</p>
            <p className="shadow-lg p-1 rounded-full">MAISON LUXE</p>
            <p className="shadow-lg p-1 rounded-full">VECTA</p>
            <p className="shadow-lg p-1 rounded-full">ORION & CO</p>
            <p className="shadow-lg p-1 rounded-full">NOVA</p>
            <p className="shadow-lg p-1 rounded-full">EMPIRE CLUB</p>
          </div>
        </div>
      </div>

      <Services />

      <Offres />

      <Process />

      <section id="offr-rea" className="">
        <div className="flex ">
          <div>
            <h2></h2>
          </div>
          <div>

          </div>
        </div>
      </section>

      <Realisations />

      <Fondateur />

      <Contact />

      <Footer />

      <WhatsAppFloat />
    </div>
  );
}

export default Home;
