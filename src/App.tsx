import React from "react"
import Header from "./components/Header/Header"
import { Route, Routes } from "react-router-dom"
import HomePage from "./components/HomePage/HomePage"
import NotFoundPage from "./components/NotFoundPage/NotFoundPage"
import { useTranslation } from "react-i18next"
import PlanTrash from "./components/Plan/PlanTrash"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App: React.FC = (): JSX.Element => {
    const { t } = useTranslation()

    return (
        <div className="app__container">
            <Header />
            <section>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<NotFoundPage msg={`404 ${t("notfound")}`} largeFont />} />
                    <Route path="/trash/plan" element={<PlanTrash />} />
                </Routes>
            </section>

            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div >
    )
}

export default App