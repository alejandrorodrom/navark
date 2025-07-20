# Sistema de Diseño - Navark

## 📋 Descripción General

Sistema de diseño simplificado y enfocado en lo esencial para Navark. Proporciona una base sólida con colores, tipografía, espaciado y utilidades básicas.

## 🎨 Paleta de Colores

### Colores Principales
- **Primary**: Azul naval (#3b82f6) - Color principal de la marca
- **Secondary**: Gris azulado (#64748b) - Color secundario
- **Accent**: Cyan (#0ea5e9) - Color de acento

### Estados del Sistema
- **Success**: Verde (#22c55e) - Éxito, victoria, confirmación
- **Error**: Rojo (#ef4444) - Error, derrota, eliminación
- **Warning**: Amarillo (#f59e0b) - Advertencia, pausa
- **Info**: Azul info (#0ea5e9) - Información, scan

### Estados de Juego
- **Waiting**: Esperando jugadores
- **Ready**: Jugador listo
- **Playing**: Partida en progreso
- **Paused**: Juego pausado
- **Finished**: Partida terminada
- **Victory**: Victoria
- **Defeat**: Derrota

## 📐 Espaciado y Tipografía

### Espaciado
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

### Tipografía
- **Familia**: Inter (Google Fonts)
- **Tamaños**: xs, sm, base, lg, xl, 2xl, 3xl
- **Pesos**: normal, medium, semibold, bold

## 🎯 Utilidades Principales

### Fondos
```scss
// Estados de partida
.bg-game-waiting
.bg-game-in-progress
.bg-game-finished

// Estados de jugador
.bg-player-ready
.bg-player-eliminated
.bg-player-winner

// Tipos de disparo
.bg-shot-simple
.bg-shot-cross
.bg-shot-multi
.bg-shot-area
.bg-shot-scan
.bg-shot-nuclear
```

### Texto
```scss
.text-primary
.text-secondary
.text-success
.text-error
.text-warning
.text-info
```

### Layout
```scss
.flex
.grid
.hidden
.block
.relative
.absolute
.fixed
```

### Bordes y Efectos
```scss
.border
.border-primary
.rounded
.shadow
```

## 🔧 Uso

### Importación
```scss
// En tu componente
@import '@/styles/index.scss';
```

### Clases Utilitarias
```html
<!-- Estado de partida -->
<div class="bg-game-waiting text-white p-4 rounded-lg">
  Esperando jugadores...
</div>

<!-- Panel de jugador -->
<div class="bg-card p-4 rounded-lg border border-primary">
  <div class="text-primary font-semibold">Jugador 1</div>
  <div class="text-secondary text-sm">Tu turno</div>
</div>

<!-- Botón de acción -->
<button class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-600">
  Disparar
</button>
```

## 🎨 Personalización

### Variables SCSS
Todas las variables están definidas en:
- `design-system/_colors.scss` - Colores y paleta
- `design-system/_spacing.scss` - Espaciado, tipografía, breakpoints

### Estructura de Archivos
```
src/styles/
├── design-system/
│   ├── _colors.scss      # Paleta de colores
│   └── _spacing.scss     # Espaciado y tipografía
├── base/
│   ├── _fonts.scss       # Configuración de fuentes
│   └── _reset.scss       # Reset CSS
├── utilities/
│   ├── _text.scss        # Utilidades de texto
│   ├── _backgrounds.scss # Utilidades de fondo
│   ├── _layout.scss      # Utilidades de layout
│   └── _borders-effects.scss # Bordes y efectos
└── index.scss            # Archivo principal
```

## 📚 Mejores Prácticas

1. **Usa las clases utilitarias** en lugar de CSS personalizado
2. **Mantén la consistencia** usando la paleta de colores definida
3. **Prioriza la accesibilidad** con contraste adecuado
4. **Sigue el responsive design** usando los breakpoints definidos
5. **Mantén el código simple** - enfócate en lo esencial

## 🔄 Mantenimiento

### Agregar Nuevos Colores
1. Define la variable en `design-system/_colors.scss`
2. Agrega las clases utilitarias en `utilities/_backgrounds.scss`
3. Documenta el uso

### Agregar Nuevas Utilidades
1. Crea el archivo en `utilities/`
2. Importa en `index.scss`
3. Documenta las clases disponibles 