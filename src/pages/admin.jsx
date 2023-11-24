import { Box, Button, Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { useEffect, useState } from "react";
import { AddEmploye } from "../components/admin/addEmploye";
import Axios from "axios";
import { SendMail } from "../components/admin/sendMail";
import { AddSalary } from "../components/admin/addSalary";

export const ListKaryawan = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [reload, setReload] = useState(true);

    const dataUser = async (pageNum) => {
        try {
            const response = await Axios.get(`http://localhost:2000/user?page=${pageNum}`);
            setData(response.data.result);
            setPage(response.data.page);
            setTotalPage(response.data.totalPage);
        } catch (error) {
            console.log(error);
        }
    };

    const nextPage = () => {
        if (page < totalPage) {
            setPage((prevPage) => +prevPage + 1);
            setReload(!reload);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage((prevPage) => +prevPage - 1);
            setReload(!reload);
        }
    };

    const rupiahFormat = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    });

    const rupiah = (value) => {
        return rupiahFormat.format(value);
    };

    useEffect(() => {
        dataUser(page);
    }, [reload]);

    return (
        <Flex flexDirection="column">
            <Navbar />
            <Flex
                pl="150px"
                pb="50px"
                justifyContent="center"
                w="100%"
            >
                <Box>
                    <Flex justifyContent="center" h="100px" fontSize="30px" color="gray.700" fontWeight="thin">
                        List Karyawan
                    </Flex>
                    <Flex>
                        <Table variant="simple" w={"full"} size="lg">
                            <Thead>
                                <Tr>
                                    <Th color="#009698" textAlign="center" w="300px">
                                        Nama
                                    </Th>
                                    <Th color="#009698" textAlign="center" w="300px">
                                        Tanggal Lahir
                                    </Th>
                                    <Th color="#009698" textAlign="center" w="300px">
                                        Email
                                    </Th>
                                    <Th color="#009698" textAlign="center" w="300px">
                                        Nomor Handpohone
                                    </Th>
                                    <Th color="#009698" textAlign="center" w="300px">
                                        Tanggal Daftar
                                    </Th>
                                    <Th color="#009698" textAlign="center" w="300px">
                                        Gaji
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.map((item) => {
                                    return (
                                        <Tr borderTop="2px solid" borderBottom="2px solid" borderColor="#009698">
                                            <Td color="gray.600" textAlign="center">
                                                {item.name}
                                            </Td>
                                            <Td color="gray.600" textAlign="center">
                                                {item.birthDay}
                                            </Td>
                                            <Td color="gray.600" textAlign="center">
                                                {item.email}
                                            </Td>
                                            <Td color="gray.600" textAlign="center">
                                                {item.phoneNumber}
                                            </Td>
                                            <Td color="gray.600" textAlign="center">
                                                <Box>{new Date(item.createdAt).toLocaleDateString()}</Box>
                                            </Td>
                                            <Td color="gray.600" textAlign="center">
                                                <Box>{item.salary ? rupiah(item.salary.salary) : "Belum Di Atur"}</Box>
                                            </Td>
                                            <Td color="gray.600" textAlign="center">
                                                <Box>
                                                    <AddSalary userId={`${item.id}`} salary={item.salary} setReload={setReload} reload={reload} />
                                                </Box>
                                            </Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </Flex>
                    <Flex justifyContent="space-between" justifyItems={"center"} px={"15px"}>
                        <Flex>
                            <AddEmploye reload={reload} setReload={setReload} />
                            <SendMail />
                        </Flex>
                        <Flex gap="10px" justifyContent={"center"} mt="15px">
                            <Flex mt={"10px"}>
                                Page {page} of Page {totalPage}
                            </Flex>
                            {page >= 2 && (
                                <Button
                                    textShadow="0px 0px 5px white"
                                    fontWeight="thin"
                                    bgColor="#009698"
                                    color="white"
                                    borderRadius="25px"
                                    onClick={prevPage}
                                >
                                    Prev
                                </Button>
                            )}
                            {page < totalPage && (
                                <Button
                                    textShadow="0px 0px 5px white"
                                    fontWeight="thin"
                                    bgColor="#009698"
                                    color="white"
                                    borderRadius="25px"
                                    onClick={nextPage}
                                >
                                    Next
                                </Button>
                            )}
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    );
};
