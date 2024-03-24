import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SpinnerElement from "../SpinnerElement";
import axios from "axios";
import { addProductSchema } from "../../zodSchema/addproduct";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type FormData = z.infer<typeof addProductSchema>;

export default function UpdateProduct({ opening, setOpening, product }) {
  const handleClose = () => setOpening(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const categories = [{ value: "65e97676d22db05f78937ebc", label: "Dog" }];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addProductSchema),
  });

  useEffect(() => {
    if (product) {
      console.log(product.category);
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("category", product.category?._id);
      setValue("quantity", product.quantity);
      setValue("description", product.description);
    }
  }, [product, setValue]);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity);
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      const result = await axios.patch(
        `http://localhost:3000/products/${product._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(result);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={opening}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading && <SpinnerElement />}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p className="text-2xl font-bold text-center mb-5">
                Update Product
              </p>
            </div>
            <div className="flex gap-3 mb-5">
              <div className="w-full">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor=""
                >
                  Name
                </label>
                <input
                  type="text"
                  className="block w-full shadow-sm sm:text-sm border-gray-500 border focus:border-gray-900 rounded-md p-2 outline-none"
                  {...register("name")}
                />
              </div>
              <div className="w-full">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor=""
                >
                  Category
                </label>
                <select
                  {...register("category")}
                  className="block w-full shadow-sm sm:text-sm border-gray-500 border focus:border-gray-900 rounded-md p-2 outline-none"
                >
                  <option value={product?.category?._id}>
                    {product?.category?.name}
                  </option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mb-5">
              <div className="w-full">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor=""
                >
                  Quantity
                </label>
                <input
                  type="text"
                  className="block w-full shadow-sm sm:text-sm border-gray-500 border focus:border-gray-900 rounded-md p-2 outline-none"
                  {...register("quantity")}
                />
              </div>
              <div className="w-full">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor=""
                >
                  Price
                </label>
                <input
                  type="text"
                  className="block w-full shadow-sm sm:text-sm border-gray-500 border focus:border-gray-900 rounded-md p-2 outline-none"
                  {...register("price")}
                />
              </div>
            </div>
            <div className="flex gap-3 mb-5">
              <div className="w-full">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor=""
                >
                  Description
                </label>
                <input
                  type="text"
                  className="block w-full shadow-sm sm:text-sm border-gray-500 border focus:border-gray-900 rounded-md p-2 outline-none"
                  {...register("description")}
                />
              </div>
            </div>
            <div className="flex mb-3">
              <input
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                type="file"
              />
              <button type="submit">Update</button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
