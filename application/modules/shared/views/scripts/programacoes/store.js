
Ext.define('ExtZF.store.Programacoes', {
    extend: 'Ext.data.TreeStore',
    alias : 'ExtZF.store.Programacoes',
    model: 'ExtZF.model.Programacoes',
    proxy          : {
                    type           : 'rest',
                    url            :   'data/programacoes',
                    reader         : {
                            type    : 'json'
                    }
    },
    autoLoad: true, folderSort: true

});