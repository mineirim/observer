Ext.define('ExtZF.model.Anexos', {
        extend         : 'Ext.data.Model',
        fields         : ['id','nome','caminho','mimetype','hash_sum','publicacao_usuario_id','publicacao_data','alteracao_usuario_id','alteracao_data'],
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