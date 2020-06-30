import { Component, OnInit, Input } from '@angular/core';
import { Notificacion } from '../models/notificacion';
import { NotificacionesService } from '../services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-notificacion-noticia',
  templateUrl: './notificacion-noticia.component.html',
  styleUrls: ['./notificacion-noticia.component.css']
})
export class NotificacionNoticiaComponent implements OnInit {
  
  @Input() datos:Notificacion;


  constructor(
    private _notificacionesService:NotificacionesService
  ) { 
  }

  ngOnInit() {
    console.log(this.datos.titulo);
  }

  eliminarNotificacion(){
    this._notificacionesService.borrar(this.datos.id).subscribe(
      response => {
        if(response.code == 200){
          document.getElementById("notificacion"+this.datos.id).style.visibility = "hidden";
        }        
      },
      error => {
          console.log(<any>error);       
    })   
  }

}
