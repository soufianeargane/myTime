import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import SpinnerElement from "../SpinnerElement";
import axiosInstance from "../../api/axiosInstance";


export default function ProductDetailsModal({ setOpen, setIsOpen, orderId }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = React.useState('opaque')
    const [loading, setLoading] = useState(false)

    const handleOpen = (backdrop) => {
        setBackdrop(backdrop)
        onOpen();
    }

    useEffect(() => {
        console.log('isOpen', orderId)
        async function fetchOrderDetails() {
            console.log(orderId)
            try {
                setLoading(true)
                const response = await axiosInstance.post(`/orders/orderDetails`, {
                    id: orderId
                })
                console.log(response)
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
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                {loading && <SpinnerElement />}
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                    Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light"
                                    onPress={() => setIsOpen(false)}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
