Ext.define('ExtZF.model.Treenav', {
        extend  : 'Ext.data.Model',
        idProperty     : 'id',
        fields  : ['id','menu','descricao'],
        proxy   : {
                    simpleSortMode : true, 
                    type           : 'rest',
                    url            :   'data/treenav',
                    appendId       : false,
                    reader         : {
                                            type    : 'json',
                                            root    : 'rows',
                                            successProperty: 'success'
                                    }
                                    
                    }
});