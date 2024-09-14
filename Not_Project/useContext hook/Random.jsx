import { useContext, createContext, useState } from "react";

import { Randomprovider, PostContext, useMyContext } from "./RandomProvider";
import "./../style.css";

export default function Random() {
  // const x = useMyContext();    throws error if used outside the scope. As this hook provides value to child components only(header and footer)
  // console.log(x);
  return (
    <div className="random">
      <Randomprovider>
        <Header />
        <Footer />
      </Randomprovider>
    </div>
  );
}

function Header() {
  // const { addCount, setAddCount } = useContext(PostContext);   //without using custom hook
  const { addCount, setAddCount } = useMyContext(); //using custom hook

  console.log(useMyContext);

  return (
    <div>
      <h1>This is the header</h1>
      <button onClick={() => setAddCount(addCount + 1)}>
        Count Add: {addCount}
      </button>
    </div>
  );
}

function Footer() {
  const { subCount, setSubCount } = useMyContext();

  return (
    <footer>
      <h1>This is the Footer</h1>
      <button onClick={() => setSubCount(subCount - 1)}>
        Count Sub: {subCount}
      </button>
    </footer>
  );
}

