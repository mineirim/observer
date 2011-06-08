// Store dos usuarios
Ext.define('ExtZF.store.Usuarios', {
    extend: 'Ext.data.Store',
    alias : 'ExtZF.store.Usuarios',
    model: 'ExtZF.model.Usuarios', // Modelo do store definido em model/Usuario.js
    autoLoad: true,
    remoteSort: true // ordenar registros pelo servidor

});