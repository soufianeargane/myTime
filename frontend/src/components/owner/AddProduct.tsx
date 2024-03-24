import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import SpinnerElement from "../SpinnerElement";
import axios from "axios";
import { addProductSchema } from "../../zodSchema/addproduct";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { notification } from "antd";

type FormData = z.infer<typeof addProductSchema>;

export default function AddProduct({ setOpen, IsSetOpen }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const categories = [{ value: "65e97676d22db05f78937ebc", label: "Dog" }];

  useEffect(() => {
    if (setOpen) {
      onOpen();
    }
  }, [onOpen, setOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addProductSchema),
  });

  const [image, setImage] = useState<File | null>(null);

  const onSubmit = async (data: FormData) => {
    // validate image
    if (!image) {
      alert("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity);
    formData.append("image", image);

    console.log(formData);

    try {
      setLoading(true);
      const result = await axios.post(
        "http://localhost:3000/products",
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
        message: "Product added successfully",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen} // Use isOpen to control the modal
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-center">Add Product</h2>
              </ModalHeader>
              <ModalBody>
                {loading && <SpinnerElement />}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex gap-4 mb-3">
                    <div className="w-full">
                      <Input
                        isRequired
                        variant="underlined"
                        type="text"
                        color="default"
                        label="Name"
                        placeholder="Enter product name"
                        className="max-w-[220px]"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <Select
                        items={categories}
                        label="Category"
                        placeholder="Select category"
                        className="max-w-xs"
                        {...register("category")}
                      >
                        {(category) => (
                          <SelectItem key={category.value}>
                            {category.label}
                          </SelectItem>
                        )}
                      </Select>
                      {errors.category && (
                        <p className="text-red-500 text-sm">
                          {errors.category.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4 mb-3">
                    <div>
                      <Input
                        isRequired
                        variant="underlined"
                        type="number"
                        color="default"
                        label="Price"
                        placeholder="Enter product Price"
                        className="max-w-[220px]"
                        {...register("price")}
                      />
                      {errors.price && (
                        <p className="text-red-500 text-sm">
                          {errors.price.message}
                        </p>
                      )}
                    </div>
                    <Input
                      isRequired
                      variant="underlined"
                      type="number"
                      color="default"
                      label="Quantity"
                      placeholder="Enter product Quantity"
                      className="max-w-[220px]"
                      {...register("quantity")}
                    />
                  </div>
                  <div className="flex gap-4 mb-3">
                    <Input
                      isRequired
                      variant="underlined"
                      type="text"
                      color="default"
                      label="description"
                      placeholder="Enter product description"
                      className="w-full"
                      {...register("description")}
                    />
                  </div>
                  <div className="flex gap-4 mb-3">
                    <input
                      onChange={(e) =>
                        setImage(e.target.files ? e.target.files[0] : null)
                      }
                      type="file"
                    />
                  </div>
                  <div>
                    <Button
                      color="danger"
                      variant="light"
                      type="button"
                      onPress={() => IsSetOpen(false)}
                    >
                      Close
                    </Button>
                    {/* submit button */}
                    <Button type="submit" color="success" variant="light">
                      Add Product
                    </Button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
