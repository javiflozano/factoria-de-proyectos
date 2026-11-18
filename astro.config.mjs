import { defineConfig } from 'astro/config';

/**
 * Configuración pensada para GitHub Pages, sin cerrar la puerta a otro alojamiento.
 *
 * - En local, `base` es `/` y todo funciona en http://127.0.0.1:4321/.
 * - En GitHub Actions se deduce solo:
 *   · repositorio `<usuario>.github.io`  → base `/`
 *   · cualquier otro repositorio         → base `/<nombre-del-repositorio>`
 * - Se puede forzar con las variables ASTRO_BASE y ASTRO_SITE (por ejemplo, con
 *   un dominio propio delante de GitHub Pages).
 *
 * Las rutas internas se construyen con `ruta()` (src/lib/rutas.ts), que aplica
 * este `base` a enlaces e imágenes.
 */
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const propietario = process.env.GITHUB_REPOSITORY_OWNER;
const esSitioDeUsuario = repo ? repo.endsWith('.github.io') : false;

const base =
  process.env.ASTRO_BASE ?? (propietario && repo && !esSitioDeUsuario ? `/${repo}` : '/');

const site =
  process.env.ASTRO_SITE ??
  (propietario ? `https://${propietario}.github.io` : undefined);

export default defineConfig({
  output: 'static',
  trailingSlash: 'ignore',
  site,
  base,
  build: {
    format: 'directory',
  },
});
