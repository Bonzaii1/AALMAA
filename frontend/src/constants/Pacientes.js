export const paciente =
{
    PACIENTE_ID: 1,
    NOMBRE: "Lemuel",
    EDAD: 24,
    GENERO: "H",
    ESTADO_CIVIL: "S",
    RELIGION: "SDA",
    OCUPACION: "Maestro",
    DIRECCION: "123 Main St",
    CIUDAD: "Houston",
    PESO: 22,
    TALLA: 22,
    TA: 22,
    FCAR: 22,
    FRESP: 22,
    TEMPE: 22,
    ALERGIAS: "Nuts",
    APP: "idk",
    PADECIMIENTO: "TestTestTest",

}


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
            w: "full",
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