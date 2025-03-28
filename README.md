# 💸 DH Wallet - App de gestión financiera personal

Esta es una aplicación desarrollada como parte del proyecto final del curso de Frontend en Digital House. Permite a los usuarios gestionar su dinero, cargar fondos, pagar servicios, consultar movimientos y administrar sus medios de pago de forma intuitiva y segura.

---

## 💎 **[URL Versel](https://dh-proyecto-front-end.vercel.app/)**

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

   3. Agregá tus credenciales de Firebase en el archivo `firebase.ts`:

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
