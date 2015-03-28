/*
 * código gerado automaticamente pelo template js/list.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.define('ExtZF.view.plano.projetos.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.planoProjetosList', 
    store: 'Projetos',
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
		  {header: 'Coordenador_usuario_id',  dataIndex: 'coordenador_usuario_id',  flex: 1},
		  {header: 'Situacao_id',  dataIndex: 'situacao_id',  flex: 1}
                 ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Projetos',
        dock: 'bottom',
        displayInfo: true
    }]
});