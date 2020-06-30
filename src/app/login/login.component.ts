import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';
import { EmpresaService } from '../services/empresa/empresa.service';

import {Empresa} from '../models/empresa';
import {Usuario} from '../models/usuario';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { UsuarioActivoService } from '../services/usuarioActivo/usuarioActivo.service';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInOutAnimation] 
})
export class LoginComponent implements OnInit {

  public empresa:Empresa;
  public logoURL:string;

  public mail:String;
  public contrasena:String;

  public usuarioLogueado:Usuario;

  constructor(
    public _route: ActivatedRoute,
    public _router: Router,
    public _empresaService:EmpresaService,
    public _usuariosService:UsuariosService,
    public _usuarioActiveService:UsuarioActivoService,
    private _loaderService: LoaderService
    
  ) {
    this.empresa = new Empresa(0,"","","","","");
    
    
  }

  ngAfterViewInit(){
    this._loaderService.displayLoader(true);
    
	}

  ngOnInit() {
    
    this._empresaService.GetEmpresa( localStorage.getItem('id_empresa')).subscribe(
          
      response => {
        if(response.code == 200){
          this.empresa = response.data;
          this.setearGráficos(this.empresa); 
          this._loaderService.displayLoader(false);              
        }
        else if(response.code == 204){
          alert("Empresa inexistente");
        }
        else{
          this._router.navigate(['error']);
        }
      },
      error => {
          console.log(<any>error);
          this._router.navigate(['error']);
      })    
   
  }


  setearGráficos(empresa){
    this.logoURL = this.empresa.logoUrl.trim();
  }

  public login(){
    this._loaderService.displayLoader(true);
    this._usuariosService.login(this.mail,this.contrasena).subscribe(      
      response => {
        if(response.code == 200){

          this._loaderService.displayLoader(false);
          localStorage.setItem('access_token',response.data);          
          this.obtenerInfoDelUsuario();          
        }
        else{
          this._router.navigate(['login']);
          alert("El usuario no existe o su contraseña es incorrecta");
          this._loaderService.displayLoader(false);
        }        
      },
      error => {
        this._loaderService.displayLoader(false);
          console.log(<any>error);
          this._router.navigate(['login']);
      })    
  }

  obtenerInfoDelUsuario(){

    this._usuariosService.info().subscribe(      
      response => {
        if(response.code == 200){         
          this._usuarioActiveService.SetPerfilLocal(response.data);
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
    
}


