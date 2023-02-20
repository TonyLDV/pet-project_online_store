import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import Banner from "./components/Banner";
import { Loader } from "./components/Loader";
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";

import "./MultiLang/i18n";

import "./App.scss";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Header />

      <Banner />

      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
