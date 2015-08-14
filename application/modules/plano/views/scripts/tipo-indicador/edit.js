/*
 * código gerado automaticamente pelo template js/list.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.define('ExtZF.view.plano.tipoindicador.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.planoTipoIndicadorEdit', 
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
			{xtype: 'textfield',name : 'descricao',ref: 'descricao',fieldLabel: 'Descricao'},
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