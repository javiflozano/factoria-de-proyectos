/**
 * Profesorado del departamento de Informática.
 *
 * ⚠️  ESTOS DATOS SON DE EJEMPLO.  ⚠️
 * Los nombres son reales (los facilitó el docente), pero los cargos, las
 * asignaturas y las reseñas están redactados como marcador de posición para
 * poder maquetar la página. Hay que sustituirlos por los definitivos antes de
 * publicar.
 *
 * Cómo editar:
 *   1. Cambia `rol` y `ciclos` por los cargos y ciclos reales.
 *   2. Reescribe `bio` (una o dos frases; el diseño admite hasta ~200 caracteres).
 *   3. Para poner foto, guarda la imagen en `public/images/equipo/<archivo>.jpg`
 *      y añade la ruta en `foto`, por ejemplo:
 *          foto: '/images/equipo/sandra.jpg'
 *      Si no hay `foto`, se muestra un círculo con las iniciales.
 *   4. Si sobra o falta alguien, añade o quita un objeto de la lista.
 *
 * Recuerda: para publicar una fotografía de una persona hace falta su permiso.
 */

export interface Docente {
  nombre: string;
  rol: string;
  ciclos: string[];
  bio: string;
  /** Ruta a la fotografía en /public. Si no existe, se usan las iniciales. */
  foto?: string;
}

export const profesorado: Docente[] = [
  {
    nombre: 'Sandra',
    rol: 'Jefatura del departamento',
    ciclos: ['DAM'],
    bio: 'Coordina el departamento de Informática y da clase en el Grado Superior. Le gusta que los proyectos salgan del aula con usuarios de verdad esperando.',
  },
  {
    nombre: 'Clara',
    rol: 'Redes y sistemas',
    ciclos: ['SMR'],
    bio: 'Sistemas operativos, redes locales y servicios en red. Defiende que antes de programar hay que entender la máquina que hay debajo.',
  },
  {
    nombre: 'Javi M',
    rol: 'Programación',
    ciclos: ['DAM'],
    bio: 'Programación y desarrollo multiplataforma. Especialista en convertir un enunciado ambiguo en una lista de tareas que se puede empezar hoy.',
  },
  {
    nombre: 'Javi F',
    rol: 'Coordinación de la Factoría',
    ciclos: ['SMR', 'DAM'],
    bio: 'Impulsa los proyectos de innovación del centro y lleva la Factoría desde sus inicios. Ha acompañado a varias promociones hasta el premio.',
  },
  {
    nombre: 'Guillem',
    rol: 'Hardware y soporte',
    ciclos: ['SMR'],
    bio: 'Montaje, mantenimiento y atención al usuario. Cree que saber explicar una avería en lenguaje humano es tan importante como arreglarla.',
  },
  {
    nombre: 'Adrián',
    rol: 'Bases de datos y web',
    ciclos: ['DAM'],
    bio: 'Modelado de datos, acceso a datos y desarrollo web. Insiste en que una aplicación se sostiene o se cae por su base de datos.',
  },
  {
    nombre: 'Santiago',
    rol: 'Seguridad informática',
    ciclos: ['SMR'],
    bio: 'Seguridad, copias de respaldo y buenas prácticas. Su primera clase siempre empieza con la misma pregunta: ¿y si esto se rompe?',
  },
];
