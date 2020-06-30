import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {UsuariosService} from '../services/usuarios/usuarios.service';
import {Usuario} from '../models/usuario';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';
import { LoaderService } from '../services/loader/loader.service';
import { Cliente } from '../modulos/models/cliente';
import { ClientesService } from '../modulos/services/clientes/clientes.service';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.css'],
  animations: [fadeInOutAnimation] 
})
export class UsuariosEditComponent implements OnInit {

	public usuario:Usuario;

	public id_usuario:String;
	
	public clienteSeleccionado:Cliente;
	public clientes:Cliente[];
	public todosClientes:Cliente[];

  constructor(
  		public _usuariosService:UsuariosService,
	  	public _route: ActivatedRoute,
		  public _router: Router,
			public _loaderService:LoaderService,
			private _clientesService:ClientesService,
	 ) { 
			this.usuario = new Usuario(0,"","","",false,false,"","","","");
			this.obtenerClientesAsignados();
			this.clienteSeleccionado = new Cliente();
			this.obtenerTodosClientes();
  }

  ngAfterViewInit(){
	this._loaderService.displayLoader(true);
}

  updateUsuario(){
  	this._loaderService.displayLoader(true);
  	this._usuariosService.Update(this.usuario).subscribe(
		response => {
			if(response.code == 200){
				alert("Agregado correctamente");
			}else{
				alert('Error al borrar producto');
			}
			this._loaderService.displayLoader(false);
		},	
		error => {
			console.log(<any>error);
			this._loaderService.displayLoader(false);
		}
	);
  }

  ngOnInit() {
  	this._route.params.forEach((params: Params) => {
		let id = params['id'];

		this.id_usuario = id;
		this.obtenerClientesAsignados();
		
		this._usuariosService.Get(id).subscribe(
			response => {
				if(response.code == 200){
					this.usuario = response.data;
					console.log(this.usuario);
				}else{
					this._router.navigate(['/listarClientes']);
				}
				this._loaderService.displayLoader(false);
			},
			error => {
				console.log(<any>error);
				this._loaderService.displayLoader(false);
			}
		);
	});
	}
	


	obtenerClientesAsignados(){
		this._clientesService.ObtenerClientesAsignados(this.id_usuario).subscribe(
			response =>{
				if(response.code == 200){
					this.clientes = response.data;  
					console.log(this.clientes); 
				}
			},
			error =>{

			}
		)
	}

	obtenerTodosClientes(){
		this._clientesService.All().subscribe(
			response =>{
				if(response.code == 200){
					this.todosClientes = response.data;  
					console.log(this.todosClientes); 
				}
			},
			error =>{

			}
		)
	}

	asignarCliente(){
		console.log("!!!!"+this.id_usuario+" "+this.clienteSeleccionado.ClienteId)
		this._clientesService.AsignarCliente(this.id_usuario,this.clienteSeleccionado.ClienteId).subscribe(
			response =>{
				if(response.code == 200){
					alert("Cliente asignado");
					this.obtenerClientesAsignados();
				}
			},
			error =>{
			}
		)
	}

	borrarCliente(ClienteId){
		this._clientesService.borrarCliente(this.id_usuario,ClienteId).subscribe(
			response =>{
				if(response.code == 200){
					alert("Cliente borrado");
					this.obtenerClientesAsignados();
				}
			},
			error =>{
			}
		)
	}

}
