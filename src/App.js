import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductPage from "./pages/ProductPage";
import DetailPage from "./pages/DetailPage";
import RootLayout from "./component/App/rootLayout";

import RequireAuth from "./component/App/requestAuth";
import RequirePage from "./component/App/requestPage";
import AuthLayout from "./component/layout/AuthLayout";
import Error from "./pages/Error/404";
import i18next from "i18next";
import localStorageService from "./services/localStoreService";

function App() {
  useEffect(() => {
    const lang = JSON.parse(localStorageService.get("lang")) || "EN";
    i18next.changeLanguage(lang);
    console.log(lang);
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <RootLayout />
              </RequireAuth>
            }
          >
            <Route path="product-page" element={<ProductPage />} />
            <Route path="detail-page/:productID" element={<DetailPage />} />
          </Route>
          <Route
            path="/"
            element={
              <RequirePage>
                <AuthLayout />
              </RequirePage>
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
