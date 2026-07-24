import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import ShineBorderDemo from './shine-border';

const Ofrres = () => {

  const { t } = useTranslation();
  return (
    <section id="#offres" className='w-full bg-ivoire/60 p-6 md:p-8 mt-24 '>
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-4">
        <p className="text-rouge font-semibold text-lg md:text-2xl"><Trans i18nKey="offres.niveau_1" /></p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
          <Trans i18nKey="offres.niveau_2" />
        </h1>
        <p className="text-noir/50 text-base md:text-lg">
          <Trans i18nKey="offres.niveau_3" />

        </p>
      </div>

      <div className="flex justify-center items-center">
        <ShineBorderDemo />
      </div>
    </section>
  )
}

export default Ofrres
