const datos=require("./cad.js");
function Sistema(){
    this.usuarios={};
    this.agregarUsuario=function(nick){
    this.usuarios[nick]=new Usuario(nick);
    }
    this.obtenerUsuarios=function(){
        return this.usuarios;
        }
    this.usuarioActivo = function(nick) {
        return !!this.usuarios[nick];
        };
    this.eliminarUsuario = function(nick) {
        delete this.usuarios[nick];
        };
    this.numeroUsuarios = function() {
        return Object.keys(this.usuarios).length;
        }; 
    this.agregarUsuario=function(nick){
        let res={"nick":-1};
            if (!this.usuarios[nick]){
                this.usuarios[nick]=new Usuario(nick);
                res.nick=nick;
            }
            else{
                 console.log("el nick "+nick+" está en uso");
            }
            return res;
        }
        this.registrarUsuario = function (obj, callback) {
            const modelo = this;
    
            this.cad.buscarUsuario({ email: obj.email }, async function (usr) {
                if (!usr) {
                    obj.key = Date.now().toString();
                    obj.confirmada = false;
    
                    // Hashear la contraseña antes de guardar
                    const hash = await bcrypt.hash(obj.password, 10);
                    obj.password = hash;
    
                    modelo.cad.insertarUsuario(obj, function (res) {
                        callback({ "email": res.email });
                        email.enviarCorreo(obj.email, obj.key, obj.nombre);
                    });
                } else {
                    callback({ "email": -1 }); // Usuario ya registrado
                }
            });
        };
            this.confirmarUsuario=function(obj,callback){
                let modelo=this;
                this.cad.buscarUsuario({"email":obj.email,"confirmada":false,"key":obj.key},function(usr){
                if (usr){
                usr.confirmada=true;
                modelo.cad.actualizarUsuario(usr,function(res){
                callback({"email":res.email}); //callback(res)
                })
                }
                else
                {
                callback({"email":-1});
                }
                })
                }             
    this.cad=new datos.CAD();
    this.cad.conectar(function(db){ 
        console.log("Conectado a Mongo Atlas"); 
        }); 
    this.usuarioGoogle=function(usr,callback){
        this.cad.buscarOCrearUsuario(usr,function(obj){
        callback(obj);
            });
            }   
            this.buscarUsuario=function(obj,callback){
                buscar(this.usuarios,obj,callback);
                }         
    }
    this.loginUsuario=function(obj,callback){
        this.cad.buscarUsuario({"email":obj.email,"confirmada":true},function(usr){
        if(usr && usr.password==obj.password)
        {
        callback(usr);
        }
        else
        {
        callback({"email":-1});
        }
        });
        }    
    function Usuario(nick){
    this.nick=nick;
    }
    module.exports.Sistema=Sistema
