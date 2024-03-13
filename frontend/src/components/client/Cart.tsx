import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  updateCartItemQuantity,
  removeItemFromCart,
} from "../../store/cartSlice";

import axiosInstance from "../../api/axiosInstance";
import SpinnerElement from "../SpinnerElement";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: {
    name: string;
  };
  orderQuantity: number;
  quantity: number;
}

interface RootState {
  cart: {
    [storeId: string]: CartItem[];
  };
}

function Cart({
  isOpen,
  setCartOpen,
}: {
  isOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
}) {
  const location = useLocation();
  const url = location.pathname;
  const parts = url.split("/");
  const identifier = parts[2];
  const cart = useSelector((state: RootState) => state.cart);
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (identifier) {
      console.log(cart[identifier]);
      setCartData(cart[identifier] || []); // Set cart data when identifier is present
    }
  }, [identifier, cart]);

  useEffect(() => {
    // Calculate total price whenever cartData changes
    let total = 0;
    cartData.forEach((item) => {
      total += item.price * item.orderQuantity;
    });
    setTotalPrice(total);
  }, [cartData]);

  const toggleCart = () => {
    setCartOpen(!isOpen);
  };

  const addQuantity = (item: CartItem) => {
    const updatedQuantity = item.orderQuantity + 1; // Increase quantity by 1
    if (updatedQuantity > item.quantity) {
      alert("You can't add more than available quantity");
      return;
    }
    dispatch(
      updateCartItemQuantity({
        storeId: identifier,
        productId: item._id,
        quantity: updatedQuantity,
      })
    );
  };

  const reduceQuantity = (item: CartItem) => {
    const updatedQuantity = item.orderQuantity - 1; // Decrease quantity by 1
    if (updatedQuantity < 1) {
      alert("You can't reduce quantity less than 1");
      return;
    }
    dispatch(
      updateCartItemQuantity({
        storeId: identifier,
        productId: item._id,
        quantity: updatedQuantity,
      })
    );
  };

  const removeItem = (item: CartItem) => {
    dispatch(
      removeItemFromCart({
        storeId: identifier,
        productId: item._id,
      })
    );
  };

  const makeOrder = async () => {
    if (cartData.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const order = {
      storeId: identifier,
      items: cartData,
      totalPrice,
    };

    try {
      setLoading(true);
      const result = await axiosInstance.post("/orders", order);
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("Error while making order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        zIndex: 100000000,
        overflow: "hidden",
      }}
      className={`fixed inset-y-0 right-0 z-50 h-screen w-screen p-4 shadow-lg bg-white transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {loading && <SpinnerElement />}
      <div
        className="absolute right-0 z-50 h-screen w-96 p-4 top-0 bg-gray-200 "
        style={{ opacity: 1, zIndex: 100000000, overflow: "hidden" }}
      >
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-500"
          onClick={toggleCart}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <div className="mt-4 h-full">
          {/* Your cart content goes here */}
          <div className="mt-8 flex flex-col justify-between h-full">
            <div
              style={{ overflowY: "scroll", scrollbarWidth: "none" }}
              className="flow-root h-full"
            >
              {cartData && (
                <ul
                  style={{ scrollbarWidth: "none" }}
                  role="list"
                  className="-my-6 divide-y divide-gray-200"
                >
                  {cartData.length === 0 ? (
                    <p>Your cart is empty.</p>
                  ) : (
                    cartData.map((item) => (
                      // Your list item JSX here
                      <li key={item._id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href="#">{item.name}</a>
                              </h3>
                              <p className="ml-4">{item.price} DHs</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.category.name}
                            </p>
                          </div>
                          <div className="flex flex-1 items-center justify-between text-sm">
                            <div className="flex">
                              <div
                                style={{
                                  width: "30px",
                                  height: "30px",
                                }}
                                className=" text-gray-600 border border-gray-500 flex justify-center items-center hover:bg-red-500 hover:cursor-pointer hover:text-white hover:border-black"
                                onClick={() => {
                                  addQuantity(item);
                                  console.log("add");
                                }}
                              >
                                +
                              </div>
                              <p
                                style={{
                                  width: "37.78px",
                                  height: "29.77px",
                                }}
                                className=" text-gray-600 border border-gray-500 flex justify-center items-center"
                              >
                                {item.orderQuantity}
                              </p>
                              <div
                                style={{
                                  width: "30px",
                                  height: "30px",
                                }}
                                className=" text-gray-600 border border-gray-500 flex justify-center items-center hover:bg-red-500 hover:cursor-pointer hover:text-white hover:border-black"
                                onClick={() => {
                                  reduceQuantity(item);
                                  console.log("reduce");
                                }}
                              >
                                -
                              </div>
                              <div
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  marginLeft: "10px",
                                }}
                                title="available quantity"
                                className=" text-gray-600 border border-gray-500 flex justify-center items-center bg-green-400  hover:bg-green-500 hover:cursor-pointer hover:text-white hover:border-black"
                              >
                                {item.quantity}
                              </div>
                            </div>

                            <div className="flex">
                              <button
                                onClick={() => removeItem(item)}
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>{totalPrice} DHs</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <a
                  href="#"
                  onClick={makeOrder}
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Make order
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
