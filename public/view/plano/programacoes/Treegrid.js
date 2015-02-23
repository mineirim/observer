Ext.define('ExtZF.view.plano.programacoes.Treegrid' ,{
    extend      : 'Ext.tree.Panel',
    alias       : 'widget.planoProgramacoesTreegrid', // nome definido para acessar a grid
    rootVisible : true,
    store       : 'programacoes.TreeStore', 
    //storeId     : 'programacoesStoreId',
    singleExpand: false,
    frame       : false,
    frameHeader : false,
    //selModel: {mode: 'SINGLE'}, // Permite selecionar mais de uma linha da grid
    // botões do cabeçalho
    tbar :{ padding: '0 0 0 0', margin: '0 0 0 0',
        items:[{
                text: 'Editar',
                iconCls: 'icon-edit',
                action: 'grid',
                name :'edit'
            },{
                text: 'Anexo',
                iconCls: 'icon-attach',
                action: 'grid',
                name: 'attach'
            },{
                text: 'Relatório',
                iconCls: 'icon-report',
                action: 'grid',
                name: 'report',
            },{
                text: 'E-mail',
                iconCls: 'icon-email',
                action: 'grid',
                name: 'sendmail',
            },{
                text: 'Incluir',
                iconCls: 'icon-new',
                action: 'incluir',
                hidden   :true
            },{
                text: 'Vincular',
                iconCls: 'icon-new',
                action: 'grid',
                name: 'link',
                hidden   :true
            },"->","|",{
                text: 'Excluir',
                iconCls: 'icon-delete',
                action: 'grid',
                name: 'delete',
            }]},
    columns: [{header: 'Id.',  dataIndex: 'id',  flex: 0,  hidden:true},
            {header: 'Menu',  dataIndex: 'menu',  flex: 3,xtype: 'treecolumn', 
                renderer: function(value, metaData, record){
                    singular = '.';
                    if(record.get('instrumento'))
                        singular = record.get('instrumento').singular;
                    ret= Ext.String.format('<div class="topic"><b>{0}-</b> {1}</div>',singular , value);
                    return '<b>' + singular + '-</b>' + value;
                }
            },
            {header: 'Responsável',     dataIndex: 'responsavel_usuario_id',  flex: 1, 
                renderer: function(value, metaData, record){
                                return record.get('responsavel').nome;
                            }
            }
        ],
        initComponent: function() {
            var me = this;
            me.callParent(arguments);
        }
    });