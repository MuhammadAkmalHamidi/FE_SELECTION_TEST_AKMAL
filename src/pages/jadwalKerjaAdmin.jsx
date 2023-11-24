import {
    Box, Flex, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from "@chakra-ui/react"
import { Navbar } from "../components/navbar"
import { AiFillDelete } from "react-icons/ai";
import axios from "axios"
import { useEffect, useState } from "react"
import { AddShift } from "../components/admin/addShift";

export const JadwalKerjaAdmin = () => {
    const [data, setData] = useState([])
    const [userId, setUserId] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [reload, setReload] = useState(false)

    const getUserId = (id) => {
        setUserId(id)
    }

    const jadwal = async () => {
        try {
            const response = await axios.get(`http://localhost:2000/jadwal`)
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const besok = new Date();
    besok.setDate(besok.getDate() + 1);
    const selectedDate = new Date().getHours() < 21 ? new Date() : besok;
    const formattedDate = selectedDate.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const deleteShift = async () => {
        try {
            const response = await axios.delete(`http://localhost:2000/jadwal/delete/${userId}`)
            setReload(!reload)
            onClose()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        jadwal()
    }, [reload])


    return (
        <Flex>
            <Flex> <Navbar /> </Flex>
            <Box pl={{ lg: "140px", sm: "none" }} w={"full"}>
                <Flex justifyContent={"center"} w={"full"} pt={"20px"} fontSize={"3xl"} textColor={"#009698"}> {`${formattedDate}`} </Flex>
                <Flex display={{ sm: "block", md: "flex" }} mt={"20px"} textColor={"white"} gap={"5px"}>
                    <Flex w={{ md: "50%", sm: "full" }} justifyContent={"center"}>
                        <Box w={"full"}>
                            <Flex justifyContent={"center"} w={"full"} bgColor={"#009698"} py={"10px"}>
                                Shift Pagi
                            </Flex>
                            <Box textColor={"gray.800"} px={"20px"}>
                                <Flex w={"full"} justifyContent={"center"} pt={"10px"} textColor={"gray.800"} px={"10px"}>
                                    <Box w={"full"}>
                                        {data?.map((item) => {
                                            return (
                                                <>
                                                    {item.shiftId === 1 ?
                                                        <Flex key={item.id} fontSize={"20px"} mb={"10px"} justifyContent={"space-between"} px={"5px"} py={"5px"} borderColor={"gray.300"} borderBottom={"1px"} w={"full"} gap={"5px"}>
                                                            <Flex gap={"5px"}>
                                                                <Box> {item.user.name} </Box>
                                                                <Box>- {item.user.role.roleName} </Box>
                                                            </Flex>
                                                            <Flex textColor={"red.800"} _hover={{ transform: "scale(0.9)", transition: "0.5s" }}>
                                                                <AiFillDelete onClick={() => {
                                                                    onOpen()
                                                                    getUserId(item.user.id)
                                                                }} cursor={"pointer"} />
                                                            </Flex>
                                                        </Flex>
                                                        :
                                                        null
                                                    }
                                                </>
                                            )
                                        })}
                                        <AddShift reload={reload} setReload={setReload} shiftId={1}/>
                                    </Box>
                                </Flex>
                            </Box>
                        </Box>
                    </Flex >
                    <Flex w={{ md: "50%", sm: "full" }} justifyContent={"center"}>
                        <Box w={"full"}>
                            <Flex justifyContent={"center"} w={"full"} bgColor={"#009698"} py={"10px"}>
                                Shift Malam
                            </Flex>
                            <Flex justifyContent={"center"} pt={"10px"} textColor={"gray.800"} px={"20px"}>
                                <Box w={"full"}>
                                    {data?.map((item) => {
                                        return (
                                            <>
                                                {item.shiftId === 2 ?
                                                    <Flex fontSize={"20px"} mb={"10px"} justifyContent={"space-between"} px={"5px"} py={"5px"} borderColor={"gray.300"} borderBottom={"1px"} w={"full"} gap={"5px"}>
                                                        <Flex gap={"5px"}>
                                                            <Box> {item.user.name} </Box>
                                                            <Box>- {item.user.role.roleName} </Box>
                                                        </Flex>
                                                        <Flex textColor={"red.800"} _hover={{ transform: "scale(0.9)", transition: "0.5s" }}>
                                                            <AiFillDelete onClick={() => {
                                                                onOpen()
                                                                getUserId(item.user.id)
                                                            }} color="red.800" cursor={"pointer"} />
                                                            <Modal isOpen={isOpen} onClose={onClose}>
                                                                <ModalOverlay />
                                                                <ModalContent p={"10px"}>
                                                                    <ModalHeader>Kamu yakin ingin menghapusnya dari shit?</ModalHeader>
                                                                    <ModalCloseButton />
                                                                    <ModalFooter gap={"10px"}>
                                                                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                                                                        <Button colorScheme='blue' mr={3} onClick={deleteShift} >
                                                                            Yes
                                                                        </Button>
                                                                    </ModalFooter>
                                                                </ModalContent>
                                                            </Modal>
                                                        </Flex>
                                                    </Flex>
                                                    :
                                                    null
                                                }
                                            </>
                                        )
                                    })}
                                    <AddShift reload={reload} setReload={setReload} shiftId={2} />
                                </Box>
                            </Flex>
                        </Box>
                    </Flex >
                </Flex>
            </Box>
        </Flex>
    )
}