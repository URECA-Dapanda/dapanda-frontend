import { ReactNode, Suspense } from "react";

export default function ChargeSuccessLayout({children}:{children:ReactNode}) {
    return (
        <Suspense>
            {children}
        </Suspense>
    )
}