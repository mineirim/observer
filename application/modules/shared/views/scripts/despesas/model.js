Ext.define('ExtZF.model.Despesas', {
        extend         : 'Ext.data.Model',
        fields         : ['id','descricao',' financeiro_id',' valor'],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/despesas',
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