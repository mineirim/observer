Ext.define('ExtZF.model.Despesas', {
        extend         : 'Ext.data.Model',
        fields         : ['id',
                            'descricao',
                            'financeiro_id',
                            'valor',
                            {name:'financeiro', persist:false}
                        ],
        proxy          : {
                simpleSortMode : true, 
                type           : 'rest',
                url            :   'data/despesas',
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
        associations: [
                {type        : 'belongsTo',
                model       : 'ExtZF.model.Financeiro',
                primaryKey  : 'id',
                foreignKey  : 'financeiro_id',
                autoLoad    : true,
                name        : 'financeiro',
                instanceName: 'financeiro',
                getterName  : 'getFinanceiro'}
        ]
});