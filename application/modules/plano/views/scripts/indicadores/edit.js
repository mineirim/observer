/*
 * código gerado automaticamente pelo template js/list.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.define('ExtZF.view.plano.indicadores.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.planoIndicadoresEdit', 
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
			{xtype: 'textfield',name : 'descricao',ref: 'descricao',fieldLabel: 'Descrião do indicador'},
			{xtype: 'textfield',name : 'programacao_id',ref: 'programacao_id',fieldLabel: 'Programacao_id'},
			{xtype: 'textfield',name : 'tipo_indicador_id',ref: 'tipo_indicador_id',fieldLabel: 'Tipo_indicador_id'},
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