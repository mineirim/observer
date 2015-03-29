Ext.define('ExtZF.model.Anexos', {
        extend         : 'Ext.data.Model',
        fields         : ['id','nome','caminho','mimetype','hash_sum','inclusao_usuario_id','inclusao_data',
                            {name:'tags', persist:false},
                         ],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/anexos',
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