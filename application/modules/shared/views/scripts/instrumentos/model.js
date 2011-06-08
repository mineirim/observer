Ext.define('ExtZF.model.Instrumentos', {
        extend         : 'Ext.data.Model',
        fields         : ['id','menu','descricao','ordem','has_indicador','has_intersecao','instrumento_id'],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/instrumentos',
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