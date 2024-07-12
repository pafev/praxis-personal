"use client"
import { CldImage, type CldImageProps } from "next-cloudinary"

export function CloudImage({...props}:CldImageProps){
    return <CldImage {...props} dpr={"auto"}/>
}