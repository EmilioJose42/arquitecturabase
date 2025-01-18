const modelo = require("./modelo.js"); // Importar el modelo desde el servidor

describe('El sistema', function() {
  let sistema;

  beforeEach(function() {
      sistema = new Sistema();
  });

  it('inicialmente no hay usuarios', function() {
      expect(Object.keys(sistema.usuarios).length).toEqual(0);
  });
});

describe('El sistema', function() {
  let sistema;

  beforeEach(function() {
      sistema = new Sistema();
  });

  it('inicialmente no hay usuarios', function() {
      expect(sistema.numeroUsuarios()).toEqual(0);
  });

  it('puede agregar un usuario', function() {
      sistema.agregarUsuario("Pepe");
      expect(sistema.numeroUsuarios()).toEqual(1);
  });

  it('puede obtener usuarios', function() {
      sistema.agregarUsuario("Pepe");
      sistema.agregarUsuario("Luis");
      expect(Object.keys(sistema.obtenerUsuarios())).toContain("Pepe");
      expect(Object.keys(sistema.obtenerUsuarios())).toContain("Luis");
  });

  it('puede comprobar si un usuario está activo', function() {
      sistema.agregarUsuario("Pepe");
      expect(sistema.usuarioActivo("Pepe")).toBe(true);
      expect(sistema.usuarioActivo("Luis")).toBe(false);
  });

  it('puede eliminar un usuario', function() {
      sistema.agregarUsuario("Pepe");
      sistema.eliminarUsuario("Pepe");
      expect(sistema.usuarioActivo("Pepe")).toBe(false);
      expect(sistema.numeroUsuarios()).toEqual(0);
  });
});