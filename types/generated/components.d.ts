import type { Schema, Struct } from '@strapi/strapi';

export interface CaracteristicasCaracteristica extends Struct.ComponentSchema {
  collectionName: 'components_caracteristicas_caracteristicas';
  info: {
    displayName: 'caracteristica';
    icon: 'bulletList';
  };
  attributes: {
    descripcion: Schema.Attribute.Text & Schema.Attribute.Required;
    titulo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ColoniasColonia extends Struct.ComponentSchema {
  collectionName: 'components_colonias_colonias';
  info: {
    displayName: 'colonia';
    icon: 'pin';
  };
  attributes: {
    nombre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContactosLinkContacto extends Struct.ComponentSchema {
  collectionName: 'components_contactos_link_contactos';
  info: {
    displayName: 'contacto';
    icon: 'link';
  };
  attributes: {
    disponibilidad: Schema.Attribute.Text & Schema.Attribute.Required;
    links: Schema.Attribute.Component<'contactos.links', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
        },
        number
      >;
    texto: Schema.Attribute.String & Schema.Attribute.Required;
    tipo: Schema.Attribute.Component<'contactos.link-tipos', false> &
      Schema.Attribute.Required;
  };
}

export interface ContactosLinkTipos extends Struct.ComponentSchema {
  collectionName: 'components_contactos_link_tipos';
  info: {
    displayName: 'link_tipos';
    icon: 'envelop';
  };
  attributes: {
    tipo: Schema.Attribute.Enumeration<
      ['Telefono', 'Email', 'Direccion', 'Whatsapp']
    > &
      Schema.Attribute.Required;
  };
}

export interface ContactosLinks extends Struct.ComponentSchema {
  collectionName: 'components_contactos_links';
  info: {
    displayName: 'links';
    icon: 'link';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    texto_link: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ListasLista extends Struct.ComponentSchema {
  collectionName: 'components_listas_listas';
  info: {
    displayName: 'lista';
    icon: 'bulletList';
  };
  attributes: {
    punto: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PreguntasRespuestasPreguntaRespuesta
  extends Struct.ComponentSchema {
  collectionName: 'components_preguntas_respuestas_pregunta_respuestas';
  info: {
    displayName: 'pregunta_respuesta';
    icon: 'lightbulb';
  };
  attributes: {
    pregunta: Schema.Attribute.Text & Schema.Attribute.Required;
    respuesta: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SeccionesContacto extends Struct.ComponentSchema {
  collectionName: 'components_secciones_contactos';
  info: {
    displayName: 'contacto';
    icon: 'envelop';
  };
  attributes: {
    contactos: Schema.Attribute.Component<'contactos.link-contacto', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 4;
        },
        number
      >;
    texto_inferior: Schema.Attribute.String & Schema.Attribute.Required;
    texto_superior: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeccionesEncabezado extends Struct.ComponentSchema {
  collectionName: 'components_secciones_encabezados';
  info: {
    displayName: 'encabezado';
    icon: 'layer';
  };
  attributes: {
    descripcion: Schema.Attribute.Text & Schema.Attribute.Required;
    imagen: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    puntos: Schema.Attribute.Component<'listas.lista', true>;
    titulo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeccionesHero extends Struct.ComponentSchema {
  collectionName: 'components_secciones_heroes';
  info: {
    displayName: 'hero';
    icon: 'monitor';
  };
  attributes: {
    explicacion: Schema.Attribute.String & Schema.Attribute.Required;
    imagen: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    texto_persuasivo: Schema.Attribute.String & Schema.Attribute.Required;
    titulo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeccionesPreguntasRespuestas extends Struct.ComponentSchema {
  collectionName: 'components_secciones_preguntas_respuestas';
  info: {
    displayName: 'preguntas_respuestas';
    icon: 'lightbulb';
  };
  attributes: {
    descripcion: Schema.Attribute.Text & Schema.Attribute.Required;
    preguntas_respuestas: Schema.Attribute.Component<
      'preguntas-respuestas.pregunta-respuesta',
      true
    > &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
        },
        number
      >;
    titulo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeccionesUltimaLlamada extends Struct.ComponentSchema {
  collectionName: 'components_secciones_ultima_llamadas';
  info: {
    displayName: 'ultima_llamada';
    icon: 'message';
  };
  attributes: {
    frase: Schema.Attribute.Text & Schema.Attribute.Required;
    titulo: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface TestimoniosTestimonio extends Struct.ComponentSchema {
  collectionName: 'components_testimonios_testimonios';
  info: {
    displayName: 'testimonio';
    icon: 'thumbUp';
  };
  attributes: {
    descripcion: Schema.Attribute.String & Schema.Attribute.Required;
    imagen: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    nombre: Schema.Attribute.String & Schema.Attribute.Required;
    texto_testimonio: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'caracteristicas.caracteristica': CaracteristicasCaracteristica;
      'colonias.colonia': ColoniasColonia;
      'contactos.link-contacto': ContactosLinkContacto;
      'contactos.link-tipos': ContactosLinkTipos;
      'contactos.links': ContactosLinks;
      'listas.lista': ListasLista;
      'preguntas-respuestas.pregunta-respuesta': PreguntasRespuestasPreguntaRespuesta;
      'secciones.contacto': SeccionesContacto;
      'secciones.encabezado': SeccionesEncabezado;
      'secciones.hero': SeccionesHero;
      'secciones.preguntas-respuestas': SeccionesPreguntasRespuestas;
      'secciones.ultima-llamada': SeccionesUltimaLlamada;
      'testimonios.testimonio': TestimoniosTestimonio;
    }
  }
}
