const fs=require("fs");
const cookieSession=require("cookie-session");
const express = require('express');
const app = express();
const passport=require("passport");
require("./servidor/passport-setup.js");
const modelo = require("./servidor/modelo.js");
const bodyParser=require("body-parser");
const PORT = process.env.PORT || 3000;
const haIniciado=function(request,response,next){
    if (request.user){
    next();
    }
    else{
    response.redirect("/")
    }
    }
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
let sistema = new modelo.Sistema();
app.use(express.static(__dirname + "/"));
app.get("/", function(request,response){
    response.statusCode = 200;
        var contenido = fs.readFileSync(__dirname + "/cliente/index.html", "utf-8");
        response.setHeader("Content-Type", "text/html");
        response.send(contenido);
});
app.listen(PORT, () => {
console.log(`App está escuchando en el puerto ${PORT}`);
console.log('Ctrl+C para salir');
});
app.get("/agregarUsuario/:nick",function(request,response){
    let nick=request.params.nick;
    let res=sistema.agregarUsuario(nick);
    response.send(res);
    });
app.get("/obtenerUsuarios", function (req, res) {
    let usuarios = sistema.obtenerUsuarios(); 
    res.json(usuarios); 
    });
app.get("/usuarioActivo/:nick", function (req, res) {
    let nick = req.params.nick; 
    let activo = sistema.usuarioActivo(nick); 
        res.json({ activo: activo }); 
    });
app.get("/numeroUsuarios", function (req, res) {
    let numero = sistema.numeroUsuarios(); 
        res.json({ num: numero }); 
    });   
    
app.get("/eliminarUsuario/:nick", function (req, res) {
    let nick = req.params.nick;  
        sistema.eliminarUsuario(nick); 
        res.json({ eliminado: nick }); 
    });
app.use(cookieSession({
    name: 'Sistema',
    keys: ['key1', 'key2']
    }));    
app.use(passport.initialize());
app.use(passport.session()); 
app.get("/auth/google",passport.authenticate('google', { scope: ['profile','email'] }));
app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/fallo' }),
    function(req, res) {
        res.redirect('/good');
    });  
    app.get("/good", function(request,response){
        let email=request.user.emails[0].value;
        sistema.usuarioGoogle({"email":email},function(obj){
        response.cookie('nick',obj.email);
        response.redirect('/');
        });
        });
app.get("/fallo",function(request,response){
    response.send({nick:"nook"})
    });   
    app.post('/oneTap/callback',
        passport.authenticate('google-one-tap', { failureRedirect: '/fallo' }),
        function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/good');
        });     
app.post("/registrarUsuario",function(request,response){
    sistema.registrarUsuario(request.body,function(res){
        response.send({"nick":res.email});
        });
    });  
app.post('/loginUsuario',passport.authenticate("local",{failureRedirect:"/fallo",successRedirect: "/ok"})
        );
app.get("/ok",function(req,res){
        res.send({nick:req.user.email})
        });   
app.get("/confirmarUsuario/:email/:key",function(request,response){
    let email=request.params.email;
    let key=request.params.key;
    sistema.confirmarUsuario({"email":email,"key":key},function(usr){
        if (usr.email!=-1){
            response.cookie('nick',usr.email);
        }
        response.redirect('/');
        });
    })
app.post('/loginUsuario',passport.authenticate("local",{failureRedirect:"/fallo",successRedirect: "/ok"})
        );
app.get("/ok",function(request,response){
        response.send({nick:request.user.email})
        });  
app.get("/obtenerUsuarios",haIniciado,function(request,response){
        let lista=sistema.obtenerUsuarios();
        response.send(lista);
            }); 
app.get("/cerrarSesion",haIniciado,function(request,response){
    let nick=request.user.nick;
        request.logout();
        response.redirect("/");
            if (nick){
            sistema.eliminarUsuario(nick);
    }
});                                   