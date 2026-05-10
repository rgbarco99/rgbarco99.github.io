const BLOG_POSTS = [
  {
    id: 'post-001',
    public: true,
    title: "Optimizando OData V4 en SAP Fiori",
    date: '2025-04-28',
    tags: ["SAP","Fiori","OData"],
    emoji: '🚀',
    images: [],
    body: "Después de meses trabajando con OData V4 en proyectos reales, he recopilado los patrones que más me han ayudado a mejorar el rendimiento y la mantenibilidad de las aplicaciones Fiori.\n\n## El problema con los bindings por defecto\n\nEl mayor error que veo en proyectos Fiori es confiar en el binding automático de OData V4 sin entender qué queries se están lanzando. Un simple ListBinding con `$expand` mal configurado puede triplicar el tiempo de carga.\n\n## Patterns que funcionan\n\n**1. Server-side filtering siempre**\nEvita cargar listas completas para filtrar en el cliente. Usa `$filter` en el binding y apóyate en CDS annotations como `@Search.defaultSearchElement`.\n\n**2. $batch para múltiples reads**\nCuando la vista necesita datos de varias entidades, agrúpalos en un `$batch`. El framework lo soporta de forma transparente con `sap.ui.model.odata.v4.ODataModel`.\n\n**3. earlyRequests**\nHabilita `earlyRequests: true` en el modelo para que las queries arranquen antes de que el controlador esté listo.\n\n## Ejemplo\n\n```js\nconst oModel = new ODataModel({\n  serviceUrl: '/sap/opu/odata4/...',\n  synchronizationMode: 'None',\n  operationMode: 'Server',\n  earlyRequests: true\n});\n```\n\nCon estos tres cambios en un proyecto real redujimos el tiempo de carga inicial de 4.2s a 1.1s. No está mal para ajustes de configuración.",
  },
  {
    id: 'post-002',
    public: true,
    title: "RAP vs ABAP clásico: ¿cuándo usar cada uno?",
    date: '2025-03-15',
    tags: ["ABAP","RAP","CDS"],
    emoji: '🔧',
    images: [],
    body: "El RESTful Application Programming model (RAP) llegó para quedarse, pero eso no significa que el ABAP clásico esté muerto. Tras trabajar con ambos en producción, aquí va mi opinión honesta.\n\n## Cuándo usar RAP\n\n- **APIs OData expuestas externamente**: RAP genera automáticamente el binding de OData V4 con todo lo que conlleva.\n- **Proyectos nuevos en S/4HANA**: Si partes de cero y el cliente tiene S/4HANA 2020+, RAP es el camino.\n- **Draft handling**: El soporte de borradores en RAP es elegante y evita mucho código custom.\n\n## Cuándo seguir con ABAP clásico\n\n- **Proyectos legacy con business logic en Function Modules**: No vale la pena reescribir FMs robustos que llevan años funcionando.\n- **Reports complejos con ALV**: El clásico sigue siendo rey aquí.\n- **Sin S/4HANA**: RAP depende fuertemente de las CDS Views y el stack ABAP moderno.\n\n## El verdadero coste de migrar\n\nEl mayor error es subestimar el tiempo de reaprendizaje. RAP tiene una curva empinada: behavior definitions, behavior implementations, Entity Manipulation Language (EML)...\n\nMi recomendación: proyecto piloto pequeño primero, aprende el pattern con algo sin riesgo y luego escala.",
  },
  {
    id: 'post-003',
    public: true,
    title: "Lo que nadie te dice sobre ser consultor SAP",
    date: '2025-02-02',
    tags: ["Reflexión","Carrera","SAP"],
    emoji: '💡',
    images: [],
    body: "Cinco años en el mundo SAP dan para mucho. Reflexiones sin filtro para quien esté pensando en meterse en este mundillo.\n\n## La curva de aprendizaje real\n\nOlvídate de los 6 meses que dice el curso. La realidad es que hasta los 18 meses no te sientes cómodo moviendo proyectos solo. Y eso solo si tienes mentores decentes y proyectos variados.\n\nEl ecosistema SAP es inmenso: FICO, MM, SD, Fiori, ABAP, BTP... nadie sabe de todo. **Especialízate pronto.**\n\n## El networking importa más de lo que crees\n\nSAP es un mundo pequeño. El consultor que conociste en una formación en 2022 puede ser tu referencia para un proyecto en 2025. Cuida esas relaciones.\n\nLa comunidad SAP en España es activa: SAP Inside Tracks, grupos de LinkedIn, ASUG... Participa.\n\n## Gestionar al cliente final\n\nNadie te enseña esto en ningún curso:\n- El cliente siempre quiere más de lo que el scope dice\n- El cambio de alcance es la fuente de todos los conflictos\n- Documenta **todo**, incluso las conversaciones de Teams\n\n## Por qué la documentación importa más de lo que parece\n\nEn 18 meses tú ya no estarás en ese proyecto. El código que escribiste sin documentar lo va a mantener otro. Trátalo como si fuera código open source: escribe para el desconocido del futuro.\n\n```abap\n* Mal: hace algo con el importe\nDATA lv_amount TYPE decimal.\n\n* Bien: importe bruto en moneda del documento (campo BKPF-WAERS)\nDATA lv_gross_amount TYPE bkpf-wrbtr.\n```\n\nSi te quedas con una sola cosa: **documenta siempre**, especialmente lo que parece obvio.",
  }
];