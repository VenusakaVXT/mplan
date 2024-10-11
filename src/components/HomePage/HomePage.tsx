import React, { useState } from "react"
import { Typography } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import { Link } from "react-router-dom"
import PlanModal, { PlanData } from "../Plan/PlanModal"
import { useTranslation } from "react-i18next"
import { generateObjectId } from "../../util"
import ListPlan from "../Plan/ListPlan"

const HomePage: React.FC = (): JSX.Element => {
    const [planData, setPlanData] = useState<PlanData>({
        id: "",
        planName: "",
        missions: [],
        createdAt: new Date()
    })
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const { t } = useTranslation()

    const handleOpenModal = (): void => {
        setPlanData({ ...planData, id: generateObjectId() })
        setIsModalOpen(true)
    }

    return (
        <div className="home__wrapper">
            <div className="home__control">
                <button className="btn" onClick={handleOpenModal}>
                    <AddIcon sx={{ fontSize: "15px" }} /> {t("plan.newPlan")}
                </button>
                <button className="btn">
                    <Typography component={Link} to="/trash/plan">
                        <DeleteIcon sx={{ fontSize: "15px" }} /> {t("plan.trashCan")}
                    </Typography>
                </button>
            </div>

            {isModalOpen && <PlanModal
                open={isModalOpen}
                onClose={(): void => setIsModalOpen(false)}
                isAdd={true}
                planData={planData}
            />}

            <div className="home__container">
                <h2 style={{ marginTop: "30px" }}>{t("plan.lstPlanTitle")}</h2>
                <ListPlan />
            </div>
        </div>
    )
}

export default HomePage