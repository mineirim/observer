Ext.define('ExtZF.model.OperativosHistorico', {
        extend         : 'Ext.data.Model',
        fields         : ['id','operativo_id',
                            'programacao_id',
                            'peso',
                            'responsavel_id',
                            'data_inicio',
                            'data_prazo',
                            'data_encerramento',
                            'andamento_id',
                            'avaliacao_andamento',
                            'percentual_execucao',
                            {name:'situacao_id',type:'int'}],
        
        proxy          : {
        simpleSortMode : true, 
        type           : 'rest',
        url            :   'data/operativos-historico',
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