import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import SpinnerElement from "../SpinnerElement";
import axiosInstance from "../../api/axiosInstance";


export default function ProductDetailsModal({ setOpen, setIsOpen, orderId }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = React.useState('opaque')
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    const handleOpen = (backdrop) => {
        setBackdrop(backdrop)
        onOpen();
    }

    useEffect(() => {
        console.log('isOpen', orderId)
        setProducts([])
        async function fetchOrderDetails() {
            console.log(orderId)
            try {
                setLoading(true)
                const response = await axiosInstance.post(`/orders/orderDetails`, {
                    id: orderId
                })
                console.log(response)
                setProducts(response.data.products)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        if (orderId) {
            fetchOrderDetails()
        }
    }, [setOpen, isOpen, orderId])

    return (
        <>
            {/* <div className="flex flex-wrap gap-3">
                <Button
                    variant="flat"
                    color="warning"
                    onPress={() => handleOpen('blur')}
                    className="capitalize"
                >
                    blur
                </Button>
            </div> */}
            <Modal backdrop={backdrop} isOpen={setOpen} onClose={onClose} scrollBehavior='inside'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <h2 className="text-center">Order Details</h2>
                            </ModalHeader>
                            <ModalBody>
                                {loading && <SpinnerElement />}
                                <table className="table-auto w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Product Image</th>
                                            <th className="text-center">Product Name</th>
                                            <th className="text-center">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product, index) => (
                                            <tr key={index}>
                                                <td className="">
                                                    <img src={product._id.image} alt={product._id.name} className="w-12 h-12 object-cover rounded-xl mx-auto" />
                                                </td>
                                                <td className="text-center">{product._id.name}</td>
                                                <td className="text-center">{product.orderQuantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light"
                                    onPress={() => setIsOpen(false)}
                                >
                                    Close
                                </Button>
                                {/* print button */}
                                <Button color="success" variant="light"
                                    onPress={() => window.print()}
                                >
                                    Print
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
