Ext.define('ExtZF.model.Treenav', {
        extend         : 'Ext.data.Model',
        fields         : ['id','menu','descricao'],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/treenav',
        		reader         : {
        			type    : 'json',
        			root    : 'rows',
        			successProperty: 'success'
        		}
        }
});