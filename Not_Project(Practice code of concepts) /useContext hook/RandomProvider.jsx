import { useContext, createContext, useState } from "react";

const PostContext = createContext();

function Randomprovider({ children }) {
  const [addCount, setAddCount] = useState(0);
  const [subCount, setSubCount] = useState(0);

  return (
    <PostContext.Provider
      value={{
        addCount,
        setAddCount,
        subCount,
        setSubCount,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

//creating a custom hook, so that we dont have to use PostContext in another file continuously(which is quite annoying)
function useMyContext() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("Context hook was used outside of the scoped");
  return context;
}

export { Randomprovider, PostContext, useMyContext };
