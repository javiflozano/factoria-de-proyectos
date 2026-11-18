#!/usr/bin/env node
/**
 * Lanzador de Astro para este proyecto.
 *
 * Motivo: Astro escribe su configuración de telemetría en
 * %APPDATA%\astro, que queda fuera del workspace y el sandbox bloquea con
 * EPERM. Desactivamos la telemetría por entorno antes de arrancar el CLI,
 * así funciona igual en Windows, Linux y macOS y no hace falta tocar nada
 * del sistema.
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const cli = join(process.cwd(), 'node_modules', 'astro', 'bin', 'astro.mjs');

if (!existsSync(cli)) {
  console.error(
    `No encuentro el CLI de Astro en ${cli}. ¿Has ejecutado "npm install"?`
  );
  process.exit(1);
}

const hijo = spawn(process.execPath, [cli, ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: {
    ...process.env,
    ASTRO_TELEMETRY_DISABLED: '1',
    // Evita que Astro intente escribir su caché fuera del workspace.
    XDG_CONFIG_HOME: process.env.XDG_CONFIG_HOME ?? './.cache',
  },
});

hijo.on('exit', (codigo, senal) => {
  if (senal) {
    process.kill(process.pid, senal);
    return;
  }
  process.exit(codigo ?? 0);
});
