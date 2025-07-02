
 // 🎯 SISTEMA DE VALIDACIÓN AVANZADA
 const formulario = document.getElementById('formularioAvanzado');
 const campos = formulario.querySelectorAll('input, textarea,select');
 const btnEnviar = document.getElementById('btnEnviar');
 // Estado de validación de cada campo
 let estadoValidacion = {};
 // Inicializar estado de todos los campos
 campos.forEach((campo) => {
 estadoValidacion[campo.name] = false;
 });
 // 🎯 VALIDACIONES ESPECÍFICAS POR CAMPO
 // Validación del nombre
 document
 .getElementById('nombreCompleto')
 .addEventListener('input', function () {
 const valor = this.value.trim();
 const nombres = valor
 .split(' ')
 .filter((nombre) => nombre.length > 0);
 if (valor.length < 3) {
 mostrarError(
 'errorNombre',
 'El nombre debe tener al menos 3 caracteres'
 );
 marcarCampo(this, false);
 } else if (nombres.length < 2) {
 mostrarError('errorNombre', 'Ingresa al menos 2 nombres');
 marcarCampo(this, false);
 } else {
 mostrarExito('exitoNombre', '✓ Nombre válido');
 marcarCampo(this, true);
 }
 });
 // Validación del email
 document.getElementById('correo').addEventListener('input', function
() {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailRegex.test(this.value)) {
 mostrarError('errorCorreo', 'Formato de email inválido');
 marcarCampo(this, false);
 } else {
    mostrarExito('exitoCorreo', '✓ Email válido');
 marcarCampo(this, true);
 }
 });
 // Validación de contraseña con indicador de fortaleza
 document
 .getElementById('password')
 .addEventListener('input', function () {
 const password = this.value;
 const fortaleza = calcularFortalezaPassword(password);
 actualizarBarraFortaleza(fortaleza);
 if (password.length < 8) {
 mostrarError(
 'errorPassword',
 'La contraseña debe tener al menos 8 caracteres'
 );
 marcarCampo(this, false);
 } else if (fortaleza.nivel < 2) {
 mostrarError(
 'errorPassword',
 'Contraseña muy débil. Añade números y símbolos'
 );
 marcarCampo(this, false);
 } else {
 mostrarExito('exitoPassword', `✓ Contraseña
${fortaleza.texto}`);
 marcarCampo(this, true);
 }
 // Revalidar confirmación si existe
 const confirmar = document.getElementById('confirmarPassword');
 if (confirmar.value) {
 confirmar.dispatchEvent(new Event('input'));
 }
 });
 // Validación de confirmación de contraseña
 document
 .getElementById('confirmarPassword')