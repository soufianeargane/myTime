import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

export default function ProductCard({ product, storeid }) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({ storeId: storeid, product: product }));
  };
  return (
    <Card shadow="sm">
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt="orange"
          className="w-full object-cover h-[110px]"
          src={product.image}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{product.name}</b>
        <p className="text-default-500">{product.price} DHs</p>
      </CardFooter>
      <CardFooter
        onClick={handleAddToCart}
        className="text-small text-center  justify-center cursor-pointer hover:bg-slate-600 bg-slate-500 text-white"
      >
        Add to Cart
      </CardFooter>
    </Card>
  );
}
