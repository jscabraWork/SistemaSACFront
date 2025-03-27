export class UsuarioCreacion {
    us_nombre: string;
    us_apellido: string;
    us_ti_id: number=-1;
    us_identificacion: string;
    us_telefono: string;
    us_correo: string;
    us_tu_id:number;
}

export class SolicitudCreacion {
    so_descripcion: string;
    so_ts_id: number=-1;
    so_es_id: number;
    usuario: UsuarioCreacion=new UsuarioCreacion();
    so_so_id?: number;
}
