Ext.define('ExtZF.store.Tarefas', {
    extend  : 'Ext.data.Store',
    alias   : 'ExtZF.store.Tarefas',
    storeId : 'tarefasStore',
    model   : 'ExtZF.model.Tarefas',
    autoLoad    : true,
    proxy          : {
                    type           : 'rest',
                    url            :   'data/tarefas',
                    extraParams: {
                        StartDate: '',
                        EndDate: ''
                    },
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