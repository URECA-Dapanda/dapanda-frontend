import { PropsWithChildren } from "react";
import { Card } from "../ui/card";

type CardVariant = "material" | "flat" | "outlined";
type CardSize = "large" | "medium" | "small" | number;

interface CardComponentProps {
    variant: CardVariant;
    size: CardSize;
}

export default function CardComponent({variant, size}:PropsWithChildren<CardComponentProps>) {


    return (
        <Card className="bg-gradient-to-r from-green-400 to-blue-400 text-white">
 
        </Card>
    )
}