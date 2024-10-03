import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import en from "../locales/en/translation.json"
import vi from "../locales/vi/translation.json"

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: "en",
        detection: {
            order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag", "path", "subdomain"],
            lookupQuerystring: "lng",
            lookupCookie: "i18next",
            lookupLocalStorage: "i18nextLng",
            caches: ["localStorage", "cookie"],
            excludeCacheFor: ["cimode"],
        },
        supportedLngs: ["en", "vi"],
        nonExplicitSupportedLngs: true,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: en
            },
            vi: {
                translation: vi
            }
        }
    })

export default i18n