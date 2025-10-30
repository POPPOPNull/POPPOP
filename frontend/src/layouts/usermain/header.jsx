import React from "react";
import "./header.css"
import SearchBar from "../userdetail/SearchBar";
import { NavLink } from "react-router-dom";

function Header(){
    return(
        <>
            <div className="header"/>
            <div className="logo"><NavLink to="/" style={{ color: "#FFCF0D", textDecoration: "none" }}>POPPOP</NavLink></div>
        </>
    )
}

export default Header;