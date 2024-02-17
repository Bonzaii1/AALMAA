export const data = [
    {
        id: 1,
        nombre: "Lemuel",
        edad: 24,
        genero: false,
        peso: 87,
        modulos: 3,
    },
    {
        id: 2,
        nombre: "Annetta",
        edad: 37,
        genero: true,
        peso: 4,
        modulos: 1,
    },
    {
        id: 3,
        nombre: "Allison",
        edad: 41,
        genero: false,
        peso: 17,
        modulos: 4,
    },
    {
        id: 4,
        nombre: "Vallie",
        edad: 2,
        genero: true,
        peso: 69,
        modulos: 5,
    },
    {
        id: 5,
        nombre: "Keshaun",
        edad: 5,
        genero: true,
        peso: 9,
        modulos: 3,
    },
    {
        id: 6,
        nombre: "Jarrett",
        edad: 23,
        genero: false,
        peso: 39,
        modulos: 8,
    },
]

export const formFields = [
    [
        {
            type: "select",
            name: "ESTADO_CIVIL",
            label: "Estado Civil",
            options: ["Soltero", "Casado"],
            w: "full",
            mr: "2"

        },
        {
            type: "text",
            name: "RELIGION",
            label: "Religion",
            w: "full",
            mr: "2"
        },
        {
            type: "text",
            name: "OCUPACION",
            label: "Ocupacion",
            w: "full",
            mr: "2"
        }
    ],
    [
        {
            type: "text",
            name: "DIRECCION",
            label: "Direccion",
            w: "full",
            mr: "2"
        },
        {
            type: "text",
            name: "CIUDAD",
            label: "Ciudad",
            w: "1/4",
            mr: "2"
        }
    ],
    [
        {
            type: "number",
            name: "PESO",
            label: "Peso",
            w: "20",
            mr: "8"
        },
        {
            type: "number",
            name: "TALLA",
            label: "Talla",
            w: "20",
            mr: "8"
        },
        {
            type: "number",
            name: "TA",
            label: "T/A",
            w: "20",
            mr: "8"
        },
        {
            type: "number",
            name: "FCAR",
            label: "F. Car.",
            w: "20",
            mr: "8"
        },
        {
            type: "number",
            name: "FRESP",
            label: "F. Resp.",
            w: "20",
            mr: "8"
        },
        {
            type: "number",
            name: "TEMPE",
            label: "Temp.",
            w: "20",
            mr: "8"
        },
    ],
    [
        {
            type: "text",
            name: "ALERGIAS",
            label: "Alergias",
            w: "full",
            mr: "2"
        },
        {
            type: "text",
            name: "APP",
            label: "APP",
            w: "full",
            mr: "2"
        }
    ],
    [
        {
            type: "radio",
            name: "DEN",
            label: "Dental",
            w: "full",
            mr: "2"
        },
        {
            type: "radio",
            name: "PSI",
            label: "Psicologia",
            w: "full",
            mr: "2"
        },
        {
            type: "radio",
            name: "FIS",
            label: "Fisioterapia",
            w: "full",
            mr: "2"
        },
        {
            type: "radio",
            name: "ESV",
            label: "Estilo de Vida",
            w: "full",
            mr: "2"
        },
    ]
]