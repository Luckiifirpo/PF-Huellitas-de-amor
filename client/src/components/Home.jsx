import React from "react";
import imageHome from "../assets/image/image_home.png"

export default function Home(){
    return(
        <div>
            <div>
                <img src={imageHome} alt="imageFromHome" />
            </div>
            <div>
                <h1>ME QUIERES ADOPTAR?</h1>
            </div>

        </div>
    )
}