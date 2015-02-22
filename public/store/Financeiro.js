
Ext.define('ExtZF.store.Financeiro', {
    extend: 'Ext.data.Store',
    alias : 'ExtZF.store.Financeiro',
    model: 'ExtZF.model.Financeiro',
    autoLoad: false,
    remoteSort: true ,
    remoteFilter : true

});