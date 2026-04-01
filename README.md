# 🎟️ Evently - Gestión de Eventos (Frontend)

## Plataforma Full Stack Javascript - Proyecto 10 - RTC

> 🚀 **Deploy en vivo:** [https://evently-frontend-p10.vercel.app/](https://evently-frontend-p10.vercel.app/)

> ⚠️ **Nota:** Este repositorio contiene únicamente el código del **Frontend**. Puedes encontrar el código del servidor y la configuración de la API en el [Repositorio del Backend](https://github.com/roliver97/FullStackJavascript_P10_Evently_backend).

Interfaz de usuario para una aplicación web de gestión de eventos, construida con Vanilla JavaScript y Vite. La plataforma ofrece una experiencia Single Page Application (SPA) donde los usuarios pueden interactuar con eventos en tiempo real, gestionar su perfil y visualizar datos dinámicos consumidos desde una API REST.

## 🚀 Tecnologías utilizadas

- - **JavaScript (Vanilla) & Vite** - Lógica de interfaz y empaquetado rápido.
- - **CSS3** - Estilos personalizados, CSS Variables, Flexbox/Grid y diseño 100% Responsive.
- - **HTML5** - Estructura semántica.

## 📂 Estructura del Proyecto

```text
📦 FullStackJavascript_P10_Evently_frontend
┣ 📂 public           # Assets estáticos (iconos, imágenes por defecto)
┣ 📂 src
┃ ┣ 📂 api            # Gestor centralizado de peticiones (api.js)
┃ ┣ 📂 components     # Arquitectura modular (Templates + Listeners)
┃ ┣ 📂 pages          # Vistas principales (Home, EventDetail, Profile...)
┃ ┣ 📂 router         # Enrutamiento SPA (Single Page Application)
┃ ┣ 📂 styles         # Variables globales (global.css)
┃ ┣ 📂 ui             # Elementos visuales y componentes reutilizables
┃ ┗ 📂 utils          # Lógica compartida de UI y auth
┣ 📜 .env             # Variables de entorno
┣ 📜 .gitignore       # Archivos ignorados
┣ 📜 index.html       # Punto de entrada
┗ 📜 package.json     # Dependencias de Vite
```

## 🛠️ Instalación y Configuración

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/roliver97/FullStackJavascript_P10_Evently_frontend.git
    cd FullStackJavascript_P10_Evently_frontend
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo .env en la raíz del proyecto para definir la URL de tu API:

    ```bash
    VITE_API_URL=https://tu-api-en-vercel.app/api/v1
    ```

4.  **Arranca el entorno de desarrollo de Vite:**
    ```bash
    npm run dev
    ```

## 🧩 Componentización y UI Vanilla JS

El frontend prescinde de frameworks pesados e implementa una arquitectura propia basada en la Separación de Responsabilidades (Separation of Concerns):

- **Templates:** Funciones que retornan literales de plantilla (HTML dinámico).
- **Listeners:** Archivos dedicados exclusivamente a inyectar interactividad y manejar eventos del DOM (clicks, submits).
- **Fetch Global (api.js):** Un único envoltorio que gestiona la inyección automática del Token (JWT), los Headers (JSON vs FormData) y la captura global de errores para toda la aplicación.

## 🔐 UX y Flujos de Usuario

La experiencia de usuario está optimizada mediante flujos de control dinámicos:

- **Login Automático:** Al completar el registro, el sistema realiza el login de forma transparente para el usuario, guardando la sesión inmediatamente.
- **Feedback Constante:** Implementación de Spinners de carga para todos los procesos asíncronos y contenedores de error detallados para fallos de servidor o validación.
- **Navegación Fluida:** Sistema de rutas que permite cambiar de vista sin recargar la página, manteniendo un estado de aplicación ágil.

## 📡 Integración con la API

La interfaz está preparada para interactuar con los siguientes recursos del backend:

- **Gestión de Sesión:** Registro, Login y persistencia de usuario.
- **Eventos:** Filtrado dinámico por categoría/ciudad, creación de eventos con subida de imágenes y visualización de detalles.
- **Interacción Social:** Confirmación de asistencia (Toggle Attendees) y sistema de favoritos integrados en el perfil.

---

Autor: Roman Oliver Gil
