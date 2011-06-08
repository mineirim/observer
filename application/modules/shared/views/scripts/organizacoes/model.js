Ext.define('ExtZF.model.Organizacoes', {
        extend         : 'Ext.data.Model',
        fields         : ['id','nome','sigla','descricao'],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/organizacoes',
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