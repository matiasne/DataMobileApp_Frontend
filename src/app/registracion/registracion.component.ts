import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';

import { UsuariosService } from '../services/usuarios/usuarios.service';
import { NotificacionesService } from '../services/notificaciones/notificaciones.service';
import { Usuario } from '../models/usuario';
import { UsuarioActivoService } from '../services/usuarioActivo/usuarioActivo.service';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-registracion',
  templateUrl: './registracion.component.html',
  styleUrls: ['./registracion.component.css'],
  animations: [fadeInOutAnimation] 
})
export class RegistracionComponent implements OnInit {

  public nombre:String;
  public mail:String;
  public contrasena:String;
  public confirmacionContrasena:String;

  public usuarioRegistrado:Usuario;
  
  constructor(
    public _route: ActivatedRoute,
    public _router: Router,
    public _usuariosService:UsuariosService,
    public _notificacionesService:NotificacionesService,
    public _usuarioActiveService:UsuarioActivoService,
    private _loaderService: LoaderService
  ) { }

  ngOnInit(
    
  ) {
  }

  public registrarUsuario(){

    //Aca debe cargar la notificación
    this._loaderService.displayLoader(true);
    this._usuariosService.registrar(this.nombre,this.mail,this.contrasena,this.confirmacionContrasena,localStorage.getItem('id_empresa')).subscribe(      
      response => {
        if(response.code == 200){  

          //Cargar los datos en el servicio para poder usarlos en caso de ser necesario
          this._loaderService.displayLoader(false);
          localStorage.setItem('access_token',response.data);          
          this.obtenerInfoDelUsuario();  
        }
        else{
          this._loaderService.displayLoader(false);
          console.log(response);
          alert(response.data);
        }
      },
      error => {
          console.log(<any>error);
          this._router.navigate(['home']);
      })   
  }


  obtenerInfoDelUsuario(){

    this._usuariosService.info().subscribe(      
      response => {
        if(response.code == 200){  

          this._usuarioActiveService.SetPerfilLocal(response.data);
          
          //Envia una notificacion a todos los miembros de la empresa para que lo asignen a un cliente
          this._notificacionesService.enviarPedidoAsignacion(localStorage.getItem('id_empresa'),this._usuarioActiveService.getUsuarioID()).subscribe(
            response =>{
              alert("Comuniquesé con su porveedor para la asignación de uno o más clientes");
            },
            error => {
              
            }
          );
          
          this._router.navigate(['home/seleccionarCliente']);
        }
        else{
          this._router.navigate(['login']);          
        }        
      },
      error => {        
          console.log(<any>error);
          this._router.navigate(['login']);
      })

    
  }

  public volverAtras(){
    var salidaURL = "welcome/"+ localStorage.getItem('id_empresa');
    this._router.navigate([salidaURL]);
  }

}
