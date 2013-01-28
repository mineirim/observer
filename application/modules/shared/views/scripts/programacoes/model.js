Ext.define('ExtZF.model.Programacoes', {
        extend         : 'Ext.data.Model',
        idProperty     : 'id',
        fields         :   ['id',
                            'menu',
                            'descricao',
                            'ordem',
                            {name:'instrumento_id', type: 'int'},
                            'programacao_id',
                            'setor_id',
                            'responsavel_usuario_id',
                            'supervisor_usuario_id',
                            {name:'responsavel', persist:false},
                            {name:'setor', persist:false},
                            {name:'instrumento', persist:false},
                            {name:'parent',persist:false},
                            {name:'operativo',persist:false},
                            {name:'financeiro',persist:false}
                        ],
        proxy          : {
                        type           : 'rest',
                        url            :   'data/programacoes',
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
        },  
        associations: [
        {   type            : 'belongsTo', 
            model           : 'ExtZF.model.Usuarios', 
            associatedName  : 'ExtZF.model.Usuarios',
            getterName      : 'getResponsavel',
            name            : 'responsavel',
            primaryKey      : 'id', 
            foreignKey      : 'responsavel_usuario_id',
            instanceName    : 'responsavel'
        }, {   
            type: 'belongsTo', 
            model: 'ExtZF.model.Setores', 
            getterName : 'getSetores',
            primaryKey: 'id', 
            foreignKey: 'setor_id'
        }]

});