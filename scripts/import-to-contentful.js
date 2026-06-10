/**
 * Contentful Blog Import Script
 * Imports existing Cover+ blog posts into Contentful.
 *
 * Setup:
 *   1. Create scripts/.env with SPACE_ID and MANAGEMENT_TOKEN
 *   2. npm install contentful-management dotenv  (from repo root)
 *   3. node scripts/import-to-contentful.js
 *
 * Requires:
 *   - Content type "blogPost" already created in Contentful
 *   - Content type "author" already created, with one published Author entry
 */

require('dotenv').config({ path: __dirname + '/.env' });
const contentfulManagement = require('contentful-management');

const SPACE_ID = process.env.SPACE_ID;
const MANAGEMENT_TOKEN = process.env.MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('Missing SPACE_ID or MANAGEMENT_TOKEN in scripts/.env');
  process.exit(1);
}

// ─── Post data ───────────────────────────────────────────────────────────────
// body is structured as an array of { type, tag, text } blocks.
// type: 'paragraph' | 'heading-2' | 'heading-3' | 'blockquote'

const posts = [
  {
    title: 'El Servicio de Asistencia de las aseguradoras: ¿Es realmente un buen servicio?',
    slug: 'servicio-de-asistencia-aseguradoras',
    publishedDate: '2025-01-31',
    metaTitle: 'Para qué Sirve el Servicio de Asistencia de las Aseguradoras | Cover+',
    metaDescription: 'Descubrí cómo funciona realmente el servicio de asistencia de las aseguradoras y si vale la pena contratar una cobertura privada adicional.',
    heroImageDesktopUrl: 'https://coverplus.com.ar/assets/img/blog-cards/grua-1200x400.jpg',
    heroImageMobileUrl: 'https://coverplus.com.ar/assets/img/blog-cards/grua-400x250.jpg',
    body: [
      { type: 'paragraph', text: 'Las aseguradoras no tienen grúas propias y este servicio no es prestado directamente por ellos sino por empresas de asistencia subcontratadas. Esto genera que múltiples aseguradoras compartan los mismos prestadores, por lo que la calidad del servicio suele ser similar independientemente de la compañía que se contrate.' },
      { type: 'heading-2', text: '¿Quién brinda este servicio?' },
      { type: 'paragraph', text: 'Múltiples aseguradoras trabajan con los mismos prestadores de asistencia, lo que significa que la calidad del servicio es consistente entre distintas compañías, independientemente de la póliza contratada.' },
      { type: 'heading-2', text: '¿En qué consiste realmente el servicio de asistencia que brindan las aseguradoras?' },
      { type: 'paragraph', text: 'Estos servicios evolucionaron desde el remolque básico en accidentes hasta incluir fallas mecánicas y beneficios adicionales como cambio de neumáticos.' },
      { type: 'heading-3', text: '1 - Saturación del servicio y tiempos de espera' },
      { type: 'paragraph', text: 'Los largos tiempos de espera son la principal queja. Los prestadores que atienden a múltiples aseguradoras suelen saturarse en momentos de alta demanda y feriados, comprometiendo potencialmente la seguridad del cliente.' },
      { type: 'heading-3', text: '2 - Alcance limitado' },
      { type: 'paragraph', text: 'La cobertura suele limitar la distancia de remolque, dejando frecuentemente al cliente varado lejos de su domicilio en lugar de trasladarlo a su destino.' },
      { type: 'heading-3', text: '3 - Mala calidad del servicio' },
      { type: 'paragraph', text: 'El personal subcontratado no tiene responsabilidad directa ante la aseguradora ni el cliente, lo que genera una calidad de servicio inconsistente.' },
      { type: 'blockquote', text: '"Las aseguradoras no tienen grúas propias y este servicio no es prestado directamente por ellos sino por empresas de asistencia subcontratadas..."' },
      { type: 'heading-2', text: '¿Qué alternativa tenemos entonces?' },
      { type: 'paragraph', text: 'Las empresas de asistencia privadas ofrecen alternativas superiores con coberturas más amplias.' },
      { type: 'heading-3', text: '1 - Mayor disponibilidad y mejor tiempo de respuesta' },
      { type: 'paragraph', text: 'Los clientes directos reciben tiempos de respuesta más rápidos, a veces en minutos en zonas urbanas.' },
      { type: 'heading-3', text: '2 - Asistencia más amplia y personalizada' },
      { type: 'paragraph', text: 'Los planes privados incluyen reparaciones en el lugar, entrega de combustible y atención personalizada más allá del remolque básico.' },
      { type: 'heading-3', text: '3 - Sin restricción de kilometraje' },
      { type: 'paragraph', text: 'Cobertura ilimitada o con límites significativamente mayores que permiten el traslado al taller de preferencia.' },
      { type: 'heading-3', text: '4 - Otros servicios adicionales' },
      { type: 'paragraph', text: 'Los planes pueden incluir vehículo de sustitución durante las reparaciones.' },
      { type: 'heading-2', text: '¿Vale la pena contratar y pagar una cobertura de asistencia privada adicional?' },
      { type: 'paragraph', text: 'La asistencia privada representa una inversión que vale la pena dado su precio accesible y la calidad de servicio superior comparada con la cobertura básica de la aseguradora.' },
      { type: 'heading-2', text: 'Resumiendo' },
      { type: 'paragraph', text: 'Si bien los servicios de las aseguradoras resuelven emergencias con ciertas limitaciones, la asistencia privada ofrece mejores tiempos de respuesta, mayores beneficios y una experiencia más satisfactoria a un costo accesible.' },
    ],
  },
  {
    title: 'Errores comunes al elegir un seguro de auto y cómo evitarlos',
    slug: 'errores-comunes-al-elegir-seguro-auto',
    publishedDate: '2025-02-03',
    metaTitle: 'Errores Comunes al Elegir un Seguro de Auto y Cómo Evitarlos | Cover+',
    metaDescription: 'Descubrí los errores más frecuentes al contratar un seguro de auto y cómo evitarlos para asegurar la mejor protección para tu vehículo.',
    heroImageDesktopUrl: 'https://coverplus.com.ar/assets/img/blog-cards/golf-1200x400.jpg',
    heroImageMobileUrl: 'https://coverplus.com.ar/assets/img/blog-cards/golf-400x250.jpg',
    body: [
      { type: 'paragraph', text: 'Una de las decisiones más importantes que debe tomar todo conductor es la elección del seguro de su vehículo. Si bien puede parecer una tarea sencilla, hay ciertos aspectos que deben considerarse para tomar una buena decisión, evitando caer en costosos gastos adicionales a largo plazo.' },
      { type: 'heading-2', text: 'No comparar diferentes opciones de seguros' },
      { type: 'paragraph', text: 'Todavía hay personas que optan por contratar el seguro que les ofrece su banco o la concesionaria, sin cuestionarse si es la opción más adecuada o económica. Es sumamente importante tomarse el tiempo de comparar varias alternativas, tanto para verificar si el precio está alineado con el mercado, como para conocer distintas opciones de cobertura.' },
      { type: 'paragraph', text: 'La opción más recomendable es contar con el asesoramiento de un Productor Asesor de Seguros, que puede simplificar esta búsqueda, explicar todas las diferencias entre coberturas y aportar conocimiento del mercado. Este asesoramiento no tiene ningún costo adicional para el asegurado.' },
      { type: 'heading-2', text: 'Elegir un seguro solo por su precio' },
      { type: 'paragraph', text: 'La gran mayoría de nosotros al contratar un seguro buscamos una opción económica. Pero elegir un seguro solo por el precio puede terminar siendo un error costoso. Coberturas con el mismo nombre pueden tener diferencias importantes entre aseguradoras. Un seguro más barato suele tener coberturas limitadas, exclusiones y franquicias más elevadas.' },
      { type: 'paragraph', text: 'Antes de contratar, es fundamental analizar el uso del vehículo, si se guarda en cochera, y cuántos kilómetros se recorren. La cobertura debe incluir al menos: daños a terceros, robos, incendios y accidentes totales y parciales.' },
      { type: 'blockquote', text: '"La gran mayoría de nosotros al contratar un seguro, lo primero que buscamos es una opción económica, pero elegir un seguro solo por el precio puede terminar resultando en un error costoso."' },
      { type: 'heading-2', text: 'No leer detenidamente las condiciones de la póliza' },
      { type: 'paragraph', text: 'Casi nadie lee con detenimiento todas las cláusulas y condiciones de su póliza. Es importante conocerlas ya que ahí aparecen las exclusiones y condiciones que el asegurado termina conociendo de mala manera, cuando necesita contar con su cobertura.' },
      { type: 'paragraph', text: 'Algunas pólizas excluyen daños por desastres naturales, tienen limitaciones en ruedas robadas por año, o establecen importes máximos por tipo de daño. También se establecen obligaciones para el asegurado cuyo incumplimiento puede habilitar a la aseguradora a rechazar el reclamo.' },
      { type: 'heading-2', text: 'No revisar la póliza de seguro de manera regular' },
      { type: 'paragraph', text: 'Otro error común es desentenderse de la póliza contratada sin revisar regularmente que la cobertura esté vigente o si es necesario hacer alguna modificación. Mudarse, instalar GNC o cambiar las llantas son cambios que deben informarse a la aseguradora.' },
      { type: 'paragraph', text: 'Es recomendable hacer esta revisión al menos una vez al año, aprovechando el momento de renovación de la póliza.' },
      { type: 'heading-2', text: 'Conclusión' },
      { type: 'paragraph', text: 'La elección del seguro no debe centrarse únicamente en el precio. Es fundamental evaluar distintas opciones, entender las diferencias, leer cuidadosamente las condiciones y revisar la póliza con regularidad. Contar con un Productor Asesor de Seguros ayuda a evitar errores que podrían costar mucho dinero o dejar al asegurado sin cobertura cuando más la necesita.' },
    ],
  },
  {
    title: 'Fraude en Seguros: Protege tu seguridad financiera',
    slug: 'fraude-en-seguros-estrategias-efectivas',
    publishedDate: '2025-02-10',
    metaTitle: 'Fraude en Seguros: Como Proteger tu Salud Financiera | Cover+',
    metaDescription: 'Conocé los riesgos del fraude en seguros y aprendé estrategias efectivas para salvaguardar tu bienestar financiero con Cover+.',
    heroImageDesktopUrl: 'https://coverplus.com.ar/assets/img/blog-cards/fraude-1200x400.jpg',
    heroImageMobileUrl: 'https://coverplus.com.ar/assets/img/blog-cards/fraude-400x250.jpg',
    body: [
      { type: 'paragraph', text: 'El seguro está para ayudarte a enfrentar imprevistos y garantizar tu tranquilidad. Sin embargo, el fraude en seguros está a la orden del día, muchas veces motivado por una disconformidad general por la situación económica del país.' },
      { type: 'paragraph', text: 'El fraude es un delito tipificado en el Código Penal Argentino (Art. 72) como "Delito de Defraudación", con consecuencias tanto económicas como penales (de 1 a 6 años de prisión). Además, perjudica a todos los asegurados encareciendo los seguros en general.' },
      { type: 'heading-2', text: '¿Qué es el fraude en seguros y por qué es peligroso?' },
      { type: 'paragraph', text: 'Uno de los principios fundamentales en todo contrato de seguros es el principio de Buena Fe. El asegurado nunca puede usar su seguro para enriquecerse indebidamente. El fraude ocurre cuando el asegurado intenta engañar a la aseguradora para obtener un beneficio económico indebido.' },
      { type: 'heading-2', text: 'Algunos tipos de fraude en seguros' },
      { type: 'heading-3', text: '1 - Accidentes simulados' },
      { type: 'paragraph', text: 'Personas que denuncian accidentes que nunca ocurrieron, o que provocan choques intencionales haciendo abuso de las presunciones de responsabilidad.' },
      { type: 'heading-3', text: '2 - Robos falsos' },
      { type: 'paragraph', text: 'Denunciar un robo que nunca existió, ya sea de bienes inexistentes o que existen pero no fueron robados. También puede ocurrir declarando valores mayores o incluyendo bienes que no se poseían.' },
      { type: 'heading-3', text: 'Daños exagerados' },
      { type: 'paragraph', text: 'Inflar los presupuestos de reparaciones o pérdidas para recibir más dinero del que realmente corresponde. Esto es habitual en siniestros de autos, donde hay talleres que ofrecen presupuestos mayores para ayudar al cliente a recuperar parte de la franquicia.' },
      { type: 'heading-2', text: 'Consecuencias del fraude en seguros' },
      { type: 'heading-3', text: 'Legales' },
      { type: 'paragraph', text: 'En Argentina es un delito tipificado en el Código Penal (Art. 72) que conlleva indemnizaciones económicas y pena de hasta 6 años de prisión.' },
      { type: 'heading-3', text: 'Aumento en las primas' },
      { type: 'paragraph', text: 'El fraude genera más pérdidas en las aseguradoras, que para recuperarlas suben los costos para todos los asegurados.' },
      { type: 'heading-3', text: 'Menos acceso a coberturas reales' },
      { type: 'paragraph', text: 'El fraude afecta la confianza de las aseguradoras y puede hacer que reduzcan coberturas o que los defraudadores identificados queden en una lista negra compartida entre compañías.' },
      { type: 'heading-3', text: 'Investigaciones, demoras y trámites' },
      { type: 'paragraph', text: 'Los fraudes llevan a que las aseguradoras sean más rigurosas en la evaluación de siniestros, causando demoras para quienes realmente sufrieron un daño.' },
      { type: 'blockquote', text: '"El fraude en seguros no es un simple engaño, ni hace más inteligente a quien lo realiza. El fraude es un delito que tiene consecuencias graves."' },
      { type: 'heading-2', text: 'Beneficios de contribuir a un mercado libre de fraudes' },
      { type: 'heading-3', text: 'Precios más bajos' },
      { type: 'paragraph', text: 'Al reducir los fraudes, las aseguradoras pueden mantener precios más competitivos y accesibles.' },
      { type: 'heading-3', text: 'Mayor confianza y rapidez en los reclamos' },
      { type: 'paragraph', text: 'Un mercado transparente permite que los siniestros se resuelvan más rápidamente, con menos trámites e investigaciones.' },
      { type: 'heading-3', text: 'Acceso a mejores coberturas y servicios' },
      { type: 'paragraph', text: 'Los recursos que dejarían de destinarse a investigar fraudes podrían usarse para ofrecer mejores beneficios, servicios y precios.' },
      { type: 'heading-3', text: 'Antecedentes legales' },
      { type: 'paragraph', text: 'Estar libre de antecedentes garantiza el acceso a las mejores aseguradoras y coberturas, además de no afectar acceso a empleos, créditos o alquileres.' },
      { type: 'heading-2', text: '¿Cómo puedes ayudar a prevenir el fraude en seguros?' },
      { type: 'paragraph', text: 'Verificá que la aseguradora esté autorizada por la SSN. No exageres ni alteres información en un siniestro. Denunciá cualquier fraude que detectes. Guardá documentación de tus bienes (facturas, fotos). Revisá bien tu póliza para conocer qué cubre y qué no.' },
      { type: 'heading-2', text: 'Protegé lo que más te importa' },
      { type: 'paragraph', text: 'El seguro está para ayudarte cuando realmente lo necesités, pero depende de todos mantener un sistema confiable. Al evitar el fraude y denunciarlo, contribuís a un mercado más justo donde las personas honestas pueden acceder a coberturas adecuadas a precios razonables.' },
    ],
  },
  {
    title: '¿Qué hacer en caso de un accidente de tránsito? Guía paso a paso',
    slug: 'que-hacer-seguro-accidente-transito',
    publishedDate: '2025-02-17',
    metaTitle: '¿Qué Hacer en Caso de un Siniestro? Pasos a Seguir | Cover+',
    metaDescription: 'Conocé los pasos a seguir ante un accidente de tránsito: qué documentación pedir, cuándo hacer la denuncia y cómo proteger tus derechos.',
    heroImageDesktopUrl: 'https://coverplus.com.ar/assets/img/blog-cards/crash-1200x400.jpg',
    heroImageMobileUrl: 'https://coverplus.com.ar/assets/img/blog-cards/crash-400x250.jpg',
    body: [
      { type: 'paragraph', text: 'Los accidentes de tránsito están a la orden del día, y ninguno de nosotros está exento de enfrentar esta situación. Saber cómo actuar ante un choque, qué documentación solicitar y cuándo realizar la denuncia al seguro son cuestiones fundamentales para garantizar que la aseguradora cubra los daños.' },
      { type: 'heading-2', text: '1. Lo primero: Mantener la calma y verificar la seguridad' },
      { type: 'paragraph', text: 'Tras un choque, es esencial mantener la calma. Lo primero es asegurarse de que todos los ocupantes estén bien. Si hay heridos, solicitar una ambulancia de inmediato (SAME 107 en CABA, o 911). Bajo ninguna circunstancia se debe mover a los heridos, a menos que sea estrictamente necesario por razones de seguridad.' },
      { type: 'heading-2', text: '2. ¿Qué hacer a continuación?' },
      { type: 'paragraph', text: 'Para poder hacer la denuncia al seguro, es importante contar con la documentación necesaria. Solicitá a los otros involucrados: nombre completo, DNI y teléfono del conductor y del titular (si difieren); número de patente, marca, modelo y año del vehículo; aseguradora y número de póliza. Si es posible, sacale foto a la cédula del vehículo y la licencia de conducir.' },
      { type: 'heading-2', text: '3. Pasos a seguir después del choque' },
      { type: 'heading-3', text: 'Tomar fotos del siniestro' },
      { type: 'paragraph', text: 'Las fotos en el lugar del hecho siempre suman, especialmente para determinar la responsabilidad. Tomá fotografías de los daños, los documentos y el lugar. Asegurate de que en alguna foto se vean las patentes.' },
      { type: 'heading-3', text: 'Verificar si el auto está en condiciones de circular' },
      { type: 'paragraph', text: 'Si sospechás que puede haber una parte mecánica afectada, no sigas circulando. Ante la duda, solicitá una grúa. Si continuás circulando y provocás un daño mayor, la aseguradora NO te va a cubrir.' },
      { type: 'heading-3', text: 'No abandones el vehículo' },
      { type: 'paragraph', text: 'Abandonar el vehículo constituye una falta grave especificada en la ley de seguros. Todos los daños ocasionados por dicho abandono no serán cubiertos. Llamá a una grúa y trasladalo a un lugar seguro.' },
      { type: 'heading-3', text: 'Denunciar el siniestro' },
      { type: 'paragraph', text: 'Comunicate con tu aseguradora lo antes posible, dentro de los 3 días corridos siguientes al hecho. La mayoría permite la denuncia a través de apps, teléfonos de emergencia o páginas web.' },
      { type: 'heading-3', text: 'Iniciar el reclamo al seguro del tercero' },
      { type: 'paragraph', text: 'Si la culpa fue del otro vehículo, podés realizar un reclamo a su aseguradora por daños materiales y lesiones. Solo podés reclamar por daños no cubiertos por tu propio seguro. Con Todo Riesgo, podés recuperar el importe de la franquicia.' },
      { type: 'blockquote', text: '"Tras un choque, es esencial mantener la calma para evitar tomar decisiones precipitadas. Lo primero es asegurarse de que todos los ocupantes del vehículo estén bien."' },
      { type: 'heading-2', text: '4. ¿Cuál es la diferencia entre un choque con lesiones y uno con solo daños materiales?' },
      { type: 'heading-3', text: 'Accidente con solo daños materiales' },
      { type: 'paragraph', text: 'Si no hubo heridos, el siniestro puede resolverse más rápidamente. En Argentina se puede hacer la denuncia a la aseguradora sin necesidad de intervención policial.' },
      { type: 'heading-3', text: 'Accidente con lesiones' },
      { type: 'paragraph', text: 'Cuando hay lesiones, además de la denuncia a la aseguradora debés hacer la denuncia policial en la comisaría del lugar del accidente. La policía labrará un acta que luego deberás entregar a la aseguradora.' },
      { type: 'heading-2', text: '5. ¿Qué pasa si el otro vehículo se da a la fuga?' },
      { type: 'paragraph', text: 'Lo más importante es obtener algún dato del vehículo, especialmente la patente, y si hay testigos, mucho mejor. Luego dirigite a una comisaría y hacé la denuncia. Con los datos aportados, la policía podrá investigar e identificar al titular. Si no tiene seguro, se podrá iniciar una demanda civil contra el titular del vehículo.' },
      { type: 'heading-2', text: '6. Consideraciones importantes' },
      { type: 'heading-3', text: 'No admitir responsabilidad' },
      { type: 'paragraph', text: 'Evitá dar declaraciones que puedan interpretarse como aceptación de responsabilidad. Solo las aseguradoras y la policía pueden determinar quién tuvo la culpa.' },
      { type: 'heading-3', text: 'Revisar la póliza' },
      { type: 'paragraph', text: 'Antes de realizar cualquier trámite, revisá las coberturas que tenés contratadas. Cada tipo de póliza tiene diferentes alcances en caso de siniestro.' },
      { type: 'heading-2', text: 'Conclusión' },
      { type: 'paragraph', text: 'Saber cómo actuar luego de un accidente es esencial para gestionar correctamente la situación. Tener toda la documentación necesaria y seguir los procedimientos correctos ahorrará tiempo y problemas. Recordá siempre mantener la calma, contactar a tu aseguradora a tiempo y ante la duda consultar a tu productor asesor de seguros.' },
    ],
  },
  {
    title: 'Ranking de venta de autos en agosto de 2025',
    slug: 'ranking-agosto25',
    publishedDate: '2025-09-01',
    metaTitle: 'Ranking de Venta de Autos en Argentina | Agosto 2025 | Cover+',
    metaDescription: 'Conocé cuáles fueron los autos más vendidos en Argentina en agosto de 2025 y qué significa esto para el mercado de seguros.',
    heroImageDesktopUrl: 'https://coverplus.com.ar/assets/img/blog-cards/ago25-1200x400.jpg',
    heroImageMobileUrl: 'https://coverplus.com.ar/assets/img/blog-cards/ago25-1200x400.jpg',
    body: [
      { type: 'heading-2', text: '¿Sabes qué autos aseguraron más los argentinos en agosto de 2025?' },
      { type: 'paragraph', text: 'En el dinámico mundo automotor, conocer las tendencias de ventas es clave, y esto no solo es importante para las marcas de autos, sino también para quienes trabajamos en el rubro de seguros. Saber qué vehículos están ganando popularidad nos permite ofrecer las mejores coberturas y promociones, adaptadas a las necesidades del mercado.' },
      { type: 'paragraph', text: 'Agosto de 2025 nos dejó cifras interesantes. Según los datos del sector, se patentaron 54.664 vehículos en Argentina, lo que marcó un notable crecimiento interanual del 31,7% en comparación con el mismo mes de 2024. Aunque hubo un pequeño descenso del 13% respecto a julio, el panorama general sigue siendo muy positivo.' },
      { type: 'paragraph', text: 'El líder indiscutible del mes fue el Toyota Yaris, con 3.781 unidades vendidas, demostrando su solidez en el mercado. Le siguieron de cerca otros modelos de gran éxito, como la Toyota Hilux y la Volkswagen Amarok.' },
      { type: 'paragraph', text: 'Por otro lado, a pesar de que la movilidad eléctrica sigue creciendo a nivel global, en Argentina su presencia aún es marginal. Las marcas chinas, que dominan este segmento en otras partes del mundo, todavía tienen un largo camino por recorrer en el mercado local, aunque ya se ven algunas, como BAIC y Haval, escalando posiciones.' },
      { type: 'paragraph', text: 'A continuación, te mostramos el ranking de los 10 autos más vendidos en Argentina durante agosto de 2025.' },
      { type: 'heading-2', text: 'El ranking' },
      {
        type: 'table',
        headers: ['Puesto', 'Marca y Modelo'],
        rows: [
          ['1', 'Toyota Yaris'],
          ['2', 'Toyota Hilux'],
          ['3', 'Volkswagen Amarok'],
          ['4', 'Fiat Cronos'],
          ['5', 'Ford Ranger'],
          ['6', 'Volkswagen Polo'],
          ['7', 'Toyota Corolla Cross'],
          ['8', 'Peugeot 208'],
          ['9', 'Chevrolet Tracker'],
          ['10', 'Peugeot 2008'],
        ],
      },
      { type: 'heading-2', text: '¿Por qué es importante esta información para tu seguro?' },
      { type: 'paragraph', text: 'Conocer cuáles son los autos más populares del momento no solo nos habla de tendencias, sino que también es un dato clave para entender el mercado de seguros. Para vos como conductor, saber que tenés un modelo muy demandado puede influir en la disponibilidad de repuestos y hasta en el precio de la póliza.' },
      { type: 'paragraph', text: 'En Cover+, usamos esta información para diseñar coberturas a la medida de cada vehículo, ya sea un popular Toyota Yaris o un creciente Peugeot 2008. Así, te garantizamos una protección completa y adaptada a las necesidades de tu auto. Si estás pensando en asegurar tu nuevo vehículo o querés revisar tu póliza actual, no dudes en contactarnos.' },
    ],
  },
  {
    title: 'De Freelance a PyME: ¿Cuándo y por qué escalar la protección de tu negocio con los seguros adecuados?',
    slug: 'freelance-a-pymes',
    publishedDate: '2025-09-03',
    metaTitle: 'De Freelance a PyME: Cuándo Escalar la Protección de tu Negocio | Cover+',
    metaDescription: 'Descubrí cuándo y por qué ampliar los seguros de tu negocio al crecer de freelance a PyME en Argentina. Guía completa con coberturas clave.',
    heroImageDesktopUrl: 'https://coverplus.com.ar/assets/img/blog-cards/freelance-1200x400.jpg',
    heroImageMobileUrl: 'https://coverplus.com.ar/assets/img/blog-cards/freelance-400x250.jpg',
    body: [
      { type: 'paragraph', text: 'En el vibrante ecosistema emprendedor argentino, muchos comienzan su camino como freelancers o autoempleados. Con una computadora, un buen café y mucha pasión, construyen su marca personal y ofrecen sus servicios. Sin embargo, llega un punto en el que el negocio crece: contratan personal, alquilan una oficina, manejan un volumen mayor de clientes o incluso empiezan a fabricar productos. Es en ese momento crucial cuando la mentalidad debe cambiar de "yo" a "nosotros", y la protección de los seguros deja de ser una opción para convertirse en una necesidad imperante.' },
      { type: 'paragraph', text: 'Pasar de ser un "lobo solitario" a liderar una pequeña o mediana empresa (PyME) es un hito emocionante, pero también conlleva nuevas responsabilidades y, por ende, nuevos riesgos. Proteger tu negocio ya no es solo protegerte a vos; es proteger a tus empleados, tus activos, tu reputación y tu futuro.' },
      { type: 'heading-2', text: 'La Etapa Freelance: Protección Personal Básica' },
      { type: 'paragraph', text: 'Cuando sos freelance, tu principal activo sos vos mismo. Tu seguro de responsabilidad civil profesional (si tu actividad lo requiere) y un buen seguro de accidentes personales son generalmente suficientes. Quizás un seguro para tu equipo de trabajo (laptop, cámara, etc.) si es de alto valor y trabajás desde casa.' },
      { type: 'paragraph', text: 'Sin embargo, a medida que el negocio toma forma, la escala de los riesgos se magnifica. Un cliente insatisfecho, un empleado lesionado, un ciberataque, un robo en la oficina... todos estos escenarios pueden poner en jaque años de esfuerzo y la estabilidad financiera que tanto te costó construir.' },
      { type: 'heading-2', text: 'Señales Claras de que tu Negocio Necesita Escalado de Protección' },
      { type: 'paragraph', text: '¿Cómo saber cuándo es el momento de dar el salto y ampliar tus seguros? A continuación analizamos algunas señales inconfundibles.' },
      { type: 'heading-3', text: '1. Contratación de Empleados (incluso si son a tiempo parcial o eventuales)' },
      { type: 'paragraph', text: 'Este es el disparador más grande y obvio. En Argentina, la Ley de Riesgos del Trabajo (LRT) exige que todo empleador contrate una Aseguradora de Riesgos del Trabajo (ART) para cubrir accidentes laborales y enfermedades profesionales de sus empleados. No tenerla te expone a demandas millonarias en caso de un siniestro. Pero la ART es solo el principio. Un seguro de vida obligatorio para empleados (Decreto 1567/74) también es una necesidad.' },
      { type: 'heading-3', text: '2. Alquiler o Adquisición de un Espacio Físico (Oficina, Local, Depósito)' },
      { type: 'paragraph', text: 'Dejar de trabajar en casa y mudarte a un espacio comercial implica un universo nuevo de riesgos. El Seguro Integral de Comercio/PyME cubre incendio, robo, daños por agua, daños eléctricos, rotura de cristales y responsabilidad civil por el local. También es fundamental asegurar el contenido: muebles, equipos informáticos, mercadería y herramientas.' },
      { type: 'heading-3', text: '3. Aumento Significativo de la Facturación y Flujo de Clientes' },
      { type: 'paragraph', text: 'Más ingresos significan más exposición. Un negocio más grande atrae más atención, incluyendo la de quienes tienen malas intenciones. También, un mayor volumen de trabajo puede llevar a más errores, incrementando el riesgo de reclamos.' },
      { type: 'heading-3', text: '4. Manejo de Información Sensible o Datos de Clientes' },
      { type: 'paragraph', text: 'Con la Ley de Protección de Datos Personales (N° 25.326) en Argentina y la creciente amenaza de ciberataques, cualquier empresa que maneje información personal de terceros necesita protegerse. El Seguro de Ciberseguridad (Cyber Risk) cubre los costos de un ataque cibernético: investigación forense, notificación a los afectados, servicios de relaciones públicas, defensa legal y hasta el pago de rescates bajo ciertas condiciones.' },
      { type: 'heading-3', text: '5. Uso de Vehículos para el Negocio (Propios o de Reparto)' },
      { type: 'paragraph', text: 'Si tu PyME utiliza vehículos para reparto, visitas comerciales o transporte de personal, tu seguro de auto personal ya no es suficiente. Necesitás coberturas específicas como Seguro de Flota, cobertura para carga y seguros de responsabilidad civil adicionales por accidentes con vehículos de la empresa.' },
      { type: 'heading-3', text: '6. Ofrecimiento de Productos o Servicios que Podrían Generar Reclamos por Daños' },
      { type: 'paragraph', text: 'Diseñadores, consultores, desarrolladores de software, fabricantes, distribuidores... cualquier actividad donde un error en tu servicio o producto pueda causar un daño a terceros requiere un Seguro de Responsabilidad Civil Profesional (E&O - Errores y Omisiones) y, para fabricantes o distribuidores, un Seguro de Responsabilidad Civil de Productos.' },
      { type: 'heading-3', text: '7. Dependencia de Maquinaria, Equipos Específicos o Tecnología Costosa' },
      { type: 'paragraph', text: 'Si tu negocio depende de maquinaria industrial, equipos médicos especializados, servidores o tecnología de punta, su daño o interrupción puede ser catastrófico. El Seguro de Rotura de Maquinaria y el Seguro de Equipos Electrónicos protegen estos activos críticos.' },
      { type: 'heading-2', text: '¿Por Qué Escalar la Protección de tu Negocio?' },
      { type: 'paragraph', text: 'La respuesta es simple: supervivencia y crecimiento sostenible. Un solo siniestro puede ser suficiente para llevar a una PyME no asegurada a la quiebra. Los seguros actúan como un escudo financiero, transfiriendo esos riesgos a una compañía aseguradora. Además, muchas coberturas son obligatorias por ley — no cumplirlas no solo acarrea multas, sino que te expone a responsabilidades mayores.' },
      { type: 'paragraph', text: 'Un negocio bien asegurado transmite seriedad y solidez a clientes, proveedores y socios comerciales. Y en caso de un evento inesperado, coberturas para la interrupción del negocio pueden ayudarte a recuperar ingresos perdidos mientras te reorganizás.' },
      { type: 'heading-2', text: 'La Importancia de un Productor Asesor de Seguros (PAS) en esta Transición' },
      { type: 'paragraph', text: 'La transición de freelance a PyME es compleja y la oferta de seguros es enorme. Un Productor Asesor de Seguros (PAS) es fundamental en esta etapa porque identifica los riesgos específicos de tu actividad, diseña un plan a medida, compara opciones entre múltiples aseguradoras, gestiona la contratación y renovación, y — quizás lo más valioso — te acompaña y defiende tus intereses en caso de siniestro.' },
      { type: 'heading-2', text: 'Reflexión Final: Invertir en Protección es Invertir en el Futuro de tu PyME' },
      { type: 'paragraph', text: 'El crecimiento de tu negocio es un motivo de orgullo, pero también de responsabilidad. No veas los seguros como un gasto, sino como una inversión estratégica en la solidez y la continuidad de tu PyME. Si tu negocio ha superado la fase de freelance y está dando sus primeros pasos como PyME, es hora de sentarte con un Productor Asesor de Seguros de confianza. Juntos podemos construir el andamiaje de protección que tu esfuerzo y tu visión merecen. Protegé tu presente para asegurar tu futuro.' },
    ],
  },
];

// ─── Rich Text builder ────────────────────────────────────────────────────────

function buildRichText(blocks) {
  const nodes = blocks.map((block) => {
    const textNode = {
      nodeType: 'text',
      value: block.text,
      marks: [],
      data: {},
    };

    if (block.type === 'paragraph') {
      return { nodeType: 'paragraph', data: {}, content: [textNode] };
    }
    if (block.type === 'heading-2') {
      return { nodeType: 'heading-2', data: {}, content: [textNode] };
    }
    if (block.type === 'heading-3') {
      return { nodeType: 'heading-3', data: {}, content: [textNode] };
    }
    if (block.type === 'blockquote') {
      return {
        nodeType: 'blockquote',
        data: {},
        content: [{ nodeType: 'paragraph', data: {}, content: [textNode] }],
      };
    }
    if (block.type === 'table') {
      const headerCells = block.headers.map((h) => ({
        nodeType: 'table-header-cell',
        data: {},
        content: [{ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: h, marks: [], data: {} }] }],
      }));
      const headerRow = { nodeType: 'table-row', data: {}, content: headerCells };
      const bodyRows = block.rows.map((row) => ({
        nodeType: 'table-row',
        data: {},
        content: row.map((cell) => ({
          nodeType: 'table-cell',
          data: {},
          content: [{ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: cell, marks: [], data: {} }] }],
        })),
      }));
      return { nodeType: 'table', data: {}, content: [headerRow, ...bodyRows] };
    }
    return { nodeType: 'paragraph', data: {}, content: [textNode] };
  });

  return { nodeType: 'document', data: {}, content: nodes };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const client = contentfulManagement.createClient(
    { accessToken: MANAGEMENT_TOKEN },
    { type: 'plain', defaults: { spaceId: SPACE_ID, environmentId: 'master' } }
  );
  // Find the published Author entry (Gonzalo Domínguez)
  const authors = await client.entry.getMany({ query: { content_type: 'author', limit: 1 } });
  if (authors.items.length === 0) {
    console.error('No Author entry found. Create and publish the Author entry in Contentful first.');
    process.exit(1);
  }
  const authorEntry = authors.items[0];
  console.log(`Using author: ${authorEntry.fields.name?.['es-AR'] || authorEntry.sys.id}`);

  for (const post of posts) {
    // Skip if already exists
    const existing = await client.entry.getMany({ query: { content_type: 'blogPost', 'fields.slug': post.slug, limit: 1 } });
    if (existing.items.length > 0) {
      console.log(`  — Skipping (already exists): ${post.slug}`);
      continue;
    }
    console.log(`\nImporting: ${post.slug}`);

    const fields = {
      title: { 'es-AR': post.title },
      slug: { 'es-AR': post.slug },
      publishedDate: { 'es-AR': post.publishedDate },
      author: {
        'es-AR': {
          sys: { type: 'Link', linkType: 'Entry', id: authorEntry.sys.id },
        },
      },
      metaTitle: { 'es-AR': post.metaTitle },
      metaDescription: { 'es-AR': post.metaDescription },
      body: { 'es-AR': buildRichText(post.body) },
    };

    const entry = await client.entry.create({ contentTypeId: 'blogPost' }, { fields });
    await client.entry.publish({ entryId: entry.sys.id }, entry);
    console.log(`  ✓ Published: ${post.slug} (id: ${entry.sys.id})`);
  }

  console.log('\nAll posts imported successfully.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
