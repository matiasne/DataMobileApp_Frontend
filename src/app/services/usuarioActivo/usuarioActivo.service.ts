import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import {ModuloService} from '../modulo/modulo.service';
import {ClientesService} from '../../modulos/services/clientes/clientes.service';

import {Cliente} from '../../modulos/models/cliente';
import {Modulo} from '../../models/modulo';
import {Usuario} from '../../models/usuario';

@Injectable()
export class UsuarioActivoService {

  public usuarioActivo:Usuario;
  public clienteActivo:Cliente;
	public url:String;
  public modulosActivos:Modulo[];

  public userPicture = "";
  public userName = "";
  public userMail = "";

  constructor(

  	public _http:Http,
    private _moduloService:ModuloService,
    private _clientesService:ClientesService
  ) { 
  		this.url = "http://200.49.127.237/DataMobileApp/usuarios.php/";
      this.usuarioActivo = new Usuario(0,"","","",false,false,"","","","");
      this.clienteActivo = new Cliente();      
  }

  public SetPerfilLocal(usuario:Usuario){
    console.log(usuario);    
    this.usuarioActivo = usuario;   
  }

  public RemovePerfilLocal(){
    this.usuarioActivo = new Usuario(0,"","","",false,false,"","","","");
    this.clienteActivo = new Cliente();
  }

  public SetCliente(id_cliente){

    this._clientesService.Get(localStorage.getItem('id_empresa'),id_cliente).subscribe(
      response => {
      if(response.code == 200){

        this.clienteActivo = response.data[0];
        console.log(this.clienteActivo);

      }else if(response.code == 204){
        alert("Su usuario no contiene nigun cliente asignado");
        //ACa debo ir a la pantalla: solicitar esignación de cliente
      }
      
      },
      error => {
        console.log(<any>error);
        alert("Error en la base de dato: la misma no existe o está mal asignada");
        
      } 
    );
  }

  getEmpresaID(){
    return localStorage.getItem('id_empresa');
  }

  isAdmin(){
    return this.usuarioActivo.isAdmin;
  }

  isSuper(){
    return this.usuarioActivo.isSuper;
  }

  getUserEmail(){ 
    return this.userMail;
  }

  getMail(){ 
    return this.usuarioActivo.mail;
  }

  getImageProfile(){
    return this.userPicture;
  }

  getNameProfile(){
    return this.userName;
  }

  getUsuarioID(){
    return this.usuarioActivo.id;
  }

  getClienteID(){
    return this.clienteActivo.ClienteId;
  }

  getCtaCte(){
    return this.clienteActivo.NroCtaCte;
  }

  getClienteNombre(){
    return this.clienteActivo.Nombre;
  }



  

}
