import { Poppins } from "next/font/google";
import { data } from "@/types/data";
import ProductBox from "../components/ProductBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import ProductsAnim from "../components/ProductsAnim";
import { productShow } from "@/lib/animations";
import AnimatedHeader from "../components/AnimatedHeader";

const poppins = Poppins({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

async function getAllProducts() {
  try {
    await mongooseConnect();
    const allProducts = await Product.find();
    return JSON.stringify(allProducts);
  } catch (err) {
    console.log(err);
  }
}

const AllProducts = async () => {
  const data = await getAllProducts();
  const products = await JSON.parse(data as string);
  return (
    <div className="padding py-[30px]">
      <ProductsAnim />
      <div className="overflow-hidden">
        <AnimatedHeader font={poppins.className} />
      </div>
      <div className="productsGrid 2xl:grid-cols-5 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products.length > 0 &&
          products.map((product: data) => (
            <ProductBox
              key={product._id}
              parentAnimation={productShow}
              product={product}
            />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
