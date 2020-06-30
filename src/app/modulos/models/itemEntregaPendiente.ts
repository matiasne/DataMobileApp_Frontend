export class ItemEntregaPendiente {
	
	TIPOOO_D:String;
	LETRAA_D:String;
	SUCURS_D:String;
	NUMERO_D:String;
	fecemi_d:String;
	NROCTACTE:String;
	NOMCLI:String;
	subnum_d:String;
	codart_d:String;
	nomart:String;
	codpro:String;
	codbarra:String;
	codart:String;
	pendiente:String;
	cantid:String;
	fecemi:String;

    constructor(
        public ONCCAEspecieid: String,
        public nombre: String
    ) { 

    	this.TIPOOO_D="";
		this.LETRAA_D="";
		this.SUCURS_D="";
		this.NUMERO_D="";
		this.fecemi_d="";
		this.NROCTACTE="";
		this.NOMCLI="";
		this.subnum_d="";
		this.codart_d="";
		this.nomart="";
		this.codpro="";
		this.codbarra="";
		this.codart="";
		this.pendiente="";
		this.cantid="";
		this.fecemi="";

    }   
}