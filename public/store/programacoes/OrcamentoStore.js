
Ext.define('ExtZF.store.programacoes.OrcamentoStore', {
    extend  : 'Ext.data.Store',
    alias   : 'ExtZF.store.programacoes.OrcamentoStore',
    storeId : 'programacoesOrcamentoStore',
    model   : 'ExtZF.model.programacoes.OrcamentoModel',
    autoLoad    : true
});