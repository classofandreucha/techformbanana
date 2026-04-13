# Banana Creative · Web Intake Form

## Estructura del proyecto

```
banana-intake/
├── api/
│   └── submit.js       ← API Route (escribe en Notion)
├── public/
│   └── index.html      ← Form con identidad Banana
├── vercel.json         ← Configuración de rutas
└── README.md
```

## Deploy en Vercel

### 1. Sube el proyecto a GitHub
Crea un repo nuevo en GitHub y sube esta carpeta.

### 2. Importa en Vercel
- Ve a vercel.com → Add New Project
- Conecta tu repo de GitHub
- Vercel detecta la config automáticamente

### 3. Agrega las variables de entorno
En Vercel → tu proyecto → Settings → Environment Variables:

| Variable | Valor |
|---|---|
| `NOTION_TOKEN` | `secret_xxxxxxxxxxxx` (tu Integration Token) |
| `DATABASE_ID` | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (ID de tu base de datos) |

### 4. Redeploy
Después de agregar las variables, haz un Redeploy desde Vercel para que tomen efecto.

## Cómo obtener los valores

**NOTION_TOKEN:**
1. notion.so/my-integrations
2. New integration → nombre: "Banana Intake"
3. Copia el "Internal Integration Token"
4. En tu base de datos de Notion → ··· → Connections → conectar la integration

**DATABASE_ID:**
Desde la URL de tu base de datos en Notion:
`notion.so/workspace/`**`ESTE-ES-EL-ID`**`?v=...`

## Columnas requeridas en Notion

Crea estas columnas en tu base de datos:

| Columna | Tipo |
|---|---|
| Nombre del cliente | Title |
| Tipo de proyecto | Select |
| Industria | Text |
| Fecha objetivo | Text |
| Deadline duro | Select |
| Nuevo / rediseño | Select |
| URL actual | URL |
| Materiales existentes | Multi-select |
| Referencias | Text |
| Presupuesto | Select |
| Propuesta preferida | Select |
| Soporte post-lanzamiento | Select |
| Responsable aprobación | Text |
| Detalles del proyecto | Text |
| Comentarios | Text |
| Fecha de envío | Date |
