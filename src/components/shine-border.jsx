import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

/* ============================= */
/* ShineBorder (Reusable Wrapper) */
/* ============================= */

const ShineBorder = ({
    children,
    className,
    borderWidth = 2,
    duration = 3,
    gradient = "from-blue-500 via-red-500 to-teal-400",
}) => {
    return (
        <div className={cn("relative rounded-2xl h-full", className)} style={{ padding: borderWidth }}>
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div
                    className={cn("absolute -inset-full blur-sm animate-spin bg-conic", gradient)}
                    style={{ animationDuration: `${duration}s` }}
                />
            </div>
            <div className="relative rounded-2xl bg-card h-full">{children}</div>
        </div>
    );
};

/* ============================= */
/* Pricing Card */
/* ============================= */

const PricingCard = ({ plan_name, plan_descp, plan_price, plan_feature, highlighted }) => {
    return (
        <Card className="relative h-full flex flex-col rounded-2xl p-8 gap-8 border-0 ring-0">
            <CardHeader className="p-0">
                <div className="flex flex-col gap-3 self-stretch">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-medium text-primary">{plan_name}</CardTitle>
                        {highlighted && (
                            <Badge className="py-1 px-3 text-sm font-medium leading-5 w-fit h-7 flex items-center gap-1.5 [&>svg]:size-4!">
                                <Flame size={16} /> Recommandé
                            </Badge>
                        )}
                    </div>
                    <CardDescription className="text-base font-normal max-w-2xl">{plan_descp}</CardDescription>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col flex-1 gap-8 p-0">
                <div className="flex items-baseline gap-1">
                    <span className="text-foreground text-4xl sm:text-5xl font-medium">${plan_price}</span>
                    <span className="text-muted-foreground text-base font-normal">/mois</span>
                </div>

                <Separator />

                <ul className="flex flex-col gap-4 flex-1">
                    {plan_feature.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-base font-normal text-muted-foreground">
                            <Check className="size-4 text-primary shrink-0" />
                            {feature}
                        </li>
                    ))}
                </ul>

                <Button className="w-full h-12">Commencer</Button>
            </CardContent>
        </Card>
    );
};

/* ============================= */
/* Demo — 3 cartes alignées */
/* ============================= */


export default function ShineBorderDemo() {

    const { t, ready } = useTranslation();
    if(!ready) return null;
    const data = t("offres.cartes", { returnObjects: true });
    const pricingPlans = Array.isArray(data) ? data : [];


    return (
        <div className="p-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch justify-center max-w-6xl mx-auto">
            {pricingPlans.map((plan, idx) => (
                <ShineBorder
                    key={idx}
                    borderWidth={2}
                    duration={4}
                    gradient="from-blue-500 via-red-500 to-teal-400"
                    className="w-full"
                >
                    <PricingCard {...plan} />
                </ShineBorder>
            ))}
        </div>
    );
}