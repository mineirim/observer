Ext.define('ExtZF.model.Programacoes', {
        extend         : 'Ext.data.Model',
        fields         : ['id','menu','descricao','ordem','instrumento_id','programacao_id','setor_id'],
        proxy          : {
                        type           : 'rest',
                        url            :   'data/programacoes',
                        reader         : {
                                type    : 'json'
                        },
                        writer   : {
                                root     : 'rows',
                                type     : 'json',
                                encode   : true 
                        }
        }
});