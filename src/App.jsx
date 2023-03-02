import React from "react";
import { Routes,Route } from "react-router-dom";
import Contact from "./components/Contact";
import Create from "./components/Create";
import Edit from "./components/Edit";

const App = () => {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Contact></Contact>}>Contact</Route>
        <Route path="/create" element={<Create></Create>}></Route>
        <Route path="/edit/:id" element={<Edit></Edit>}></Route>
        <Route path="/:id"></Route>
      </Routes>
    </div>
  )
}

export default App