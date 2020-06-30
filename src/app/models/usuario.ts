export class Usuario {

    constructor(
        public id: number,
        public mail: String,
        public token:String,
        public id_empresa: String,
        public isAdmin: boolean,
        public isSuper: boolean,
        public nombreCompleto:String,
        public telefono:String,
        public direccion:String,
        public id_cliente:String 
    ) { }   
}