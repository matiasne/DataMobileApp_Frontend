import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Usuario} from '../../models/usuario';


@Injectable()
export class UsuariosService {

	public url:String;

  	constructor(
  		public _http:Http,
  	) {
  		this.url = "http://200.49.127.237/DataMobileApp/usuarios.php/"
   }

  

   login(mail,contrasena){
	let params ="mail="+mail+"&contrasena="+contrasena;
	let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
	return this._http.post(this.url+'tokenLogin', params, {headers: headers})
			 .map(res => res.json());
   }

   info(){
	let params ="token="+localStorage.getItem('access_token');
	let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
	return this._http.post(this.url+'tokenInfo', params, {headers: headers})
			 .map(res => res.json());
   }

   logout(){	   
	   localStorage.setItem('access_token','0');
		/*let params ="token="+localStorage.getItem('token');
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'logout', params, {headers: headers})
				.map(res => res.json());*/
   }

   	registrar(nombre,mail,contrasena,confirmacionContrasena,id_empresa){
		let params ="nombre="+nombre+"&mail="+mail+"&contrasena="+contrasena+"&confirmacionContrasena="+confirmacionContrasena+"&id_empresa="+id_empresa;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'registrar', params, {headers: headers})
				.map(res => res.json());
	}

    GetAll(){
		let params ="id_empresa="+localStorage.getItem('id_empresa');
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'all', params, {headers: headers})
		         .map(res => res.json());
	}

	Get(id_usuario:number){
		let params ="id_usuario="+id_usuario; 
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'usuario', params, {headers: headers})
		         .map(res => res.json());
	}


	Add(usuario:Usuario){

		let params ="mail="+usuario.mail+"&id_empresa="+usuario.id_empresa+"&nombreCompleto="+usuario.nombreCompleto+"&telefono="+usuario.telefono+"&direccion="+usuario.direccion+"&id_cliente="+usuario.id_cliente; 
		console.log(params);
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'add', params, {headers: headers})
		         .map(res => res.json());
	}

	Update(usuario:Usuario){	

		let params ="id="+usuario.id+"&mail="+usuario.mail+"&id_empresa="+usuario.id_empresa+"&nombreCompleto="+usuario.nombreCompleto+"&telefono="+usuario.telefono+"&direccion="+usuario.direccion+"&id_cliente="+usuario.id_cliente; 
		console.log(params);
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'update', params, {headers: headers})
		         .map(res => res.json());
	}

	Delete(id_usuario:number){		
		let params ="id_usuario="+id_usuario; 
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'borrar', params, {headers: headers})
		         .map(res => res.json());
	}

	

}
