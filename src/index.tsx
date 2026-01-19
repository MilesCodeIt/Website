/* @refresh reload */
import { render } from "solid-js/web";
import LandingPage from "./pages/landing";
import "./assets/fonts/departure-mono/index.css";
import "./assets/fonts/YUMEXHA/index.css";
import "@fontsource/noto-sans-jp/900.css";
import "uno.css";

const root = document.getElementById("root");

render(() => {
  return <LandingPage />;
}, root!);
