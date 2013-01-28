
Ext.define('ExtZF.store.programacoes.TreeStore', {
    extend  : 'Ext.data.TreeStore',
    alias   : 'ExtZF.store.programacoes.TreeStore',
    storeId : 'programacoesTreeStore',
    model   : 'ExtZF.model.programacoes.Model4tree',
    autoLoad    : true,
    
    root                : {
        
        expanded        : true,
        name            : 'Root'
        
    },
    listeners: {
        load: function(sender, node, records) {
            node.expand();
        }
    }
});