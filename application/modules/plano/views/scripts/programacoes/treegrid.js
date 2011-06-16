Ext.define('ExtZF.view.plano.programacoes.Treegrid' ,{
    extend      : 'Ext.tree.Panel',
    alias       : 'widget.planoProgramacoesTreegrid', // nome definido para acessar a grid
    title       : 'Programação',
    //useArrows   : true,
    rootVisible : false,
    lines        :   true,
    store       : 'programacoes.TreeStore', 
    //storeId     : 'programacoesStoreId',
    singleExpand: false,
    
    selModel: {mode: 'SINGLE'}, // Permite selecionar mais de uma linha da grid
    // botões do cabeçalho
    tbar :[{
                text: 'Novo Macro-Objetivo',
                iconCls: 'icon-new',
                action: 'newRoot'
            },{
                text: 'Incluir',
                iconCls: 'icon-new',
                action: 'incluir',
                hidden   :true
            },"->",{
                text: 'Excluir',
                iconCls: 'icon-delete',
                action: 'excluir'
            }],
    columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0,  hidden:true},
            {header: 'Menu',  dataIndex: 'menu',  flex: 1,xtype: 'treecolumn', 
                renderer: function(value, metaData, record){
                                return '<b>'+ record.get('instrumento').singular + ' - </b>' + value;
                            }
            },
            {header: 'Descricao',  dataIndex: 'descricao',  flex: 1},
            {header: 'Responsável',     dataIndex: 'responsavel_usuario_id',  flex: 1, 
                renderer: function(value, metaData, record){
                                return record.get('responsavel').nome;
                            }
            },
            {header: 'Setor',     dataIndex: 'setor_id',  flex: 1, 
                renderer: function(value, metaData, record){
                                return record.get('setor').nome;
                            }
            }
        ],
        initComponent: function() {
            Ext.log({msg:'Inicia o treegrid',level:'info',dump:arguments});
            this.callParent(arguments);
        }
});

