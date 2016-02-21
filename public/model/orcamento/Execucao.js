Ext.define('ExtZF.model.orcamento.Execucao', {
        extend         : 'Ext.data.Model',
        fields         : [
                            'id',
                            'menu',
                            'valor_alocado',
                            'valor_executado'
                        ],
        proxy          : {
                simpleSortMode : true, 
                type           : 'rest',
                url            :   'data/orcamento',
                extraParams: {
                        data_to: 'execucao',
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