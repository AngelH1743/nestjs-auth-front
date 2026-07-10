This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
---

## 🚀 Cambios Recientes (Mejoras de Estabilidad y Rediseño)

Se han realizado modificaciones significativas en el frontend para mejorar la estabilidad y dotar al proyecto de un diseño premium oscuro y glassmórfico.

### 1. Mejoras de Estabilidad (Mejora 2)
* **Solución a Warnings de React en Formularios:**
  * **Problema:** En el formulario de registro, `formData` no inicializaba sus campos. Esto provocaba que los campos tuvieran valor `undefined` al renderizar, haciendo que React lanzara advertencias de consola al escribir (conversión de input *uncontrolled* a *controlled*).
  * **Solución:** Se inicializaron los campos en cadena vacía y se implementaron fallbacks en [components/registerform.js](https://github.com/AngelH1743/nestjs-auth-front/blob/main/components/registerform.js).
* **ID Únicos en Formularios Dinámicos:**
  * **Problema:** Los formularios dinámicos generaban sus IDs usando `registers.length`. Si se eliminaba un formulario del medio, al agregar uno nuevo se duplicaba el ID del último, rompiendo la reconciliación del DOM y duplicando claves en React.
  * **Solución:** Se cambió el esquema de asignación de llaves para usar un ID único compuesto por un timestamp (`Date.now() + Math.random()`).
* **Corrección de Bug en Persistencia local:**
  * **Problema:** En [app/register/page.js](https://github.com/AngelH1743/nestjs-auth-front/blob/main/app/register/page.js), tras registrar usuarios por lote, la vista sobreescribía directamente el `localStorage` de usuarios usando `r.formData`, borrando los atributos `id` y `status` creados por el servicio de autenticación.
  * **Solución:** Se eliminó la sobreescritura redundante en el frontend, delegando correctamente en el servicio.
* **Arreglo de Advertencia useEffect (Exhaustive Deps):**
  * **Problema:** En la edición de usuarios ([app/users/[id]/edit/page.js](https://github.com/AngelH1743/nestjs-auth-front/blob/main/app/users/%5Bid%5D/edit/page.js)), el hook `useEffect` dependía del parámetro `id` pero tenía un arreglo de dependencias vacío `[]`, generando advertencias de compilación.
  * **Solución:** Se añadió `id` al arreglo de dependencias del hook.

### 2. Rediseño Estético (Aesthetics)
* **Estilo Oscuro Glassmorphic Global:** Se actualizó [app/globals.css](https://github.com/AngelH1743/nestjs-auth-front/blob/main/app/globals.css) para establecer un fondo de degradado radial oscuro, variables CSS consistentes, scrollbars modernos, animaciones suaves y contenedores translúcidos con efecto de vidrio (*glassmorphism*).
* **Barra de Navegación Flotante:** Se transformó el menú en un header superior translúcido con efecto de desenfoque (*backdrop-filter*) y un saludo de bienvenida estilizado con texto en degradado.
* **Layouts de Formularios Responsivos:**
  * La pantalla de registro múltiple ahora distribuye las tarjetas en una cuadrícula responsiva (*CSS Grid*), organizando los formularios lado a lado en pantallas grandes.
  * La pantalla de login ahora centra su tarjeta glassmorphic vertical y horizontalmente.
* **Listado de Usuarios Moderno:**
  * La tabla se transformó en una tabla oscura sin bordes pesados, con filas que responden al hover y badges de color según el estado del usuario (activo/inactivo).
  * Los filtros se organizaron en una cuadrícula de dos columnas en lugar de un listado vertical largo.
  * Se añadió un estado vacío (*Empty State*) visualmente agradable que muestra un aviso en caso de que ningún usuario coincida con la búsqueda.
