import React, { useEffect, useState } from "react";
import LayoutDesign from "../../components/admin/LayoutDesign";
import "../../assets/css/app.css";
import "../../assets/css/globals.css";
import LineChart from "../../components/LineChart";
import axiosInstance from "../../api/axiosInstance";
import SpinnerElement from "../../components/SpinnerElement";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [cardsData, setCardsData] = useState({});
  const [acceptedOrders, setAcceptedOrders] = useState({});
  const [rejectedOrders, setRejectedOrders] = useState({});
  const [pendingOrders, setPendingOrders] = useState({});
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function getAdminStats() {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/orders/getStatsAdmin");
        console.log(response.data);
        setStats(response.data);
        setCardsData(response.data.cardsData);
        setStores(response.data.best3SellingStores);
        setAcceptedOrders(response.data.monthlyOrdersMap.accepted);
        setRejectedOrders(response.data.monthlyOrdersMap.rejected);
        setPendingOrders(response.data.monthlyOrdersMap.pending);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getAdminStats();
  }, []);
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    series: [
      {
        name: "rejected Orders",
        data: Object.values(rejectedOrders),
      },
      {
        name: "Accepted Orders",
        data: Object.values(acceptedOrders),
      },
      {
        name: "pending Orders",
        data: Object.values(pendingOrders),
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: {
      title: {
        text: " (orders)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " orders";
        },
      },
    },
  };
  return (
    <div>
      <div>
        <LayoutDesign>
          <div className="px-1 sm:px-2 md:px-6  ">
            {loading && <SpinnerElement />}
            <div className="mt-4 grid grid-cols-12 gap-4 sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6">
              <div className="card col-span-12 lg:col-span-8">
                <div className="mt-3 flex flex-col justify-between px-4 sm:flex-row sm:items-center sm:px-5">
                  <div className="flex flex-1 items-center justify-between space-x-2 sm:flex-initial">
                    <h2 className="text-sm+ font-medium tracking-wide text-slate-700 dark:text-navy-100">
                      STATS Overview
                    </h2>
                    <div className="inline-flex">
                      <button
                        x-ref="popperRef"
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
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          />
                        </svg>
                      </button>

                      <div x-ref="popperRoot" className="popper-root">
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
                    </div>
                  </div>
                  <div className="hidden space-x-2 sm:flex">
                    <button className="btn h-8 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-accent-light/10 dark:text-accent-light hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 hover:text-slate-800 focus:text-slate-800 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 dark:hover:text-navy-100 dark:focus:text-navy-100">
                      Monthly
                    </button>
                    <button className="btn h-8 rounded-full text-xs+ font-medium bg-primary/10 text-primary dark:bg-accent-light/10 dark:text-accent-light hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 hover:text-slate-800 focus:text-slate-800 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 dark:hover:text-navy-100 dark:focus:text-navy-100">
                      Yearly
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 px-4 sm:mt-5 sm:grid-cols-4 sm:gap-5 sm:px-5 lg:mt-6">
                  <div className="rounded-lg bg-slate-100 p-4 dark:bg-navy-600">
                    <div className="flex justify-between space-x-1">
                      <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                        {cardsData.totalProfit}
                      </p>
                      <svg
                        xmlns="../www.w3.org/2000/svg.html"
                        className="h-5 w-5 text-primary dark:text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="mt-1 text-xs+">Total Profit</p>
                  </div>
                  <div className="rounded-lg bg-slate-100 p-4 dark:bg-navy-600">
                    <div className="flex justify-between">
                      <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                        {cardsData.totalOrders}
                      </p>
                      <svg
                        xmlns="../www.w3.org/2000/svg.html"
                        className="h-5 w-5 text-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                    </div>
                    <p className="mt-1 text-xs+">Total Orders</p>
                  </div>
                  <div className="rounded-lg bg-slate-100 p-4 dark:bg-navy-600">
                    <div className="flex justify-between">
                      <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                        {cardsData.totalStores}
                      </p>
                      <svg
                        xmlns="../www.w3.org/2000/svg.html"
                        className="h-5 w-5 text-warning"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="mt-1 text-xs+">Total Stores</p>
                  </div>
                  <div className="rounded-lg bg-slate-100 p-4 dark:bg-navy-600">
                    <div className="flex justify-between">
                      <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                        651
                      </p>
                      <svg
                        xmlns="../www.w3.org/2000/svg.html"
                        className="h-5 w-5 text-info"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                        />
                      </svg>
                    </div>
                    <p className="mt-1 text-xs+">Dispatch</p>
                  </div>
                </div>

                <div className="ax-transparent-gridline mt-2 px-2">
                  <LineChart chartOptions={chartOptions} />
                </div>
              </div>
              <div className="col-span-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5 lg:col-span-4 lg:grid-cols-2 lg:gap-6">
                <div className="card col-span-12 pb-2 lg:col-span-5 xl:col-span-6">
                  <div className="my-3 flex items-center justify-between px-4 sm:px-5">
                    <h2 className="font-medium tracking-wide text-slate-700 dark:text-navy-100">
                      Top Sellers
                    </h2>
                    <div
                      x-data="usePopper({placement:'bottom-end',offset:4})"
                      className="inline-flex"
                    >
                      <button
                        x-ref="popperRef"
                        className="btn -mr-1.5 h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
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
                      </button>

                      <div x-ref="popperRoot" className="popper-root"></div>
                    </div>
                  </div>
                  <div className="scrollbar-sm flex space-x-3 overflow-x-auto px-4 pb-3 sm:px-5">
                    {stores.map((store) => (
                      <div
                        key={store.storeId}
                        className="w-56 shrink-0 rounded-xl bg-slate-50 p-4 dark:bg-navy-600"
                      >
                        <div className="flex flex-col items-center space-y-3 text-center">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 p-0.5">
                            <img
                              className="h-full w-full rounded-full border-2 border-white object-cover object-center dark:border-navy-700"
                              src={store.storeImage}
                              alt="image"
                            />
                          </div>
                          <div>
                            <p className="text-base font-medium text-slate-700 dark:text-navy-100">
                              {store.storeName}
                            </p>
                            <p className="text-xs+ text-slate-400 dark:text-navy-300">
                              Salesman
                            </p>
                          </div>
                        </div>
                        <div className="mt-5">
                          <div>
                            <p>Profit</p>
                            <div className="mt-0.5 flex space-x-2">
                              <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                                {store.totalAmount}
                              </p>
                              <p className="flex items-center space-x-0.5 text-xs text-success">
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
                                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                                  />
                                </svg>
                                <span>4.3%</span>
                              </p>
                            </div>
                          </div>
                          <div className="ax-transparent-gridline">
                            <div x-init="$nextTick(() => { $el._x_chart = new ApexCharts($el,pages.charts.topSeller1); $el._x_chart.render() });"></div>
                          </div>
                        </div>
                        <div className="mt-5 flex justify-center space-x-2">
                          <button className="btn h-8 w-8 rounded-full bg-primary/10 p-0 text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:bg-accent-light/10 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25">
                            <svg
                              xmlns="../www.w3.org/2000/svg.html"
                              className="h-4.5 w-4.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                          </button>
                          <button className="btn h-8 w-8 rounded-full bg-primary/10 p-0 text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:bg-accent-light/10 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25">
                            <svg
                              xmlns="../www.w3.org/2000/svg.html"
                              className="h-4.5 w-4.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </button>
                          <button className="btn h-8 w-8 rounded-full bg-primary/10 p-0 text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:bg-accent-light/10 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25">
                            <svg
                              xmlns="../www.w3.org/2000/svg.html"
                              className="h-4.5 w-4.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutDesign>
      </div>
    </div>
  );
};

export default Dashboard;
