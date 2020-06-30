export class ItemComprobante {

	COMPROBANTE:String;
    TIPOOO_C: String;
    LETRAA_C: String;
    SUCURS_C: number;
    NUMERO_C: number;
    FECEMI_C: String;
    
    CONDICION: String; 
    TGRAVADO: number;
    TIVA: number;
    TTOTAL: number;
    CODIGO: number;
    NOMBRE: String;
    CANTID_D: number;
    DPRECIO: number;
    DTOTAL: number;
	
    constructor(
        
    ) { 
    	this.COMPROBANTE="";
	    this.TIPOOO_C="";
	    this.LETRAA_C="";
	    this.SUCURS_C=0;
	    this.NUMERO_C=0;
	    this.FECEMI_C="";
	    
	    this.CONDICION="";
	    this.TGRAVADO=0;
	    this.TIVA=0;
	    this.TTOTAL =0;
	    this.CODIGO =0;
	    this.NOMBRE="";
	    this.CANTID_D =0;
	    this.DPRECIO =0;
	    this.DTOTAL=0;
    }   
}