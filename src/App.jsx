import NavBar from "./components/NavBar";
import Home from "./components/Home";
import "./App.css";
// import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";

function App() {
  const [search, setSearch] = useState("a");

  const searchFromNav = (word) => {
    setSearch(word);
  };

  return (
    <div className="App">
      <NavBar searchFromNav={searchFromNav} />
      <Routes>
        <Route path={"/"} element={<Home search={search} />}></Route>
        <Route path="/popular" element={<Home menu={"popular"} />}></Route>
        <Route
          path="/nowPlaying"
          element={<Home menu={"nowPlaying"} />}
        ></Route>
        <Route path="/topRated" element={<Home menu={"topRated"} />}></Route>
        <Route path="/upcoming" element={<Home menu={"upcoming"} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
