export interface EventImage {
    id: string;
    path: string;
  }
  
  export interface EventOrganizer {
    id: string;
    name: string;
  }
  
  export interface Event {
    id: string;
    name: string;
    nu_ingressos: number;
    tp_evento: string;
    dt_start: string;
    dt_end: string;
    dt_criacao: string;
    dt_alteracao: string;
    operation: string;
    endpoint_modificador: string;
    nu_versao: number;
    modified_by_id: 1;
    modified_by_name: string;
    images: EventImage[];
    organizer: EventOrganizer;
  }
  
  export type FindAllEventsResponse = Event[];
  