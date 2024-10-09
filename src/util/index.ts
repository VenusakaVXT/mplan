export const randomColor = (): string => {
    const letters = "0123456789ABCDEF"
    let colorCode = "#"

    for (let i = 0; i < 6; i++) {
        colorCode += letters[Math.floor(Math.random() * 16)]
    }

    return colorCode
}

export const getInitials = (name: string): string => {
    const nameParts = name.trim().split(" ")

    if (nameParts.length > 1) {
        return `${nameParts[0][0].toUpperCase()}${nameParts[nameParts.length - 1][0].toUpperCase()}`
    }

    return nameParts[0].slice(0, 2).toUpperCase()
}

export const generateObjectId = (): string => {
    // Time first 4 bytes = 8 hex characters
    const timestamp = Math.floor(Date.now() / 1000).toString(16)

    // Generate 16 random hex characters
    const randomHex = "xxxxxxxxxxxxxxxx".replace(/[x]/g, () => {
        return ((Math.random() * 16) | 0).toString(16)
    })

    // ObjectID = 24 characters (8 for time + 16 for rest)
    return timestamp + randomHex
}

export const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    const day = date.getUTCDate().toString().padStart(2, "0")
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0")
    const year = date.getUTCFullYear().toString()

    return `${day}/${month}/${year}`
}