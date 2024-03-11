import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import SpinnerElement from "../../components/SpinnerElement";
import Navbar from "../../components/client/Navbar";
import { Button } from "@nextui-org/react";
import ProductCard from "../../components/client/ProductCard";

export default function Products() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`products/store/${id}`);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, [id]);

  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      {isLoading && <SpinnerElement />}
      <div>
        <Navbar />
      </div>
      <div className=" flex flex-col sm:flex-row p-6">
        {/* filter */}
        <div className="w-1/4">
          <h3 className="text-lg font-bold text-gray-800 mb-4 font-serif">
            Filter
          </h3>
          <div className="pr-6 flex flex-col gap-3">
            <div>
              <label className=" font-semibold">Name</label>
              <input
                type="text"
                className="w-full border-2 border-gray-300 p-2 rounded-md outline-none focus:border-warning
                "
                style={{ color: "#867a6e" }}
                placeholder="Search for a store"
              />
            </div>
            <div>
              <label className=" font-semibold">Distance</label>
              <select
                defaultValue="Select distance"
                className="w-full border-2 border-gray-300 p-2 rounded-md outline-none focus:border-warning"
                style={{ color: "#867a6e" }}
              >
                {/* selected disabled option */}
                <option value="Select distance" disabled>
                  Select distance
                </option>
                <option>1km</option>
                <option>2km</option>
                <option>5km</option>
              </select>
            </div>
            <div>
              <Button
                className="w-full font-bold font-serif"
                radius="md"
                color="warning"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
        {/* books */}
        <div className="w-3/4 p-4">
          <div>
            <p className="font-extrabold text-3xl font-serif text-black">
              Here are the products of the store
            </p>
          </div>
          <div className="flex mt-6 flex-wrap">
            {products.map((product) => (
              <div
                key={product._id}
                className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
              >
                <ProductCard product={product} storeid={id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
