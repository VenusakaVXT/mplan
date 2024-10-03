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