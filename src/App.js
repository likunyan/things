import "./styles/App.css";

import React from "react";
import { Route, Routes } from "react-router-dom";

import Bottom from "./Bottom";
import Photo from "./Photo";
import Tag from "./Tag";
import Thing from "./Thing";
import ThingCreate from "./ThingCreate";

function App() {
  const changeVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  React.useEffect(() => {
    changeVh();

    window.addEventListener("resize", () => {
      changeVh();
    });

    return () => {
      window.removeEventListener("resize", changeVh, false);
    };
  }, []);

  return (
    <div className="app">
      <div className="body">
        <Routes>
          <Route path="/" element={<Thing />} />
          <Route path="/things/create" element={<ThingCreate />} />
          <Route path="/tags" element={<Tag />} />
          <Route path="/photos" element={<Photo />} />
        </Routes>
      </div>
      <div className="bottom">
        <Bottom />
      </div>
    </div>
  );
}

export default App;
