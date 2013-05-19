Ext.define('ExtZF.model.Vinculos', {
        extend         : 'Ext.data.Model',
        fields         : ['id',
                            'programacao_id',
                            'depende_programacao_id',
                            'justificativa',
                            'observacoes',
                            'pactuado',
                            'pacto_responsavel_id',
                            'situacao_id',
                            {name:'menu', persist:false}    
                    ],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/vinculos',
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