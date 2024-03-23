import { AdNamespace } from "@/types/ad"




export type AdPAge = {
    ad: AdNamespace.IAd
}
export default function AdPage({ad}: AdPAge) {

    return (
        <div>
            <h1>{ad.title}</h1>
            <p>{ad.description}</p>
        </div>
    )

}