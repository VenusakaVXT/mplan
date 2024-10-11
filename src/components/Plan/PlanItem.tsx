import React, { useState } from "react"
import { Box, ListItem } from "@mui/material"
import PlanModal, { PlanData } from "./PlanModal"
import { formatDate } from "../../util"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Tooltip } from "react-tooltip"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import MessageModal from "../MessageModal/MessageModal"
import { softDeletePlanApi } from "../../mocks/apiService"
import { toast } from "react-toastify"

const PlanItem: React.FC<PlanData> = ({ id, planName, missions, createdAt }): JSX.Element => {
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)
    const { t } = useTranslation()

    const handleSoftDeletePlan = async (): Promise<void> => {
        try {
            await softDeletePlanApi(id)
                .then(() => toast.success(t("toast.deletePlanSuccess")))
                .catch(() => toast.error(t("toast.deletePlanFailed")))
            setIsModalDeleteOpen(false)
        } catch (err: any) {
            toast.error("Error delete plan because:", err)
        }
    }

    return (
        <ListItem key={id} className="plan__item">
            <Box className="col col1" component={Link} to={`/plan/${id}/detail`}>
                <h4>{t("plan.planName")}</h4>
                <h2>{planName}</h2>
            </Box>
            <div className="col col2">
                <h4>{t("plan.planningDate")}</h4>
                <h2>{formatDate(createdAt.toString())}</h2>
            </div>
            <div className="col col3">
                <h4>{t("plan.totalMissions")}</h4>
                <h2>{missions.length}</h2>
            </div>
            <div className="col col4">
                <h4>{t("plan.missionsCompleted")}</h4>
                <h2>{missions.filter(mission => mission.completed).length}</h2>
            </div>
            <div className="col col5">
                <h4>{t("plan.unfinishedMissions")}</h4>
                <h2>{missions.filter(mission => mission.completed === false).length}</h2>
            </div>
            <div className="col col6">
                <h4>{t("plan.custom")}</h4>
                <div className="btn__wrapper">
                    <button className="edit-btn" data-tooltip-id="edit-btn" onClick={(): void => setIsModalEditOpen(true)}>
                        <EditIcon />
                    </button>
                    <Tooltip
                        className="tooltip"
                        id="edit-btn"
                        place="top"
                        content={t("plan.edit")}
                    />
                    <button className="delete-btn" data-tooltip-id="delete-btn" onClick={(): void => setIsModalDeleteOpen(true)}>
                        <DeleteIcon />
                    </button>
                    <Tooltip
                        className="tooltip"
                        id="delete-btn"
                        place="top"
                        content={t("plan.delete")}
                    />
                </div>
            </div>

            {isModalEditOpen && <PlanModal
                open={isModalEditOpen}
                onClose={(): void => setIsModalEditOpen(false)}
                isAdd={false}
                planData={{ id, planName, missions, createdAt }}
            />}

            {isModalDeleteOpen && <MessageModal
                open={isModalDeleteOpen}
                onClose={(): void => setIsModalDeleteOpen(false)}
                title={t("plan.deletePlan")}
                content={t("plan.sureDeletePlan", { planName })}
                onExcute={handleSoftDeletePlan}
            />}
        </ListItem>
    )
}

export default PlanItem