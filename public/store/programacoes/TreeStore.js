Ext.define('ExtZF.store.programacoes.TreeStore', {
    extend  : 'Ext.data.TreeStore',
    alias   : 'ExtZF.store.programacoes.TreeStore',
    storeId : 'programacoesTreeStore',
    model   : 'ExtZF.model.programacoes.Model4tree',
    autoLoad    : false,
    
    // bug in extjs4.1 autoLoad is ignored
    // specifying "loaded: true" resolves the problem
    root                : {        
        expanded        : true,
        text            : 'Root',
        menu            : 'menu',
//        loaded: true,    
    },
    
    listeners: {
        load: function(sender, node, records) {
           node.data.menu = node.raw.text;
           node.expand();
        }
    }
});