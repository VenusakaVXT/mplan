import React, { useState } from "react"
import { Modal } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import "../../scss/Modal.scss"
import { useTranslation } from "react-i18next"
import { postPlanApi, putPlanApi } from "../../mocks/apiService"

interface PlanModalProps {
    open: boolean
    onClose: any
    isAdd: boolean
    planData: PlanData
}

export interface PlanData {
    planId: string
    planName: string
    missions: Array<MissionData>
    createdAt: Date
    deleted?: boolean
}

export interface MissionData {
    missionId: string
    missionName: string
    date: Date
    startTime: Date
    completionTime: number
    completed: boolean
    deleted?: boolean
    planId: string
}

const PlanModal: React.FC<PlanModalProps> = ({ open, onClose, isAdd, planData }): JSX.Element => {
    const [inputs, setInputs] = useState<PlanData>(planData)
    const { t } = useTranslation()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            if (isAdd) {
                console.log("New plan:", inputs)
                await postPlanApi(inputs)
            } else {
                console.log("Update plan:", inputs)
                await putPlanApi(inputs)
            }
            onClose()
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <div className="modal__content">
                <div className="modal__header">
                    <h2 className="modal__title">{isAdd ? t("plan.addPlan") : t("plan.updatePlan")}</h2>
                    <CloseIcon htmlColor="#ccc" sx={{ ":hover": { color: "#000" }, cursor: "pointer" }} onClick={onClose} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="planName">{t("plan.planName")}</label>
                        <input
                            type="text"
                            id="planName"
                            value={inputs.planName}
                            onChange={(e) => setInputs({ ...inputs, planName: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button type="submit" className="btn">
                            {isAdd ? t("plan.addPlanBtn") : t("plan.save")}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default PlanModal