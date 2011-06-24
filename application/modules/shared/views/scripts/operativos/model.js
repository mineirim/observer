Ext.define('ExtZF.model.Operativos', {
        extend         : 'Ext.data.Model',
        fields         : ['id','programacao_id','peso','responsavel_id','data_inicio','data_prazo','data_encerramento','andamento_id','avaliacao_andamento','percentual_execucao','situacao_id'],
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/operativos',
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