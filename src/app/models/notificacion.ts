export class Notificacion {
    
        constructor(
            public id: number,
            public id_remitente:number,
            public texto: String,
            public titulo:String,
            public tipo:String
        ) { }   
    }