<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Universidad_Evang%C3%A9lica_de_El_Salvador.png?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=original" alt="Logo Institucional" width="150" height="120">

  # CARÁTULA INSTITUCIONAL

  ## **Asignatura:** Programación web 
  ### **Docente:** Ricardo Ernesto Alvarado Martinez 
  ### **Ciclo:** 02-2026

  ---

  ### INTEGRANTES DEL EQUIPO

  | Nombre Completo | CIF |
  | :--- | :---: |
  | Abbie Elena Córdova Cortez | `2025010212` |
  | Edgar Josué Hernández González | `2025011349` |
  | Jacqueline Alicia Bolaños Ramos | `2025010375` |
  ---
</div>

## 1. Resumen Ejecutivo (Propuesta de Rediseño)

Nuestra propuesta de Rediseño se basa en identificar el problema, proponer una solución y obtener beneficios para el desarrollo de nuestro proyecto. 

* **Problema detectado:** El diseño presenta muchos puntos de mejora, principalmente en cuestión de color y contraste en el cual no se cumple lo exigido por WCAG AA y así mismo el diseño está visualmente saturado por la cantidad de elementos agrupados en su mayoría al lado izquierdo del portal actual, como también las variaciones entre tipografías y sus tamaños se vuelven ilegibles y no presentan ninguna jerarquía.
* **Solución propuesta:** Empezamos con  la creación de una paleta de colores basada en la identidad coorporativa de la Universidad que cumple con lo exigido por WCAG AA, luego implementamos un diseño de vistas donde se cumpla un diseño atractivo, limpio y que no está saturado o sobre cargado de elementos.
* **Beneficios clave:** Con este rediseño logramos mayor rapidez, mejor orden visual, facilidad de uso, responsividad.

---

## 2. Instrucciones de Visualización y Ejecución

Guía paso a paso para que el docente o cualquier persona pueda abrir y probar tu proyecto.

### Requisitos Previos
* Necesitas tener instalado [indica si se necesita algún programa, ej: Node.js, Python, o un navegador web actualizado].

### Pasos para la Ejecución
## 3. Instrucciones de Visualización y Ejecución

1. **Descargar el proyecto:** Clona el repositorio o descarga la carpeta en tu computadora.
```bash
   git clone https://github.com/Abbieuees/proyecto-portal-docente-uees
```

2. **Entrar a la carpeta:**
```bash
   cd proyecto-portal-docente-uees
```

3. **Ejecutar o Visualizar:**
   * [Opción A]: Abre el archivo `index.html` en cualquier navegador web haciendo doble clic sobre él.
   * [Opción B — recomendada]: Instala la extensión **Live Server** en VS Code, clic derecho sobre `index.html` → **"Open with Live Server"**.

4. **Navegación:**
   * `index.html` — Pantalla de inicio de sesión del docente.
   * `portal-docente.html` — Panel principal (asignaturas, evaluaciones y carga de calificaciones).

> **Nota:** Esta versión funciona con datos de prueba simulados directamente en `src/js/main.js`, sin conexión activa a una base de datos. El script `docs/script_base_datos.sql` contiene el modelo relacional completo en PostgreSQL.

---

## 3. Historial de Commits Significativos

A continuación se detallan los aportes y cambios más importantes registrados en el sistema de control de versiones por cada miembro del equipo.

### Abbie Elena Córdova Cortez
* **`feat: estructura inicial y carpeta docs`** - Creó las carpetas principales y agrego la carpeta docs.

### Edgar Josué Hernández González
* **`feat: agrego los archvios index y el readme`** - Agrego index.html, portal-docente-uees.html y el readme para nuestro repo.

### Jacqueline Alicia Bolaños Ramos
* **`feat: Agrego la carpeta src`** - En assets agrego dos imagenes del logotipo uees, una para la pantalla de inicio de sesion y otra parael portal.