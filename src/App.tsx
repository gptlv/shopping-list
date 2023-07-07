import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";
import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [items, setItems] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(items));
  });

  return (
    <>
      <Header></Header>
      <Main items={items} setItems={setItems}></Main>
      <Footer items={items} />
    </>
  );
}
