import {
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormLabel,
    Input,
    useToast,
} from "@chakra-ui/react"
import { useState } from "react";
import Axios from "axios";

export const AddSalary = ({ userId, setReload, reload, salary }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newSalary, setNewSalary] = useState(salary ? salary.salary : 0)
    const toast = useToast()
    const handleClick = async () => {
        try {
            const response = await Axios.post(`https://be-selection-test-akmal.vercel.app/user/addSalary`, {
                gaji: newSalary,
                userId: userId
            })
            const message = response.data.message
            toast({
                title: "Selamat!",
                description: message,
                status: "success",
                duration: 1500,
                isClosable: true,
                position: "top"
            })
            setReload(!reload)
        } catch (error) {
            console.log(error);
        }
    }

    const formatRupiah = (gaji) => {
        return gaji.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    }

    return (
        <>
            <Button onClick={onOpen} bgColor={"#009698"} color={"white"} fontWeight={"thin"} textShadow={"0px 0px 3px white"}>Atur Gaji</Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Atur Gaji Karyawan</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <>
                            <FormLabel> {newSalary ? formatRupiah(newSalary) : formatRupiah(0)} </FormLabel>
                            <Input onChange={(e) => setNewSalary(parseInt(e.target.value))} type="number" name="gaji" />
                        </>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleClick} bgColor={"cyan.700"} color={"white"} mr={3}>
                            Simpan
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}