
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
//Componentes
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

import { LoginComponent } from './login/login.component';
import { RegistracionComponent } from './registracion/registracion.component';

import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuariosEditComponent } from './usuarios-edit/usuarios-edit.component';

import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';
import { EmpresaModuloListComponent } from './empresa-modulo-list/empresa-modulo-list.component';
import { EmpresaModuloAddComponent } from './empresa-modulo-add/empresa-modulo-add.component';
import { EmpresaAddComponent } from './empresa-add/empresa-add.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { InitComponent } from './init/init.component';

import { FichaGranariaComponent } from './modulos/ficha-granaria/ficha-granaria.component';
import { FichaFinancieraComponent } from './modulos/ficha-financiera/ficha-financiera.component';
import { ComprobantesComponent } from './modulos/comprobantes/comprobantes.component';
import { OrdenesTrabajoComponent } from './modulos/ordenes-trabajo/ordenes-trabajo.component';
import { EntregasPendientesComponent } from './modulos/entregas-pendientes/entregas-pendientes.component';
import { ReservasPendientesComponent } from './modulos/reservas-pendientes/reservas-pendientes.component';
import { ListaDePreciosComponent } from './modulos/lista-de-precios/lista-de-precios.component';
import { CotizacionComponent } from './modulos/cotizacion/cotizacion.component';
import { SelecionarClienteComponent } from './selecionar-cliente/selecionar-cliente.component';
import { FichaFinancieraLosCondoresComponent } from './modulos/ficha-financiera-los-condores/ficha-financiera-los-condores.component';

const appRoutes:Routes = [

	{path:'', component:LoginComponent}, 
	{path:'error', component:ErrorComponent},
	{path:'welcome/:id', component:InitComponent},
	{path:'login', component:LoginComponent}, //Para una empresa específica!!!
	
	{path:'registracion', component:RegistracionComponent},
	{path:'home', component:HomeComponent,
		children: [	      
			
			{path:'seleccionarCliente',component:SelecionarClienteComponent},
			{path:'', component:MainMenuComponent},	
	      	{path:'listarEmpresas', component:EmpresaListComponent},	
			{path:'edicionEmpresa/:id', component:EmpresaEditComponent},
			{path:'agregarEmpresa', component:EmpresaAddComponent},
			{path:'edicionEmpresaModulo/:id', component:EmpresaModuloListComponent},
			{path:'addEmpresaModulo/:id', component:EmpresaModuloAddComponent},

			{path:'listarUsuarios', component:UsuariosListComponent},
			{path:'edicionUsuario/:id', component:UsuariosEditComponent},
			{path:'fichaGranaria', component:FichaGranariaComponent}, 
			{path:'fichaFinanciera', component:FichaFinancieraComponent},
			{path:'fichaFinancieraLosCondores', component:FichaFinancieraLosCondoresComponent},
			{path:'comprobantes', component:ComprobantesComponent},
			{path:'ordenesTrabajo', component:OrdenesTrabajoComponent},
			{path:'entregasPendientes', component:EntregasPendientesComponent},
			{path:'reservasPendientes', component:ReservasPendientesComponent},
			{path:'listaDePrecios', component:ListaDePreciosComponent},
			{path:'cotizacion', component:CotizacionComponent},		

	]},
];

export const appRoutingProviders:any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);