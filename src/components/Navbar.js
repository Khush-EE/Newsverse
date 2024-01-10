import React from "react";
import "../stylesheets/Navbar.css"
import { NavLink , useNavigate , Link } from "react-router-dom";
import { useContext } from "react";
import ParamContext from "../contexts/ParamContext";
import { useState } from "react";

const handleHover = ({isActive}) => {
    return isActive?"navActive": "";
}

export default function Navbar() {

    // const [color, setColor] = useState("");

    let navigate = useNavigate();

    let searchFunc = (e) => {
        setCategory(null);
        let search = document.getElementById("search");
        let path = "/search/";
        if(search !== "") {
            path += search.value;
            setTimeout(() => {
                navigate(path, {relative: "path"})
             }, 1)
             navigate("")
        }
    }

    const { setCategory , setLang , search , setSearch } = useContext(ParamContext);

    const handleCategory = (category) => {
        setCategory(category);
        document.querySelector("#lang").classList.remove("active");
        document.querySelector("#category").classList.add("active");
    }

    const handleLang = (lang) => {
        setLang(lang);
        document.querySelector("#category").classList.remove("active");
        document.querySelector("#lang").classList.add("active");
    }

  return (
    <>
        <header>
            <h1>Newsverse</h1>
            <nav>
                <ul>
                    <li><NavLink to={"/"} onClick={(e) => {setCategory(null);
                    document.querySelector("#category").classList.remove("active");
                    document.querySelector("#lang").classList.add("active");}}
                    className={({ isActive }) => 
                        isActive?"active":""
                    }>Home</NavLink></li>
                    <li><NavLink to={"/about"} className={({ isActive }) => 
                        isActive?"active":""
                    } onChange={(e) => {
                        document.querySelector("#category").classList.remove("active");
                        document.querySelector("#lang").classList.add("active");
                        }}>About</NavLink></li>
                    <li>
                        <div className="dropdown">
                            <button className="dropbtn" id="category">
                                Categories
                            </button>
                            <div className="dropdown-content">
                                <NavLink onClick={() => {handleCategory("general")}} to={"/category/general"} className={handleHover}>General</NavLink>
                                <NavLink onClick={() => {handleCategory("sports")}} to={'/category/sports'} className={handleHover}>Sports</NavLink>
                                <NavLink onClick={() => {handleCategory("entertainment")}} to={'/category/entertainment'} className={handleHover}>Entertainment</NavLink>
                                <NavLink onClick={() => {handleCategory("technology")}} to={'/category/technology'} className={handleHover}>Technology</NavLink>
                                <NavLink onClick={() => {handleCategory("science")}} to={'/category/science'} className={handleHover}>Science</NavLink>
                                <NavLink onClick={() => {handleCategory("business")}} to={'/category/business'} className={handleHover}>Business</NavLink>
                                <NavLink onClick={() => {handleCategory("health")}} to={'/category/health'} className={handleHover}>Health</NavLink>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="dropdown">
                            <button className="dropbtn" id="lang">
                                Languages
                            </button>
                            <div className="dropdown-content">
                                <NavLink onClick={(e) => handleLang("en")} to={"/lang/english"} className={handleHover}>English</NavLink>
                                <NavLink onClick={(e) => handleLang("ar")} to={"/lang/arabic"} className={handleHover}>Arabic</NavLink>
                                <NavLink onClick={(e) => handleLang("fr")} to={"/lang/french"} className={handleHover}>French</NavLink>
                                <NavLink onClick={(e) => handleLang("es")} to={"/lang/spanish"}className={handleHover}>Spanish</NavLink>
                            </div>
                        </div>
                    </li>
                    <li>
                        {/* #131b25 */}
                        <div className="dropdown">
                            <button className="dropbtn">
                                Domains
                            </button>
                            <div className="dropdown-content">
                                <Link>All</Link>
                                <Link>Link1</Link>
                                <Link>Link2</Link>
                                <Link>Link3</Link>
                                <Link>Link4</Link>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
            <div className="searchbar">
                <input placeholder="Search Here" id="search" value={search} onChange={(e) => {setSearch(e.target.value)}}/>
                <button onClick={searchFunc}>Search</button>
            </div>
        </header>
    </>
  );
}
