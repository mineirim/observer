Ext.define('ExtZF.model.Tags', {
        extend         : 'Ext.data.Model',
        fields         : ['id','tag','descricao'],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/tags',
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