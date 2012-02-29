Ext.define('ExtZF.model.Financeiro', {
        extend         : 'Ext.data.Model',
        fields         : ['id',
                            'descricao', 
                            'grupo_despesa_id',
                            'tipo_registro_id',
                            'financeiro_id',  
                            'programacao_id', 
                            'valor',
                            {name:'grupoDespesa', persist:false}
                        ],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/financeiro',
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
            
            {
                type        : 'belongsTo',
                model       : 'ExtZF.model.GrupoDespesas',
                primaryKey  : 'id',
                foreignKey  : 'grupo_despesa_id',
                autoLoad    : true,
                name        : 'GrupoDespesas',
                associatedName : 'ExtZF.model.GrupoDespesas',
                instanceName: 'grupoDespesas',
                getterName  : 'getGrupoDespesas'
            }
        ]
});