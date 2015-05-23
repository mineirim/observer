/* global Ext */

Ext.define('ExtZF.view.plano.programacoes.Treegrid' ,{
    extend      : 'Ext.tree.Panel',
    alias       : 'widget.planoProgramacoesTreegrid', // nome definido para acessar a grid
    rootVisible : true,
    id          : 'planoProgramacoesTreegrid',
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
                text: 'Relatórios',
                iconCls: 'icon-report',
                menu : {
                    items: [{
                            text : 'Resultados',
                            action: 'grid',
                            name: 'report',
                            reportType : 1,
                            },
                            {
                            text : 'Execução Física',
                            action: 'grid',
                            name: 'report',
                            reportType : 2,
                            },
                            {
                            text : 'Físico/Financeiro',
                            action: 'grid',
                            name: 'report',
                            reportType : 3,
                            }
                        
                    ]
                }
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
                    var me=this;
                    var cellContent = ' ';
                    if(record.get('instrumento')){
                        var singular = record.get('instrumento').singular;
                        cellContent ='<b>' + singular + '-</b>' + value;
                    }else{
                        cellContent = '<span style="font-size:1.1em"><b>' + value + '</b></span>';
                    }
                    return cellContent;
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