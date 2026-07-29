import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { FaExclamation } from "react-icons/fa";

const ServicesCartes = () => {
  const {t} =useTranslation();
  const cartes = t("services.cartes", {returnObjects: true});
  const carteVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { y: -6 },
  };

  const barreVariants = {
    hidden: { width: "0%" },
    show: { width: "0" },
    hover: { width: "100%" },
  };
  return (
    <div className="flex flex-col items-center">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 mt-12"
      >
        {cartes.map((s, i) => (
          <motion.div

            key={i}
            variants={carteVariants}
            initial="hidden"
            whileInView="show"
            whileHover="hover"
            viewport={{ once: true, amount: 0.3 }}

            className="border border-or/40 rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow gap-8"
          >
            <div className="flex justify-between items-center">
              <p className="flex items-center justify-center p-2 rounded-full bg-noir text-ivoire w-12 h-12">
                0{i+1}
              </p>
              <h3 className="font-semibold text-[0.625rem] bg-rouge/20 text-rouge p-1 rounded-full">{s.pertes}</h3>
            </div>
            <p className="font-bold text-lg text-noir mt-3">{s.titre}</p>
            <p>{s.texte}</p>
            <div className="w-full h-1 bg-noir/10 rounded-full mt-4">
              <motion.div
                variants={barreVariants}
                className="h-full w-full bg-rouge rounded-full"
              >

              </motion.div>
            </div>
          </motion.div>
        ))}

      </div>
      <div className="w-full max-w-6xl mx-auto px-4 mt-10">
        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-5 md:gap-8 px-6 md:px-8 py-4 bg-noir text-ivoire rounded-3xl">
          <span className="bg-rouge w-9 h-9 rounded-full flex justify-center items-center shrink-0">
            <FaExclamation />
          </span>
          <p className="text-sm md:text-base flex-1">
            {t("services.solution")}
          </p>
          <a href="#offres" className="bg-ivoire px-5 py-2 rounded-full hover:bg-rouge transition duration-300 text-noir hover:text-ivoire font-bold shrink-0 whitespace-nowrap">
            {t("services.cta")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServicesCartes;


