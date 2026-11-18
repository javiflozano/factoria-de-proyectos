# Traspaso — Factoría de Proyectos

## Documento de origen

El encargo está en el Drive del docente: **«Web Factoría de Proyectos con
Astro»** (Google Doc, `1DCKJAKo9bKYkhjbR3uU2Q70KvtaX1Y_tDWlmIBUUVWI`, carpeta
«Web con Astro»). De ahí salen el mapa de páginas, los colores, el contenido
mínimo y los proyectos.

## Qué es

Web pública de difusión de los proyectos de la FP de Informática del **IES San
Alberto Magno** (Sabiñánigo): Grado Medio de Sistemas Microinformáticos y Redes
(SMR) y Grado Superior de Desarrollo de Aplicaciones Multiplataforma (DAM).

- Marca: **FP2 Factoría de Proyectos**. Logo extraído del documento original.
- Colores: **gris industrial `#303030`** y **naranja `#e2571e`**.
- Contacto: `factoriadeproyectos@iessanalberto.com` · 974 480 179 · Paseo La
  Corona, 2 · 22600 Sabiñánigo (Huesca).

## Estado (18/11/2026)

**Prototipo terminado, preparado para publicar en GitHub Pages.** Todavía no se
ha subido nada a internet.

| Pieza | Estado |
|---|---|
| Repositorio git | `main`, 5 commits, **sin remoto** |
| Proyecto Astro | 7.4.12, TypeScript strict, salida estática |
| Colección de contenido | `proyectos` con esquema Zod (incluye `videos`) |
| Páginas | 5 páginas / 12 rutas |
| Fichas | 8: 5 destacadas + 3 en desarrollo |
| Imágenes | 8 optimizadas, ninguna con personas identificables |
| Vídeos | 8 vídeos de YouTube incrustados bajo demanda |
| Equipo | 7 fichas, **datos de ejemplo** (ver «Pendientes») |
| Build | correcto en local, con base `/` y con base `/factoria-de-proyectos` |
| Publicación | workflow de GitHub Pages listo; **sin ejecutar** |

## Datos confirmados por el docente (18/11/2026)

- **Escape Room Wall Street**: la edición ganada fue la de **diciembre de 2023**,
  curso **2023-2024**. Ya está en la ficha.
- **Hackatón de Valentia**: fue **The Wave** (Huesca). Ya está en la ficha.
- **Vídeos**: los ocho enlaces facilitados, clasificados por proyecto:
  - Canfranero: `SM_Nii7-DmQ`, `VjHEy6BqKJI`, `JmuesiYYpxo`, `99GRPc82k70`.
  - eTIC@: `v6ycGpu44Go`, `fbuZEYsClkM`, `3hmY0XwYgKo`.
  - SMR: `ROF5yxHNzWw`, en «Quiénes somos».
- **Alojamiento**: GitHub Pages.

## Cómo se publica

`astro.config.mjs` deduce el `base` de `GITHUB_REPOSITORY`:

- repositorio `<usuario>.github.io` → se publica en `/`;
- cualquier otro repositorio → se publica en `/<repositorio>/`.

Los enlaces e imágenes internas pasan por `ruta()` (`src/lib/rutas.ts`), así que
funcionan en los dos casos. El despliegue lo hace
`.github/workflows/deploy.yml` en cada `push` a `main`, usando la fuente
«GitHub Actions» de Pages.

## Decisiones pendientes

1. **Publicar**: hace falta cuenta/organización de GitHub, nombre del
   repositorio y visibilidad (público o privado). Crear el remoto y hacer el
   primer `push` requiere confirmación expresa.
2. **Datos del profesorado**: `src/data/profesorado.ts` tiene los nombres reales
   con **cargos y reseñas inventados**. Hay que sustituirlos (o pedir el texto al
   docente) antes de publicar, o publicar sabiendo que son de ejemplo.
3. **Fotografías del equipo**: no hay ninguna. Si se añaden, hacen falta permisos.
4. **Dominio propio**: si se quiere, se configura con `ASTRO_SITE` y `ASTRO_BASE`
   y un `CNAME`; hoy no existe.
5. **Revisión de textos** por el docente: están ampliados con fuentes públicas,
   pero conviene que los valide quien conoce los proyectos.
6. **Consentimiento de imágenes** del alumnado, si se quieren añadir fotos con
   personas (las de la tertulia, el hogar y los premios están descartadas).

## Fuentes consultadas

- Canfranero: [web original en el archivo de Internet](http://web.archive.org/web/20230610013004/https://www.canfranero.com/).
- App VioGen: [Cadena SER](https://cadenaser.com/aragon/2025/06/18/el-ministerio-de-igualdad-puede-implantar-una-aplicacion-del-ies-san-alberto-magno-de-sabinanigo-radio-jaca-ser-pirineos/)
  y [Premio Menina 2025](https://elpirineoaragones.com/2025/11/28/premio-menina-2025-en-aragon-al-ies-san-alberto-magno-de-sabinanigo/).
- eTIC@: [Heraldo](https://www.heraldo.es/noticias/aragon/huesca/2022/05/16/proyecto-ies-san-alberto-magno-sabinanigo-buen-uso-tic-premiado-nivel-nacional-1574842.html)
  y [IV Congreso de Innovación Educativa](https://congresoinnovacion.aragoneducacion.com/wp-content/uploads/2022/09/COMUNICACION-eTIC@-para-un-buen-uso-de-las-TIC.pdf).
- Escape Room Wall Street: [CaixaBank Dualiza](https://www.caixabankdualiza.es/escape-room-wall-street-ii/).
- Valentia: [Ministerio de Inclusión](https://www.inclusion.gob.es/w/el-ministerio-de-inclusion-respalda-a-fundacion-valentia-para-promover-la-inclusion-sociolaboral-de-jovenes-con-trastornos-del-espectro-autista).
- Iglesias del Serrablo: [Amigos de Serrablo](https://www.serrablo.org/).

## Reglas que se han respetado

- Nada publicado: sin remotos, sin deploy, sin DNS.
- Cero nombres de alumnado en la web.
- El material de origen no se ha modificado.
- Contenido en Markdown con Zod; los componentes no llevan texto de proyecto.
