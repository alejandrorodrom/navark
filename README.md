# 🎮 Navark - Frontend

Interfaz de usuario del juego de batalla naval Navark, desarrollada con React, TypeScript y Vite.

## 📋 Índice
- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Sistema de Diseño](#sistema-de-diseño)
- [Contribución](#contribución)

---

## 🎯 Descripción

**Navark** es un juego de batalla naval moderno. Esta aplicación corresponde únicamente al frontend (interfaz de usuario). Para funcionar correctamente, requiere que el backend de NAVARK esté disponible en la URL configurada.

### Características principales
- Juego en tiempo real (WebSockets)
- Diferentes modos de juego y tipos de disparo
- Sistema de diseño escalable y semántico
- Animaciones y transiciones modernas
- Estadísticas y perfil de usuario

---

## 🛠️ Tecnologías

- **React 18**
- **TypeScript**
- **Vite**
- **Sass** (SCSS)
- **Socket.io-client**
- **CSS Modules**
- **ESLint & Prettier**

---

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+

### Pasos
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/navark.git
   cd navark
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura la URL del backend (si es necesario):
   - Edita el archivo de configuración o variable de entorno donde se define la URL del backend (por defecto: `http://localhost:3000`).

---

## 🎮 Uso

### Desarrollo
1. Inicia la aplicación:
   ```bash
   npm run dev
   ```
2. Abre en tu navegador:
   ```
   http://localhost:5173
   ```

### Producción
1. Construye la aplicación:
   ```bash
   npm run build
   ```
2. Sirve la aplicación (opcional):
   ```bash
   npm run preview
   ```

---

## 📁 Estructura del Proyecto

```
navark/
├── src/
│   ├── app/              # Configuración de rutas y lógica principal
│   ├── modules/          # Vistas y lógica de cada módulo (game, home, profile, rooms)
│   ├── shared/           # Componentes y utilidades compartidas
│   ├── styles/           # Sistema de diseño (SCSS)
│   └── ui/               # Componentes de UI reutilizables
└── public/               # Archivos estáticos
```

---

## 🎨 Sistema de Diseño

NAVARK utiliza un sistema de diseño propio basado en Sass, con variables semánticas, utilidades y escalas consistentes.

- **Paleta de colores y espaciado semántico**
- **Utilidades CSS para layout, texto y fondos**
- **Documentación y ejemplos en** [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)

---

## 🤝 Contribución

1. Haz un fork del repositorio
2. Crea una rama para tu feature o fix
3. Sigue las convenciones de código (TypeScript, ESLint, Prettier)
4. Si modificas el sistema de diseño, documenta los cambios en [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)
5. Haz un Pull Request

---

## 📚 Recursos

- [Sistema de Diseño](./DESIGN_SYSTEM.md)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Sass Documentation](https://sass-lang.com/documentation)

---

**Desarrollado con ❤️ para NAVARK**

*Última actualización: Diciembre 2024*
