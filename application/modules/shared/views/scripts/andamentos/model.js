Ext.define('ExtZF.model.Andamentos', {
        extend         : 'Ext.data.Model',
        fields         : ['id','descricao', 'conceito'],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/andamentos',
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