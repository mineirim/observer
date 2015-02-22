
Ext.define('ExtZF.store.OperativosHistorico', {
    extend: 'Ext.data.Store',
    alias : 'ExtZF.store.OperativosHistorico',
    model: 'ExtZF.model.OperativosHistorico',
    autoLoad: false,
    remoteSort: true,
    sorters: [{
             property: 'alteracao_data',
             direction: 'DESC'
         }]
});