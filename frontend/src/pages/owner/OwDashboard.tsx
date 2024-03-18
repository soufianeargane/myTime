import OwnerLayout from "../../components/owner/OwnerLayout";
import ChartComponent from "../../components/ChartComponent";
import { useState, useEffect } from "react";
import SpinnerElement from "../../components/SpinnerElement";
import axiosInstance from "../../api/axiosInstance";

export default function OwDashboard() {
  const [cardsData, setCardsData] = useState({}); // this will be the monthly profit data
  const [monthlyProfit, setMonthlyProfit] = useState({}); // this will be the monthly profit data
  const [loading, setLoading] = useState(false);
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/orders/getStats");
        setCardsData(response.data.cardsData);
        setMonthlyProfit(response.data.monthlyProfitMap);
        setBestProducts(response.data.bestProducts);
      } catch (error) {
        alert("An error occurred. Please try again");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const chartOptions = {
    // Define your chart options here
    chart: {
      type: "line",
      height: 250,
    },
    series: [
      {
        name: "Monthly Profit",
        data: Object.values(monthlyProfit),
      },
    ],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  };
  return (
    <OwnerLayout>
      <div>
        {loading && <SpinnerElement />}
        <div>
          <div className="px-1 sm:px-2 md:px-6">
            <div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6 mt-4">
                <div className="card flex-row justify-between p-4">
                  <div>
                    <p className="text-xs+ uppercase">Total Profit</p>
                    <div className="mt-8 flex items-baseline space-x-1">
                      <p className="text-2xl font-semibold text-slate-700 dark:text-navy-100">
                        {cardsData.totalProfit} DHs
                      </p>
                      {/* <p className="text-xs text-success">+21%</p> */}
                    </div>
                  </div>
                  <div className="mask is-squircle flex h-10 w-10 items-center justify-center bg-warning/10">
                    <i className="fa-solid fa-hand-holding-dollar text-xl text-warning"></i>
                  </div>
                  <div className="absolute bottom-0 right-0 overflow-hidden rounded-lg">
                    <i className="fa-solid fa-hand-holding-dollar translate-x-1/4 translate-y-1/4 text-5xl opacity-15"></i>
                  </div>
                </div>
                <div className="card flex-row justify-between p-4">
                  <div>
                    <p className="text-xs+ uppercase">Number of Orders</p>
                    <div className="mt-8 flex items-baseline space-x-1">
                      <p className="text-2xl font-semibold text-slate-700 dark:text-navy-100">
                        {cardsData.acceptedOrders}
                      </p>
                      {/* <p className="text-xs text-success">+4%</p> */}
                    </div>
                  </div>
                  <div className="mask is-squircle flex h-10 w-10 items-center justify-center bg-info/10">
                    <i className="fa-solid fa-bell text-xl text-info"></i>
                  </div>
                  <div className="absolute bottom-0 right-0 overflow-hidden rounded-lg">
                    <i className="fa-solid fa-bell translate-x-1/4 translate-y-1/4 text-5xl opacity-15"></i>
                  </div>
                </div>
                <div className="card flex-row justify-between p-4">
                  <div>
                    <p className="text-xs+ uppercase">Number of Products</p>
                    <div className="mt-8 flex items-baseline space-x-1">
                      <p className="text-2xl font-semibold text-slate-700 dark:text-navy-100">
                        {cardsData.totalProducts}
                      </p>
                      {/* <p className="text-xs text-success">+8%</p> */}
                    </div>
                  </div>
                  <div className="mask is-squircle flex h-10 w-10 items-center justify-center bg-success/10">
                    <i className="fa-solid fa-thumbs-up text-xl text-success"></i>
                  </div>
                  <div className="absolute bottom-0 right-0 overflow-hidden rounded-lg">
                    <i className="fa-solid fa-thumbs-up translate-x-1/4 translate-y-1/4 text-5xl opacity-15"></i>
                  </div>
                </div>
                <div className="card flex-row justify-between p-4">
                  <div>
                    <p className="text-xs+ uppercase">Average Order Value</p>
                    <div className="mt-8 flex items-baseline space-x-1">
                      <p className="text-2xl font-semibold text-slate-700 dark:text-navy-100">
                        {cardsData.avaregeProfit} DHs
                      </p>
                      {/* <p className="text-xs text-error">-2.3%</p> */}
                    </div>
                  </div>
                  <div className="mask is-squircle flex h-10 w-10 items-center justify-center bg-error/10">
                    <i className="fa-solid fa-bug text-xl text-error"></i>
                  </div>
                  <div className="absolute bottom-0 right-0 overflow-hidden rounded-lg">
                    <i className="fa-solid fa-bug translate-x-1/4 translate-y-1/4 text-5xl opacity-15"></i>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6 mt-12">
                <div>
                  <ChartComponent chartOptions={chartOptions} />
                </div>
                <div>
                  <div className="flex h-8 items-center justify-between">
                    <h2 className="font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100">
                      Top Products by Sales
                    </h2>

                    <a
                      href="#"
                      className="border-b border-dotted border-current pb-0.5 text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70"
                    >
                      View All
                    </a>
                  </div>

                  <table className="w-full">
                    <tbody>
                      {bestProducts.map((product, index) => (
                        <tr
                          key={index}
                          // className="border-t border-dashed border-slate-200 dark:border-navy-800"
                        >
                          <td className="whitespace-nowrap pt-4">
                            <div className="flex items-center space-x-3">
                              <div className="avatar h-9 w-9">
                                <img
                                  className="rounded-full"
                                  src={product.productImage}
                                  alt="avatar"
                                />
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-2 pt-4">
                            <a
                              href="#"
                              className="font-inter tracking-wide text-slate-400 hover:text-primary focus:text-primary dark:hover:text-accent-light dark:focus:text-accent-light"
                            >
                              {product.productName}
                            </a>
                          </td>
                          <td className="whitespace-nowrap pt-4">
                            <p className="text-right font-medium text-slate-700 dark:text-navy-100">
                              {product.totalQuantitySold} sales
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}
