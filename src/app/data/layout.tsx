import SharedHeader from "@components/common/header/SharedHeader";
import { ReactNode } from "react";



export default function DataLayout({children}:{children:ReactNode}) {

    return (
        <div className="relative h-[100dvh] w-full bg-primary2">
            <SharedHeader/>
            {children}
        </div>
    )
}