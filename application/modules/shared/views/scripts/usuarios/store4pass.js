// Store dos usuarios
Ext.define('ExtZF.store.usuarios.Store4pass', {
    extend: 'Ext.data.Store',
    alias : 'ExtZF.store.usuarios.Store4pass',
    model: 'ExtZF.model.usuarios.Model4pass', // Modelo do store definido em model/Usuario.js
    autoLoad: true,
    remoteSort: true // ordenar registros pelo servidor

});