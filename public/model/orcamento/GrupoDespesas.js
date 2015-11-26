Ext.define('ExtZF.model.orcamento.GrupoDespesas', {
        extend         : 'Ext.data.Model',
        fields         : [
                            'grupo_despesas',
                            'vlr_programado',
                            'vlr_alocado',
                            'vlr_executado'
                        ],
        proxy          : {
                simpleSortMode : true, 
                type           : 'rest',
                url            :   'data/orcamento',
                extraParams: {
                        data_to: 'grupo',
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