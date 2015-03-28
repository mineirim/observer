/*
 * código gerado automaticamente pelo template js/list.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.define('ExtZF.view.plano.projetos.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.planoProjetosEdit', 
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
			{xtype: 'textfield',name : 'coordenador_usuario_id',ref: 'coordenador_usuario_id',fieldLabel: 'Coordenador_usuario_id'},
			{xtype: 'textfield',name : 'situacao_id',ref: 'situacao_id',fieldLabel: 'Situacao_id'},
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