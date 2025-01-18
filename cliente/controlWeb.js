function ControlWeb(){
    this.mostrarAgregarUsuario = function () {
        // Eliminar elementos existentes para evitar duplicados
        $('#bnv').remove();
        $('#mAU').remove();
    
        // Crear el contenido HTML del formulario
        let cadena = `
            <div id="mAU">
                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <label for="nick">Nick:</label>
                            <p>
                                <input type="text" class="form-control" id="nick" placeholder="Introduce un nick">
                            </p>
                            <button id="btnAU" type="submit" class="btn btn-primary">Submit</button>
                            <div class="mt-3">
                                <a href="/auth/google">
                                    <img src="./cliente/img/web_neutral_rd_na@2x.png" style="height:40px;" alt="Iniciar sesión con Google">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        // Insertar el contenido en el contenedor con ID 'au'
        $("#au").html(cadena);
    
        // Añadir evento al botón de agregar usuario
        $("#btnAU").on("click", function () {
            let nick = $("#nick").val();
            if (nick) {
                rest.agregarUsuario(nick); // Llamada al método de REST
                alert(`Usuario ${nick} agregado.`);
                $("#mAU").remove(); // Eliminar formulario tras agregar usuario
            } else {
                alert("Por favor, introduce un nick.");
            }
        });
    };
        // Mostrar lista de usuarios
    this.mostrarObtenerUsuarios = function () {
        let cadena = `
                <div id="mOU">
                    <button type="button" class="btn btn-info mt-2" id="btnObtenerUsuarios">Obtener Usuarios</button>
                    <ul class="list-group mt-3" id="listaUsuarios"></ul>
                </div>
            `;
    
            $("#au").html(cadena);
    
            $("#btnObtenerUsuarios").on("click", function () {
                rest.obtenerUsuarios();
            });
        };
    
        // Mostrar número de usuarios
    this.mostrarNumeroUsuarios = function () {
        let cadena = `
            <div id="mNU">
                <button type="button" class="btn btn-warning mt-2" id="btnNumeroUsuarios">Número de Usuarios</button>
                <p class="mt-3" id="numeroUsuariosResultado"></p>
            </div>`;
    
        $("#au").html(cadena);
    
        $("#btnNumeroUsuarios").on("click", function () {
            rest.numeroUsuarios();
        });
    };
    
        // Mostrar usuario activo
        this.mostrarUsuarioActivo = function () {
            let cadena = `
                <div class="form-group" id="mUA">
                    <label for="nickActivo">Nick:</label>
                    <input type="text" class="form-control" id="nickActivo" placeholder="Introduce un nick">
                    <button type="button" class="btn btn-success mt-2" id="btnUsuarioActivo">Verificar Usuario Activo</button>
                    <p class="mt-3" id="usuarioActivoResultado"></p>
                </div>
            `;
    
            $("#au").html(cadena);
    
            $("#btnUsuarioActivo").on("click", function () {
                let nick = $("#nickActivo").val();
                if (nick) {
                    rest.usuarioActivo(nick);
                } else {
                    alert("Por favor, introduce un nick.");
                }
            });
        };
    
        // Eliminar usuario
        this.mostrarEliminarUsuario = function () {
            let cadena = `
                <div class="form-group" id="mEU">
                    <label for="nickEliminar">Nick:</label>
                    <input type="text" class="form-control" id="nickEliminar" placeholder="Introduce el nick a eliminar">
                    <button type="button" class="btn btn-danger mt-2" id="btnEliminarUsuario">Eliminar Usuario</button>
                    <p class="mt-3" id="usuarioEliminadoResultado"></p>
                </div>
            `;
    
            $("#au").html(cadena);
    
            $("#btnEliminarUsuario").on("click", function () {
                let nick = $("#nickEliminar").val();
                if (nick) {
                    rest.eliminarUsuario(nick);
                } else {
                    alert("Por favor, introduce un nick.");
                }
            });
        };
            this.mostrarBotonGoogle = function () {
        this.limpiar();
        let cadena = '<div id="mAU" class="form-group">';
        cadena = cadena + '<div id="btnGS"></div>'
        cadena = cadena + '<div id=msg></div>'
        cadena = cadena + '</div>';

        $('#au').append(cadena); //Aquí se inicia la ejecución del cuestionario
        $('#btnGS').load("./cliente/botonGS.html");
        $('#btNAU').on("click", function () {
            let nick = $("#nick").val();
            rest.agregarUsuario(nick)
        });
    }
        this.comprobarSesion=function(){
            let nick=$.cookie("nick")
            if (nick){
            cw.mostrarMensaje("Bienvenido al sistema, "+nick);
            }
            else{
            cw.mostrarRegistro();
            }
            }
            this.salir=function(){
                //localStorage.removeItem("nick");
                $.removeCookie("nick");
                location.reload();
                rest.cerrarSesion();
                }
            this.mostrarAgregarUsuario=function(){
                $('#bnv').remove();
                $('#mAU').remove();
                let cadena='<div id="mAU">';
                cadena = cadena + '<div class="card"><div class="card-body">';
                cadena = cadena +'<div class="form-group">';
                cadena = cadena + '<label for="nick">Nick:</label>';
                cadena = cadena + '<p><input type="text" class="form-control" id="nick" placeholder="introduce unnick"></p>';
                cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
                cadena=cadena+'<div><a href="/auth/google"><img src="./cliente/img/btn_google_signin_light_focus_web@2x.png" style="height:40px;"></a></div>';
                cadena = cadena + '</div>';
                cadena = cadena + '</div></div></div>';
            }
            this.mostrarRegistro=function(){
                $("#fmRegistro").remove();
                $("#registro").load("./cliente/registro.html",function(){
                $("#btnRegistro").on("click",function(e){
                e.preventDefault();
                let email=$("#email").val();
                let pwd=$("#pwd").val();
                if (email && pwd){
                //rest.registrarUsuario(nick);
                console.log(email+" "+pwd);
                }
                });
                });
            }
            this.mostrarLogin=function(){
                if ($.cookie('nick')){
                return true;
                };
                $("#fmLogin").remove();
                $("#registro").load("./cliente/login.html",function(){
                $("#btnLogin").on("click",function(){
                let email=$("#email").val();
                let pwd=$("#pwd").val();
                if (email && pwd){
                rest.loginUsuario(email,pwd);
                console.log(email+" "+pwd);
                }
                });
                });
                }
            this.mostrarBotonGoogle = function () {
                this.limpiar();
                let cadena = '<div id="mAU" class="form-group">';
                cadena = cadena + '<div id="btnGS"></div>'
                cadena = cadena + '<div id=msg></div>'
                cadena = cadena + '</div>';        
                $('#au').append(cadena); //Aquí se inicia la ejecución del cuestionario
                $('#btnGS').load("./cliente/botonGS.html");
                $('#btNAU').on("click", function () {
                    let nick = $("#nick").val();
                    rest.agregarUsuario(nick)
                });
            }
            this.limpiar = function () {
                $("#txt").remove();
                $("#mH").remove();
                $("#mAU").remove();
                $("#fmLogin").remove();
                $("#fmRegistro").remove();
            }
            this.mostrarHomePartida=function(){
                this.limpiar();
                let cadena="<div id='mAb'>";
                let cadena2="<div id='mH'><h2>Bienvenido al sistema</h2></div>";
                $('#au').append(cadena2);
                cadena=cadena + '<button id="btnAb" type="submit" class="btn btn-primary">Abandonar partida</button>';
                cadena=cadena+"</div>";
        
                $("#partidas").append(cadena);
        
                if (ws.estado=="esperando"){
                //    this.mostrarEsperandoRival();
                }
                
                $('#btnAb').on('click',function(){
                    $("#mAb").remove();
                    $("#mER").remove();
                    $('#tablero').remove();
                //    ws.abandonarPartida();
                });
            }
                                
}