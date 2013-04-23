Ext.define('ExtZF.view.plano.programacoes.GridFinanceiro' ,{
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.planoProgramacoesGridFinanceiro', 
    store       : 'Financeiro',
    title       : 'Planilha Orçamentária',
    height      : 150,
    layout      : 'fit',   
    columns     : [
                    {header: 'Id.',  dataIndex: 'id',  flex: 0, hidden:true},
                    {header: 'Origem Recurso',  dataIndex: 'parent_rows',  flex: 6,
                        renderer: function(value, metaData, record){
                            var origem = '';
                            for(var p in value){
                                origem = value[p].singular + " - " + value[p].menu + " -> " + origem;
                            }
                            return origem;
                        }
                    },
                    {header: 'Ítem',  dataIndex: 'descricao',  flex: 4},
                    {header: 'Valor Orçamento',  dataIndex: 'valor',  flex: 1, align : 'right', xtype: 'numbercolumn'},
                    {header: 'Valor Gasto', dataIndex: 'valor_executado',  flex: 1, align : 'right', xtype:'numbercolumn'}
                 ]
    // Paginação
        // botões do cabeçalho
/**
 * 
 *    tbar :[{
    	text: 'Incluir',
        iconCls: 'icon-new',
    	action: 'incluir' // action identificada para executar na camada controller
    },'->',{
    	text: 'Excluir',
        iconCls: 'icon-delete',
    	action: 'excluir'
    }],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Financeiro',
        dock: 'bottom',
        displayInfo: true
    }] 
    */
});