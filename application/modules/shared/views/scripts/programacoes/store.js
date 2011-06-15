
Ext.define('ExtZF.store.Programacoes', {
    extend  : 'Ext.data.TreeStore',
    alias   : 'ExtZF.store.Programacoes',
    storeId : 'programacoesStore',
    model   : 'ExtZF.model.Programacoes',
    autoLoad    : true

});