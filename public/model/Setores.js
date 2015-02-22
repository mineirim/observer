Ext.define('ExtZF.model.Setores', {
        extend         : 'Ext.data.Model',
        idProperty     : 'setoresId',
        fields         : ['id','nome','sigla','descricao'],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/setores',
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