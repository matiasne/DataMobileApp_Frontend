import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ModuloService} from '../services/modulo/modulo.service';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-empresa-modulo-list',
  templateUrl: './empresa-modulo-list.component.html',
  styleUrls: ['./empresa-modulo-list.component.css'],
  animations: [fadeInOutAnimation] 
})
export class EmpresaModuloListComponent implements OnInit {

	public modulos;
	public id_empresa; //lo usa en la vista el routerLink

  constructor(
  	public _moduloService:ModuloService,
  	public _route: ActivatedRoute,
  	public _router: Router,
      private _loaderService: LoaderService,
	  ) { }
	  
	  ngAfterViewInit(){
		this._loaderService.displayLoader(true);
		}

  ngOnInit() {
  	this._route.params.forEach((params: Params) => {
		let id = params['id'];

		this.id_empresa = id;

		this.getModulos(this.id_empresa);
		
	});
  }

  getModulos(id_empresa){
  	this._moduloService.GetByEmpresa().subscribe(
			response => {
				this._loaderService.displayLoader(false);
				if(response.code == 200){
					this.modulos = response.data;
					console.log(this.modulos);
				}else{
					this._router.navigate(['/listarEmpresas']);
				}
			},
			error => {
				this._loaderService.displayLoader(false);
				console.log(<any>error);
			}
		);
  }

  DeleteModulo(id_modulo){
	this._loaderService.displayLoader(true);
  	this._moduloService.Delete(id_modulo).subscribe(
		response => {
			this._loaderService.displayLoader(false);
			if(response.code == 200){
				
				alert("Borrado correctamente");
				this.getModulos(this.id_empresa);
			}else{
				alert('Error al borrar producto');
			}
		},	
		error => {
			this._loaderService.displayLoader(false);
			console.log(<any>error);
		}
	);
  }

  

}
