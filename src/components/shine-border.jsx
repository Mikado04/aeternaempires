import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { whatsappUrl } from "@/lib/whatsapp";

/* ============================= */
/* ShineBorder — cadre à bordure dégradée animée (aux couleurs de la marque) */
/* ============================= */
const ShineBorder = ({
  children,
  className,
  borderWidth = 2,
  duration = 5,
  gradient = "from-rouge via-or to-rouge",
}) => {
  return (
    <div
      className={cn("relative rounded-3xl h-full", className)}
      style={{ padding: borderWidth }}
    >
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div
          className={cn("absolute -inset-full blur-sm animate-spin bg-conic", gradient)}
          style={{ animationDuration: `${duration}s` }}
        />
      </div>
      <div className="relative h-full rounded-3xl">{children}</div>
    </div>
  );
};

/* ============================= */
/* Config NON-traduisible, par position de carte (mise en avant + style CTA) */
/* Le texte vit dans les JSON i18n ; la config visuelle vit ici.             */
/* ============================= */
const PLAN_CONFIG = [
  { highlighted: false, strikeTop: true, cta: "outline" }, // START
  { highlighted: true, strikeTop: true, cta: "red" }, // GROWTH
  { highlighted: false, strikeTop: false, cta: "dark" }, // EMPIRE
];

/* ============================= */
/* Carte tarifaire */
/* ============================= */
const PricingCard = ({
  label,
  name,
  price_top,
  price,
  price_extra,
  tag,
  descp,
  features = [],
  cta,
  note,
  ribbon,
  highlighted,
  strikeTop,
  ctaStyle,
  ctaHref,
}) => {
  // Palette selon carte claire (START/EMPIRE) ou carte sombre mise en avant (GROWTH)
  const base = highlighted ? "bg-noir text-ivoire" : "bg-white text-noir";
  const muted = highlighted ? "text-ivoire/60" : "text-noir/50";
  const tagCls = highlighted ? "bg-ivoire/10 text-ivoire" : "bg-noir/5 text-noir/70";
  const checkCls = highlighted ? "bg-rouge text-ivoire" : "bg-noir/10 text-noir";

  const ctaCls = {
    outline: "border-2 border-noir/20 text-noir hover:bg-noir hover:text-ivoire",
    red: "bg-rouge text-ivoire hover:bg-red-800",
    dark: "bg-noir text-ivoire hover:bg-anthracite",
  }[ctaStyle];

  return (
    <div
      className={cn(
        "relative h-full flex flex-col rounded-3xl p-6 sm:p-8",
        base,
        highlighted && "shadow-2xl shadow-rouge/20"
      )}
    >
      {/* Ruban (carte vedette) */}
      {ribbon && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-rouge text-ivoire text-[0.7rem] font-bold px-4 py-1 rounded-full shadow-lg">
          {ribbon}
        </span>
      )}

      {/* En-tête : label + nom / prix */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={cn("text-xs font-semibold tracking-wider", muted)}>{label}</p>
          <h3 className="text-3xl font-black mt-1">{name}</h3>
        </div>
        <div className="text-right shrink-0">
          {price_top && (
            <p className={cn("text-sm", muted, strikeTop && "line-through")}>{price_top}</p>
          )}
          <p className="text-xl font-black leading-none mt-0.5">{price}</p>
          {price_extra && (
            <p className="text-xs text-rouge font-semibold mt-0.5">{price_extra}</p>
          )}
        </div>
      </div>

      {/* Tag */}
      {tag && (
        <p className={cn("mt-5 text-xs font-bold tracking-wide rounded-lg px-3 py-2", tagCls)}>
          {tag}
        </p>
      )}

      {/* Description */}
      <p className={cn("mt-4 text-sm", muted)}>{descp}</p>

      {/* Features — flex-1 pousse le CTA en bas */}
      <ul className="mt-6 flex flex-col gap-3 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <span
              className={cn(
                "mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                checkCls
              )}
            >
              <Check className="w-3 h-3" />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA + note */}
      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "mt-8 w-full rounded-full py-3 font-bold text-sm transition duration-300 flex items-center justify-center",
          ctaCls
        )}
      >
        {cta}
      </a>
      {note && <p className={cn("mt-3 text-xs text-center", muted)}>{note}</p>}
    </div>
  );
};

/* ============================= */
/* Grille des 3 offres */
/* ============================= */
export default function ShineBorderDemo() {
  const { t, ready } = useTranslation();
  if (!ready) return null;

  const data = t("offres.cartes", { returnObjects: true });
  const plans = Array.isArray(data) ? data : [];

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 lg:gap-6 items-stretch px-4">
      {plans.map((plan, i) => {
        const cfg = PLAN_CONFIG[i] ?? PLAN_CONFIG[0];
        const card = (
          <PricingCard
            {...plan}
            highlighted={cfg.highlighted}
            strikeTop={cfg.strikeTop}
            ctaStyle={cfg.cta}
            ctaHref={whatsappUrl(t("offres.wa_message", { plan: plan.name }))}
          />
        );

        // Carte vedette : cadre ShineBorder + léger zoom sur desktop
        return cfg.highlighted ? (
          <ShineBorder key={i} className="md:-mt-4 md:mb-4 md:scale-105 z-10">
            {card}
          </ShineBorder>
        ) : (
          <div key={i} className="h-full rounded-3xl border border-noir/10">
            {card}
          </div>
        );
      })}
    </div>
  );
}
