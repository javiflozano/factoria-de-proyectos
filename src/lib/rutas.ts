/**
 * Construcción de rutas internas respetando el `base` de Astro.
 *
 * GitHub Pages sirve un repositorio de proyecto en
 * https://usuario.github.io/nombre-del-repositorio/, así que un enlace escrito
 * como «/proyectos/» se rompería. Todo enlace e imagen interna pasa por aquí.
 */
const BASE = import.meta.env.BASE_URL;

export function ruta(camino: string): string {
  const limpio = camino.replace(/^\/+/, '');
  return `${BASE.replace(/\/+$/, '')}/${limpio}`;
}

/** URL absoluta (para canonical, Open Graph, etc.). */
export function absoluta(camino: string): string {
  const sitio = import.meta.env.SITE ?? '';
  return new URL(ruta(camino), sitio || 'http://localhost').href;
}
