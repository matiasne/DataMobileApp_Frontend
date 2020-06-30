export class ItemOrdenTrabajo {

	codigo:String;
    fechaingreso:String;
    seguncliente:String;
    seguntecnico:String;
    estado:String;
    nomesta:String;
    codclie:String;
    nomclie:String;
    nomresp:String;
    nomtecn:String;
    nomarte:String;
    nommarc:String;
    nommode:String;
	
    constructor(
        public ONCCAEspecieid: String,
        public nombre: String
    ) { 

    	this.codigo="";
	    this.fechaingreso="";
	    this.seguncliente="";
	    this.seguntecnico="";
	    this.estado="";
	    this.nomesta="";
	    this.codclie="";
	    this.nomclie="";
	    this.nomresp="";
	    this.nomtecn="";
	    this.nomarte="";
	    this.nommarc="";
	    this.nommode="";

    }   
}