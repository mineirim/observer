Ext.define('ExtZF.view.plano.programacoes.Treegrid' ,{
    extend      : 'Ext.tree.Panel',
    alias       : 'widget.planoProgramacoesTreegrid', // nome definido para acessar a grid
    rootVisible : false,
    store       : 'programacoes.TreeStore', 
    //storeId     : 'programacoesStoreId',
    singleExpand: false,
    
    //selModel: {mode: 'SINGLE'}, // Permite selecionar mais de uma linha da grid
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
            },{
                text: 'Vincular',
                iconCls: 'icon-new',
                action: 'vincular',
                hidden   :true
            },"->",{
                text: 'Excluir',
                iconCls: 'icon-delete',
                action: 'excluir'
            }],
    columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0,  hidden:true},
            {header: 'Menu',  dataIndex: 'menu',  flex: 3,xtype: 'treecolumn', 
                renderer: function(value, metaData, record){
                                ret= Ext.String.format('<div class="topic"><b>{0}-</b> {1}</div>', record.get('instrumento').singular, value);
                                return '<b>' + record.get('instrumento').singular + '-</b>' + value;
                            }
            },
            {header: 'Responsável',     dataIndex: 'responsavel_usuario_id',  flex: 1, 
                renderer: function(value, metaData, record){
                                return record.get('responsavel').nome;
                            }
            }
        ],
        initComponent: function() {
            this.callParent(arguments);
        }
    });