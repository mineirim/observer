Ext.define('ExtZF.model.orcamento.ResumoMacro', {
        extend         : 'Ext.data.Model',
        fields         : [
                            'id',
                            'menu',
                            'vlr_alocado',
                            'vlr_executado'
                        ],
        proxy          : {
                simpleSortMode : true, 
                type           : 'rest',
                url            :   'data/orcamento',
                extraParams: {
                        data_to: 'resumo',
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