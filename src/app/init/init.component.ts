import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

import {Usuario} from '../models/usuario';
import { UsuarioActivoService } from '../services/usuarioActivo/usuarioActivo.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  public usuarioLogueado:Usuario;

  private subscription: ISubscription;

  constructor(
    public _router: Router,
    public _route: ActivatedRoute,
    public _usuariosService:UsuariosService,
    public _usuarioActiveService:UsuarioActivoService,
  ) { }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {	
      
      localStorage.setItem('id_empresa', params['id']);
      if(params['id']!=0){ //Si está ingresando a una empresa especifica

        this.subscription = this._usuariosService.info().subscribe(
          response => {
            if(response.code == 200){
              console.log(response.data);       
              this._usuarioActiveService.SetPerfilLocal(response.data);
              this._router.navigate(['home/seleccionarCliente']);         
            }
            else if(response.code == 204){
              this._router.navigate(['login']);
            }   
            console.log(response);    
          },
          error => {
              console.log(<any>error);
              this._router.navigate(['error']);
          }
        )
            
      }

    
  })

}

ngOnDestroy() {
  this.subscription.unsubscribe();
}
}
