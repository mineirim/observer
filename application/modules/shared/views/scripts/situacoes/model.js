Ext.define('ExtZF.model.Situacoes', {
        extend         : 'Ext.data.Model',
        fields         : ['id','descricao'],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/situacoes',
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