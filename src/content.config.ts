import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Colección de fichas de proyecto.
 * Cada ficha es un Markdown en src/content/proyectos/. El contenido editable
 * (texto, imágenes, enlaces) vive en el Markdown; los componentes solo pintan.
 */
const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: z.object({
    titulo: z.string().min(3).max(90),
    resumen: z.string().min(20).max(320),
    estado: z.enum(['destacado', 'desarrollo']),
    orden: z.number().int().default(50),
    // Opcional: solo se rellena cuando el dato está confirmado. Nunca se inventa.
    anio: z.number().int().min(2015).max(2100).optional(),
    curso: z.string().optional().describe('Curso o cursos académicos en que se desarrolló'),
    ciclos: z.array(z.string()).min(1),
    imagen: z.string().optional(),
    imagenAlt: z.string().optional(),
    galeria: z
      .array(z.object({ src: z.string(), alt: z.string() }))
      .default([]),
    // Vídeos de YouTube: solo el ID (los 11 caracteres de «watch?v=…»).
    videos: z
      .array(
        z.object({
          id: z
            .string()
            .regex(/^[A-Za-z0-9_-]{11}$/, 'El ID de YouTube debe tener 11 caracteres'),
          titulo: z.string(),
        })
      )
      .default([]),
    premios: z
      .array(
        z.object({
          titulo: z.string(),
          entidad: z.string(),
          anio: z.number().int().optional(),
        })
      )
      .default([]),
    tecnologias: z.array(z.string()).default([]),
    enlaces: z
      .array(z.object({ titulo: z.string(), url: z.string().url() }))
      .default([]),
  }),
});

export const collections = { proyectos };
