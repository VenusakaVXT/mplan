import React from "react"
import { Modal } from "@mui/material"
import "../../scss/MessageModal.scss"
import CloseIcon from "@mui/icons-material/Close"
import { useTranslation } from "react-i18next"

interface MessageModalProps {
    open: boolean
    onClose: () => void
    title: string
    content: string
    onExcute: () => void
}

const MessageModal: React.FC<MessageModalProps> = ({ open, onClose, title, content, onExcute }): JSX.Element => {
    const { t } = useTranslation()

    return (
        <Modal open={open} onClose={onClose} className="modal__wrapper">
            <div className="modal__inner">
                <div className="modal__header">
                    <h2>{title}</h2>
                    <CloseIcon htmlColor="#ccc" onClick={onClose} sx={{
                        cursor: "pointer",
                        ":hover": { color: "#000" }
                    }} />
                </div>
                <div className="modal__body">
                    <p>{content}</p>
                </div>
                <div className="modal__footer">
                    <button className="btn" onClick={onExcute}>{t("plan.yes")}</button>
                    <button className="btn" onClick={onClose}>{t("plan.no")}</button>
                </div>
            </div>
        </Modal>
    )
}

export default MessageModal