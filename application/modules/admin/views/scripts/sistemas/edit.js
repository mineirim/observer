/*
 * código gerado automaticamente pelo template js/list.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.define('ExtZF.view.admin.sistemas.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.adminSistemasEdit', 
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
			{xtype: 'textfield',name : 'nome',ref: 'nome',fieldLabel: 'Nome'},
			{xtype: 'textfield',name : 'chave',ref: 'chave',fieldLabel: 'Chave'},
			{xtype: 'textfield',name : 'situacao_id',ref: 'situacao_id',fieldLabel: 'Situacao_id'},
			{xtype: 'textfield',name : 'inclusao_data',ref: 'inclusao_data',fieldLabel: 'Inclusao_data'},
			{xtype: 'textfield',name : 'inclusao_usuario_id',ref: 'inclusao_usuario_id',fieldLabel: 'Inclusao_usuario_id'},
			{xtype: 'textfield',name : 'alteracao_data',ref: 'alteracao_data',fieldLabel: 'Alteracao_data'},
			{xtype: 'textfield',name : 'alteracao_usuario_id',ref: 'alteracao_usuario_id',fieldLabel: 'Alteracao_usuario_id'},
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