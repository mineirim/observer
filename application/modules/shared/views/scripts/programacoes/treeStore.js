
Ext.define('ExtZF.store.programacoes.TreeStore', {
    extend  : 'Ext.data.TreeStore',
    alias   : 'ExtZF.store.programacoes.TreeStore',
    storeId : 'programacoesTreeStore',
    model   : 'ExtZF.model.programacoes.Model4tree',
    autoLoad    : true

});