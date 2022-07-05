import "./styles/App.css";

import React from "react";
import { Route, Routes } from "react-router-dom";

import Bottom from "./Bottom";
import Photo from "./Photo";
import Tag from "./Tag";
import Thing from "./Thing";
import ThingCreate from "./ThingCreate";

function App() {
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
