function ClienteRest(){
    this.agregarUsuario = function (nick) {
        var cli = this;
        if (!nick || nick == "") {
            return 0;
        }
        $.getJSON("/agregarUsuario/" + nick, function (data) {
            let msg = "El nick " + nick + " está ocupado";
            if (data.nick != -1) {
                console.log("Usuario " + nick + " ha sido registrado");
                msg = "Bienvenido la palabra Tabú, " + nick;
                $.cookie("nick", nick);
            }
            else {
                console.log("El nick ya está ocupado");
            }
            cw.mostrarMsg(msg);
            cw.mostrarHome();
        });
    }
    this.agregarUsuario2 = function (nick) {
        $.ajax({
            type: 'GET',
            url: '/agregarUsuario/' + nick,
            success: function (data) {
                if (data.nick != -1) {
                    console.log("Usuario " + nick + " ha sido registrado");
                } else {
                    console.log("El nick ya está ocupado");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: 'application/json'
        });
    };
    this.cerrarSesion=function(){
        $.getJSON("/cerrarSesion",function(){
        console.log("Sesión cerrada");
        $.removeCookie("nick");
        });
        }
        this.registrarUsuario = function (email, password) {
            $.ajax({
                type: 'POST', // Método HTTP
                url: '/registrarUsuario', // URL del endpoint
                data: JSON.stringify({ "email": email, "password": password }), // Datos enviados en el cuerpo
                success: function (data) {
                    // Verifica si el usuario ha sido registrado correctamente
                    if (data.nick != -1) {
                        console.log("Usuario " + data.nick + " ha sido registrado");
    
                        // Guarda el nick en una cookie
                        $.cookie("nick", data.nick);
                        ws.email=data.email;
                        // Limpia y muestra un mensaje de bienvenida
                        cw.limpiar();
                        cw.mostrarMsg("Bienvenido al sistema, " + data.nick);
                        cw.mostrarCrearPartida();
    
                        // Muestra la pantalla de login si es necesario
                        // cw.mostrarLogin(); // Descomenta esta línea si se requiere mostrar login
                    } else {
                        console.log("El nick está ocupado");
                        cw.mostrarModal("El nick está ocupado");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    // Manejo de errores
                    console.log("Status: " + textStatus);
                    console.log("Error: " + errorThrown);
                },
                contentType: 'application/json' // Indica que los datos enviados son JSON
            });
        };
        this.loginUsuario=function(email,password){
            $.ajax({
            type:'POST',
            url:'/loginUsuario',
            data: JSON.stringify({"email":email,"password":password}),
            success:function(data){
            if (data.nick!=-1){
            console.log("Usuario "+data.nick+" ha sido registrado");
            $.cookie("nick",data.nick);
            cw.limpiar();
            cw.mostrarMensaje("Bienvenido al sistema,"+data.nick);
            //cw.mostrarLogin();
            }
            else{
            console.log("No se pudo iniciar sesión");
            cw.mostrarLogin();
            //cw.mostrarMensajeLogin("No se pudo iniciar sesión");
            }
            },
            error:function(xhr, textStatus, errorThrown){
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
            },
            contentType:'application/json'
            });
            }    
    this.obtenerUsuarios = function () {
        $.getJSON("/obtenerUsuarios", function (data) {
            $("#listaUsuarios").empty();
            for (let nick in data) {
                $("#listaUsuarios").append(`<li class="list-group-item">${nick}</li>`);
            }
        });
    };
    this.numeroUsuarios = function () {
        $.getJSON("/numeroUsuarios", function (data) {
            $("#numeroUsuariosResultado").text(`Número de usuarios: ${data.num}`);
        });
    };
    this.usuarioActivo = function (nick) {
        $.getJSON("/usuarioActivo/" + nick, function (data) {
            $("#usuarioActivoResultado").text(data.activo ? `El usuario ${nick} está activo.` : `El usuario ${nick} no está activo.`);
        });
    };
    this.eliminarUsuario = function (nick) {
        $.getJSON("/eliminarUsuario/" + nick, function (data) {
            $("#usuarioEliminadoResultado").text(`Usuario ${data.eliminado} eliminado.`);
        });
    };    
}