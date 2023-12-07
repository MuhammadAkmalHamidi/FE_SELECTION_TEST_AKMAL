import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Select, useDisclosure, useToast } from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import Axios from "axios"
import { useEffect, useState } from "react"

export const AddShift = ({ shiftId, reload, setReload }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [role, setRole] = useState([])
    const [userId, setUserId] = useState()
    const [roleId, setRoleId] = useState("")

    const dataUser = async () => {
        try {
            const response = await Axios.get(`http://appsensi-be-muhammadakmalhamidi.vercel.app/user?page=1&filter=${roleId}&list=1`);
            setData(response.data.result);
            setPage(response.data.page);
            setTotalPage(response.data.totalPage);
        } catch (error) {
            console.log(error);
        }
    };

    const allRole = async () => {
        try {
            const response = await Axios.get(`http://appsensi-be-muhammadakmalhamidi.vercel.app/user/role`)
            setRole(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = async () => {
        try {
            const response = await Axios.post(`http://appsensi-be-muhammadakmalhamidi.vercel.app/jadwal/add/${userId}/${shiftId}`)
            setReload(!reload)
            toast({
                title: "Selamat!",
                description: response.data.message,
                status: "success",
                duration: 1500,
                isClosable: true,
                position: "top"
            })
            onClose()
        } catch (error) {
            console.log(error);
        }
    }
    console.log(roleId);

    useEffect(() => {
        dataUser()
        allRole()
    }, [roleId])
    return (
        <>
            <Button onClick={onOpen} py={2} justifyContent={"center"} justifyItems={"center"} bg={"gray.200"} borderRadius={"5px"} cursor={"pointer"} w={"full"} _hover={{ transform: "scale(0.98)", transition: "0.3s" }} >Tambahkan</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display={"flex"} justifyContent={"space-between"} pt={"10%"}>
                        <Box>
                            Pilih karyawan
                        </Box>
                        <Menu>
                            <MenuButton
                                py={"2px"}
                                px={"5px"}
                                transition='all 0.2s'
                                borderRadius='md'
                                borderWidth='1px'
                                _hover={{ bg: 'gray.400' }}
                                _focus={{ boxShadow: 'outline' }}
                                fontSize={"sm"}
                            >
                                Filter
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => setRoleId("")}>Semua</MenuItem>
                                {role?.map((item) => {
                                    return (
                                        <>
                                            <MenuItem onClick={() => setRoleId(item.id)}>
                                                {item.roleName}
                                            </MenuItem>
                                        </>
                                    )
                                })}
                            </MenuList>
                        </Menu>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Select
                            name="roleId"
                            onChange={(e) => {
                                setUserId(e.target.value);
                            }}
                            value={userId}
                            defaultValue={userId}
                        >
                            {data?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {`${item.name}  -  ${item.role.roleName}`}
                                </option>
                            ))}
                        </Select>
                    </ModalBody>

                    <ModalFooter gap={"10px"}>
                        <Button variant='ghost' onClick={onClose}>Batal</Button>
                        <Button colorScheme='blue' mr={3} onClick={handleClick}>
                            Tambah
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}