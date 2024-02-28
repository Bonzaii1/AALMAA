import { faTableColumns, faCalendarDays, faUserNurse, faUserDoctor, faSyringe } from "@fortawesome/free-solid-svg-icons"

export const sidebarItems = [
    {
        name: "Dashboard",
        to: "/",
        src: faTableColumns,
        roles: ["ALL"]
    },
    {
        name: "Brigada",
        to: "/brigada",
        src: faCalendarDays,
        roles: ["ADM"]
    },
    {
        name: "Pacientes",
        to: "paciente",
        src: faUserNurse,
        roles: ["ADM", "REC"]
    },
    {
        name: "Consulta",
        to: "consulta",
        src: faUserDoctor,
        roles: ["ADM", "HUB", "DEN", "PSI", "FIS", "ESV"]
    },
    {
        name: "Pharmacia",
        to: "pharmacia",
        src: faSyringe,
        roles: ["ADM", "PHA"]
    }
]


