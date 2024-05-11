import React from "react";
import { Link } from "react-router-dom";
import BoxPanel from "./BoxPanel";

export default function ControlBox() {
    return (
        <div>
           <BoxPanel routerLink ="/generate">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, eius?
           </BoxPanel>
           
        </div>
    )
}