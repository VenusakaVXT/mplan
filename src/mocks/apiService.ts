const API_URL: string = "/api/plans"

export const getPlanApi = async (): Promise<any> => {
    const res = await fetch(API_URL)

    if (!res.ok) {
        throw new Error("Failed get plan api...")
    }

    return res.json()
}

export const postPlanApi = async (data: any): Promise<any> => {
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

export const putPlanApi = async (data: any): Promise<any> => {
    const res = await fetch(`${API_URL}/${data.planId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    console.log("Plan id:", data.planId)
    console.log("Data update:", data)
    console.log("Res:", res)

    if (!res.ok) {
        throw new Error("Failed put plan api...")
    }

    return res.json()
}