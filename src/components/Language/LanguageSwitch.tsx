import React, { useState, useEffect } from "react"
import "../../scss/LanguageSwitch.scss"
import { useTranslation } from "react-i18next"

const LanguageSwitch: React.FC = (): JSX.Element => {
    const { i18n } = useTranslation()
    const [isChecked, setIsChecked] = useState<boolean>(i18n.language === "en")

    useEffect((): void => {
        setIsChecked(i18n.language === "en")
    }, [i18n.language])

    const handleToggleLanguage = (): void => {
        const newLang = isChecked ? "vi" : "en"
        i18n.changeLanguage(newLang)
        localStorage.setItem("language", newLang)
    }

    return (
        <label className="language-switch">
            <input type="checkbox" checked={!isChecked} onChange={handleToggleLanguage} />
            <span className="slider">
                <span className={`language-option ${isChecked ? "vn" : "en"}`}>
                    {isChecked ? "VN" : "EN"}
                </span>
            </span>
        </label>
    )
}

export default LanguageSwitch