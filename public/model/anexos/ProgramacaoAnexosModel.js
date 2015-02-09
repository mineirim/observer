Ext.define('ExtZF.model.anexos.ProgramacaoAnexosModel', {
        extend         : 'Ext.data.Model',
        fields         : ['id','nome','caminho','mimetype','hash_sum','inclusao_usuario_id','inclusao_data','programacao_id',
                        {name:'usuario', persist:false},],
        proxy          : {
        simpleSortMode : true, 
        extraParams    : {programacao:true},
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