import React, { useEffect, useState } from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { PlanData } from "./PlanModal"
import { useTranslation } from "react-i18next"
import { forceDeletePlanApi, getPlanApi, restorePlanApi } from "../../mocks/apiService"
import { formatDate } from "../../util"
import { Link, useNavigate } from "react-router-dom"
import { Typography } from "@mui/material"
import ReplyIcon from "@mui/icons-material/Reply"
import DeleteIcon from "@mui/icons-material/Delete"
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { Tooltip } from "react-tooltip"
import MessageModal from "../MessageModal/MessageModal"
import { toast } from "react-toastify"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: { fontSize: 14 }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0
    }
}))

interface TableData {
    numId: number
    id: string
    planName: string
    totalMissions: number
    createdDate: string
}

const PlanTrash: React.FC = (): JSX.Element => {
    const [plans, setPlans] = useState<Array<PlanData>>([])
    const [selectedRow, setSelectedRow] = useState<TableData | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const { t } = useTranslation()

    useEffect((): void => {
        const getDeletedPlans = async (): Promise<void> => {
            try {
                const lstPlans = await getPlanApi()
                const lstDeletedPlan = lstPlans.filter((plan: PlanData) => plan.deleted)
                setPlans(lstDeletedPlan)
            } catch (error) {
                console.error("Error:", error)
            }
        }
        getDeletedPlans()
    }, [])

    const rows: Array<TableData> = plans.map((plan: PlanData, index: number) => ({
        numId: index + 1,
        id: plan.id,
        planName: plan.planName,
        totalMissions: plan.missions.length,
        createdDate: formatDate(plan.createdAt.toString())
    }))

    const handleRestorePlan = async (id: string): Promise<void> => {
        await restorePlanApi(id)
            .then(() => toast.info(t("toast.restorePlanSuccess")))
            .catch(() => toast.error(t("toast.restorePlanFailed")))
    }

    const handleForceDeletePlan = async (id: string): Promise<void> => {
        await forceDeletePlanApi(id)
            .then(() => toast.success(t("toast.deletePlanSuccess")))
            .catch(() => toast.error(t("toast.deletePlanFailed")))
        setIsModalOpen(false)
        setSelectedRow(null)
    }

    return (
        <>
            <div>
                <button className="btn" onClick={(): void => navigate("/")}>
                    <ReplyIcon sx={{ fontSize: "15px" }} /> {t("back")}
                </button>
                <button className="btn">
                    <Typography component={Link} to="/trash/mission">
                        <DeleteIcon sx={{ fontSize: "15px" }} /> {t("mission.trashMissions")}
                    </Typography>
                </button>
            </div>
            <h2 style={{ marginTop: "30px" }}>{t("plan.lstDeletePlans")}</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>{t("plan.planName")}</StyledTableCell>
                            <StyledTableCell>{t("plan.totalMissions")}</StyledTableCell>
                            <StyledTableCell>{t("plan.planningDate")}</StyledTableCell>
                            <StyledTableCell>{t("plan.custom")}</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: TableData) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.numId}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.planName}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.totalMissions}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.createdDate}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    <div className="btn__wrapper">
                                        <button className="restore-btn" data-tooltip-id="restore-btn" onClick={
                                            (): Promise<void> => handleRestorePlan(row.id)
                                        }>
                                            <RestoreFromTrashIcon />
                                        </button>
                                        <Tooltip
                                            className="tooltip"
                                            id="restore-btn"
                                            place="top"
                                            content={t("plan.restore")}
                                        />
                                        <button className="delete-btn" data-tooltip-id="delete-forever-btn" onClick={(): void => {
                                            setSelectedRow(row)
                                            setIsModalOpen(true)
                                        }}>
                                            <DeleteForeverIcon />
                                        </button>
                                        <Tooltip
                                            className="tooltip"
                                            id="delete-forever-btn"
                                            place="top"
                                            content={t("plan.forceDelete")}
                                        />
                                    </div>
                                </StyledTableCell>

                                {isModalOpen && selectedRow && <MessageModal
                                    open={isModalOpen}
                                    onClose={(): void => {
                                        setIsModalOpen(false)
                                        setSelectedRow(null)
                                    }}
                                    title={t("plan.deleteForeverPlan")}
                                    content={t("plan.sureDeleteForeverPlan", { planName: selectedRow.planName })}
                                    onExcute={(): Promise<void> => handleForceDeletePlan(selectedRow.id)}
                                />}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default PlanTrash