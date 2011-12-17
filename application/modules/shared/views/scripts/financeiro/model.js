Ext.define('ExtZF.model.Financeiro', {
        extend         : 'Ext.data.Model',
        fields         : ['id','descricao', 'programacao_id', 'valor'],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/financeiro',
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
