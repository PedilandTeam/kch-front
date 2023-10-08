import React, { Suspense } from "react";
import Loading from "./_loading";

export default function UnitSlugLoading({children}: {children: React.ReactNode}){

    return (
        <Suspense fallback={<Loading/>}>
            {children}
        </Suspense>        
    )

}