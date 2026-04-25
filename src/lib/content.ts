// Central content registry. All paths are served from /content (symlinked to
// ../Content at the repo root).

export const CONTENT = "https://pub-4f187147d5944be3bd202f678456c5d4.r2.dev/cosas-reales-content";

export const LOGO = `${CONTENT}/0_Logos/Cosas Reales - Signature Logo - Blue Filled.svg`;
export const LOGO_WHITE = `${CONTENT}/0_Logos/Cosas Reales - Signature Logo - White.png`;
export const LOGO_C_SOLA = `${CONTENT}/0_Logos/Cosas Reales - logo - C sola - white.png`;
export const ORACLE_MARK = `${CONTENT}/0_Logos/${encodeURIComponent("Oráculo + Cosas Reales.png")}`;
export const MANIFESTO_CIRCLE = {
  es: `${CONTENT}/graphics/Manifesto Circle Loop_ES.png`,
  en: `${CONTENT}/graphics/Manifesto Circle Loop_EN.png`,
};
export const CONTACT_CIRCLE = {
  es: `${CONTENT}/graphics/${encodeURIComponent("Contact Me CIRCLE LOOP_ES.png")}`,
  en: `${CONTENT}/graphics/${encodeURIComponent("Contact Me CIRCLE LOOP_EN.png")}`,
};
export const FUN_GRAPHIC = `${CONTENT}/3_About Me/${encodeURIComponent("Fun Graphic.png")}`;
export const NAME_CIRCLE = `${CONTENT}/3_About Me/${encodeURIComponent("NAME CIRCLE LOOP.png")}`;
export const CONTACT_PORTRAIT = `${CONTENT}/5_Contact Me/sam.png`;
export const CV_PDF = `${CONTENT}/3_About Me/CV - Samuel Martos - 2026.pdf`;

export const LINKS = {
  newsletter: "https://substack.com/@cosasreales",
  instagram: "https://www.instagram.com/samuelmartos_/",
  email: "sam@cosas-reales.com",
  laMesa: "/la-mesa",
  cdi: "https://creadoresdeimagenes.com",
};

// -- Oracle -----------------------------------------------------------------

export const ORACLE_FAVORED = {
  es: "¿DÓNDE UBICÁS TU DESEO?",
  en: "WHERE DO YOU PLACE YOUR DESIRE?",
};

// -- Home Screen ------------------------------------------------------------

const ORACLE_FILES: [number, string][] = [
  [1, "jpeg"], [2, "png"], [3, "png"], [4, "png"], [5, "png"], [6, "png"],
  [7, "png"], [8, "png"], [9, "png"], [10, "JPG"], [11, "JPG"], [12, "JPG"],
  [13, "JPG"], [14, "jpeg"], [15, "jpeg"], [16, "jpeg"], [17, "jpeg"],
  [18, "JPG"], [19, "jpeg"], [20, "jpeg"], [21, "jpeg"], [22, "jpeg"],
  [23, "jpg"], [24, "JPG"], [25, "JPG"], [26, "JPG"], [27, "jpg"],
  [28, "jpeg"], [29, "jpeg"], [30, "jpeg"], [31, "jpeg"], [32, "jpeg"],
  [33, "JPG"], [34, "JPG"], [35, "JPG"], [36, "png"], [37, "jpeg"],
  [38, "jpeg"], [39, "jpeg"], [40, "jpeg"], [41, "jpeg"], [42, "jpg"],
  [43, "jpeg"], [44, "jpeg"], [45, "jpeg"], [46, "jpeg"], [47, "jpg"],
  [48, "jpeg"], [49, "jpeg"], [50, "jpeg"], [51, "jpg"], [52, "jpeg"],
  [53, "jpeg"], [54, "jpeg"], [55, "jpeg"], [56, "jpeg"], [57, "jpeg"],
  [58, "jpeg"], [59, "jpeg"], [60, "jpeg"], [61, "jpeg"], [62, "jpeg"],
  [63, "jpeg"], [64, "jpeg"], [65, "jpeg"], [66, "jpeg"], [67, "jpeg"],
  [68, "jpeg"], [69, "jpeg"], [70, "jpeg"], [71, "jpeg"], [72, "jpeg"],
  [73, "jpeg"], [74, "jpeg"], [75, "jpeg"], [76, "jpeg"], [77, "jpeg"],
  [78, "jpeg"], [79, "jpeg"], [80, "jpeg"], [81, "jpeg"], [82, "jpeg"],
  [83, "jpeg"], [84, "jpeg"], [85, "jpeg"], [86, "jpeg"], [87, "jpeg"],
  [88, "jpeg"], [89, "jpeg"], [90, "jpeg"], [91, "jpeg"], [92, "jpeg"],
  [93, "jpeg"], [94, "jpeg"], [95, "jpeg"], [96, "jpeg"],
];

export const HOME_IMAGES = ORACLE_FILES.map(
  ([n, ext]) =>
    `${CONTENT}/1_Landing Page/Oracle Images/${encodeURIComponent(`${n}_oracle and landing.${ext}`)}`,
);

export const ORACLE_IMAGES = HOME_IMAGES;

// Faces shown in the top-right (link to About Me).
export const FACES = [
  `${CONTENT}/3_About Me/${encodeURIComponent("Imagen de Sam.png")}`,
];

// Pre-cut horizontal 4-face strip used in the header next to "Samuel Martos".
export const SAM_STRIP = `${CONTENT}/0_Logos/Samuel Martos.png`;

// -- Personal projects (Lo Que Hago / What I Do) ---------------------------

export interface PersonalProject {
  slug: string;
  title: { es: string; en: string };
  folder: string;
  cover: string;
  year: string;
  subtitle: { es: string; en: string };
  longText: { es: string; en: string };
  images?: string[];
  btsImages?: string[];
  miniatura?: string;
  videoUrl?: string;
}

const TRAPEGEL_IMAGES = [
  "subcover_.jpeg",
  "Hero_TRAPEGEL.gif",
  "Cover_TRAREPEGEL_1.jpeg",
  "TRAREPEGEL_2.jpeg",
  "TRAREPEGEL_3.jpeg",
  "TRAREPEGEL_4.jpg",
  "TRAREPEGEL_5.jpeg",
  "TRAREPEGEL_6.jpeg",
  "TRAREPEGEL_7.jpeg",
  "TRAREPEGEL_8.jpeg",
  "TRAREPEGEL_9.jpg",
  "TRAREPEGEL_10.jpeg",
  "TRAREPEGEL_11.jpeg",
  "TRAREPEGEL_12.jpeg",
  "TRAREPEGEL_13.jpg",
  "TRAREPEGEL_14.jpeg",
  "TRAREPEGEL_15.jpeg",
  "TRAREPEGEL_16.jpeg",
  "TRAREPEGEL_17.jpeg",
  "TRAREPEGEL_18.jpeg",
  "TRAREPEGEL_19.jpeg",
  "TRAREPEGEL_20.jpeg",
  "TRAREPEGEL_21.jpeg",
  "TRAREPEGEL_22.jpeg",
  "TRAREPEGEL_23.jpeg",
  "TRAREPEGEL_24.jpeg",
  "TRAREPEGEL_25.jpeg",
  "TRAREPEGEL_26.jpeg",
  "TRAREPEGEL_27.jpeg",
  "TRAREPEGEL_28.jpeg",
  "TRAREPEGEL_29.jpeg",
  "TRAREPEGEL_30.jpeg",
  "TRAREPEGEL_31.jpeg",
  "TRAREPEGEL_32.jpeg",
  "TRAREPEGEL_33.jpeg",
  "TRAREPEGEL_34.jpeg",
  "TRAREPEGEL_35.jpeg",
  "TRAREPEGEL_36.jpeg",
  "TRAREPEGEL_37.jpeg",
  "TRAREPEGEL_38.jpeg",
  "TRAREPEGEL_39.jpeg",
  "TRAREPEGEL_40.jpeg",
  "TRAREPEGEL_41.jpeg",
  "TRAREPEGEL_42.jpeg",
  "TRAREPEGEL_43.jpeg",
  "TRAREPEGEL_45.jpeg",
  "TRAREPEGEL_46.jpeg",
  "TRAREPEGEL_47.jpeg",
  "TRAREPEGEL_48.jpeg",
  "TRAREPEGEL_49.jpeg",
];

const TRAPEGEL_TEXT_ES = `Escribir diarios, para todo, es una forma de darle ritmo a los acontecimientos. Este fotolibro es un diario de viajes. De sincronías. De habitar espacios nuevos y detenerse a observarlos. Hacerlo me reveló muchas cosas de mi forma de mirar y retratar espacios callejeros.

Este cuerpo de trabajo es un trabajo de archivo sobre dos viajes, uno a Estados Unidos (Nueva York) y otro a Brasil (São Paulo y Río de Janeiro). Meses de distancia entre un viaje y otro, sin embargo, destellos de sincronía me revelaron algo de mi manera de mirar. El ritmo de otras ciudades y el tiempo que me llevó ajustarme provocó una fricción que me mostró el contraste entre la belleza del mundo y la vanidad que el teléfono nos induce.

Hacer fotolibros es un acto de resistencia en estas épocas de supremacía digital. La maqueta está impresa en papel sulfito, similar al diario. Permite que cuando se toca la hoja aparezca una sensación de novedad y nostalgia. Ya no acostumbramos a tocar fotos. El papel, frágil y rugoso al tacto, ofrece una resistencia que permite que nazca un comentario sobre el ritmo en el que consumimos imágenes en la era digital. Un contraste con la era en la que las historias de viaje se convirtieron en stories que duran 24 horas en una red social, recuerdos que desaparecen antes de ser procesados.

La tapa y la contratapa parecen invertidas en orden, primero se lee "ES GENTE EN LUGARES" aunque abierto el nombre completo se revela como "TU RESPUESTA A ROBOTS EN PANTALLAS ES GENTE EN LUGARES". Es una manera de recordarme a mí mismo hacia qué direcciones debo girar la mirada. Es un recordatorio de que el tiempo pasa y la experiencia es el recuerdo. De que sólo nosotros tenemos la posibilidad de encarnar y habitar un espacio. Me pregunto mucho hacia dónde nos llevará el desarrollo de la inteligencia artificial, pero por ahora, en mis fotografías sólo veo personas. Los robots aún no llegaron.`;

const TRAPEGEL_TEXT_EN = `Keeping diaries, for everything, is a way of giving rhythm to events. This photobook is a travel diary. Of synchronicities. Of inhabiting new spaces and stopping to observe them. Doing it revealed many things to me about how I look at and portray street spaces.

This body of work is an archival project on two trips, one to the United States (New York) and another to Brazil (São Paulo and Rio de Janeiro). Months apart between one trip and the other, yet flashes of synchronicity revealed something about my way of seeing. The rhythm of other cities, and the time it took me to adjust, created a friction that showed me the contrast between the beauty of the world and the vanity that the phone induces in us.

Making photobooks is an act of resistance in these times of digital supremacy. The dummy is printed on sulphite paper, similar to newsprint. When you touch the page, a sense of newness and nostalgia appears. We're no longer used to touching photographs. The paper, fragile and rough to the touch, offers a resistance that gives rise to a comment about the rhythm at which we consume images in the digital era. A contrast with the era when travel stories became "stories" that last 24 hours on a social network — memories that vanish before they can be processed.

The front and back covers seem inverted in order: you first read "IS PEOPLE IN PLACES," and only when opened does the full name reveal itself as "YOUR ANSWER TO ROBOTS ON SCREENS IS PEOPLE IN PLACES." It's a way of reminding myself which directions I should turn my gaze toward. A reminder that time passes and experience is memory. That only we have the possibility of embodying and inhabiting a space. I often wonder where the development of artificial intelligence will take us, but for now, in my photographs I only see people. The robots haven't arrived yet.`;

export const PERSONAL_PROJECTS: PersonalProject[] = [
  {
    slug: "untitled-water-project",
    title: { es: "UNTITLED\nWATER PROJECT", en: "UNTITLED\nWATER PROJECT" },
    folder: "1_Untitled Water Project",
    cover: "Cover_Untitled Water Project.jpg",
    year: "2026",
    subtitle: { es: "Work In Progress", en: "Work In Progress" },
    images: ["Cover_Untitled Water Project.jpg"],
    longText: {
      es: `Este es un proyecto en curso.
Se encuentra en desarrollo.`,
      en: `This is an ongoing project.
It is currently in development.`,
    },
  },
  {
    slug: "toda-agua-de-los-lagos",
    title: {
      es: "TODA EL AGUA\nDE LOS LAGOS",
      en: "ALL THE WATER\nOF THE LAKES",
    },
    folder: "2_Toda el agua de los lagos",
    cover: "Cover_TEADLL.gif",
    year: "2026",
    subtitle: { es: "Secuencia de Fotografías", en: "Photo Sequence" },
    images: ["Cover_TEADLL.gif"],
    miniatura: "miniatura_TEADLL.png",
    longText: {
      es: `En Febrero de 2026 presencié cómo un helicóptero
sobrevolaba el Lago Gutiérrez en Bariloche para ir a
buscar agua.

Iba y venía. 5 minutos era lo que tarda en hacerlo.
Venía, agarraba miles de litros de agua, se iba, la tiraba,
y de nuevo a empezar.

Mientras presenciaba el momento pensaba en un loop de
imágenes. Los vecinos no se notaban alterados. En la
Patagonia los incendios forestales e intencionales se han
vuelto habituales.

La anestesia de la rutina.

Decidí convertir la secuencia de imágenes
en un loop interminable.`,
      en: `In February 2026 I watched a helicopter fly over Lake Gutiérrez in Bariloche to fetch water.

It came and went. Five minutes was all it took.
It would come, grab thousands of liters of water, leave, drop it, and start again.

While I watched I was thinking in a loop of images. The neighbors seemed unaltered. In Patagonia, forest and intentional fires have become routine.

The anesthesia of routine.

I decided to turn the sequence of images into an endless loop.`,
    },
  },
  {
    slug: "robots-en-pantallas",
    title: {
      es: "TU RESPUESTA A ROBOTS EN\nPANTALLAS ES GENTE EN LUGARES",
      en: "YOUR ANSWER TO ROBOTS ON\nSCREENS IS PEOPLE IN PLACES",
    },
    folder: "3_Tu Respuesta a Robots en Pantallas es Gente en Lugares",
    cover: "subcover_.jpeg",
    year: "2025",
    subtitle: {
      es: "Serie Fotográfica\nProyecto de Fotolibro",
      en: "Photo Series\nPhotobook Project",
    },
    images: TRAPEGEL_IMAGES,
    btsImages: [
      "bts/bts_1_TRAPEGEL.jpg",
      "bts/bts_2_TRAPEGEL.jpg",
      "bts/bts_3_TRAPEGEL.JPEG",
    ],
    longText: { es: TRAPEGEL_TEXT_ES, en: TRAPEGEL_TEXT_EN },
  },
  {
    slug: "manifesto-project",
    title: { es: "MANIFIESTO", en: "MANIFESTO" },
    folder: "4_Manifesto",
    cover: "Cover_manifesto_0.png",
    year: "2025",
    subtitle: { es: "Serie de Fotografías", en: "Photo Series" },
    images: [
      "manifesto_1.jpg",
      "manifesto_2.jpg",
      "manifesto_3.jpg",
      "manifesto_4.jpg",
      "manifesto_5.jpg",
      "manifesto_6.jpg",
      "manifesto_7.jpg",
      "manifesto_8.jpg",
      "manifesto_9.jpg",
      "manifesto_10.jpg",
    ],
    longText: {
      es: `Secuencia de fotografías tomadas el 16 de Septiembre
de 2025 en la Plaza de Congreso, Buenos Aires.

Ese día se llevó a cabo la 3° Marcha Federal Universitaria
contra el veto del Presidente Javier Milei a la Ley de
Financiamiento Universitario.

Presencié el momento en que el congreso votaba a favor
de rechazar el veto del Presidente. Registré la
expresividad y la intimidad de las manos entre la multitud.

—
"La Ley de Financiamiento Universitario contempla las partidas presupuestarias necesarias para que las universidades nacionales puedan seguir funcionando. Define de dónde provienen los fondos, no crea nuevos impuestos y no compromete el equilibrio fiscal. Por el contrario, busca recomponer los salarios de docentes y nodocentes, garantizar un presupuesto adecuado para el funcionamiento de las instituciones, asegurar becas y recuperar la inversión en investigación." Texto de una.edu.ar`,
      en: `Sequence of photographs taken on September 16, 2025 at Plaza de Congreso, Buenos Aires.

That day the 3rd Federal University March took place against President Javier Milei's veto of the University Financing Law.

I witnessed the moment the congress voted to reject the President's veto. I recorded the expressiveness and intimacy of the hands in the crowd.

—

"The University Financing Law provides the budget allocations necessary for national universities to keep operating. It defines where the funds come from, does not create new taxes and does not compromise fiscal balance. On the contrary, it seeks to restore teachers' and non-teachers' salaries, guarantee an adequate budget for the institutions, secure scholarships and recover investment in research." Text from una.edu.ar`,
    },
  },
  {
    slug: "como-no-volverse-uno-mismo",
    title: {
      es: "CÓMO (NO) VOLVERSE\nUNO MISMO",
      en: "HOW (NOT) TO BECOME\nONESELF",
    },
    folder: "5_Como (no) volverse uno mismo",
    cover: "Mapa_final.gif?v=2",
    year: "2025",
    subtitle: { es: "Mini Fotolibro", en: "Mini Photobook" },
    images: ["Cover_Mapa.png", "Mapa_final.gif"],
    longText: {
      es: `Secuencia de fotografías de mi archivo personal y textos
de mis notas y diarios, unidos por un anillo.

Esta pieza es el resultado de un ejercicio que hicimos en
Creadores de Imágenes, en el que teníamos como
objetivo crear un mapa que revele algo de quienes somos.`,
      en: `Sequence of photographs from my personal archive and texts from my notes and diaries, bound by a ring.

This piece is the result of an exercise we did at Creadores de Imágenes, where the objective was to create a map that reveals something of who we are.`,
    },
  },
  {
    slug: "autos-de-mi-papa",
    title: {
      es: "LOS AUTOS\nDE MI PAPÁ",
      en: "MY FATHER'S\nCARS",
    },
    folder: "6_Los autos de mi papa",
    cover: "Cover_LADMP_1.png",
    year: "2025",
    subtitle: { es: "Serie de Ilustraciones", en: "Illustration Series" },
    images: ["LADMP_1.png", "LADMP_2.jpeg", "LADMP_3.jpeg"],
    longText: {
      es: `Mi papá fue corredor de autos de carrera y mecánico,
entre otras cosas.

La camionetita roja es una ilustración de un juguete que
aún sigue teniendo. El resto son autos que construyó él
con sus propias manos, para que otros puedan correr.

Es un hobbie, un oficio, un trabajo. Crear autos, digo.
Ilustrar tal vez también.`,
      en: `My dad was a race car driver and mechanic, among other things.

The little red truck is an illustration of a toy he still owns. The rest are cars he built with his own hands, so that others could race them.

It's a hobby, a trade, a job. Building cars, I mean. Illustrating maybe too.`,
    },
  },
  {
    slug: "preguntas-que-me-hicieron",
    title: {
      es: "LAS PREGUNTAS\nQUE ME HICIERON",
      en: "THE QUESTIONS\nTHEY ASKED ME",
    },
    folder: "7_Las preguntas que me hicieron",
    cover: "Cover_LPQMH.jpeg",
    year: "2025",
    subtitle: { es: "Ilustración Digital", en: "Digital Illustration" },
    images: ["Cover_LPQMH.jpeg"],
    longText: {
      es: `Ilustración de preguntas anónimas que me regalaron mis
compañerxs de Creadores de Imágenes 2025
luego de un ejercicio de referencias.

Las pasé por mi puño y letra para encuadrarlas juntas.
Para ver qué me quieren decir.`,
      en: `Illustration of anonymous questions gifted to me by my peers at Creadores de Imágenes 2025 after a references exercise.

I wrote them out in my own handwriting to frame them together. To see what they want to tell me.`,
    },
  },
  {
    slug: "lata-de-tomate-importado",
    title: {
      es: "LA LATA\nDE TOMATE IMPORTADO",
      en: "THE IMPORTED\nTOMATO CAN",
    },
    folder: "8_La lata de tomate importado",
    cover: "Cover_LLDTI_0.png",
    year: "2025",
    subtitle: { es: "Ilustración Digital", en: "Digital Illustration" },
    images: [
      "LLDTI_1.png",
      "LLDTI_2.png",
      "LLDTI_3.png",
      "LLDTI_4.png",
      "LLDTI_5.png",
    ],
    longText: {
      es: `Un día en el Jumbo me encontré una lata de Campbells.
Era un momento en el que en Argentina me seguía
sorprendiendo encontrar estas cosas importadas.

¿Jugo de tomate importado?
En mi casa una vez creció una planta enorme de tomate
sin que nadie la plante. Eran riquísimos.

Ilustré la lata como hizo Andy Warhol, o sea no tal cual
porque yo la ilustré con el iPad y él la pintó con pintura.`,
      en: `One day at the Jumbo I came across a can of Campbell's. It was a time in Argentina where I was still surprised to find imported things like that.

Imported tomato juice?
Once, at home, an enormous tomato plant grew without anyone planting it. They were delicious.

I illustrated the can the way Andy Warhol did, well not exactly the same because I drew it on the iPad and he painted it with paint.`,
    },
  },
  {
    slug: "summer-project-de-invierno",
    title: {
      es: "EL SUMMER PROJECT\nDE INVIERNO",
      en: "THE WINTER\nSUMMER PROJECT",
    },
    folder: "9_El summer project de invierno",
    cover: "Cover_ESPDI.png",
    year: "2024",
    subtitle: { es: "Video Ensayo", en: "Video Essay" },
    videoUrl: "https://youtu.be/rvrr8W9Ga8M",
    longText: {
      es: `Una jefa que tuve nos propuso hacer un ejercicio sobre
nuestro verano, aunque para mí era invierno porque vivo
en Argentina y ella en otro país.

Del ejercicio salió esta pieza audiovisual en el que cada
cosa está encima de la otra, en la que cada recuerdo está
bastante caótico pero distinguible al fín.`,
      en: `A boss I had proposed an exercise about our summer, though for me it was winter because I live in Argentina and she in another country.

Out of the exercise came this audiovisual piece in which everything is on top of everything else, in which each memory is fairly chaotic but distinguishable in the end.`,
    },
  },
];

export const personalProjectPath = (p: PersonalProject, file: string) => {
  const [name, query] = file.split("?");
  const q = query ? `?${query}` : "";
  return `${CONTENT}/6_What I do/${encodeURIComponent(p.folder)}/${encodeURIComponent(name)}${q}`;
};

// -- Archive ---------------------------------------------------------------

export interface ArchiveItem {
  year: string;
  name: { es: string; en: string };
  where: { es: string; en: string };
  what: { es: string; en: string };
  role: { es: string; en: string };
  folder?: string;
  image?: string;
  images?: string[];
  link?: string;
}

const A = `${CONTENT}/7_The Archive`;

export const ARCHIVE: ArchiveItem[] = [
  {
    year: "2026",
    name: { es: "MATCH", en: "MATCH" },
    where: { es: "TESIS", en: "THESIS" },
    what: { es: "CORTOMETRAJE", en: "SHORT FILM" },
    role: { es: "PRODUCTOR", en: "PRODUCER" },
    folder: "1_Match",
    image: "Match.jpeg",
  },
  {
    year: "2025",
    name: { es: "TANYA VISUALIZER", en: "TANYA VISUALIZER" },
    where: { es: "DIVERSIÓN", en: "FUN" },
    what: { es: "SPOTIFY VISUALIZER", en: "SPOTIFY VISUALIZER" },
    role: { es: "CREADOR", en: "CREATOR" },
    folder: "2_Tanya",
    image: "TANYA.gif",
  },
  {
    year: "2024",
    name: { es: "MAGNOLIAS", en: "MAGNOLIAS" },
    where: { es: "DIVERSIÓN", en: "FUN" },
    what: { es: "ILUSTRACIÓN", en: "ILLUSTRATION" },
    role: { es: "ILUSTRADOR", en: "ILLUSTRATOR" },
    folder: "3_Magnolias",
    image: "Magnolias_1.png",
    images: ["Magnolias_1.png", "Magnolias_2.png"],
  },
  {
    year: "2024",
    name: { es: "LA MARCHA DEL ORGULLO", en: "PRIDE MARCH" },
    where: { es: "TRABAJO", en: "WORK" },
    what: { es: "POSTER & FOTOGRAFÍAS", en: "POSTER & PHOTOGRAPHY" },
    role: { es: "FOTÓGRAFO & DISEÑADOR", en: "PHOTOGRAPHER & DESIGNER" },
    folder: "4_Marcha del Orgullo",
    image: "1_DEPT_Orgullo_high-res.png",
    images: [
      "1_DEPT_Orgullo_high-res.png",
      "2_DSC02485.JPG",
      "3_DSC02504 2.JPG",
      "4_IMG_5061 2.jpg",
    ],
  },
  {
    year: "2024",
    name: { es: "LA GORRA DE JUAN ROMÁN", en: "JUAN ROMÁN'S CAP" },
    where: { es: "TRABAJO", en: "WORK" },
    what: { es: "UNA GORRA", en: "A CAP" },
    role: { es: "PRODUCTOR", en: "PRODUCER" },
    folder: "5_La Gorra de Juan Romá",
    image: "LGDJR_1.png",
    images: ["LGDJR_1.png", "LGDJR_2.png", "LGDJR_3.JPEG"],
  },
  {
    year: "2022",
    name: { es: "CYBORG DREAMS", en: "CYBORG DREAMS" },
    where: { es: "FACULTAD", en: "UNIVERSITY" },
    what: { es: "VIDEO EXPERIMENTAL", en: "EXPERIMENTAL VIDEO" },
    role: { es: "AUTOR", en: "AUTHOR" },
    folder: "6_Cyborg Dreams",
    link: "https://youtu.be/EAuMPoSn5S4",
  },
  {
    year: "2021",
    name: { es: "ALIMENTAR LO NUESTRO", en: "FEEDING OUR OWN" },
    where: { es: "FACULTAD", en: "UNIVERSITY" },
    what: { es: "PILOTO DE TV", en: "TV PILOT" },
    role: { es: "PRODUCTOR/EDITOR", en: "PRODUCER/EDITOR" },
    folder: "7_Alimentar lo Nuestro",
    link: "https://youtu.be/sUXsralDLdU",
  },
  {
    year: "2020",
    name: { es: "OTEO", en: "OTEO" },
    where: { es: "FACULTAD", en: "UNIVERSITY" },
    what: { es: "VIDEO ENSAYO", en: "VIDEO ESSAY" },
    role: { es: "AUTOR", en: "AUTHOR" },
    folder: "8_Oteo",
    link: "https://youtu.be/NfF6toXesy0",
  },
  {
    year: "2020",
    name: { es: "NOSTALGIA DE CUARENTENA", en: "QUARANTINE NOSTALGIA" },
    where: { es: "FACULTAD", en: "UNIVERSITY" },
    what: { es: "VIDEO ENSAYO", en: "VIDEO ESSAY" },
    role: { es: "AUTOR", en: "AUTHOR" },
    folder: "9_Nostlagia de Cuarentena",
    link: "https://youtu.be/q_mC5RSDmRE",
  },
  {
    year: "2019",
    name: { es: "NUBIA", en: "NUBIA" },
    where: { es: "FACULTAD", en: "UNIVERSITY" },
    what: { es: "CORTOMETRAJE", en: "SHORT FILM" },
    role: { es: "CO-DIRECTOR & CO-CREADOR", en: "CO-DIRECTOR & CO-CREATOR" },
    folder: "10_Nubia",
    link: "https://vimeo.com/419359060?fl=pl&fe=sh",
  },
];

export const archivePath = (folder: string, file: string) =>
  `${A}/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;

// -- Work (client) ---------------------------------------------------------

export interface WorkItem {
  slug: string;
  year: string;
  client: string;
  agency: string;
  role: { es: string; en: string };
  description: { es: string; en: string };
  folder: string;
  isGoogle?: boolean;
}

export const WORK: WorkItem[] = [
  {
    slug: "fifa-world-cup-26",
    year: "2025-2026",
    client: "FIFA WORLD CUP 26™",
    agency: "DEPT®",
    role: { es: "SR. ART DIRECTOR", en: "SR. ART DIRECTOR" },
    description: {
      es: "Activaciones digitales para los socios comerciales globales de FIFA World Cup 2026™.",
      en: "Digital activations for the global commercial partners of the FIFA World Cup 2026™.",
    },
    folder: "1_FIFA World Cup 26",
  },
  {
    slug: "illy",
    year: "2025",
    client: "ILLY COFFEE",
    agency: "DEPT®",
    role: { es: "SR. ART DIRECTOR", en: "SR. ART DIRECTOR" },
    description: {
      es: "Playbook para reposicionar a illy como el café preferido de los estudiantes en universidades de USA.",
      en: "Playbook to reposition illy as the coffee of choice for US university students.",
    },
    folder: "3_illy Coffee",
  },
  {
    slug: "twitch",
    year: "2025",
    client: "TWITCH",
    agency: "DEPT®",
    role: { es: "SR. ART DIRECTOR", en: "SR. ART DIRECTOR" },
    description: {
      es: "Diseño narrativo de la presentación para reinventar el rol de Twitch en Social.",
      en: "Narrative design of the deck to reinvent Twitch's role on social.",
    },
    folder: "4_Twitch",
  },
  {
    slug: "figma",
    year: "2024",
    client: "FIGMA",
    agency: "DEPT®",
    role: { es: "SR. ART DIRECTOR", en: "SR. ART DIRECTOR" },
    description: {
      es: "Meta-diseño para presentar una estrategia de comunicación y media.",
      en: "Meta-design for pitching a comms and media strategy.",
    },
    folder: "5_Figma",
  },
  {
    slug: "google-for-startups",
    year: "2024",
    client: "GOOGLE FOR STARTUPS",
    agency: "DEPT®",
    role: { es: "SR. ART DIRECTOR", en: "SR. ART DIRECTOR" },
    description: {
      es: "Serie documental y podcast para ayudar a los fundadores de Startups a conectar con los servicios de Google.",
      en: "Documentary series and podcast to help startup founders connect with Google's services.",
    },
    folder: "6_Google for Startups",
    isGoogle: true,
  },
  {
    slug: "mubi",
    year: "2024",
    client: "MUBI",
    agency: "BROTHER AD SCHOOL",
    role: { es: "ART DIRECTOR", en: "ART DIRECTOR" },
    description: {
      es: "Campaña por amor al cine argentino.",
      en: "A campaign for the love of Argentine cinema.",
    },
    folder: "7_Mubi",
  },
  {
    slug: "grammarly",
    year: "2024",
    client: "GRAMMARLY",
    agency: "DEPT®",
    role: { es: "DESIGNER", en: "DESIGNER" },
    description: {
      es: "Campañas mensuales de paid media para Grammarly.",
      en: "Monthly paid media campaigns for Grammarly.",
    },
    folder: "9_Grammarly",
  },
  {
    slug: "turks-caicos",
    year: "2024",
    client: "TURKS & CAICOS",
    agency: "DEPT®",
    role: { es: "DESIGNER", en: "DESIGNER" },
    description: {
      es: "Rebranding y diseño narrativo para Visit Turks & Caicos Islands.",
      en: "Rebranding and narrative design for Visit Turks & Caicos Islands.",
    },
    folder: "8_Turks & Caicos",
  },
  {
    slug: "google-io",
    year: "2024",
    client: "GOOGLE I/O",
    agency: "DEPT®",
    role: { es: "DESIGNER", en: "DESIGNER" },
    description: {
      es: "Contenido para redes sociales para el evento anual de Google.",
      en: "Social content for Google's annual event.",
    },
    folder: "11_Google I:O",
    isGoogle: true,
  },
  {
    slug: "audi",
    year: "2023",
    client: "AUDI",
    agency: "DEPT®",
    role: { es: "DESIGNER / ART DIRECTOR", en: "DESIGNER / ART DIRECTOR" },
    description: {
      es: "Campaña de paid media para el lanzamiento del Audi Q5.",
      en: "Paid media campaign for the launch of the Audi Q5.",
    },
    folder: "12_Audi",
  },
  {
    slug: "spotify",
    year: "2023-2025",
    client: "SPOTIFY",
    agency: "DEPT®",
    role: { es: "PRODUCTION DESIGNER", en: "PRODUCTION DESIGNER" },
    description: {
      es: "Automatización para campañas globales de performance en 20+ mercados y 18 idiomas, +10000 assets por año.",
      en: "Automation for global performance campaigns across 20+ markets, 18 languages, +10,000 assets per year.",
    },
    folder: "13_Spotify",
  },
  {
    slug: "ar-tech",
    year: "2023",
    client: "AR TECH",
    agency: "DEPT®",
    role: { es: "DESIGNER", en: "DESIGNER" },
    description: {
      es: "Exploraciones y diseño 3D de filtros hechos para Realidad Aumentada.",
      en: "Explorations and 3D design of AR filters.",
    },
    folder: "15_AR Tech",
  },
];

export const workPath = (folder: string, file: string) =>
  `${CONTENT}/8_Work /${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;

// -- Exhibitions ------------------------------------------------------------

export const EXHIBITIONS = [
  {
    year: "2025",
    title: {
      es: "TU RESPUESTA A ROBOTS EN PANTALLAS ES GENTE EN LUGARES — Exhibición de Imágenes en Galería Húmeda — Deseo",
      en: "TU RESPUESTA A ROBOTS EN PANTALLAS ES GENTE EN LUGARES — Image Exhibition at Galería Húmeda — Deseo",
    },
  },
  {
    year: "2025",
    title: {
      es: "TU RESPUESTA A ROBOTS EN PANTALLAS ES GENTE EN LUGARES — Exposición Colectiva de Fotografías organizada por Creadores de Imágenes en Parque Salguero, Buenos Aires",
      en: "TU RESPUESTA A ROBOTS EN PANTALLAS ES GENTE EN LUGARES — Group Photography Exhibition organized by Creadores de Imágenes at Parque Salguero, Buenos Aires",
    },
  },
  {
    year: "2024",
    title: {
      es: "Lecciones Invisibles — Mención Especial — Premios Obrar",
      en: "Lecciones Invisibles — Special Mention — Premios Obrar",
    },
  },
  {
    year: "2024",
    title: {
      es: "Nadie quiere ser titular — Nominado — Premios El Ojo de Iberoamérica",
      en: "Nadie quiere ser titular — Nominee — Premios El Ojo de Iberoamérica",
    },
  },
  {
    year: "2022",
    title: {
      es: "Sin Bandera — Nadie — Nominado a Best Short Form Music Video en los 23rd Annual Latin GRAMMY Awards",
      en: "Sin Bandera — Nadie — Best Short Form Music Video Nominee at the 23rd Annual Latin GRAMMY Awards",
    },
  },
  {
    year: "2021",
    title: {
      es: "Nubia — 8ª Muestra de Escuelas FEISAL en el 33º Festival Internacional de Cine de Viña del Mar",
      en: "Nubia — 8th FEISAL Schools Showcase at the 33rd Viña del Mar International Film Festival",
    },
  },
];

// -- About Me copy ---------------------------------------------------------

export const ABOUT_COPY = {
  es: [
    "Soy un Artista Visual y Director de Arte que habita la intersección entre imágenes, relatos y cultura.",
    "En mi ojo izquierdo vive mi formación en cine y artes audiovisuales, me da una mirada sensible, de autor. En mi ojo derecho, mi experiencia en marketing, entrenada para comprender audiencias y comunicar identidades de marcas. Ambos guían cada proyecto. El qué y el cómo. La forma y el contenido.",
    "Más allá del trabajo comercial, en mi práctica personal a través de la fotografía, la ilustración y el audiovisual, exploro cómo las personas en lugares son la clave para entender lo que nos hace humanos.",
    "Me apasiona lo que solo los humanos pueden hacer. Las cosas que te llevan a otra cosa. Lo real.",
    "¿Qué es lo real?",
  ],
  en: [
    "I'm a Visual Artist and Art Director living at the intersection of images, stories, and culture.",
    "In my left eye lives my training in film and audiovisual arts, giving me a sensitive, author's gaze. In my right eye, my experience in marketing, trained to understand audiences and communicate brand identities. Both guide every project. The what and the how. The form and the content.",
    "Beyond commercial work, my personal practice in photography, illustration, and film explores how people in places are the key to understanding what makes us human.",
    "I'm drawn to what only humans can do. The things that take you elsewhere. The real.",
    "What is real?",
  ],
};

export const ABOUT_ROLES = {
  es: [
    "Soy",
    "artista",
    "creativo",
    "fotógrafo",
    "diseñador de imágenes y de sonidos",
    "director de arte",
    "consultor creativo",
    "diseñador",
    "curador",
    "aprendiz y maestro",
    "creador.",
  ],
  en: [
    "I'm an",
    "artist,",
    "a creative,",
    "a photographer,",
    "a designer of images and sounds,",
    "an art director,",
    "a creative consultant,",
    "a designer,",
    "a curator,",
    "an apprentice and a master,",
    "a creator.",
  ],
};

export const ABOUT_SIDE = {
  es: {
    experience: "[ EXPERIENCIA ]",
    experienceValue: "DEPT® | 2022 - 2026\nCreative - Sr. Art Director",
    highlights: "[ CLIENT HIGHLIGHTS ]",
    highlightsList: "FIFA WORLD CUP 2026™\nSPOTIFY\nGOOGLE",
    past: "[ CLIENTES ANTERIORES ]",
    pastList:
      "DOORDASH, FIGMA, TWITCH, ILLY COFFEE, SNAPCHAT, EBAY, AUDI AND MORE",
    services: "[ SERVICIOS ]",
    servicesList:
      "DIRECCIÓN CREATIVA - BRAND DESIGN & ART DIRECTION - SOCIAL MEDIA CONTENT & STRATEGY - FILM & NARRATIVE DEVELOPMENT",
  },
  en: {
    experience: "[ EXPERIENCE ]",
    experienceValue: "DEPT® | 2022 - 2026\nCreative - Sr. Art Director",
    highlights: "[ CLIENT HIGHLIGHTS ]",
    highlightsList: "FIFA WORLD CUP 2026™\nSPOTIFY\nGOOGLE",
    past: "[ PAST CLIENTS ]",
    pastList:
      "DOORDASH, FIGMA, TWITCH, ILLY COFFEE, SNAPCHAT, EBAY, AUDI AND MORE",
    services: "[ SERVICES ]",
    servicesList:
      "CREATIVE DIRECTION - BRAND DESIGN & ART DIRECTION - SOCIAL MEDIA CONTENT & STRATEGY - FILM & NARRATIVE DEVELOPMENT",
  },
};

// -- Manifesto copy --------------------------------------------------------

export const MANIFESTO = {
  es: `¿Qué pasaría si las cosas
se llamasen por lo que son?

Un día, de vacaciones con amigos,
vimos una carnicería que se llamaba Carnicería,
o sea que su nombre era Carnicería Carnicería.

Decidí llamar Cosas Reales
a mi estudio y archivo de proyectos
para que me oriente a mantener una conexión con la realidad.
Es un concepto que alimenta mi deseo de explorar
las cosas que sólo yo puedo hacer.

Buscar verdad en lo cotidiano es una máxima,
que para mí es una provocación.

Me seduce para que busque la verdad de las cosas,
aunque no la encuentre
porque la verdad está en la búsqueda,
no en el hallazgo.

Tal vez para ustedes signifique otra cosa.
Tal vez lo lean distinto.

No puedo controlar lo que piensan ni lo que sienten. Solo puedo crear algo que arme
grietas en la realidad de modo tal que su existencia genere
una chispa para que aparezca lo que
tenga que revelarme.

Escribo este manifiesto en un Uber
que en realidad está vestido de taxi.
Esas son las paradojas de la verdad.
Ustedes no saben si esto es real o ficción.
Será lo que quieran que sean.

De todas formas,bienvenidxs a Cosas Reales.

Sam.`,
  en: `What if things were called
by what they are?

One day, on vacation with friends,
we saw a butcher shop called Butcher Shop
— meaning its name was literally Butcher Shop Butcher Shop.

I decided to call my studio and project archive Cosas Reales (Real Things)
so it would keep me oriented toward a connection with reality.
It's a concept that feeds my desire
to explore the things only I can make.

Seeking truth in the everyday is a maxim,
and for me it's a provocation.
It seduces me into searching for the truth of things,
even if I never find it,
because truth lives in the search,
not in the finding.

Maybe it means something else to you.
Maybe you read it differently.

I can't control what you think or what you feel.
I can only create something that opens cracks in reality — so that its existence sparks
whatever needs to reveal itself to me.

I'm writing this manifesto in an Uber that's dressed up as a taxi.
Those are the paradoxes of truth.
You don't know if this is real or fiction.
It will be whatever you want it to be.

Either way, welcome to Cosas Reales.
Sam.`,
};
