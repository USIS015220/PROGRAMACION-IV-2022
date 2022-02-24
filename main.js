var db_sistema = openDatabase('dbsistema', '1.0', 'Sistema Educacion', 5 * 1024 * 1024);
if(!db_sistema){
    alert('Lo siento tu navegado NO soporta BD locales.');
}
var app = new Vue({
    el: '#appCliente',
    data: {
        Clientes: [],
        buscar: '',
        msg: 'Sistema Activo',
        Cliente: {
            accion: 'nuevo',
            idCliente: '',
            codigo: '',
            nombre: '',
            direccion: '',
            telefono: '',
            Zona: '',
        },
        materias: [],
        buscar1: '',
        msg1:'Sistema Activo',
         materia: {
            idincripcion:'',
            codigo1:'',
            nombre1:'',
            materia1:'',
            materia2:'',
            materia3:'',
            materia4:'',
            materia5:''
        },
    },
    
    //Roger Alberto Chávez Zelaya USIS015320

//Duma Roberto Zelaya Mejía USIS007420

//Roberto Carlos Hernández Meléndez USIS016520

//José Roberto del Rio Maravilla USIS015220

//Flor Mabel Ariza Rodríguez USIS011120
    methods: {
        buscarAlumno(){
           
            this.obtenerAlumno(this.buscar);
        },
        guardarAlumno(){
            let sql = '',
                parametros = [];
            if(this.alumno.accion == 'nuevo'){
                sql = 'INSERT INTO Clientes (codigo, nombre, direccion, telefono, Zona) VALUES (?,?,?,?,,?)';
                parametros = [this.Cliente.codigo,this.Cliente.nombre,this.Cliente.direccion,this.Cliente.telefono,this.alumno.dui,this.alumno.carrera];
            }else if(this.Cliente.accion == 'modificar'){
                sql = 'UPDATE alumnos SET codigo=?, nombre=?, direccion=?, telefono=?, dui=?, carrera=? WHERE idAlumno=?';
                parametros = [this.alumno.codigo,this.Cliente.nombre,this.alumno.direccion,this.alumno.telefono,this.alumno.dui,this.alumno.carrera,this.alumno.idAlumno];
            }else if(this.alumno.accion == 'eliminar'){
                sql = 'DELETE FROM Clientes WHERE idCliente=?';
                parametros = [this.alumno.idAlumno];
            }
            db_sistema.transaction(tx=>{
                tx.executeSql(sql,
                    parametros,

                (tx, results)=>{
                    this.msg = 'Cliente Registrado Con Exito';
                    this.nuevoCliente();
                    this.obtenerCliente();
                },
                (tx, error)=>{
                    switch(error.code){
                        case 6:
                            this.msg = 'El codigo o el Cliente ya existe, por favor digite otro';
                            break;
                            
                        default:
                            this.msg = `Error al procesar el Cliente: ${error.message}`;
                    }
                });
            });
        },
        modificarAlumno(data){
            this.alumno = data;
            this.alumno.accion = 'modificar';
        },
        eliminarCliente(data){
            if( confirm(`¿Esta seguro de eliminar el Cliente ${data.nombre}?`) ){
                this.Clientes.idCliente = data.idCliente;
                this.Clientes.accion = 'eliminar';
                this.guardarCliente();
            }
        },
        obtenerCliente(busqueda=''){
            db_sistema.transaction(tx=>{
                tx.executeSql(`SELECT * FROM Clientes WHERE nombre like "%${busqueda}%" OR codigo like "%${busqueda}%"`, [], (tx, results)=>{
                    this.alumnos = results.rows;
                    /*this.clientes = [];
                    for(let i=0; i<results.rows.length; i++){
                        this.clientes.push(results.rows.item(i));
                    }*/
                });
            });
        },
        nuevoCliente(){
            this.Cliente.accion = 'nuevo';
            this.Cliente.idCliente = '';
            this.Cliente.codigo = '';
            this.Cliente.nombre = '';
            this.Cliente.direccion = '';
            this.Cliente.telefono = '';
            this.Cliente.Zona ='Seleccionar Zona';
            console.log(this.Cliente);
        },

        //Administrar inscripcin alumnos

        buscarIncripcion(){
           
            this.obtenerIncripcion(this.buscar1);
        },
        guardarInscripcion(){
            if(this.materia.nombre1=='' || this.materia.codigo1==''){
                this.msg1 = 'Seleccione alumno para inscribir materias';
            }else{
                let sql = '',
                parametros = [];
            if(this.alumno.accion == 'nuevo'){
                sql = 'INSERT INTO inscripcion (codigo1, nombre1, materia1, materia2, materia3, materia4, materia5) VALUES (?,?,?,?,?,?,?)';
                parametros = [this.materia.codigo1,this.materia.nombre1,this.materia.materia1,this.materia.materia2,this.materia.materia3,this.materia.materia4,this.materia.materia5];
            }else if(this.alumno.accion == 'modificar'){
                sql = 'UPDATE inscripcion SET codigo1=?, nombre1=?, materia1=?, materia2=?, materia3=?, materia4=?, materia5=? WHERE idincripcion=?';
                parametros = [this.materia.codigo1,this.materia.nombre1,this.materia.materia1,this.materia.materia2,this.materia.materia3,this.materia.materia4,this.materia.materia5,this.materia.idincripcion];
            }else if(this.alumno.accion == 'eliminar'){
                sql = 'DELETE FROM inscripcion WHERE idincripcion=?';
                parametros = [this.materia.idincripcion];
            }
            db_sistema.transaction(tx=>{
                tx.executeSql(sql,
                    parametros,

                (tx, results)=>{
                    this.msg1 = 'Alumno procesado con exito';
                    this.nuevoInscripcion();
                    this.obtenerIncripcion();
                },
                (tx, error)=>{
                   
                            this.materia.msg1 = `Error al procesar al Alumno: ${error.message}`;
                    
                });
            });
            }
            
        },
        modificarIncripcion(data){
            this.materia.idincripcion = data.idincripcion;
            this.materia.nombre1 = data.nombre1;
            this.materia.codigo1 = data.codigo1;
            this.materia.materia1 = data.materia1;
            this.materia.materia2 = data.materia2;
            this.materia.materia3 = data.materia3;
            this.materia.materia4 = data.materia4;
            this.materia.materia5 = data.materia5;
            this.alumno.accion = 'modificar';
        },
        Inscripcion(data){
            this.materia.nombre1 = data.nombre;
            this.materia.codigo1= data.codigo;
           
        },
        eliminarIncripcion(data){
            if( confirm(`¿Esta seguro de eliminar el registro de ${data.nombre1}?`) ){
                this.materia.idincripcion = data.idincripcion;
                this.materia.nombre1 = data.nombre1;
                this.materia.codigo1 = data.codigo1;
                this.alumno.accion = 'eliminar';
                this.guardarInscripcion();
            }
        },
        obtenerIncripcion(busqueda=''){
            db_sistema.transaction(tx=>{
                tx.executeSql(`SELECT * FROM inscripcion WHERE nombre1 like "%${busqueda}%" OR codigo1 like "%${busqueda}%"`, [], (tx, results)=>{
                    this.materias = results.rows;
                });
            });
        },
        nuevoInscripcion(){
            this.alumno.accion = 'nuevo';
            this.materia.idincripcion = '';
            this.materia.codigo1 = '';
            this.materia.nombre1 = '';
            this.materia.materia1 = '';
            this.materia.materia2 = '';
            this.materia.materia3 = '';
            this.materia.materia4 ='';
            this.materia.materia5 ='';
            console.log(this.materia);
        }

    },
    created(){
        db_sistema.transaction(tx=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS alumnos(idAlumno INTEGER PRIMARY KEY AUTOINCREMENT, '+
                'codigo char(10) unique, nombre char(75), direccion TEXT, telefono char(10), dui char(10) unique, carrera char(75))');
                
            tx.executeSql('CREATE TABLE IF NOT EXISTS inscripcion(idincripcion INTEGER PRIMARY KEY AUTOINCREMENT, '+
                'codigo1 char(10) unique, nombre1 char(75), materia1 TEXT, materia2 TEXT, materia3 TEXT, materia4 TEXT, materia5 TEXT)');
        }, err=>{
            console.log('Error al crear la tabla de clientes', err);
        });
        this.obtenerAlumno();
        this.obtenerIncripcion()
    }
});