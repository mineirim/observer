Ext.define('ExtZF.model.Instrumentos', {
        extend         : 'Ext.data.Model',
        fields         : [  'id',
                            'menu',
                            'singular', 
                            'descricao',
                            'ordem',
                            {name: 'has_indicador', type: 'string'},
                            {name: 'has_intersecao', type: 'string'},
                            {name: 'has_operativo', type: 'string'},
                            'instrumento_id'],
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