# 💸 DH Wallet - App de gestión financiera personal

Esta es una aplicación desarrollada como parte del proyecto final del curso de Frontend en Digital House. Permite a los usuarios gestionar su dinero, cargar fondos, pagar servicios, consultar movimientos y administrar sus medios de pago de forma intuitiva y segura.

---

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
   npm install
   npm run dev
   ```
