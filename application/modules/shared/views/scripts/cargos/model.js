Ext.define('ExtZF.model.Cargos', {
        extend         : 'Ext.data.Model',
        fields         : ['id','nome','descricao'],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/cargos',
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
        }
});