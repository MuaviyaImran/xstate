function ProductCard({ product }) {
    const trimString = (originalString)=>{
      return  originalString.length > 20
  ? originalString.substring(0, 15) + "..."
  : originalString;
    }
  return (
    <div className="border rounded-lg shadow border-gray-700">
        <div className="flex justify-center">

      <img
        className="rounded-t-lg bg-primary-fontC h-[200px] p-2 w-[200px]"
        src={product.image}
        alt={product.title + " branding picture."}
        ></img>
        </div>

      <div className="p-3 text-xs">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-primary-fontC">
          {trimString(product.title)}
        </h5>
        <p className="font-normal text-gray-500">
          <span className="text-black font-bold">Category: </span>
          <span>{product.category}</span>
        </p>
        <p className="mb- font-normal text-gray-500 ">
          <span className="text-black font-bold">Price: </span>
          <span>{product.price}</span>
        </p>
        
       
      </div>
    </div>
  );
}
export default ProductCard;
