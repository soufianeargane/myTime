import { Button } from "@nextui-org/react";
import Navbar from "../../components/client/Navbar";
import { applySchema } from "../../zodSchema/apply";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { notification } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import SpinnerElement from "../../components/SpinnerElement";

type FormData = z.infer<typeof applySchema>;

// import SpinnerElement from "../../components/SpinnerElement";

export default function Apply() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getStoreByOwner = async () => {
      setLoading(true);
      try {
        const result = await axiosInstance.get("/stores/getStoreByOwner");
        console.log(result);
        if (result.data.success === true) {
          Swal.fire({
            title: "you can't apply for a store!",
            text: "you already have an ongoing request!",
            icon: "error",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              window.location.href = "/client/home";
            }
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getStoreByOwner();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(applySchema),
  });

  const [image, setImage] = useState<File | null>(null); // Store file object

  const onSubmit = async (data: FormData) => {
    // validate image
    if (!image) {
      alert("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("file", image);

    try {
      const result = await axios.post(
        "http://localhost:3000/stores",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(result);
      notification.success({
        message: "your request was sent successfully, wait for approval",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen">
      <div>
        <Navbar />
      </div>
      {loading && <SpinnerElement />}

      <div className="w-full h-full flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col p-6 gap-4 flex-wrap">
            <div>
              <label
                className="text-md font-bold text-gray-800 mb-4 font-serif"
                style={{ color: "#867a6e" }}
                htmlFor=""
              >
                Name of the store:{" "}
              </label>
              <div>
                <input
                  type="text"
                  className="w-[300px] md:w-[500px] border-1 border-gray-300 py-2 px-4 rounded-md outline-none focus:border-yellow-500"
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label
                className="text-md font-bold text-gray-800 mb-4 font-serif"
                style={{ color: "#867a6e" }}
                htmlFor=""
              >
                Adress of the store:{" "}
              </label>
              <div>
                <input
                  type="text"
                  className="w-[300px] md:w-[500px] border-1 border-gray-300 py-2 px-4 rounded-md outline-none focus:border-yellow-500"
                  {...register("address", { required: "address is required" })}
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
            <div>
              <label
                className="text-md font-bold text-gray-800 mb-4 font-serif"
                style={{ color: "#867a6e" }}
                htmlFor=""
              >
                Phone of the store:{" "}
              </label>
              <div>
                <input
                  type="number"
                  className="w-[300px] md:w-[500px] border-1 border-gray-300 py-2 px-4 rounded-md outline-none focus:border-yellow-500"
                  {...register("phone")}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label
                className="text-md font-bold text-gray-800 mb-4 font-serif"
                style={{ color: "#867a6e" }}
                htmlFor=""
              >
                Phone of the store:{" "}
              </label>
              <div>
                <input
                  type="file"
                  name=""
                  id=""
                  className="w-[300px] md:w-[500px] border-1 border-gray-300 py-2 px-4 rounded-md outline-none focus:border-yellow-500"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                />
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    width={50}
                    height={50}
                    alt="image"
                  />
                )}
              </div>
            </div>
            <div>
              <Button type="submit" className="w-full" color="warning">
                Submit{" "}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
