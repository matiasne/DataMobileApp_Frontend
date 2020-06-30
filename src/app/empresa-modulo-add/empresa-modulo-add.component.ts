import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EmpresaService} from '../services/empresa/empresa.service';
import {ModuloService} from '../services/modulo/modulo.service';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';

import {Modulo} from '../models/modulo';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-empresa-modulo-add',
  templateUrl: './empresa-modulo-add.component.html',
  styleUrls: ['./empresa-modulo-add.component.css'],
  animations: [fadeInOutAnimation] 
})
export class EmpresaModuloAddComponent implements OnInit {

	public modulo:Modulo;

	public id_empresa;

  	constructor(
	  	public _empresaService:EmpresaService,
	  	public _moduloService:ModuloService,
	  	public _route: ActivatedRoute,
		  public _router: Router,
		  private loaderService: LoaderService,
	  	) { 
  		this.modulo = new Modulo(0,0,"","","","","");
	  }
	  
	  ngAfterViewInit(){
		
		}

	  ngOnInit() {
	  	this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this.modulo.id_empresa = id;			
		});
	  }

	  AgregarModulo(){
	  	this._moduloService.Add(this.modulo).subscribe(
			response => {
				this.loaderService.displayLoader(false);
				if(response.code == 200){
					alert("Agregado correctamente");
				}else{
					alert('Error al agregar producto');
				}
			},	
			error => {
				this.loaderService.displayLoader(false);
				console.log(<any>error);
			}
		);
	  }

}
