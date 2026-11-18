#!/usr/bin/env node
/**
 * Publica el sitio en la rama `gh-pages`, que es la que sirve GitHub Pages.
 *
 * Uso:
 *   npm run publicar
 *
 * Qué hace:
 *   1. Compila con el `base` y el `site` de GitHub Pages.
 *   2. Recrea la rama `gh-pages` en un worktree aparte (`.deploy/`).
 *   3. Copia `dist/` allí y hace un commit.
 *   4. Sube esa rama al remoto.
 *
 * Variables opcionales:
 *   ASTRO_BASE      ruta base del sitio      (por defecto /factoria-de-proyectos)
 *   ASTRO_SITE      dominio del sitio        (por defecto https://javiflozano.github.io)
 *   PUBLICAR_REMOTO remoto de git            (por defecto origin)
 */
import { execFileSync } from 'node:child_process';
import { cp, rm } from 'node:fs/promises';
import path from 'node:path';

const raiz = process.cwd();
const deploy = path.join(raiz, '.deploy');
const rama = 'gh-pages';

const entorno = {
  ...process.env,
  ASTRO_BASE: process.env.ASTRO_BASE ?? '/factoria-de-proyectos',
  ASTRO_SITE: process.env.ASTRO_SITE ?? 'https://javiflozano.github.io',
};

const remoto = process.env.PUBLICAR_REMOTO ?? 'origin';

const git = (args, { cwd = raiz, silencioso = false } = {}) =>
  execFileSync('git', args, {
    cwd,
    env: entorno,
    stdio: silencioso ? 'pipe' : 'inherit',
  });

const gitSuave = (args, opciones = {}) => {
  try {
    git(args, { ...opciones, silencioso: true });
    return true;
  } catch {
    return false;
  }
};

console.log(`\n► Compilando (base ${entorno.ASTRO_BASE})…`);
execFileSync(process.execPath, ['scripts/run-astro.mjs', 'build'], {
  cwd: raiz,
  env: entorno,
  stdio: 'inherit',
});

console.log('\n► Recreando la rama de publicación…');
gitSuave(['worktree', 'remove', '--force', deploy]);
await rm(deploy, { recursive: true, force: true });
gitSuave(['branch', '-D', rama]);
git(['worktree', 'add', '--force', '--orphan', '-B', rama, deploy]);

console.log('\n► Copiando el sitio compilado…');
await cp(path.join(raiz, 'dist'), deploy, { recursive: true });

git(['add', '-A'], { cwd: deploy });
git(['commit', '-m', `Publica el sitio (${new Date().toISOString().slice(0, 10)})`], {
  cwd: deploy,
});
git(['push', '--force', remoto, `${rama}:${rama}`], { cwd: deploy });

console.log('\n► Limpiando…');
gitSuave(['worktree', 'remove', '--force', deploy]);
await rm(deploy, { recursive: true, force: true });

console.log('\nListo. GitHub Pages tarda alrededor de un minuto en refrescar.\n');
