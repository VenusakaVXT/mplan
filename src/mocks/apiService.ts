import { PlanData } from "../components/Plan/PlanModal"

const API_URL: string = "http://localhost:5000/plans"

export const getPlanApi = async (): Promise<any> => {
    const res = await fetch(API_URL)

    if (!res.ok) {
        throw new Error("Failed get plan api...")
    }

    return res.json()
}

export const postPlanApi = async (data: PlanData): Promise<any> => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (!res.ok) {
        throw new Error("Failed post plan api...")
    }

    return res.json()
}

export const putPlanApi = async (id: string, data: PlanData): Promise<any> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (!res.ok) {
        throw new Error("Failed put plan api...")
    }

    return res.json()
}

export const softDeletePlanApi = async (id: string): Promise<any> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleted: true })
    })

    if (!res.ok) {
        throw new Error("Failed delete plan api...")
    }

    return res.json()
}

export const restorePlanApi = async (id: string): Promise<any> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleted: false })
    })

    if (!res.ok) {
        throw new Error("Failed restore plan api...")
    }

    return res.json()
}

export const forceDeletePlanApi = async (id: string): Promise<any> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })

    if (!res.ok) {
        throw new Error("Failed force delete plan api...")
    }

    return res.json()
}