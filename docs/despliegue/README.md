# Despliegue

La web se publica con **GitHub Pages** en:

**https://javiflozano.github.io/factoria-de-proyectos/**

## Cómo se publica hoy: rama `gh-pages`

GitHub Pages sirve la rama `gh-pages` (carpeta raíz). Para actualizar la web:

```powershell
npm run publicar
```

Ese comando:

1. compila con `base=/factoria-de-proyectos` y `site=https://javiflozano.github.io`;
2. recrea la rama `gh-pages` en un worktree temporal (`.deploy/`, ignorado por git);
3. copia `dist/`, hace un commit y sube la rama.

GitHub Pages tarda alrededor de un minuto en refrescar. El resultado se puede
comprobar en la URL de arriba.

## Por qué no se usa GitHub Actions

El camino «moderno» sería `.github/workflows/deploy.yml` con
`actions/deploy-pages`. Está escrito y probado, pero **el token de GitHub que hay
guardado en este equipo no tiene el permiso `workflow`**, y GitHub rechaza
cualquier push que cree o modifique archivos dentro de `.github/workflows/`:

```
refusing to allow a Personal Access Token to create or update workflow
`.github/workflows/deploy.yml` without `workflow` scope
```

Por eso el workflow se conserva aquí como **`deploy.yml.ejemplo`**, fuera de la
ruta que GitHub vigila.

### Cómo pasarse a Actions (opcional)

1. Dar al token el permiso `workflow` (Settings → Developer settings → Tokens),
   o publicar una vez desde GitHub Desktop, que usa su propia autenticación.
2. Copiar este archivo a `.github/workflows/deploy.yml`:
   `docs/despliegue/deploy.yml.ejemplo` → `.github/workflows/deploy.yml`.
3. En GitHub: **Settings → Pages → Source: GitHub Actions**.
4. A partir de ahí, cada `push` a `main` compila y publica solo; `npm run
   publicar` deja de ser necesario.

## Cambiar de dominio o de nombre de repositorio

El `base` se deduce de `GITHUB_REPOSITORY` en `astro.config.mjs`, y
`scripts/publicar.mjs` usa por defecto `/factoria-de-proyectos`. Para forzar
otros valores:

```powershell
$env:ASTRO_BASE='/'
$env:ASTRO_SITE='https://factoria.ejemplo.com'
npm run publicar
```

Si se usa un dominio propio, además hay que crear el archivo `CNAME` en la raíz
del sitio publicado y configurarlo en GitHub → Settings → Pages.
