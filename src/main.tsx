import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./scss/index.scss"
import i18n from "./util/i18n.ts"

console.log("Default language:", i18n.language)

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)