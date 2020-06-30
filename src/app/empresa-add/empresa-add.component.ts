import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EmpresaService} from '../services/empresa/empresa.service';
import {Empresa} from '../models/empresa';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';

@Component({
  selector: 'app-empresa-add',
  templateUrl: './empresa-add.component.html',
  styleUrls: ['./empresa-add.component.css'],
  animations: [fadeInOutAnimation] 
})
export class EmpresaAddComponent implements OnInit {

	public empresa:Empresa;

  constructor(
  		public _empresaService:EmpresaService,
	  	public _route: ActivatedRoute,
	  	public _router: Router
	) { 
  	this.empresa = new Empresa(0,"","","","","");
  }

  ngOnInit() {
  }

  addEmpresa(){
  	console.log(this.empresa);
  	this._empresaService.AddEmpresa(this.empresa).subscribe(
		response => {
			if(response.code == 200){
				alert("Agregado correctamente");
			}else{
				alert('Error al borrar producto');
			}
		},	
		error => {
			console.log(<any>error);
		}
	);
  }

}
