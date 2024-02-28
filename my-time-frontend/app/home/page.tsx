import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import imageStore from "@/public/images/store.jpg";

export default function Page() {
  return (
    <div>
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
              <label className=" font-semibold">Location</label>
              <select
                className="w-full border-2 border-gray-300 p-2 rounded-md outline-none focus:border-gray-500"
                style={{ color: "#867a6e" }}
              >
                <option>Library</option>
                <option>Bookstore</option>
                <option>Classroom</option>
              </select>
            </div>
            <div>
              <label className=" font-semibold">Distance</label>
              <select
                className="w-full border-2 border-gray-300 p-2 rounded-md outline-none focus:border-gray-500"
                style={{ color: "#867a6e" }}
              >
                <option>Library</option>
                <option>Bookstore</option>
                <option>Classroom</option>
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
            <p className="font-extrabold text-3xl font-serif">
              Find a school supply store near you
            </p>
          </div>
          <div className="flex flex-col mt-6 gap-6">
            {/* card */}
            <div className="flex justify-between px-12 items-center">
              <div>
                <h3 className="text-lg font-semibold">Title</h3>
                <p
                  style={{ color: "#867a6e" }}
                  className="text-gray-500 text-sm"
                >
                  Location
                </p>
                <div className="mt-2">
                  <Button
                    className="font-semibold px-4 py-2 space-x-2 tracking-widest"
                    radius="full"
                    color="default"
                  >
                    Visit Store
                  </Button>
                </div>
              </div>
              <div>
                <Image
                  src={imageStore}
                  alt="Picture of the author"
                  width={200}
                  height={150}
                  style={{ borderRadius: "10px" }}
                />
              </div>
            </div>
            {/* card */}
            <div className="flex justify-between px-12 items-center">
              <div>
                <h3 className="text-lg font-semibold">Title</h3>
                <p
                  style={{ color: "#867a6e" }}
                  className="text-gray-500 text-sm"
                >
                  Location
                </p>
                <div className="mt-2">
                  <Button
                    className="font-semibold px-4 py-2 space-x-2 tracking-widest"
                    radius="full"
                    color="default"
                  >
                    Visit Store
                  </Button>
                </div>
              </div>
              <div>
                <Image
                  src={imageStore}
                  alt="Picture of the author"
                  width={200}
                  height={150}
                  style={{ borderRadius: "10px" }}
                />
              </div>
            </div>
            {/* card */}
            <div className="flex justify-between px-12 items-center">
              <div>
                <h3 className="text-lg font-semibold">Title</h3>
                <p
                  style={{ color: "#867a6e" }}
                  className="text-gray-500 text-sm"
                >
                  Location
                </p>
                <div className="mt-2">
                  <Button
                    className="font-semibold px-4 py-2 space-x-2 tracking-widest"
                    radius="full"
                    color="default"
                  >
                    Visit Store
                  </Button>
                </div>
              </div>
              <div>
                <Image
                  src={imageStore}
                  alt="Picture of the author"
                  width={200}
                  height={150}
                  style={{ borderRadius: "10px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
