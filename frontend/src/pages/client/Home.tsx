import Navbar from "../../components/client/Navbar";
import { Button } from "@nextui-org/react";
import imageStore from "../../assets/images/store.jpg";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import SpinnerElement from "../../components/SpinnerElement";
import { Link } from "react-router-dom";

export default function Home() {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [distance, setdistance] = useState("");
  const [longitude, setlongitude] = useState(0);
  const [latitude, setlatitude] = useState(0);
  useEffect(() => {
    async function fetchStores() {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/stores");
        setStores(response.data);
      } catch (error) {
        alert("An error occurred");
      } finally {
        setIsLoading(false);
      }
    }
    fetchStores();
  }, []);

  const GoogleMapsLink = (store: any) => {
    const mapsUrl = `https://www.google.com/maps?q=${store.latitude},${store.longitude}`;
    // redirect to google maps on a new tab
    window.open(mapsUrl, "_blank");
  };

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setlongitude(position.coords.longitude);
        console.log(position.coords.longitude);
        setlatitude(position.coords.latitude);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
      return;
    }
  };

  const handleFilter = async () => {
    try {
      if (distance) {
        getLocation();
      }
      setIsLoading(true);
      console.log("name", name);
      console.log("distance", distance);
      console.log("longitude", longitude);
      console.log("latitude", latitude);

      const response = await axiosInstance.get("/stores/filterStores", {
        params: {
          name,
          distance,
          longitude,
          latitude,
        },
      });
      setStores(response.data);
    } catch (error) {
      alert("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
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
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className=" font-semibold">Distance</label>
              <select
                defaultValue="Select distance"
                className="w-full border-2 border-gray-300 p-2 rounded-md outline-none focus:border-warning"
                style={{ color: "#867a6e" }}
                onChange={(e) => setdistance(e.target.value)}
              >
                {/* selected disabled option */}
                <option value="Select distance" disabled>
                  Select distance
                </option>
                <option value="1">1km</option>
                <option value="2">2km</option>
                <option value="3">5km</option>
              </select>
            </div>
            <div>
              <Button
                className="w-full font-bold font-serif"
                radius="md"
                color="warning"
                onClick={handleFilter}
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
              Find a school supply store near you
            </p>
          </div>
          <div className="flex flex-col mt-6 gap-6">
            {/* card */}
            {stores.map((store: any) => (
              <div
                key={store._id}
                className="flex justify-between px-12 items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{store.name}</h3>
                  <p
                    style={{ color: "#867a6e" }}
                    className="text-gray-500 text-sm"
                  >
                    {store.address}
                  </p>
                  <div className="mt-2">
                    <Link to={`/store/${store._id}`}>
                      <Button
                        className="font-semibold px-4 py-2 space-x-2 tracking-widest"
                        radius="full"
                        color="default"
                      >
                        Visit Store
                      </Button>
                    </Link>
                  </div>
                </div>
                <div>
                  <Button
                    className="font-semibold px-4 py-2 space-x-2 tracking-widest"
                    radius="full"
                    color="default"
                    onClick={() => GoogleMapsLink(store)}
                  >
                    View on Map
                  </Button>
                </div>
                <div>
                  <img
                    src={store.image || imageStore}
                    alt="Picture of the author"
                    width={200}
                    height={150}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
