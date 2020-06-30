import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Cliente } from '../../models/cliente';



@Injectable()
export class ClientesService {

	 public url:String;
	 public cliente:Cliente;

  	constructor(
  		public _http:Http,
  	) {

  	this.url = "http://200.49.127.237/DataMobileApp/modulos/clientes.php/";
	   }	

	All(){
		let params ="id_empresa="+localStorage.getItem('id_empresa');
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'all', params, {headers: headers})
			.map(res => res.json());
	}
	//Esto con llamarlo una sola vez es suficiente!!!
	Get(id_empresa,id_cliente){
		let params ="id_empresa="+id_empresa+"&id_cliente="+id_cliente;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'datos', params, {headers: headers})
			.map(res => res.json());    
	}	

	ObtenerClientesAsignados(id_usuario){
		let params ="id_usuario="+id_usuario+"&id_empresa="+localStorage.getItem('id_empresa'); 
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'', params, {headers: headers})
		         .map(res => res.json());
	}

	AsignarCliente(id_usuario,id_cliente){
		let params ="id_usuario="+id_usuario+"&id_cliente="+id_cliente+"&id_empresa="+localStorage.getItem('id_empresa'); 
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'asignarCliente', params, {headers: headers})
		         .map(res => res.json());
	}

	borrarCliente(id_usuario,id_cliente){
		let params ="id_usuario="+id_usuario+"&id_cliente="+id_cliente+"&id_empresa="+localStorage.getItem('id_empresa'); 
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'borrarCliente', params, {headers: headers})
		         .map(res => res.json());
	}


}
