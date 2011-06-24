Ext.define('ExtZF.model.Vinculos', {
        extend         : 'Ext.data.Model',
        fields         : ['id','operativo_id','depende_operativo_id','justificativa','observacoes','pactuado','pacto_responsavel_id'],
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