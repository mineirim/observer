
Ext.define('ExtZF.store.anexos.ProgramacaoAnexosStore', {
    extend: 'Ext.data.Store',
    alias : 'ExtZF.store.anexos.ProgramacaoAnexos',
    storeId : 'programacaoAnexosStore',
    model: 'ExtZF.model.anexos.ProgramacaoAnexosModel',
    autoLoad: true,
    remoteFilter : true,
    remoteSort: true 

});