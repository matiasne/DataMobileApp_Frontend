import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numerosFinanciera'
})
export class NumerosFinancieraPipe implements PipeTransform {

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
