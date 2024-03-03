import React, { useState } from "react";
import LayoutDesign from "../../components/admin/LayoutDesign";
import "../../assets/css/app.css";
import "../../assets/css/globals.css";
import avatar from "../../assets/images/avatar/avatar-20.jpg";

const ECommerce: React.FC = () => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [isShowPopper, setIsShowPopper] = useState(false);

  return (
    <div>
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
                          NAME
                        </th>
                        <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                          LOCATION
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
                      <tr className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <div className="flex items-center space-x-4">
                            <div className="avatar h-9 w-9">
                              <img
                                className="rounded-full"
                                src="images/avatar/avatar-20.jpg"
                                alt="avatar"
                              />
                            </div>

                            <span className="font-medium text-slate-700 dark:text-navy-100">
                              Anthony Jensen
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <a
                            href="#"
                            className="hover:underline focus:underline"
                          >
                            London, Kliniken Clinic
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-600 dark:text-navy-100 sm:px-5">
                          Mon, 12 May - 09:00
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <svg
                            xmlns="../www.w3.org/2000/svg.html"
                            className="ml-4 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <button className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                            <svg
                              xmlns="../www.w3.org/2000/svg.html"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                      <tr className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <div className="flex items-center space-x-4">
                            <div className="avatar h-9 w-9">
                              <img
                                className="rounded-full"
                                src="images/avatar/avatar-19.jpg"
                                alt="avatar"
                              />
                            </div>

                            <span className="font-medium text-slate-700 dark:text-navy-100">
                              Konnor Guzman
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <a
                            href="#"
                            className="hover:underline focus:underline"
                          >
                            Manchester, PLC Home Health
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-600 dark:text-navy-100 sm:px-5">
                          Tue, 17 June - 14:30
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <svg
                            xmlns="../www.w3.org/2000/svg.html"
                            className="ml-4 h-5 w-5 text-error"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <button className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                            <svg
                              xmlns="../www.w3.org/2000/svg.html"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                      <tr className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <div className="flex items-center space-x-4">
                            <div className="avatar h-9 w-9">
                              <img
                                className="rounded-full"
                                src="images/avatar/avatar-18.jpg"
                                alt="avatar"
                              />
                            </div>

                            <span className="font-medium text-slate-700 dark:text-navy-100">
                              Derrick Simmons
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <a
                            href="#"
                            className="hover:underline focus:underline"
                          >
                            Liverpool, Life flash Clinic
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-600 dark:text-navy-100 sm:px-5">
                          Wed, 29 May - 13:30
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <svg
                            xmlns="../www.w3.org/2000/svg.html"
                            className="ml-4 h-5 w-5 text-error"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <button className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                            <svg
                              xmlns="../www.w3.org/2000/svg.html"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>

                      <tr className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <div className="flex items-center space-x-4">
                            <div className="avatar h-9 w-9">
                              <img
                                className="rounded-full"
                                src="images/avatar/avatar-14.jpg"
                                alt="avatar"
                              />
                            </div>

                            <span className="font-medium text-slate-700 dark:text-navy-100">
                              Henry Curtis
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <a
                            href="#"
                            className="hover:underline focus:underline"
                          >
                            London, Kliniken Clinic
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-600 dark:text-navy-100 sm:px-5">
                          Mon, 22 June - 15:00
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <svg
                            xmlns="../www.w3.org/2000/svg.html"
                            className="ml-4 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <button className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                            <svg
                              xmlns="../www.w3.org/2000/svg.html"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                      <tr className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <div className="flex items-center space-x-4">
                            <div className="avatar h-9 w-9">
                              <img
                                className="rounded-full"
                                src="images/avatar/avatar-11.jpg"
                                alt="avatar"
                              />
                            </div>

                            <span className="font-medium text-slate-700 dark:text-navy-100">
                              Katrina West
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <a
                            href="#"
                            className="hover:underline focus:underline"
                          >
                            Manchester, PLC Home Health
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-600 dark:text-navy-100 sm:px-5">
                          Tue, 17 June - 14:30
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <svg
                            xmlns="../www.w3.org/2000/svg.html"
                            className="ml-4 h-5 w-5 text-error"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <button className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                            <svg
                              xmlns="../www.w3.org/2000/svg.html"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>

                      <tr className="border-y border-transparent">
                        <td className="whitespace-nowrap rounded-bl-lg px-4 py-3 sm:px-5">
                          <div className="flex items-center space-x-4">
                            <div className="avatar h-9 w-9">
                              <img
                                className="rounded-full"
                                src="images/avatar/avatar-5.jpg"
                                alt="avatar"
                              />
                            </div>

                            <span className="font-medium text-slate-700 dark:text-navy-100">
                              Travis Fuller
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <a
                            href="#"
                            className="hover:underline focus:underline"
                          >
                            Liverpool, Life flash Clinic
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-600 dark:text-navy-100 sm:px-5">
                          Wed, 19 May - 11:30
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                          <svg
                            xmlns="../www.w3.org/2000/svg.html"
                            className="ml-4 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </td>

                        <td className="whitespace-nowrap rounded-br-lg px-4 py-3 sm:px-5">
                          <button className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                            <svg
                              xmlns="../www.w3.org/2000/svg.html"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
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

export default ECommerce;
