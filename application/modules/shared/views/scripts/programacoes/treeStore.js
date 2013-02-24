
Ext.define('ExtZF.store.programacoes.TreeStore', {
    extend  : 'Ext.data.TreeStore',
    alias   : 'ExtZF.store.programacoes.TreeStore',
    storeId : 'programacoesTreeStore',
    model   : 'ExtZF.model.programacoes.Model4tree',
    autoLoad    : true,
    
    root                : {        
        expanded        : true,
        text            : 'Root',
        menu            : 'menu'
        
    },
    listeners: {
        load: function(sender, node, records) {
           node.data.menu = node.raw.text;
           node.expand();
        }
    }
});