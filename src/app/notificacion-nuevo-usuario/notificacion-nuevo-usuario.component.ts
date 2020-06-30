import { Component, OnInit, Input } from '@angular/core';
import { NotificacionesService } from '../services/notificaciones/notificaciones.service';
import { Notificacion } from '../models/notificacion';
import { Cliente } from '../modulos/models/cliente';
import { ClientesService } from '../modulos/services/clientes/clientes.service';
import { UsuarioActivoService } from '../services/usuarioActivo/usuarioActivo.service';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-notificacion-nuevo-usuario',
  templateUrl: './notificacion-nuevo-usuario.component.html',
  styleUrls: ['./notificacion-nuevo-usuario.component.css']
})
export class NotificacionNuevoUsuarioComponent implements OnInit {

    public clienteSeleccionado:Cliente;
    public clientes:Cliente[];
    public todosClientes:Cliente[];   
  
    @Input() datos:Notificacion;
  
    constructor(
      private _notificacionesService:NotificacionesService,
      private _clientesService:ClientesService,
      private _usuarioActivoService:UsuarioActivoService,
      private _loaderService: LoaderService,
    ) { 

      this.clienteSeleccionado = new Cliente();
      
    }
  
    ngOnInit() {
      console.log(this.datos);
      
    } 

    obtenerDatos(){
      this.obtenerTodosClientes();
      
    }
  
    eliminarNotificacion(){
      this._notificacionesService.borrar(this.datos.id).subscribe(
        response => {
          if(response.code == 200){
            document.getElementById("notificacion"+this.datos.id).remove();
          }        
        },
        error => {
            console.log(<any>error);       
      })   
    }

    obtenerClientesAsignados(){
      console.log("!!!!"+this.datos.id_remitente);
      this.clientes =[];
      this._clientesService.ObtenerClientesAsignados(this.datos.id_remitente).subscribe(
        response =>{
          this._loaderService.displayLoader(false); 
          if(response.code == 200){
            this.clientes = response.data;  
            console.log(this.clientes);
            
            
            this.clientes.forEach(cliente =>{
              this.EliminarClienteDeLista(cliente.ClienteId);
            })          
            
          }
        },
        error =>{
          this._loaderService.displayLoader(false);
          console.log(<any>error);
        }
      )
    }

    obtenerTodosClientes(){
      this._loaderService.displayLoader(true);
      this.todosClientes =[];
      this._clientesService.All().subscribe(
        response =>{
          if(response.code == 200){
            
            this.todosClientes = response.data;  
            console.log(this.todosClientes); 
            this.obtenerClientesAsignados();
          }
        },
        error =>{

        }
      )
    }

    EliminarClienteDeLista(id){
      this.todosClientes.forEach((item,index) =>{
        if(item.ClienteId == id){
          console.log("Borrando....");
          this.todosClientes.splice(index,1);        
        }
      });
    }

    asignarCliente(){
      
      this._clientesService.AsignarCliente(this.datos.id_remitente,this.clienteSeleccionado.ClienteId).subscribe(
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
      this._clientesService.borrarCliente(this.datos.id_remitente,ClienteId).subscribe(
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
