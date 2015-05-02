Ext.define('ExtZF.model.Tarefas', {
        extend         : 'Ext.data.Model',
        fields         : [
            'id',
            'menu',
            'peso',
            'ordem',
            'projeto_id',
            'data_inicio',
            'data_prazo',
            'data_encerramento',
            'avaliacao_andamento',
            'percentual_execucao',
            'alteracao_data',
            'andamento_id',
            'andamento',
            'responsavel_usuario_id',
            'supervisor_usuario_id'
        ],     
        proxy : {
            simpleSortMode : true, 
            type           : 'rest',
            url            :   'data/tarefas',
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

