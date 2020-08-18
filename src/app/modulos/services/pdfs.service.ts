import { Injectable } from '@angular/core';
import { ItemFichaFinanciera } from '../models/itemFichaFinanciera';

import * as jsPDF from 'jspdf';
import { Cliente } from '../models/cliente';
/*
correr npm install jspdf --save
luego npm install @types/jspdf --save
agregar al angular-cli.json lo siguiente:
"scripts": ["../node_modules/jspdf/dist/jspdf.min.js"],
*/


@Injectable()
export class PdfsService {
  //private sa: number;
  //private sv: number;
  //private sav: number;
  //private iffs: ItemFichaFinanciera[]=[];
  //private iff: ItemFichaFinanciera;

  constructor() { }

  pdfFichaFinanciera(cliente: Cliente, sa: number, sv: number, sav: number, 
          fd: string, fh: string, iffs: ItemFichaFinanciera[]){
      //esto hay que borrarlo cuando el backend traiga datos
      //console.log('cargarFicha');
      /*
      this.sa = 324.98;
      this.sv = 485.98;
      this.sav = 398.85;
      sa = this.sa;
      sv = this.sv;
      sav = this.sav;
      for(var i=0; i<60; i++){
        this.iff = new ItemFichaFinanciera();
        this.iffs[i] = this.iff;
        this.iffs[i].FECHACARGA = '2019-09-28';
        this.iffs[i].DESDETALLE = 'algun detalle muy extenso así probamos y bla bla bla bla bla';
        this.iffs[i].COMPROBANTE = '0001-2302919228';
        this.iffs[i].DEBE = +Number(100230.89 +(i*10)).toFixed(2).valueOf();
        this.iffs[i].HABER = +Number(100421.34-(i*10)).toFixed(2).valueOf();
        this.iffs[i].SALDO2 = +Number(this.iffs[i].HABER-this.iffs[i].DEBE).toFixed(2).valueOf(); //el + delante es para transformarlo a number
        this.iffs[i].FechaVto = '2019-10-28';
        //paginas = 'Página ' + paginactual + ' de ' + totalpaginas;
      
      }*/
      //borrar hasta aca y el metodo cargarFicha
    let totalpaginas = Math.floor(iffs.length / 28)+1;
    let paginactual = 1;
    let paginas: string;
    let cli: String = '';
    let sastring: string = '';
    let svstring: string = '';
    let savstring: string = '';
    let titulo: string = 'Ficha Financiera';
    let subtitulo: string = '';

    if(cliente){
      cli = cliente.Nombre;
      titulo = titulo+' de '+cli;
    }
    if(sa){
      sastring = 'Saldo anterior: $'+this.transform(sa);
      //sastring = 'Saldo anterior: $'+Number(sa).toFixed(2).valueOf(); 
    }
    if(sv){
      svstring = 'Saldo Vencido: $'+this.transform(sv);
      //svstring = 'Saldo Vencido: $'+Number(sv).toFixed(2).valueOf();
    }
    if(sav){
      savstring = 'Saldo Vencido: $'+this.transform(sav);
      //savstring = 'Saldo a Vencer: $'+Number(sav).toFixed(2).valueOf();
    }
    if(fd && fh){
      subtitulo = 'desde: ' + this.voltearFecha(fd) + ' - hasta: ' + this.voltearFecha(fh);;
    } 
    var doc = new jsPDF('p', 'mm', 'a4');
    
    for(var j=0; j<=(totalpaginas-1); j++){
      if(j==0){
        doc.setFontSize(10);
        doc.setFontStyle('normal');
        doc.text(sastring, 200, 34, null, 0, 'right');
      }else{
        doc.addPage();
        paginactual++;
      }
      doc.setFontSize(16);
      doc.setFontStyle('bold');
      doc.text(titulo, 10, 20, null, 0, 'left'); //left, center, right, justify solo funciona el left
      
      doc.setFontSize(12);
      doc.setFontStyle('italic');
      doc.text(subtitulo, 10, 27, null, 0, 'left');
      doc.setFontStyle('normal');

      doc.setFontSize(12);
      doc.line(10, 38, 200, 38); //línea horizontal superior cabecera
      doc.setFontStyle('bold');
      doc.text('Fecha', 10, 44, null, 0, 'left');
      doc.text('Detalle', 30, 44, null, 0, 'left');
      doc.text('Comprobante', 112, 44, null, 0, 'right');
      doc.text('Debe', 134, 44, null, 0, 'right');
      doc.text('Haber', 156, 44, null, 0, 'right');
      doc.text('Saldo', 180, 44, null, 0, 'right');
      doc.text('Vto./op', 200, 44, null, 0, 'right');
      doc.setFontStyle('normal');
      doc.line(29, 38, 29, 45);  //línea vertical antes de Detalle
      doc.line(82, 38, 82, 45);  //línea vertical antes de Comprobante
      doc.line(113, 38, 113, 45);  //línea vertical antes de Debe
      doc.line(135, 38, 135, 45);  //línea vertical antes de Haber
      doc.line(157, 38, 157, 45);  //línea vertical antes de Saldo
      doc.line(181, 38, 181, 45);  //línea vertical antes de Vto./op

      doc.line(10, 45, 200, 45,);  //línea horizontal inferior cabecera
      doc.line(10, 45.2, 200, 45.2,);  //línea horizontal inferior cabecera
      doc.setFontSize(10);
      var fila = 44;
      var paso = 8;
      var linearriba = 45 - paso;
      var lineabajo = linearriba + paso;
      var fin = j*28+28; 
      if(fin > iffs.length){
        fin = iffs.length;
      }
      for(let i=j*28; i<fin; i++){
        fila = fila + paso;
        var d: string = '$'+this.transform(iffs[i].DEBE);
        var h: string = '$'+this.transform(iffs[i].HABER);
        var s: string = '$'+this.transform(iffs[i].SALDO2);
        //var d: string = '$'+Number(iffs[i].DEBE).toFixed(2).valueOf();
        //var h: string = '$'+Number(iffs[i].HABER).toFixed(2).valueOf();
        //var s: string = '$'+Number(iffs[i].SALDO2).toFixed(2).valueOf();
        var fc = this.voltearFecha(JSON.stringify(iffs[i].FECHACARGA).substring(9,19));
        var fv = this.voltearFecha(JSON.stringify(iffs[i].FECHACARGA).substring(9,19));
        
        doc.setFontSize(10);
        doc.text(fc, 10, fila, null, 0, 'left');//fecha
        
        if(iffs[i].DESDETALLE.length>28){
          iffs[i].DESDETALLE = iffs[i].DESDETALLE.substr(0, 28);
        }
        doc.text(iffs[i].DESDETALLE, 30, fila, null, 0, 'left');//detalle
        doc.text(iffs[i].COMPROBANTE, 112, fila, null, 0, 'right');//comprobante
        if(iffs[i].DEBE>99999.99 || iffs[i].DEBE<-99999.99){
          doc.setFontSize(8);
        }else{
          doc.setFontSize(10);
        }
        doc.text(d, 134, fila, null, 0, 'right');//debe
        if(iffs[i].HABER>99999.99 || iffs[i].HABER<-99999.99){
          doc.setFontSize(8);
        }else{
          doc.setFontSize(10);
        }
        doc.text(h, 156, fila, null, 0, 'right');//haber
        if(iffs[i].SALDO2>99999.99 || iffs[i].SALDO2<-99999.99){
          doc.setFontSize(8);
        }else{
          doc.setFontSize(10);
        }
        if(iffs[i].SALDO2<0){
          doc.setTextColor('#FF0000');
        }else{
          doc.setTextColor('#000000');
        }
        doc.text(s, 180, fila, null, 0, 'right');//saldo
        doc.setTextColor('#000000');
        doc.setFontSize(10);
        if(iffs[i].FechaVto){ //si hay fechaVto
          doc.text(fv, 200, fila, null, 0, 'right');//vto/op
        }else{
          doc.text('', 200, fila, null, 0, 'right');//vto/op
        }

        linearriba = linearriba + paso;
        lineabajo = lineabajo + paso;
        doc.line(29, linearriba, 29, lineabajo);  //línea vertical antes de Detalle
        doc.line(82, linearriba, 82, lineabajo);  //línea vertical antes de Comprobante
        doc.line(113, linearriba, 113, lineabajo);  //línea vertical antes de Debe
        doc.line(135, linearriba, 135, lineabajo);  //línea vertical antes de Haber
        doc.line(157, linearriba, 157, lineabajo);  //línea vertical antes de Saldo
        doc.line(181, linearriba, 181, lineabajo);  //línea vertical antes de Vto./op
        doc.line(10, lineabajo, 200, lineabajo);  //línea horizontal inferior cabecera
      }  
      doc.setFontSize(8);
      paginas = 'Página ' + paginactual + ' de ' + totalpaginas;
      doc.text(paginas, 200, 280, null, 0, 'right');
    }
    doc.setFontSize(10);
    fila = fila + paso;
    doc.text(svstring, 200, fila, null, 0, 'right'); //saldo vencido
    doc.setFontSize(10);
    fila = fila + paso;
    doc.text(savstring, 200, fila, null, 0, 'right'); //saldo a vencer
    doc.save("ficha-financiera.pdf");
  }

  private voltearFecha(fecha: string): string{
    let fechaVolteada: string = '';
    fecha = fecha.substring(0, 10);
    fechaVolteada += fecha.substring(8, 10);
    fechaVolteada += '-';
    fechaVolteada += fecha.substring(5, 7);
    fechaVolteada += '-';
    fechaVolteada += fecha.substring(0, 4);
    return fechaVolteada;
  }
		
	public transform(val: Number){	
		if(val !== undefined && val !== null){					   
			var stringValor = parseFloat(val.toString()).toFixed(2);		   	
			var valor = new Intl.NumberFormat('de-DE').format(Number(stringValor));			
			if(valor.toString().indexOf(",") != -1){
				var res = valor.split(",");
				var retorno = valor;
				if(res[1].length < 2){ //Si tiene un solo decimal le agrego el relleno
					retorno = valor + "0";
				}
				return retorno ;				
			}else{
				var conDecimal =  valor.toString() + ",00";
				return conDecimal;
			}
		}else{
			return '';
		}
	}	

}


