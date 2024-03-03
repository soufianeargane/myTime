import React, { useState, useEffect } from "react";
import LayoutDesign from "../../components/admin/LayoutDesign";
import "../../assets/css/app.css";
import "../../assets/css/globals.css";
import SpinnerElement from "../../components/SpinnerElement";
import axiosInstance from "../../api/axiosInstance";

const STATUS = {
  pending: (
    <svg
      xmlns="../www.w3.org/2000/svg.html"
      className="ml-4 h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  active: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="ml-4 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          opacity="0.5"
          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          fill="#43af3c"
        ></path>{" "}
        <path
          d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
          fill="#43af3c"
        ></path>{" "}
      </g>
    </svg>
  ),
  blocked: (
    <svg
      xmlns="../www.w3.org/2000/svg.html"
      className="ml-4 h-5 w-5 text-error"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

const Requests: React.FC = () => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [isShowPopper, setIsShowPopper] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchStores() {
      try {
        const res = await axiosInstance.get("/stores");
        console.log(res);
        setStores(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStores();
  }, []);

  return (
    <div>
      {isLoading && <SpinnerElement />}
      <div>
        <LayoutDesign>
          <div className="px-1 sm:px-2 md:px-6">
            <div className="mt-4 sm:mt-5 lg:mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100">
                  Appointments
                </h2>
                <div className="flex">
                  <div className="flex items-center">
                    <label className="block">
                      <input
                        onFocus={() => setIsInputActive(true)}
                        onBlur={() => setIsInputActive(false)}
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
                        xmlns="http://www.w3.org/2000/svg"
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
                  <div className="inline-flex">
                    <button
                      onClick={() => setIsShowPopper(!isShowPopper)}
                      className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4.5 w-4.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                    {isShowPopper && (
                      <div className="popper-root">
                        <div className="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700">
                          <ul>
                            <li>
                              <a
                                href="#"
                                className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                              >
                                Action
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                              >
                                Another Action
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                              >
                                Something else
                              </a>
                            </li>
                          </ul>
                          <div className="my-1 h-px bg-slate-150 dark:bg-navy-500"></div>
                          <ul>
                            <li>
                              <a
                                href="#"
                                className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                              >
                                Separated Link
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <div className="is-scrollbar-hidden min-w-full overflow-x-auto">
                  <table className="is-hoverable w-full text-left">
                    <thead>
                      <tr>
                        <th className="whitespace-nowrap rounded-tl-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                          NAME OF STORE
                        </th>
                        <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                          NAME OF OWNER
                        </th>
                        <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                          ADRESS
                        </th>
                        <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                          PHONE
                        </th>
                        <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                          DATETIME
                        </th>
                        <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                          STATUS
                        </th>

                        <th className="whitespace-nowrap rounded-tr-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {stores.map((store: any) => (
                        <tr
                          key={store._id}
                          className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500"
                        >
                          <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                            <div className="flex items-center space-x-4">
                              <div className="avatar h-9 w-9">
                                <img
                                  className="rounded-full"
                                  src={store.image}
                                  alt="avatar"
                                />
                              </div>

                              <span className="font-medium text-slate-700 dark:text-navy-100">
                                {store.name}
                              </span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                            <span className="font-medium text-slate-700 dark:text-navy-100">
                              {store.owner.firstName} {store.owner.lastName}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                            <a
                              href="#"
                              className="hover:underline focus:underline"
                            >
                              {store.address}
                            </a>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-600 dark:text-navy-100 sm:px-5">
                            {store.phone}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-600 dark:text-navy-100 sm:px-5">
                            {new Date(store.createdAt).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                            {STATUS[store.status]}
                          </td>

                          <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                            <button
                              onClick={() => setIsShowPopper(!isShowPopper)}
                              className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                            >
                              <svg
                                xmlns="../www.w3.org/2000/svg.html"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                />
                              </svg>
                              {isShowPopper && (
                                <div className="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700">
                                  <ul>
                                    <li>
                                      <a
                                        href="#"
                                        className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                                      >
                                        Action
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                                      >
                                        Another Action
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                                      >
                                        Something else
                                      </a>
                                    </li>
                                  </ul>
                                  <div className="my-1 h-px bg-slate-150 dark:bg-navy-500"></div>
                                  <ul>
                                    <li>
                                      <a
                                        href="#"
                                        className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                                      >
                                        Separated Link
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </LayoutDesign>
      </div>
    </div>
  );
};

export default Requests;
