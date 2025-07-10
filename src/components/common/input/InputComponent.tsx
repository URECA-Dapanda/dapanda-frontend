"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@lib/utils";
import { useMemo } from "react";

type InputRadius = "lg" | "md"| "sm" | number;

interface InputComponentProps {
    color:string;
    radius: InputRadius;
    size: "sm" | "md" | "lg";
    className: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}



export default function InputComponent({color, radius, size, className, placeholder, value, onChange}:Partial<InputComponentProps>) {
    const inputRadius = useMemo(()=>{
        switch(radius) {
            case "lg":
                return "rounded-[12px]";
            case "md":
                return "rounded-[10px]";
            case "sm":
                return "rounded-[8px]";
            default:
                return `rounded-[${radius}px]`;
        }
    }, [radius]);
    const inputSize = useMemo(()=>{
        switch(size) {
            case "sm":
                return "h-[17px]";
            case "md":
                return "h-[48px]";
            case "lg":
                return "h-[105px]";
        }
    }, [size]);
    return (<Input className={cn(className, inputRadius, inputSize, color)} placeholder={placeholder} value={value} onChange={onChange} />);
}