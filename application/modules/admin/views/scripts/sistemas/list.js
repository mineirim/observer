/*
 * código gerado automaticamente pelo template js/list.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.define('ExtZF.view.admin.sistemas.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.adminSistemasList', 
    store: 'Sistemas',
    title : 'Lista',
    selModel: {mode: 'MULTI'}, 
    
    tbar :[{
    	text: 'Incluir',
        iconCls: 'icon-new',
    	action: 'incluir'
    },{
    	text: 'Excluir',
        iconCls: 'icon-delete',
    	action: 'excluir'
    }],
	columns: [
                  {header: 'Id.',  dataIndex: 'id',  flex: 0, width: '20'},
		  {header: 'Id',  dataIndex: 'id',  flex: 1},
		  {header: 'Nome',  dataIndex: 'nome',  flex: 1},
		  {header: 'Chave',  dataIndex: 'chave',  flex: 1},
		  {header: 'Situacao_id',  dataIndex: 'situacao_id',  flex: 1},
		  {header: 'Inclusao_data',  dataIndex: 'inclusao_data',  flex: 1},
		  {header: 'Inclusao_usuario_id',  dataIndex: 'inclusao_usuario_id',  flex: 1},
		  {header: 'Alteracao_data',  dataIndex: 'alteracao_data',  flex: 1},
		  {header: 'Alteracao_usuario_id',  dataIndex: 'alteracao_usuario_id',  flex: 1}
                 ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Sistemas',
        dock: 'bottom',
        displayInfo: true
    }]
});