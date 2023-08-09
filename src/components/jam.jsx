import { Box, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export const Jam = () => {
    const [currentTime, setCurrentTime] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    const jam = currentTime.getHours().toString()
    const menit = currentTime.getMinutes().toString()
    const detik = currentTime.getSeconds().toString()
    return (
        <Flex >
            <Flex  fontSize={{base:"30px",lg:"70px"}} p={"10px"} align={"center"}>
                <Box textShadow={"2px 2px 3px gray"} color={"#009698"}>
                {jam < 10 ? "0" : null}{jam} : {menit < 10 ? "0" : null}{menit} : {detik < 10 ? "0" : null}{detik}
                </Box>  
            </Flex>
        </Flex>
    )
}