import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/main/MainLayout";
import Home from "./pages/home/Home";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
