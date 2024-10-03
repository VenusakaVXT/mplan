import React, { useEffect, useState } from "react"
import ThemeSwitch from "./components/Theme/ThemeSwitch"
import LanguageSwitch from "./components/Language/LanguageSwitch"
import "./scss/App.scss"
import { useTranslation } from "react-i18next"
import { randomColor, getInitials } from "./util"
import { Tooltip } from "react-tooltip"

const App: React.FC = (): JSX.Element => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [initials, setInitials] = useState<string>(localStorage.getItem("username") || "Guest")
    const { t, i18n } = useTranslation()

    useEffect((): void => {
        const savedLanguage = localStorage.getItem("language") || "en"
        i18n.changeLanguage(savedLanguage)
    }, [])

    useEffect((): void => {
        if (initials !== "Guest") {
            localStorage.setItem("username", initials)
        }
    }, [initials])

    const handleInitialsNull = (): void => {
        setIsEditing(false)
        if (initials === "") {
            setInitials("Guest")
        }
    }

    return (
        <div className="app__container">
            <div className="app__header">
                <h1 className="app__title">MPlan</h1>
                <div className="app_navbar">
                    <div className="app_navbar-item" data-tooltip-id="theme-switch">
                        <ThemeSwitch />
                    </div>
                    <Tooltip
                        className="tooltip"
                        id="theme-switch"
                        place="bottom"
                        content="Change Theme"
                    />
                    <div className="app_navbar-item" data-tooltip-id="language-switch">
                        <LanguageSwitch />
                    </div>
                    <Tooltip
                        className="tooltip"
                        id="language-switch"
                        place="bottom"
                        content="Language"
                    />
                    <div className="app_navbar-item" data-tooltip-id="avt-username">
                        <div className="avatar" style={{ background: randomColor() }}>
                            <span>{getInitials(initials)}</span>
                        </div>
                        {isEditing ? (
                            <input
                                type="text"
                                value={initials}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setInitials(e.target.value)}
                                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>): void => {
                                    if (e.key === "Enter") {
                                        handleInitialsNull()
                                    }
                                }}
                                onBlur={(): void => handleInitialsNull()}
                                autoFocus
                            />
                        ) : (
                            <span onDoubleClick={(): void => setIsEditing(true)}>
                                {initials}
                            </span>
                        )}
                    </div>
                    <Tooltip
                        className="tooltip"
                        id="avt-username"
                        place="bottom"
                        content="Double click to edit the name"
                    />
                </div>
            </div>
            <h2>{t("test")}</h2>
        </div >
    )
}

export default App