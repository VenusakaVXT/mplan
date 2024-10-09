import React from "react"
import Header from "./components/Header/Header"
import { Route, Routes } from "react-router-dom"
import HomePage from "./components/HomePage/HomePage"
import NotFoundPage from "./components/NotFoundPage/NotFoundPage"
import { useTranslation } from "react-i18next"

const App: React.FC = (): JSX.Element => {
    const { t } = useTranslation()

    return (
        <div className="app__container">
            <Header />
            <section>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<NotFoundPage msg={`404 ${t("notfound")}`} largeFont />} />
                </Routes>
            </section>
        </div >
    )
}

export default App