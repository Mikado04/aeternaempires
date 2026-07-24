import Footer from "../components/Footer";
import Header from "../components/Header";
import { GoDotFill } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import image1 from "../assets/affiches/image1.jpg";
import image2 from "../assets/affiches/image2.jpg";
import image3 from "../assets/affiches/image3.png";
import image4 from "../assets/affiches/image4.png";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Services from "../components/Services";
import Offres from "../components/Offres";
import {useTranslation, Trans } from "react-i18next";
import { span } from "motion/react-client";
import { CardSmall } from "@/hooks/CardSmall";

const affiche = [
  {
    id: 1,
    image: image1,
    label: "Affiche 1",
  },
  {
    id: 2,
    image: image2,
    label: "Affiche 2",
  },
  {
    id: 3,
    image: image3,
    label: "Affiche 3",
  },
  {
    id: 4,
    image: image4,
    label: "Affiche 4",
  },
];

function Home() {
  const {t} = useTranslation();
  return (
    <div>
      <Header />

      <section
        className="flex flex-col md:flex-row mt-24 md:mt-32 justify-around items-center md:items-start px-4 md:px-0 gap-12 md:gap-0 "
        id="accueil"
      >
        <div className="mt-8 text-center md:text-left max-w-xl ">
          <p className="bg-noir text-ivoire rounded-2xl text-sm md:text-xl inline-flex items-center justify-center p-2">
            <span className="text-rouge">
              <GoDotFill />
            </span>{" "}
            <Trans i18nKey="hero.badge"/>
          </p>

          <h1 className="font-black text-4xl sm:text-5xl md:text-6xl mt-8 ">
            <Trans i18nKey="hero.titre"
              components={{ red: <span className="text-rouge" />, br: <br /> }}
            />
              
            
          </h1>

          <p className="mt-8 text-noir/50 text-base md:text-2xl">
            <Trans i18nKey="hero.texte_first"/>
          </p>

          <h2 className="font-semibold text-xl md:text-2xl mt-8">
            <Trans i18nKey="hero.texte_second" />
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <a
              href="#"
              className="bg-rouge text-ivoire rounded-4xl p-2 flex items-center w-fit hover:bg-red-800 transition duration-300"
            >
              <Trans i18nKey="hero.cta_whatsapp"/>
              <span className="bg-ivoire/30 rounded-4xl p-2 ml-4 font-semibold">
                <GoArrowRight />
              </span>
            </a>
            <a
              href="#"
              className="border-2 rounded-4xl border-noir/50 p-2 font-semibold hover:bg-noir hover:text-ivoire transition duration-300"
            >
              <Trans i18nKey="hero.cta_offres"/>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-6">
            <div className="flex">
              <p className="bg-noir w-8 h-8 rounded-full flex justify-center items-center text-ivoire">
                A
              </p>
              <p className="bg-rouge w-8 h-8 rounded-full flex justify-center items-center text-ivoire border-2 border-ivoire relative right-2">
                E
              </p>
              <p className="border w-8 h-8 rounded-full flex justify-center items-center border-noir/20 font-semibold text-noir/30 relative right-4 bg-ivoire">
                +9
              </p>
            </div>
            <p className="font-semibold text-noir/40 text-sm md:text-base">
              <Trans i18nKey="hero.texte_fin"/>
            </p>
          </div>
        </div>

        {/* Stack d'affiches + stats — masqué en dessous de md */}
        <div className="hidden md:block relative shadow-md p-12 rounded-2xl h-fit border border-or/40">
          <AfficheStack />
          <div className="flex gap-4 mt-8">
            <p className="shadow-lg w-32 p-4 rounded-2xl font-bold">
              <span className="text-noir/40">CONVERSION</span> <br />
              +178%
            </p>
            <p className="bg-noir p-4 rounded-2xl font-bold text-ivoire w-32">
              <span className="text-ivoire/40">DELAI</span> <br />
              +178%
            </p>
            <p className="bg-rouge p-4 rounded-2xl font-bold text-ivoire w-32">
              <span className="text-ivoire/40">EMPIRES</span> <br />
              +178%
            </p>
          </div>
        </div>

        {/* Stats seules, visibles en mobile à défaut du stack */}
        <div className="flex md:hidden gap-3 w-full max-w-md overflow-x-auto px-1">
          <p className="bg-white shadow-md w-28 shrink-0 p-3 rounded-2xl font-bold text-sm">
            <span className="text-noir/40 text-xs">CONVERSION</span> <br />
            +178%
          </p>
          <p className="bg-noir p-3 rounded-2xl font-bold text-ivoire w-28 shrink-0 text-sm">
            <span className="text-ivoire/40 text-xs">DELAI</span> <br />
            +178%
          </p>
          <p className="bg-rouge p-3 rounded-2xl font-bold text-ivoire w-28 shrink-0 text-sm">
            <span className="text-ivoire/40 text-xs">EMPIRES</span> <br />
            +178%
          </p>
        </div>
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

      <section></section>

      <section id="realisations" className="mt-52">
        <p>REALISATION</p>
      </section>

      <section></section>

      <section id="contact" className="mt-52">
        <p>CONTACT</p>
      </section>

      <Footer />
    </div>
  );
}

const positions = [
  { top: "0px", left: "0px", rotate: -6, z: 10 },
  { top: "48px", left: "96px", rotate: 3, z: 20 },
  { top: "96px", left: "48px", rotate: -2, z: 0 },
];

const AfficheStack = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const visibleAffiches = affiche.slice(0, 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % visibleAffiches.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [visibleAffiches.length]);

  return (
    <>
      <div className="relative w-full max-w-md h-125 hidden md:block">
        {visibleAffiches.map((item, index) => {
          // décalage circulaire par rapport à l'index courant
          const offset =
            (index - current + visibleAffiches.length) % visibleAffiches.length;
          const pos = positions[offset];

          return (
            <motion.img
              key={item.id}
              src={item.image}
              alt={item.label}
              layout
              onClick={() => setSelected(item)}
              animate={{
                top: pos.top,
                left: pos.left,
                rotate: pos.rotate,
                zIndex: pos.z,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              className="absolute rounded-2xl shadow-2xl object-cover w-72 h-96 cursor-pointer"
            />
          );
        })}
      </div>

      {/* Modale plein écran */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-100 bg-noir/80 backdrop-blur-sm flex items-center justify-center p-8 cursor-zoom-out"
          >
            <motion.img
              layoutId={`affiche-${selected.id}`}
              src={selected.image}
              alt={selected.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
