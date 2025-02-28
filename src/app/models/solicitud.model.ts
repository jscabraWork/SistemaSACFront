export class TipoIdentificacion {
    ti_id!: number;
    ti_descripcion!: string;
}

export class Usuario {
    us_id!: number;
    us_nombre!: string;
    us_apellido!: string;
    us_ti_id!: number;
    us_identificacion!: string;
    us_telefono!: string;
    us_correo!: string;
    tipo_Identificacion!: TipoIdentificacion;
}

export class TipoSolicitud {
    ts_id!: number;
    ts_nombre!: string;
    ts_descripcion!: string;
    ts_prioridad!: number;
}

export class EstadoSolicitud {
    es_id!: number;
    es_nombre_estado!: string;
}

export class Solicitud {
    so_id!: number;
    so_numero_solicitud: string;
    so_ts_id!: number;
    so_descripcion!: string;
    so_fecha_creacion!: Date;
    so_es_id!: number;
    so_us_id!: number;
    usuarios: Usuario = new Usuario();
    tipos_Solicitudes: TipoSolicitud = new TipoSolicitud();
    estados_Solicitudes: EstadoSolicitud = new EstadoSolicitud();
}
