# FP2 Factoría de Proyectos

Web pública de difusión de los proyectos del ciclo de Informática del
**IES San Alberto Magno** (Sabiñánigo, Huesca): Grado Medio de Sistemas
Microinformáticos y Redes y Grado Superior de Desarrollo de Aplicaciones
Multiplataforma.

Sitio estático construido con **Astro 7**: cada proyecto es una ficha Markdown
validada con Zod, y los componentes solo pintan lo que hay en esas fichas.

## Puesta en marcha

```powershell
npm install
npm run dev      # http://127.0.0.1:4321
npm run build    # genera dist/
npm run preview  # sirve dist/ para revisarlo
```

No hace falta configurar nada más. Dos detalles del entorno están resueltos en
el repo:

- **`.npmrc`** deja la caché de npm dentro del proyecto (`.npm-cache/`), porque
  la caché global queda fuera del sandbox y provoca `EPERM`.
- **`scripts/run-astro.mjs`** arranca el CLI de Astro con la telemetría
  desactivada, por el mismo motivo (Astro intenta escribir en `%APPDATA%`).

## Estructura

```
src/
  content.config.ts        Colección «proyectos» + esquema Zod
  content/proyectos/*.md   Una ficha por proyecto (el contenido, no el código)
  data/profesorado.ts      Equipo del departamento (⚠️ datos de ejemplo)
  lib/rutas.ts             Enlaces e imágenes con el base del sitio
  components/              ProyectoCard, Carrusel, GaleriaVideos
  layouts/BaseLayout.astro Cabecera, pie y metadatos
  pages/
    index.astro            Portada
    proyectos/index.astro  Catálogo
    proyectos/[slug].astro Ficha
    quienes-somos.astro
    contacto.astro
  styles/global.css        Sistema de diseño (gris y naranja corporativos)
public/
  images/                  Logo, fotos y carteles
  favicon.svg
  .nojekyll                Evita que GitHub Pages procese el sitio con Jekyll
docs/
  TRASPASO.md              Estado del proyecto y decisiones pendientes
  despliegue/              Cómo se publica y workflow de Actions de reserva
scripts/publicar.mjs       Publica en la rama gh-pages
```

## Añadir o editar un proyecto

1. Crea `src/content/proyectos/mi-proyecto.md`.
2. Rellena el frontmatter: `titulo`, `resumen`, `estado` (`destacado` o
   `desarrollo`), `orden`, `ciclos`, `curso`, y opcionalmente `imagen`,
   `galeria`, `videos`, `premios`, `tecnologias` y `enlaces`.
3. Escribe el cuerpo en Markdown. La ficha y la portada se actualizan solas.

El esquema está en `src/content.config.ts`: si falta un campo obligatorio, un
enlace no es una URL válida o un ID de YouTube no tiene 11 caracteres, el build
falla. Es a propósito.

### Vídeos

Se guarda solo el ID de YouTube (lo que va detrás de `watch?v=`):

```yaml
videos:
  - id: 'VjHEy6BqKJI'
    titulo: 'Canfranero 2.0'
```

Se muestran como miniatura con botón de reproducción. El reproductor
(`youtube-nocookie.com`) solo se carga al pulsar, así que la web no activa
cookies de terceros por el simple hecho de visitarla.

## Profesorado

El equipo está en **`src/data/profesorado.ts`**. Ahora mismo las reseñas son de
ejemplo: los nombres son reales, pero cargos y biografías hay que sustituirlos
antes de publicar. Cada persona admite una `foto` en `/public/images/equipo/`;
si no la tiene, se muestran sus iniciales.

## Publicar en GitHub Pages

**Web publicada:** <https://javiflozano.github.io/factoria-de-proyectos/>

Para actualizarla, después de cambiar fichas o imágenes:

```powershell
npm run publicar
```

Compila con el `base` correcto, recrea la rama `gh-pages` y la sube. GitHub Pages
tarda alrededor de un minuto en refrescar.

El detalle del despliegue —y cómo pasarlo a GitHub Actions cuando el token tenga
permiso `workflow`— está en [`docs/despliegue/README.md`](docs/despliegue/README.md).

## Criterios de diseño y contenido

- **Colores**: gris industrial `#303030` y naranja `#e2571e`, tomados del logo.
- **Tipografía**: pila del sistema, sin fuentes externas (funciona sin red).
- **Privacidad**: no se publican nombres ni imágenes identificables del
  alumnado, ni datos del material de corrección.
- **Contenido como datos**: nunca se escribe contenido a mano en un componente.

## Estado

Publicada en GitHub Pages: <https://javiflozano.github.io/factoria-de-proyectos/>.

- Repositorio: <https://github.com/javiflozano/factoria-de-proyectos> (público).
- Rama `main`: código fuente. Rama `gh-pages`: sitio compilado y servido.
- Pendiente: sustituir los datos de ejemplo del profesorado y revisar los textos.
