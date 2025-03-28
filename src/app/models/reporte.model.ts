export class ConsultaReporte {
    so_col_id: number;
    so_es_id: number;
    so_fec_ini: string;
    so_fec_final: string;
    so_ts_id: number;
  }

  export class EstadoSolicitud {
    estado: string;
    cantidad: number;
  }
  
  export class ColaboradorSolicitudes {
    colaboradorId: number ;
    colaboradorNombre:string;
    estadosSolicitudes: EstadoSolicitud[];
  }
  
  