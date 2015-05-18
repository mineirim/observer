/*
 * código gerado automaticamente pelo template js/list.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

/* global Ext */

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
		  {header: 'Nome',  dataIndex: 'nome',  flex: 1},
		  {header: 'Início',  dataIndex: 'data_inicio',  flex: 1,renderer: Ext.util.Format.dateRenderer('d/m/y')},
		  {header: 'Encerramento',  dataIndex: 'data_fim',  flex: 1,renderer: Ext.util.Format.dateRenderer('d/m/y')},
		  {header: 'Coordenador',  dataIndex: 'coordenador_usuario_id',  flex: 1,
                      renderer: function(value, metaData, record){
                                return Ext.getStore('Usuarios').findRecord('id',value).get('nome');
                            }
                  },
                 ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Projetos',
        dock: 'bottom',
        displayInfo: true
    }]
});