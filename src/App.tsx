import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/main/MainLayout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import NotFound from "./pages/notFound/NotFound";

import FRONT_ROUTES from "./config/frontRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={FRONT_ROUTES.home} element={<Home />} />
          <Route path={FRONT_ROUTES.login} element={<Login />} />
          <Route path={FRONT_ROUTES.profile} element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
