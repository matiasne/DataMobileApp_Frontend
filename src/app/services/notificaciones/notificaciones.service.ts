import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
//import { Observable } from 'rxjs/Observable';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class NotificacionesService {

  public url: String;
  
  constructor(public _http: Http) {
    this.url = environment.urlNotificaciones;
    //this.url = "http://200.49.127.237/DataMobileApp/notificaciones.php/"
  }

  obtenerNotificacionesUsuario(id_destinatario){
    //En el servidor se fija si es administrador y le envía las notificaciones de la empresa tmb
    let params ="id_destinatario="+id_destinatario;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
    return this._http.post(this.url+'obtener', params, {headers: headers})
         .map(res => res.json());
  }

  setearLeida(id, valorLeida){
    let params ="id="+id+"&leida="+valorLeida;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
    return this._http.post(this.url+'setLeida', params, {headers: headers})
         .map(res => res.json());
  }

  enviarNoticia(id_empresa, id_remitente, titulo, texto){
    let params ="id_empresa="+id_empresa+"&id_remitente="+id_remitente+"&texto="+texto+"&titulo="+titulo;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
    return this._http.post(this.url+'enviarNoticia', params, {headers: headers})
         .map(res => res.json());
  }

  enviarNotificacionAUsuario(id_destinatario, id_remitente, texto, tipo){
    let params ="id_destinatario="+id_destinatario+"&id_remitente="+id_remitente+"&texto="+texto+"&tipo="+tipo;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
    return this._http.post(this.url+'enviarAUsuario', params, {headers: headers})
         .map(res => res.json());
  }

  enviarNotificacionAEmpresa(id_empresa, id_remitente, titulo, texto, tipo){
    let params ="id_empresa="+id_empresa+"&id_remitente="+id_remitente+"&texto="+texto+"&tipo="+tipo+"&titulo="+titulo;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
    return this._http.post(this.url+'enviarAEmpresa', params, {headers: headers})
         .map(res => res.json());
  }

  enviarPedidoAsignacion(id_empresa, id_remitente){
    let params ="id_empresa="+id_empresa+"&id_remitente="+id_remitente;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
    return this._http.post(this.url+'enviarPedidoAsignacion', params, {headers: headers})
         .map(res => res.json());
  }

  borrar(id){
    let params ="id="+id;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
    return this._http.post(this.url+'borrar', params, {headers: headers})
         .map(res => res.json());
  }

}
