Ext.define('ExtZF.model.Programacoes', {
        extend         : 'Ext.data.Model',
        idProperty     : 'programacoesId',
        fields         : ['id','menu','descricao','ordem','instrumento_id','programacao_id','setor_id','responsavel_usuario_id'],
        proxy          : {
                        type           : 'rest',
                        url            :   'data/programacoes',
                        reader         : {
                                type    : 'json',
                                root    : 'rows',
                                idProperty: 'id',
        			successProperty: 'success'
                        },
                        writer   : {
                                root     : 'rows',
                                type     : 'json',
                                encode   : true 
                        }
        },  
        associations: [
        {   type: 'belongsTo', 
            model: 'ExtZF.model.Usuarios', 
            getterName : 'getUsuarios',
            primaryKey: 'id', 
            foreignKey: 'responsavel_usuario_id'
        }, {   
            type: 'belongsTo', 
            model: 'ExtZF.model.Setores', 
            getterName : 'getSetores',
            primaryKey: 'id', 
            foreignKey: 'setor_id'
        }]
});