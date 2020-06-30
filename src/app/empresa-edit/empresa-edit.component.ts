import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EmpresaService} from '../services/empresa/empresa.service';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';

import { Empresa } from '../models/empresa';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-empresa-edit',
  templateUrl: './empresa-edit.component.html',
  styleUrls: ['./empresa-edit.component.css'],
  providers: [EmpresaService],
  animations: [fadeInOutAnimation] 
})
export class EmpresaEditComponent implements OnInit {

	public empresa:Empresa;

  constructor(
  	public _empresaService:EmpresaService,
  	public _route: ActivatedRoute,
  	public _router: Router,
      private loaderService: LoaderService,
  ) { 

  	this.empresa = new Empresa(0,"","","","","");
  }

  ngAfterViewInit(){
	this.loaderService.displayLoader(true);
	}

  ngOnInit() {
  	this._route.params.forEach((params: Params) => {
		let id = params['id'];

		this._empresaService.GetEmpresa(id).subscribe(
			response => {
				if(response.code == 200){
					this.empresa = response.data;
					console.log(this.empresa);
					this.loaderService.displayLoader(false);
				}else{
					this._router.navigate(['/listarEmpresas']);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	});
  }

  UpdteEmpresa(){
	  
	this.loaderService.displayLoader(true);
  	this._empresaService.UpdateEmpresa(this.empresa).subscribe(
		response => {
			this.loaderService.displayLoader(false);
			if(response.code == 200){
				
				alert("Actualizada correctamente");
				this._router.navigate(['/listarEmpresas']);
			}else{			
				alert('Error al actualizar producto');
				this._router.navigate(['/listarEmpresas']);
			}
			
		},	
		error => {
			this.loaderService.displayLoader(false);
			console.log(<any>error);
		}
	);
  }
}
