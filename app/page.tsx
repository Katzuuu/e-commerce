import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import Featured from "./components/Featured";
import NewProducts from "./components/NewProducts";

async function getData() {
  const featuredProductId = "6490a509028d52aa90f5e373";
  try {
    await mongooseConnect();
    const featuredProduct = await Product.findById(featuredProductId);
    const newProducts = await Product.find({}, null, {
      sort: { _id: -1 },
      limit: 4,
    });
    return JSON.stringify([featuredProduct, newProducts]);
  } catch (err) {
    console.log(err);
  }
}

export default async function Home() {
  const res = await getData();
  const data = await JSON.parse(res as string);
  return (
    <>
      {data && (
        <div>
          <Featured data={data[0]} />
          <NewProducts data={data[1]} />
        </div>
      )}
    </>
  );
}
