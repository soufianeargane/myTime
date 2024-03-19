import { useState, useEffect } from "react";
import OwnerLayout from "../../components/owner/OwnerLayout";
import "../../assets/css/app.css";
import "../../assets/css/globals.css";
import SpinnerElement from "../../components/SpinnerElement";
import axiosInstance from "../../api/axiosInstance";
import AddProduct from "../../components/owner/AddProduct";

export default function OwProducts() {
  const [isInputActive, setIsInputActive] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(
          `/products?page=${currentPage}&pageSize=${pageSize}`
        );
        setProducts(res.data);
        // Calculate total entries
        const totalEntries = res.data.length;
        setTotalEntries(totalEntries);
        // Calculate total pages
        const totalPages = Math.ceil(totalEntries / pageSize);
        console.log("totalEntries", totalEntries);
        console.log("pageSize", pageSize);
        console.log("totalPages", totalPages);
        setTotalPages(totalPages + 1);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [currentPage, pageSize, loading]);

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.delete(`/products/${id}`);
      console.log(res.data);
      setLoading(!loading);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <OwnerLayout>
      <div>
        {isLoading && <SpinnerElement />}
        <div>
          <div className="px-1 sm:px-2 md:px-6 h-full">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100">
                Products
              </h2>
              <div className="flex">
                <div className="flex items-center">
                  <label className="block">
                    <input
                      className={`form-input bg-transparent px-1 text-right transition-all duration-100 placeholder:text-slate-500 dark:placeholder:text-navy-200 ${
                        isInputActive ? "w-32 lg:w-48" : "w-0"
                      }`}
                      placeholder="Search here..."
                      type="text"
                    />
                  </label>
                  <button
                    onClick={() => setIsInputActive(!isInputActive)}
                    className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                  >
                    <svg
                      className="h-4.5 w-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                >
                  <svg
                    xmlns="../www.w3.org/2000/svg.html"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <AddProduct
                    setOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                  />
                </button>
              </div>
            </div>
            <div className="card mt-3">
              <div className="is-scrollbar-hidden min-w-full overflow-x-auto">
                <table className="is-hoverable w-full text-left">
                  <thead>
                    <tr>
                      <th className="whitespace-nowrap text-center bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                        Name
                      </th>
                      <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                        Description
                      </th>
                      <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                        Category
                      </th>
                      <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                        Quantity
                      </th>
                      <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                        Price
                      </th>

                      <th className="whitespace-nowrap text-center rounded-tr-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product: any) => (
                      <tr
                        key={product._id}
                        className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500"
                      >
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <div className="flex items-center space-x-4">
                            <div className="avatar h-9 w-9">
                              <img
                                className="mask is-squircle"
                                src={product.image}
                                alt="product image"
                              />
                            </div>

                            <span className="font-medium text-slate-700 dark:text-navy-100">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <p className="w-48 overflow-hidden text-ellipsis text-xs+">
                            {product.description}
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <div className="badge bg-warning/10 text-warning dark:bg-warning/15">
                            {product.category.name}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <p className="text-sm+ font-medium text-slate-700 dark:text-navy-100">
                            {product.quantity}
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <p className="text-sm+ font-medium text-slate-700 dark:text-navy-100">
                            ${product.price}
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <div className="flex items-center space-x-2">
                            {/* Edit button */}
                            <button
                              className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                              onClick={() => handleEdit(product._id)}
                            >
                              <svg
                                xmlns="../www.w3.org/2000/svg.html"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 8v-2m0-4v-2m0-6V4a2 2 0 012-2h3a2 2 0 012 2v2a2 2 0 002 2v4a2 2 0 01-2 2h-6a2 2 0 01-2-2z"
                                />
                              </svg>
                            </button>
                            {/* Delete button */}
                            <button
                              className="btn h-8 w-8 rounded-full p-0 hover:bg-red-400 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                              onClick={() => handleDelete(product._id)}
                            >
                              <svg
                                xmlns="../www.w3.org/2000/svg.html"
                                className="h-5 w-5"
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
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* elements for pagination */}
              <div className="flex flex-col justify-between space-y-4 px-4 py-4 sm:flex-row sm:items-center sm:space-y-0 sm:px-5">
                <div className="flex items-center space-x-2 text-xs+">
                  <span>Show</span>
                  <label className="block">
                    <select
                      className="form-select rounded-full border border-slate-300 bg-white px-2 py-1 pr-6 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:bg-navy-700 dark:hover:border-navy-400 dark:focus:border-accent"
                      value={pageSize}
                      onChange={(e) => setPageSize(parseInt(e.target.value))}
                    >
                      <option>10</option>
                      <option>30</option>
                      <option>50</option>
                    </select>
                  </label>
                  <span>entries</span>
                </div>
                <div>
                  <span>
                    {currentPage} -{" "}
                    {Math.min(currentPage * pageSize, totalEntries)} of{" "}
                    {totalEntries} entries
                  </span>
                </div>

                <ol className="pagination">
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
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index}
                      className={`bg-slate-150 dark:bg-navy-500 ${
                        currentPage === index + 1 ? "bg-primary" : ""
                      }`}
                    >
                      <a
                        href="#"
                        className="flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-3 leading-tight transition-colors hover:bg-blue-300 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                        onClick={() => handlePageClick(index + 1)}
                      >
                        {index + 1}
                      </a>
                    </li>
                  ))}
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
                </ol>

                <div className="text-xs+">{`${
                  (currentPage - 1) * pageSize + 1
                } - ${Math.min(
                  currentPage * pageSize,
                  totalEntries
                )} of ${totalEntries} entries`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}
