Ext.define('ExtZF.model.GrupoDespesas', {
        extend         : 'Ext.data.Model',
        fields         : ['id','descricao','abreviatura'],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/grupo-despesas',
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
                type: 'hasMany',
                model: 'ExtZF.model.Financeiro',
                associatedName: 'Financeiro',
                name: 'financeiro',
                primaryKey: 'id',
                foreignKey: 'grupo_despesa_id',
                getterName: 'getFinanceiros'
            }
        ]
   
        
});