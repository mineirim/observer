Ext.define('ExtZF.model.Instrumentos', {
        extend         : 'Ext.data.Model',
        fields         : [  'id',
                            'menu',
                            'singular', 
                            'descricao',
                            'ordem',
                            'situacao_id',
                            {name: 'has_indicador', type: 'string'},
                            {name: 'has_parceria', type: 'string'},
                            {name: 'has_operativo', type: 'string'},
                            {name: 'has_responsavel', type: 'string'},
                            {name: 'has_supervisor', type: 'string'},
                            {name: 'has_equipe', type: 'string'},
                            {name: 'has_vlr_programado', type: 'string'},
                            {name: 'has_vlr_executado', type: 'string'},
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