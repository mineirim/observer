/*
 * código gerado automaticamente pelo template js/list.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.define('ExtZF.view.plano.indicadoropcoes.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.planoIndicadorOpcoesEdit', 
    title : 'Edição',
    layout: 'fit',
    autoShow: true, 
    initComponent: function() {
        var me=this;
    	// Itens da janela
        me.items = [{
            xtype: 'form',
            items: [
			{xtype: 'textfield',name : 'id',ref: 'id',fieldLabel: 'Id'},
			{xtype: 'textfield',name : 'indicador_id',ref: 'indicador_id',fieldLabel: 'Indicador_id'},
			{xtype: 'textfield',name : 'descricao',ref: 'descricao',fieldLabel: 'Descricao'},
			{xtype: 'textfield',name : 'selecionado',ref: 'selecionado',fieldLabel: 'Selecionado'},
            ]}
        ];

        me.buttons = [{
            text: 'Salvar',
            iconCls: 'icon-save',
            action: 'salvar'
        },
        {
            text: 'Cancelar',
            iconCls: 'icon-cancel',
            scope: this,
            handler: this.close
        }];

        me.callParent(arguments);
    }
});