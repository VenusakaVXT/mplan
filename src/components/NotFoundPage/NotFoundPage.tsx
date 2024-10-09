import React from "react"
import { Box, Typography } from "@mui/material"

interface NotFoundPageProps { msg: string, largeFont: boolean }

const NotFoundPage: React.FC<NotFoundPageProps> = ({ msg, largeFont = true }): JSX.Element => {
    return (
        <Box
            height={"75vh"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            pb={"30px"}
        >
            <img style={{ width: "30vw" }} src="/img/404notfound.png" alt="404notfound" />
            <Typography variant="h1" fontSize={largeFont ? "45px" : "25px"}>{msg}</Typography>
        </Box>
    )
}

export default NotFoundPage