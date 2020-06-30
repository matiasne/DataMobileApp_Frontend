import { Component, OnInit } from '@angular/core';
import { Cliente } from '../modulos/models/cliente';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { UsuarioActivoService } from '../services/usuarioActivo/usuarioActivo.service';
import { Router } from '@angular/router';


import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';
import { ClientesService } from '../modulos/services/clientes/clientes.service';
import { LoaderService } from '../services/loader/loader.service';
import { NotificacionesService } from '../services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-selecionar-cliente',
  templateUrl: './selecionar-cliente.component.html',
  styleUrls: ['./selecionar-cliente.component.css'],

  animations: [fadeInOutAnimation] 
})
export class SelecionarClienteComponent implements OnInit {

  public clientes:Cliente[];

  constructor(
    public _router: Router,
    public _usuariosService:UsuariosService,
    public _usuarioActivoService:UsuarioActivoService,
    private _clientesService:ClientesService,
    private _loaderService: LoaderService,
    public _notificacionesService: NotificacionesService
  ) { }

  ngOnInit() {
    this._loaderService.displayLoader(true);
    this.clientes =[];
    this._clientesService.ObtenerClientesAsignados(this._usuarioActivoService.getUsuarioID()).subscribe(
      response => {
        this._loaderService.displayLoader(false);
			  if(response.code == 200){
          this.clientes = response.data;  
          console.log(this.clientes); 

          //Si no se devuelven clientes entonces debe notificar nuevamente el pedido
          //se puede notificar todo lo que quiera en el servidor se filtra si el pedido esta repetido
          if(this.clientes.length == 0){
            
            this._notificacionesService.enviarPedidoAsignacion(localStorage.getItem('id_empresa'),this._usuarioActivoService.getUsuarioID());
          }

          //Si solo tiene un cliente asignado entonces pasa al home directamente
          if(this.clientes.length == 1){ 
            this._usuarioActivoService.SetCliente(this.clientes[0].ClienteId);
            this._router.navigate(['home']);
          }
        }
        else{
          this._notificacionesService.enviarPedidoAsignacion(localStorage.getItem('id_empresa'),this._usuarioActivoService.getUsuarioID()).subscribe(
            response => {
              alert(response.data);
            },
            error =>{
              alert(response.data);
            }
          );
          alert("No tienes clientes asignados aún, reporta este mensaje a tu proveedor");
        }
			},
			error => {
        this._loaderService.displayLoader(false);	
        this._router.navigate(['login']);		  
			  console.log(<any>error);			  
			})
    }

    selecionarCliente(i){
      this._usuarioActivoService.SetCliente(i);
      this._router.navigate(['home']);
    }

}
