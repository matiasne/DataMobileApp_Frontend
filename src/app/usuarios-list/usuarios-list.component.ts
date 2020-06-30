import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Usuario} from '../models/usuario';
import {UsuariosService} from '../services/usuarios/usuarios.service';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';

import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css'],
  animations: [fadeInOutAnimation] 
})
export class UsuariosListComponent implements OnInit {


	public usuarios:Usuario[];


  constructor(
  		public _usuariosService:UsuariosService,
  		public _router: Router,
  		private _loaderService: LoaderService,
  	) { }

  ngOnInit() {
  	this.GetAllUsuarios();
  }

  ngAfterViewInit(){
	this._loaderService.displayLoader(true);
}

  GetAllUsuarios(){
	this.usuarios = [];
  	
  	this._usuariosService.GetAll().subscribe(
	       
	        response => {
				if(response.code == 200){
					console.log(response.data);
					this.usuarios = response.data
				}else{
					this._router.navigate(['/']);
				}
				this._loaderService.displayLoader(false);
			},
			error => {
				this._loaderService.displayLoader(false);
				console.log(<any>error);
			}
      	);
  } 

  EliminarUsuario(id){
  	this._usuariosService.Delete(id).subscribe(
	       
        response => {
			if(response.code == 200){
				alert("Eliminado correctamente");
				this.GetAllUsuarios();
				
			}else{
				this._router.navigate(['/']);
			}
		},
		error => {
			console.log(<any>error);
		}
  	);
  }

}
