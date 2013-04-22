Ext.define('ExtZF.model.OperativosHistorico', {
        extend         : 'Ext.data.Model',
        fields         : ['id',
                            {name:'operativo_id', type:'int'},
                            {name:'programacao_id', type:'int'},
                            'peso',
                            {name:'responsavel_id', type:'int'},
                            'data_inicio',
                            'data_prazo',
                            'data_encerramento',
                            {name:'andamento_id', type:'int'},
                            'avaliacao_andamento',
                            'percentual_execucao',
                            {name:'situacao_id',type:'int'},
                            {name: 'alteracao_data', type:'date'} ],
        
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