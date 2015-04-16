Ext.define('ExtZF.view.plano.financeiro.List' ,{
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.planoFinanceiroList', // nome definido para acessar a grid
    id          : 'planoFinanceiroList',
    store       : 'Financeiro', // store definido em store/Financeiro.js
    title       : 'Lista',
    selModel    : {mode: 'MULTI'}, // Permite selecionar mais de uma linha da grid
    // botões do cabeçalho
    programacao_id:0,
    autoScroll :true,
    tbar        :[{
                    text: 'Alocar Recursos',
                    iconCls: 'icon-new',
                    action: 'incluir',
                    id: 'btnIncluir'
                },'->',{
                    text: 'Excluir',
                    iconCls: 'icon-delete',
                    action: 'excluir'
                }],
    columns     : [{header: 'Id.',  dataIndex: 'id',  flex: 0, hidden:true},
                   {header: 'Origem Recurso',  dataIndex: 'parent_rows',  flex: 6,
                        renderer: function(value, metaData, record){
                            var origem = '';
                            for(var p in value){
                                origem = "<b>" + value[p].singular + " - </b>" + value[p].menu + " -> " + origem;
                            }
                            return origem;
                        }
                    },
		   {header: 'Item',  dataIndex: 'descricao',  flex: 4},
		   {header: 'Valor Programado',  dataIndex: 'valor',  flex: 1, align : 'right', xtype: 'numbercolumn'},
		   {header: 'Valor Executado',  dataIndex: 'valor_executado', align : 'right',  flex: 1, xtype: 'numbercolumn'},
		   {header: 'Saldo',  dataIndex: 'valor',
                       renderer:function(value,metadata,record){
                                return parseFloat(record.get('valor'))-parseFloat(record.get('valor_executado'));
                        },
                       align : 'right',  flex: 1, xtype: 'numbercolumn'}],
    // Paginação
    dockedItems : [{
                    xtype: 'pagingtoolbar',
                    store: 'Financeiro',
                    dock: 'bottom',
                    displayInfo: true
                }]
});