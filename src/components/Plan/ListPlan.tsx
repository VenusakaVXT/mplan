import React, { useEffect, useState } from "react"
import { PlanData } from "./PlanModal"
import { List } from "@mui/material"
import PlanItem from "./PlanItem"
import { getPlanApi } from "../../mocks/apiService"
import NotFoundPage from "../NotFoundPage/NotFoundPage"
import { useTranslation } from "react-i18next"
import "../../scss/Plan.scss"

const ListPlan: React.FC = (): JSX.Element => {
    const [plans, setPlans] = useState<Array<PlanData>>([])
    const { t } = useTranslation()

    useEffect((): void => {
        const getPlans = async (): Promise<void> => {
            try {
                const lstPlans = await getPlanApi()
                const sortedPlans = lstPlans
                    .filter((plan: PlanData) => !plan.deleted)
                    .sort((a: PlanData, b: PlanData) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                setPlans(sortedPlans)
            } catch (error) {
                console.error("Error:", error)
            }
        }
        getPlans()
    }, [])

    return (
        <List className="plan__list">
            {plans.length !== 0
                ? plans.map(plan => <PlanItem key={plan.id} {...plan} />)
                : <NotFoundPage msg={t("plan.noPlansMsg")} largeFont={false} />
            }
        </List>
    )
}

export default ListPlan