import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {routing, appRoutingProviders} from './app.routing';

import { UsuarioActivoService } from './services/usuarioActivo/usuarioActivo.service';
import { EmpresaService } from './services/empresa/empresa.service';
import { UsuariosService } from './services/usuarios/usuarios.service';
import { ModuloService } from './services/modulo/modulo.service';
import { EspeciesService } from './modulos/services/especies/especies.service';
import { ClientesService } from './modulos/services/clientes/clientes.service';

import {FichaGranariaService} from './modulos/services/fichaGranaria/ficha-granaria.service';
import {FichaFinancieraService} from './modulos/services/fichaFinanciera/ficha-financiera.service';
import {ComprobantesService} from './modulos/services/comprobantes/comprobantes.service';
import {OrdenesTrabajoService} from './modulos/services/ordenesTrabajo/ordenes-trabajo.service';
import {ReservasPendientesService} from './modulos/services/reservas-pendientes/reservas-pendientes.service';
import {EntregasPendientesService} from './modulos/services/entregas-pendientes/entregas-pendientes.service';
import {ListaDePreciosService} from './modulos/services/lista-de-precios/lista-de-precios.service';

import {CotizacionesService} from './modulos/services/cotizaciones/cotizaciones.service';

import {LoaderService} from './services/loader/loader.service';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { EmpresaModuloListComponent } from './empresa-modulo-list/empresa-modulo-list.component';
import { EmpresaModuloAddComponent } from './empresa-modulo-add/empresa-modulo-add.component';
import { EmpresaAddComponent } from './empresa-add/empresa-add.component';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuariosEditComponent } from './usuarios-edit/usuarios-edit.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FichaGranariaComponent, NumerosGranaria } from './modulos/ficha-granaria/ficha-granaria.component';
import { FichaFinancieraComponent, NumerosFinanciera } from './modulos/ficha-financiera/ficha-financiera.component';
import { ComprobantesComponent } from './modulos/comprobantes/comprobantes.component';
import { OrdenesTrabajoComponent } from './modulos/ordenes-trabajo/ordenes-trabajo.component';
import { EntregasPendientesComponent } from './modulos/entregas-pendientes/entregas-pendientes.component';
import { ReservasPendientesComponent } from './modulos/reservas-pendientes/reservas-pendientes.component';
import { ListaDePreciosComponent } from './modulos/lista-de-precios/lista-de-precios.component';
import { ErrorComponent } from './error/error.component';
import { CotizacionComponent } from './modulos/cotizacion/cotizacion.component';
import { GranosComponent } from './modulos/granos/granos.component';
import { GranosService } from './modulos/services/granos/granos.service';
import { LoginComponent } from './login/login.component';
import { RegistracionComponent } from './registracion/registracion.component';
import { InitComponent } from './init/init.component';
import { NotificacionesService } from './services/notificaciones/notificaciones.service';
import { NotificacionNoticiaComponent } from './notificacion-noticia/notificacion-noticia.component';
import { NotificacionNuevoUsuarioComponent } from './notificacion-nuevo-usuario/notificacion-nuevo-usuario.component';
import { SelecionarClienteComponent } from './selecionar-cliente/selecionar-cliente.component';
import { FichaFinancieraLosCondoresComponent } from './modulos/ficha-financiera-los-condores/ficha-financiera-los-condores.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmpresaEditComponent,
    EmpresaListComponent,
    EmpresaModuloListComponent,
    EmpresaModuloAddComponent,
    EmpresaAddComponent,
    UsuariosListComponent,
    UsuariosEditComponent,
    MainMenuComponent,
    FichaGranariaComponent,
    FichaFinancieraComponent,
    ComprobantesComponent,
    OrdenesTrabajoComponent,
    EntregasPendientesComponent,
    ReservasPendientesComponent,
    ListaDePreciosComponent,
    ErrorComponent,
    CotizacionComponent,
    GranosComponent,
    LoginComponent,
    RegistracionComponent,
    InitComponent,
    NotificacionNoticiaComponent,
    NotificacionNuevoUsuarioComponent,
    SelecionarClienteComponent,
    NumerosFinanciera,
    NumerosGranaria,
    FichaFinancieraLosCondoresComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    routing,
    HttpModule,
  ],
  providers: [
      LoaderService,
      UsuarioActivoService,
      EmpresaService,
      UsuariosService,
      ModuloService,
      EspeciesService,
      ClientesService,
      FichaGranariaService,
      FichaFinancieraService,
      ComprobantesService,
      OrdenesTrabajoService,
      ReservasPendientesService,
      EntregasPendientesService,
      ListaDePreciosService,
      GranosService,
      CotizacionesService,
      NotificacionesService
     ],
  bootstrap: [AppComponent]
})
export class AppModule { }
