# BEROT TECNOLOGY - Sistema de Gestión de Taller de Reparación

## Descripción

Sistema web Full Stack para la gestión de un taller de reparación de celulares. Permite registrar clientes, crear órdenes de reparación con seguimiento de estados, documentar condiciones del equipo con fotos, y gestionar el flujo completo de trabajo desde la recepción hasta la entrega.

## Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de interfaces de usuario
- **Vite 5** - Herramienta de desarrollo y empaquetado
- **React Router v6** - Navegación SPA (Single Page Application)
- **CSS** - Estilos personalizados con diseño responsive

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js 4** - Framework HTTP para API REST
- **Sequelize 6** - ORM (Object-Relational Mapping)
- **express-validator** - Validación de datos en servidor
- **dotenv** - Gestión de variables de entorno

### Base de Datos
- **PostgreSQL** - Sistema gestor de bases de datos relacional

## Arquitectura del Sistema

El proyecto sigue una **arquitectura por capas** en el backend y una **arquitectura basada en componentes** en el frontend.

### Estructura del Backend

```
backend/
├── config/
│   └── database.js          # Configuración de Sequelize
├── models/
│   ├── index.js             # Inicialización y asociaciones
│   ├── Usuario.js           # Modelo de usuarios
│   ├── Cliente.js           # Modelo de clientes
│   └── Orden.js             # Modelo de órdenes
├── controllers/
│   ├── authController.js    # Lógica de autenticación
│   ├── clienteController.js # CRUD de clientes
│   ├── ordenController.js   # CRUD de órdenes
│   └── uploadController.js  # Subida de imágenes
├── routes/
│   ├── index.js             # Agregador de rutas
│   ├── authRoutes.js        # Rutas de autenticación
│   ├── clienteRoutes.js     # Rutas de clientes
│   ├── ordenRoutes.js       # Rutas de órdenes
│   └── uploadRoutes.js      # Rutas de subida
├── middlewares/
│   ├── errorHandler.js      # Manejador de errores centralizado
│   └── validators/
│       ├── helpers.js       # Utilidades de validación
│       ├── authValidator.js
│       ├── clienteValidator.js
│       └── ordenValidator.js
├── uploads/                 # Fotos subidas
├── database/
│   └── init.sql             # Script de inicialización
├── server.js                # Punto de entrada
├── .env                     # Variables de entorno
└── package.json
```

### Estructura del Frontend

```
frontend/
├── src/
│   ├── components/              # Componentes reutilizables
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Card.jsx
│   │   ├── Button.jsx
│   │   ├── FormInput.jsx
│   │   ├── Loader.jsx
│   │   ├── Toast.jsx
│   │   ├── OrderCard.jsx
│   │   ├── PhotoUpload.jsx
│   │   ├── StatusBadge.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── AnimatedBackground.jsx
│   ├── pages/                   # Páginas de la aplicación
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── NewOrder.jsx
│   │   ├── OrderDetail.jsx
│   │   ├── Clients.jsx
│   │   └── About.jsx
│   ├── hooks/
│   │   └── useToast.js          # Hook para notificaciones
│   ├── data/                    # Datos estáticos
│   ├── App.jsx                  # Componente principal
│   ├── App.css
│   ├── main.jsx                 # Punto de entrada
│   └── index.css
├── public/
├── index.html
├── vite.config.js
└── package.json
```

## Modelo Relacional

### Diagrama de Entidad-Relación

```
┌─────────────┐          ┌─────────────────────────────────┐
│  USUARIOS   │          │           ORDENES               │
├─────────────┤          ├─────────────────────────────────┤
│ id (PK)     │          │ id (PK)                         │
│ nombre      │          │ numero_orden (UNIQUE)           │
│ email (UQ)  │          │ cliente_id (FK → clientes.id)   │
│ password    │          │ cliente_nombre                  │
│ rol         │          │ marca, modelo, color, imei      │
│ created_at  │          │ condiciones_ingreso             │
└─────────────┘          │ accesorios                      │
                         │ motivo_reparacion               │
┌─────────────┐          │ contrasena_equipo               │
│  CLIENTES   │──────┐   │ fecha_recepcion                 │
├─────────────┤      │   │ estado                          │
│ id (PK)     │      │   │ diagnostico, repuestos          │
│ nombre      │      │   │ procedimiento, costo            │
│ cedula (UQ) │      └──▶│ fecha_entrega                   │
│ telefono    │  1:N     │ condiciones_entrega             │
│ email       │          │ fotos_recepcion, fotos_entrega  │
│ created_at  │          │ created_at, updated_at          │
└─────────────┘          └─────────────────────────────────┘
```

### Relaciones
- **Clientes → Órdenes**: Un cliente puede tener muchas órdenes (1:N). Si se elimina un cliente, las órdenes mantienen el nombre pero `cliente_id` se establece en NULL (ON DELETE SET NULL).

### Diccionario de Datos

| Tabla | Campo | Tipo | Restricción |
|-------|-------|------|-------------|
| usuarios | id | SERIAL | PRIMARY KEY |
| usuarios | nombre | VARCHAR(100) | NOT NULL |
| usuarios | email | VARCHAR(150) | UNIQUE, NOT NULL |
| usuarios | password | VARCHAR(255) | NOT NULL |
| usuarios | rol | VARCHAR(20) | CHECK (administrador, tecnico) |
| clientes | id | SERIAL | PRIMARY KEY |
| clientes | nombre | VARCHAR(100) | NOT NULL |
| clientes | cedula | VARCHAR(20) | UNIQUE, NOT NULL |
| clientes | telefono | VARCHAR(20) | NOT NULL |
| clientes | email | VARCHAR(150) | NULLABLE |
| ordenes | id | SERIAL | PRIMARY KEY |
| ordenes | numero_orden | VARCHAR(20) | UNIQUE, NOT NULL |
| ordenes | cliente_id | INTEGER | FK → clientes(id) |
| ordenes | estado | VARCHAR(20) | CHECK (en_espera, en_reparacion, listo, entregado) |
| ordenes | costo | DECIMAL(10,2) | NULLABLE |
| ordenes | fotos_recepcion | TEXT[] | DEFAULT '{}' |
| ordenes | fotos_entrega | TEXT[] | DEFAULT '{}' |

## Diseño de la API REST

### Endpoints

| Método | Ruta | Descripción | Parámetros |
|--------|------|-------------|------------|
| POST | /api/auth/login | Iniciar sesión | email, password |
| POST | /api/auth/register | Registrar usuario | nombre, email, password |
| GET | /api/clientes | Listar todos los clientes | — |
| POST | /api/clientes | Crear cliente | nombre, cedula, telefono, email |
| PUT | /api/clientes/:id | Actualizar cliente | nombre, cedula, telefono, email |
| DELETE | /api/clientes/:id | Eliminar cliente | — |
| GET | /api/ordenes | Listar todas las órdenes | — |
| GET | /api/ordenes/:id | Obtener orden por ID | — |
| POST | /api/ordenes | Crear orden de reparación | cliente_nombre, marca, modelo, condiciones_ingreso, motivo_reparacion |
| PUT | /api/ordenes/:id | Actualizar orden | estado, diagnostico, repuestos, etc. |
| DELETE | /api/ordenes/:id | Eliminar orden | — |
| POST | /api/upload | Subir imágenes (base64) | images[] |
| GET | /api/health | Estado del servidor | — |

### Respuestas Esperadas

**Éxito en login:**
```json
{ "success": true, "user": { "nombre": "...", "email": "...", "rol": "..." } }
```

**Error de validación (400):**
```json
{ "error": "Error de validación", "details": [{ "field": "email", "message": "..." }] }
```

**Recurso no encontrado (404):**
```json
{ "error": "Orden no encontrada" }
```

## Instalación y Configuración

### Prerrequisitos
- Node.js 18 o superior
- PostgreSQL 14 o superior (pgAdmin4 recomendado)
- npm

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd "BEROT TECNOLOGY"
```

### 2. Configurar la base de datos
1. Abrir pgAdmin4
2. Ejecutar el script `backend/database/init.sql` para crear la base de datos y tablas

### 3. Configurar el backend
```bash
cd backend
npm install
```

Crear archivo `.env` (o copiar `.env.example`):
```
DB_NAME=celufix_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
PORT=4000
NODE_ENV=development
```

### 4. Configurar el frontend
```bash
cd ../frontend
npm install
```

### 5. Ejecutar el proyecto

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

La aplicación estará disponible en:
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000

### Credenciales por defecto
- **Admin**: admin@berot.com / admin123
- **Técnico**: pedro@berot.com / tecnico123

## Patrón Arquitectónico

El backend implementa el patrón **MVC adaptado para API REST**:

- **Rutas (Routes)**: Definen los endpoints y conectan validadores con controladores
- **Controladores (Controllers)**: Manejan la lógica de peticiones HTTP y delegan al modelo
- **Modelos (Models)**: Definen la estructura de datos y relaciones usando Sequelize ORM
- **Middlewares**: Manejan preocupaciones transversales (validación, manejo de errores)
- **Configuración (Config)**: Gestiona la conexión a base de datos y variables de entorno

### Ventajas de esta arquitectura:
- **Separación de responsabilidades**: Cada capa tiene una función clara
- **Mantenibilidad**: Cambios en una capa no afectan las demás
- **Testabilidad**: Cada componente puede probarse de forma aislada
- **Escalabilidad**: Fácil agregar nuevas funcionalidades

## Funcionalidades

- ✅ Autenticación (Login/Registro)
- ✅ CRUD completo de Clientes
- ✅ CRUD completo de Órdenes de Reparación
- ✅ Seguimiento de estados (En espera → En reparación → Listo → Entregado)
- ✅ Subida de fotos del equipo
- ✅ Dashboard con búsqueda y filtros
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Validaciones en cliente y servidor
- ✅ Manejo de errores centralizado
- ✅ Componente de notificaciones (Toast)
- ✅ Indicador de carga (Loader)

## Equipo de Desarrollo

- **Nataly Dayana Medina Becerra**
- **Diego Andrés Garcia Cote**
- **Kevin Jean Pierre Diaz Llanez**

BEROT TECNOLOGY
