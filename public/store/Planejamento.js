Ext.define('ExtZF.store.Planejamento', {
    extend  : 'Ext.data.Store',
    alias   : 'ExtZF.store.Planejamento',
    storeId : 'planejamentoStore',
    model   : 'ExtZF.model.Planejamento',
    autoLoad    : false,
    proxy          : {
                    type           : 'rest',
                    url            :   'data/programacoes',
                    reader         : {
                            type    : 'json',
                            root    : 'rows',
                            successProperty: 'success'
                    },
                    writer   : {
                            root     : 'rows',
                            type     : 'json',
                            encode   : true
                    }
    },  
    

});