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
            name: "EstadoCivil",
            label: "Estado Civil",
            options: ["Soltero", "Casado"],
            w: "full",
            mr: "2"

        },
        {
            type: "text",
            name: "Religion",
            label: "Religion",
            w: "full",
            mr: "2"
        },
        {
            type: "text",
            name: "Ocupacion",
            label: "Ocupacion",
            w: "full",
            mr: "2"
        }
    ],
    [
        {
            type: "text",
            name: "Direccion",
            label: "Direccion",
            w: "full",
            mr: "2"
        },
        {
            type: "text",
            name: "Ciudad",
            label: "Ciudad",
            w: "1/4",
            mr: "2"
        }
    ],
    [
        {
            type: "number",
            name: "Peso",
            label: "Peso",
            w: "20",
            mr: "8"
        },
        {
            type: "number",
            name: "Talla",
            label: "Talla",
            w: "20",
            mr: "8"
        },
        {
            type: "number",
            name: "T/A",
            label: "T/A",
            w: "20",
            mr: "8"
        },
        {
            type: "number",
            name: "FCardiaca",
            label: "F. Car.",
            w: "20",
            mr: "8"
        },
        {
            type: "number",
            name: "FRespiratoria",
            label: "F. Resp.",
            w: "20",
            mr: "8"
        },
        {
            type: "number",
            name: "Temperatura",
            label: "Temp.",
            w: "20",
            mr: "8"
        },
    ],
    [
        {
            type: "text",
            name: "Alergias",
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
            name: "moduloDental",
            label: "Dental",
            w: "full",
            mr: "2"
        },
        {
            type: "radio",
            name: "moduloPsicologia",
            label: "Psicologia",
            w: "full",
            mr: "2"
        },
        {
            type: "radio",
            name: "moduloFisioterapia",
            label: "Fisioterapia",
            w: "full",
            mr: "2"
        },
        {
            type: "radio",
            name: "moduloEV",
            label: "Estilo de Vida",
            w: "full",
            mr: "2"
        },
    ]
]