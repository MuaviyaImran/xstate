import React from "react";
import { useMachine } from "@xstate/react";
import productsMachine from "../machines/productmachine";
import ProductCard from "./productsCard";
const Products = () => {
  const [state, send] = useMachine(productsMachine);

  const handleClick = () => {
    send("FETCH");
  };

  return (
    <div className="max-w-[1200px] mx-auto my-0">
      <button className="bg-slate-300 p-3 rounded-xl m-3" onClick={handleClick}>Fetch Products</button>
      {state.matches("loading") && <p>Loading...</p>}
      {state.matches("success") && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {state.context.data
        .map((item)=> <ProductCard product={item}/>
        )}
        </div>
        
     )}
      {state.matches("error") && (
        <div>
          <pre>{JSON.stringify(state.context.error, null, 2)}</pre>
          <button onClick={() => send("RETRY")}>Retry</button>
        </div>
      )}
    </div>
  );
};

export default Products;
