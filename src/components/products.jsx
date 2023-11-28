import React from "react";
import { useMachine } from "@xstate/react";
import productsMachine from "../machines/productmachine";
import ProductCard from "./productsCard";
const Products = () => {
  const [state, send] = useMachine(productsMachine);

  const handleFetchClick = () => {
    send("FETCH");
  };
  console.log(state);
  return (
    <div className="max-w-[1200px] mx-auto my-0 p-3">
      {state.matches("idle") && (
        <div className="h-screen items-center flex justify-center flex-col">
          <p className="text-3xl font-extrabold">XState</p>
          <button
            className="bg-slate-300 p-3 rounded-xl m-3"
            onClick={handleFetchClick}
          >
            Fetch Products
          </button>
        </div>
      )}
      {state.matches("loading") && <p>Loading...</p>}
      {state.matches("success") && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {state.context.data.map((item) => (
            <ProductCard product={item} />
          ))}
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
