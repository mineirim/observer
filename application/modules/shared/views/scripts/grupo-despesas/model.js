Ext.define('ExtZF.model.GrupoDespesas', {
        extend         : 'Ext.data.Model',
        fields         : ['id','descricao','abreviatura'],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/grupodespesas',
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