import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {UsuarioActivoService} from '../services/usuarioActivo/usuarioActivo.service';
import {EmpresaService} from '../services/empresa/empresa.service';
import { FormsModule }   from '@angular/forms';

import { OnDestroy } from "@angular/core";


import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';

import { LoaderService } from '../services/loader/loader.service';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { ModuloService } from '../services/modulo/modulo.service';
import { Modulo } from '../models/modulo';
import { Cliente } from '../modulos/models/cliente';
import { Notificacion } from '../models/notificacion';

import { ClientesService } from '../modulos/services/clientes/clientes.service';
import { NotificacionesService } from '../services/notificaciones/notificaciones.service';
import { Subject } from 'rxjs/Subject';
import "rxjs/add/operator/takeUntil";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInOutAnimation] 
})
export class HomeComponent implements OnInit {

  alertaNotificaciones: boolean = false;
  
  public componentesActivos:boolean[];
  public notificaciones:Notificacion[];

  public modulosActivos:Modulo[];
  private cliente:Cliente;

  public id_empresa:number;

  public notificacionTitulo:String;
  public notificacionTexto:String;

  private unsubscribe = new Subject<any>();

  constructor(
    public _moduloService:ModuloService,
  	  public router:Router,   
      public _route: ActivatedRoute,
      public _usuarioActivoService:UsuarioActivoService,
      public _usuariosService:UsuariosService,
      private loaderService: LoaderService,
      private _clientesService:ClientesService,
      private _notificacionesService:NotificacionesService
  ) { 
  	  this.obtenerNotificaciones(); 
  }

  ngAfterViewInit(){   
       
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  obtenerNotificaciones(){
    this.notificaciones = [];
    this.alertaNotificaciones = false;
    this._notificacionesService.obtenerNotificacionesUsuario(this._usuarioActivoService.getUsuarioID())
    .takeUntil(this.unsubscribe)
    .subscribe(      
      response => {
        if(response.code == 200){
          this.notificaciones = response.data;
          if(this.notificaciones.length > 0) 
            this.alertaNotificaciones = true;
          console.log(this.notificaciones);
        }        
      },
      error => {
          console.log(<any>error);         
      })
  }
  

  ngOnInit(){ 
    
  }  

  logout(){
    this._usuariosService.logout();
    this._usuarioActivoService.RemovePerfilLocal();
    var salidaURL = "welcome/"+this._usuarioActivoService.getEmpresaID();
    this.router.navigate([salidaURL]);
  }


  seleccionarClientes(){
    this.router.navigate(['seleccionarCliente']);
    this.closeNavMenu();
  }

  irListaEmpresas(){
    this.router.navigate(['home/listarEmpresas']);  
    this.closeNavMenu();  
  }

  irListaUsuarios(){
    this.router.navigate(['home/listarUsuarios']);  
    this.closeNavMenu();  
  }

  irHome(){
    this.router.navigate(['home']);
    this.closeNavMenu();
  }

  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
  openNavMenu() {    
    document.getElementById("mySidenavMenu").style.width = "270px";
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
  closeNavMenu() {
    document.getElementById("mySidenavMenu").style.width = "0";
  }
  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
  openNav() {
    
    document.getElementById("mySidenav").style.width = "100%";
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  


  enviarNoticia(){
    this._notificacionesService.enviarNoticia(this._usuarioActivoService.getEmpresaID(),this._usuarioActivoService.getUsuarioID(),this.notificacionTitulo,this.notificacionTexto)
    .takeUntil(this.unsubscribe)
    .subscribe(
      response => {
        if(response.code == 200){
          alert("Enviado correctamente");
          this.obtenerNotificaciones();
        }        
      },
      error => {
          console.log(<any>error);       
      })
  }

}
