Ext.define('ExtZF.model.TipoRegistros', {
        extend         : 'Ext.data.Model',
        fields         : ['id','descricao','abreviatura'],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/tiporegistros',
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