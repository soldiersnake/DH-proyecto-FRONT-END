# 💸 DH Wallet - App de gestión financiera personal

Esta es una aplicación desarrollada como parte del proyecto final del curso de Frontend en Digital House. Permite a los usuarios gestionar su dinero, cargar fondos, pagar servicios, consultar movimientos y administrar sus medios de pago de forma intuitiva y segura.

---

## 💎 **[URL Versel](https://dh-proyecto-front-end.vercel.app/)** (Ingresa para ver la aplicacion en produccion)

## 🚀 Tecnologías utilizadas

- **⚡ Vite** – Motor de desarrollo rápido con hot-reload.
- **🔥 Firebase** – Autenticación y base de datos en tiempo real (Firestore).
- **🔐 Firebase Auth** – Reemplazo a la API provista por DH, que no funcionaba correctamente.
- **🎨 TailwindCSS** – Framework de estilos para una UI moderna, responsiva y limpia.
- **☁️ Vercel** – Deploy automático con integración continua (CI), escuchando los commits de Git.

---

## 🔧 Funcionalidades principales

- 📲 **Registro e inicio de sesión** con autenticación Firebase.
- 💳 **Administración de tarjetas**: Agregar y seleccionar tarjetas para pagos.
- 💰 **Carga de dinero** a cuenta.
- 📤 **Pago de servicios** con simulación de entidades reales (Claro, Personal, etc.).
- 📊 **Vista de actividad**: Últimos movimientos, con filtros y buscador.
- 🧾 **Resumen de cuenta** con saldo disponible calculado automáticamente.
- 📋 **Visualización y copiado de CVU y alias** para transferencias.
- 🛠️ **Perfil editable**: Campos básicos como nombre, apellido, CUIT y teléfono.

---

## ⚙️ Instalación y uso local

1. Cloná el repositorio:

   ```bash
   git clone https://github.com/soldiersnake/DH-proyecto-FRONT-END.git
   cd DH-proyecto-FRONT-END
   ```

2. Instalá las dependencias:

   ```bash
   npm install
   ```

3. Agregá tus credenciales de Firebase en el archivo `firebase.ts` o por .env:

   ```ts
   const firebaseConfig = {
     apiKey: import.meta.env.VITE_apiKey,
     authDomain: import.meta.env.VITE_authDomain,
     projectId: import.meta.env.VITE_projectId,
     storageBucket: import.meta.env.VITE_storageBucket,
     messagingSenderId: import.meta.env.VITE_messagingSenderId,
     appId: import.meta.env.VITE_appId,
     measurementId: import.meta.env.VITE_measurementId,
   };
   ```

4. Ejecutá la app localmente:

   ```bash
   npm run dev
   ```

---

## 🐳 Docker & Despliegue local

Este proyecto está preparado para ejecutarse dentro de un contenedor Docker usando Nginx como servidor estático.

### Archivos incluidos:

- Dockerfile: construye la app y copia el contenido de dist a un servidor Nginx.

- docker-compose.yml: define el servicio digital-wallet expuesto en el puerto 3000.

### Pasos para ejecutar:

```bash
   docker-compose up --build
```

Esto ejecutará los siguientes pasos:

- Construcción del proyecto (npm install && npm run build)

- Copiado de archivos a /usr/share/nginx/html

- Exposición en http://localhost:3000

### Verificación

Podés acceder desde tu navegador:

```bash
http://localhost:3000
```

O verificar el estado del contenedor desde Docker Desktop:

- Contenedor: digital-wallet

- Imagen: dh-proyecto-front-end

### Parar contenedor:

```bash
docker-compose down
```

---

## Testing

Los tests fueron implementados usando **Vitest** y **React Testing Library**.

### ¿Qué se testea?

- Renderizado del título del Dashboard y botones:

  - ✅ Verifica que se muestre "Dinero disponible"
  - ✅ El botón "Ver tarjetas" está presente y se puede clickear
  - ✅ El botón "Ingresar dinero" está presente y se puede clickear

- Comportamiento del Login:
  - ✅ Muestra errores de validación si no se completan los campos
  - ✅ Verifica que los mensajes estén definidos por Yup

### Ejecutar los tests

```bash
npx vitest run
```

---

## 🧪 Deploy automático con Vercel

El proyecto está conectado a Vercel para realizar **deploys automáticos** con cada commit a la rama principal. Esto permite un flujo de desarrollo ágil y continuo.

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Dashboard/
│   ├── common/
│   └── pagarServicios/
├── hooks/
├── pages/
├── firebase/
└── AppContent.tsx
```

---

## ✨ Créditos y agradecimientos

Este proyecto fue desarrollado por Mariano Macias [Repositorio](https://github.com/soldiersnake) como solución al proyecto final de Digital House. Agradecimientos especiales a la comunidad de estudiantes y profesores del curso por su ayuda y feedback constante.

## 📝 Licencia

Este proyecto se encuentra bajo la licencia MIT. Libre de usar y modificar con fines educativos o personales.

<div align="center">
  <img src="https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif" alt="Adios" width="600">
</div>
