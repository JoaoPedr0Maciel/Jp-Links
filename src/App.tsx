import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Admin } from "./Pages/Admin/Admin";
import { Private } from "./routes/Private";

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <Private>
                <Admin />
              </Private>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
