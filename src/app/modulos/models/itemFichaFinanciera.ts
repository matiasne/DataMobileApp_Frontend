export class ItemFichaFinanciera {

	CODIGO: String;
    NOMBRE: String;
    DOMICILIO: String;
    TIPORESP: String;
    DESCRI: String;
    TIPODOCU: String;
    CUIT: String;
    CODPOSTAL: String;
    LOCALIDAD: String;
    INGBRUTO:String;
    DH: String;
    FECHACARGA: String;
    DESDETALLE: String;                                                                                     ;
    NROTRANSAC: String;
    CLIENTE: String;
    Vencido: String;
    COMPROBANTE: String;
    SALDO2: number;
    DEBE: number;
    FechaVto: string;
    HABER: number;
    TipoComprobanteId: String;
    constructor(
        
    ) { 
    	this.CODIGO="";
        this.NOMBRE="";
        this.DOMICILIO="";
        this.TIPORESP="";
        this.DESCRI="";
        this.TIPODOCU="";
        this.CUIT="";
        this.CODPOSTAL="";
        this.LOCALIDAD="";
        this.INGBRUTO=""
        this.DH="";
        this.FECHACARGA="";
        this.DESDETALLE="";                                                                                     ;
        this.NROTRANSAC="";
        this.CLIENTE="";
        this.Vencido="";
        this.COMPROBANTE="";
        this.SALDO2=0;
        this.DEBE=0;
        this.FechaVto="";
        this.HABER=0;
        this.TipoComprobanteId="";
    }   
}