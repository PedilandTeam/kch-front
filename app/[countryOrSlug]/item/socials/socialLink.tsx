import { socials } from "@/types/socials."
import Image from "next/image"
import Link from "next/link"
import React from "react"
import FacebookIcon from "./facebook"
import InstagramIcon from "./instagram"
import LinkedinIcon from "./linkedin"
import YoutubeIcon from "./youtube"


export type socialLinkProps = {
    name: socials,
    link: string | null,
}
export default function SocialLink({ name, link }: socialLinkProps) {

    return (
        link  ?
            <a href={name == "instagram" ? `https://www.instagram.com/${link}` : name == "facebook" ? `https://www.youtube.com/${link}` : name == "telegram" ? `https://t.me/${link}` : ""} rel="norefrer" target="_blank" >
                {
                    name == "instagram" ? <InstagramIcon /> : name == "facebook" ? <FacebookIcon /> : name == "linkedin" ? <LinkedinIcon /> : name == "youtube" ? <YoutubeIcon/> : null
                }
            </a>
            : null
    )

}