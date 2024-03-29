import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Empresa} from '../../models/empresa';
import { LoaderService } from '../loader/loader.service';
import { environment } from '../../../environments/environment';
//import { Observable } from 'rxjs/Observable';
//import {Http,Response,Headers,RequestOptions} from '@angular/http';

@Injectable()
export class EmpresaService {

	public url: String;

	constructor(
		public _http: Http,
		private _loaderService: LoaderService,
	) { 
		this.url = environment.urlEmpresa;
		//this.url = "http://200.49.127.237/DataMobileApp/empresa.php/"
	}

	GetAll(){
		let params ="";
		this._loaderService.displayLoader(true);
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'all', params, {headers: headers})
			.map(res => res.json());				
	}


	GetEmpresa(id_empresa: String){
		let params ="id_empresa="+id_empresa; 
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'empresa', params, {headers: headers})
		         .map(res => res.json());
	}

	AddEmpresa(empresa: Empresa){
		let params ="nombre="+empresa.nombre+"&bd="+empresa.baseDatos+"&logo_url="+empresa.logoUrl+"&color_menu="+empresa.colorMenu+"&background="+empresa.background; 
		console.log(params);
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'addEmpresa', params, {headers: headers})
		         .map(res => res.json());
	}

	UpdateEmpresa(empresa: Empresa){
		let params ="id="+empresa.id+"&nombre="+empresa.nombre+"&bd="+empresa.baseDatos+"&logo_url="+empresa.logoUrl+"&color_menu="+empresa.colorMenu+"&background="+empresa.background; 
		console.log(params);
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'updateEmpresa', params, {headers: headers})
		         .map(res => res.json());
	}

	getGraficos(id_empresa: number){

	}

}
