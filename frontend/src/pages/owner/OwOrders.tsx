import { useState, useEffect } from "react";
import OwnerLayout from "../../components/owner/OwnerLayout";
import SpinnerElement from "../../components/SpinnerElement";
import axiosInstance from "../../api/axiosInstance";
import ProductDetailsModal from "../../components/owner/ProductDetailsModal";
import { formatDate, formatTime } from "../../helpers/formDateTime";

import "../../assets/css/app.css";
import "../../assets/css/globals.css";

const STATUS = {
  accepted: (
    <div className="badge bg-success/10 text-success dark:bg-success/15">
      accepted
    </div>
  ),
  pending: (
    <div className="badge bg-primary/10 text-primary dark:bg-accent-light/15 dark:text-accent-light">
      pending
    </div>
  ),
  canceled: (
    <div className="badge bg-error/10 text-error dark:bg-error/15">
      cancelled
    </div>
  ),
};

const ITEMS_PER_PAGE = 10;

export default function OwOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // const [updatedOrders, setUpdatedOrders] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const result = await axiosInstance.get("/orders", {
          params: { page: currentPage, limit: ITEMS_PER_PAGE },
        });
        setOrders(result.data.orders);
        // setTotalPages(result.data.totalOrders);
        setTotalPages(Math.ceil(result.data.totalOrders / ITEMS_PER_PAGE));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [currentPage]);

  // const totalcount = Math.ceil(orders.length / ITEMS_PER_PAGE);

  const acceptOrder = async (orderId: string, stat: string) => {
    console.log("accepting order", orderId);
    try {
      setLoading(true);
      await axiosInstance.patch(`/orders/${orderId}`, {
        status: stat,
      });
      const updatedOrders = orders.map((order) => {
        if (order._id === orderId) {
          return { ...order, status: stat };
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <OwnerLayout>
      <div>
        {loading && <SpinnerElement />}
        <div>
          <ProductDetailsModal
            setOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            orderId={selectedOrder}
          />
          <div className="px-1 sm:px-2 md:px-6">
            <div className="card mt-3">
              <div className="is-scrollbar-hidden min-w-full overflow-x-auto">
                <table className="is-hoverable w-full text-left">
                  <thead>
                    <tr>
                      <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                        Date
                      </th>
                      <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                        Name
                      </th>
                      <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                        Order Status
                      </th>
                      <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                        Details
                      </th>
                      <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                        Total
                      </th>

                      <th className="whitespace-nowrap rounded-tr-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500"
                      >
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <p className="font-medium">
                            {formatDate(order.createdAt)}
                          </p>
                          <p className="mt-0.5 text-xs">
                            {formatTime(order.createdAt)}
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <div className="flex items-center space-x-4">
                            <span className="font-medium text-slate-700 dark:text-navy-100">
                              {order.client.firstName} {order.client.lastName}
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          {/* <div className="flex items-center space-x-2 text-xs+ font-medium text-black dark:text-accent-light"> */}
                          {STATUS[order.status]}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <div className="flex items-center space-x-2 text-xs+ font-medium text-black dark:text-accent-light">
                            <button
                              className="hover:underline focus:underline active:underline dark:hover:underline dark:focus:underline dark:active:underline bg-slate-100 px-6 py-3 rounded-3xl hover:bg-slate-400"
                              aria-label="See details"
                              onClick={() => {
                                setSelectedOrder(order._id);
                                setIsModalOpen(true);
                              }}
                            >
                              see details
                            </button>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <p className="text-sm+ font-medium text-slate-700 dark:text-navy-100">
                            {order.totalAmount.toFixed(2)} MAD
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 flex justify-center gap-3 sm:px-5">
                          {order.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  acceptOrder(order._id, "accepted")
                                }
                                className="btn h-8 w-8 rounded-full p-0 hover:bg-green-300 focus:bg-green-300 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                              >
                                {/* accept button */}
                                <svg
                                  xmlns="../www.w3.org/2000/svg.html"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() =>
                                  acceptOrder(order._id, "canceled")
                                }
                                className="btn h-8 w-8 rounded-full p-0 hover:bg-red-300 focus:bg-red-300 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                              >
                                <svg
                                  xmlns="../www.w3.org/2000/svg.html"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col justify-center space-y-4 px-4 py-4 sm:flex-row sm:items-center sm:space-y-0 sm:px-5">
                {/* <ol className="pagination">
                  <li className="rounded-l-lg bg-slate-150 dark:bg-navy-500">
                    <a
                      href="#"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-300 focus:bg-slate-300 active:bg-slate-300/80 dark:text-navy-200 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                    >
                      <svg
                        xmlns="../www.w3.org/2000/svg.html"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="bg-slate-150 dark:bg-navy-500">
                    <a
                      href="#"
                      className="flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-3 leading-tight transition-colors hover:bg-slate-300 focus:bg-slate-300 active:bg-slate-300/80 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                    >
                      1
                    </a>
                  </li>
                  <li className="bg-slate-150 dark:bg-navy-500">
                    <a
                      href="#"
                      className="flex h-8 min-w-[2rem] items-center justify-center rounded-lg bg-primary px-3 leading-tight text-white transition-colors hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                    >
                      2
                    </a>
                  </li>
                  <li className="bg-slate-150 dark:bg-navy-500">
                    <a
                      href="#"
                      className="flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-3 leading-tight transition-colors hover:bg-slate-300 focus:bg-slate-300 active:bg-slate-300/80 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                    >
                      3
                    </a>
                  </li>
                  <li className="bg-slate-150 dark:bg-navy-500">
                    <a
                      href="#"
                      className="flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-3 leading-tight transition-colors hover:bg-slate-300 focus:bg-slate-300 active:bg-slate-300/80 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                    >
                      4
                    </a>
                  </li>
                  <li className="bg-slate-150 dark:bg-navy-500">
                    <a
                      href="#"
                      className="flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-3 leading-tight transition-colors hover:bg-slate-300 focus:bg-slate-300 active:bg-slate-300/80 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                    >
                      5
                    </a>
                  </li>
                  <li className="rounded-r-lg bg-slate-150 dark:bg-navy-500">
                    <a
                      href="#"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-300 focus:bg-slate-300 active:bg-slate-300/80 dark:text-navy-200 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                    >
                      <svg
                        xmlns="../www.w3.org/2000/svg.html"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </li>
                </ol> */}
                <div className="flex justify-center mt-4 space-x-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className="px-3 py-2 rounded-lg bg-slate-150 dark:bg-navy-500 text-slate-500 dark:text-navy-200 hover:bg-slate-300 focus:bg-slate-300 active:bg-slate-300/80 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}
