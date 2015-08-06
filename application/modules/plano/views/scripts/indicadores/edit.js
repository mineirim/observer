/*
 * código gerado automaticamente pelo template js/list.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

/* global Ext */

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
			{xtype: 'hiddenfield',name : 'id',ref: 'id',fieldLabel: 'Id'},
			{xtype: 'textfield',name : 'descricao',ref: 'descricao',fieldLabel: 'Descrião do indicador'},
			{xtype: 'hiddenfield',name : 'programacao_id',ref: 'programacao_id'},
			{
                            xtype: 'combo',
                            id : 'cmbTipoIndicador',
                            name : 'tipo_indicador_id',
                            ref: 'tipo_indicador_id',
                            fieldLabel: 'Tipo do Indicador',
                            displayField: 'descricao',
                            store: 'TipoIndicador',
                            valueField: 'id',
                            anchor: '95%',
                            hidden: false,
                            allowBlank: false,
                            typeAhead: true,
                            width: 650,
                            mode: 'remote'
                        },
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
            scope: me,
            handler: me.close
        }];

        me.callParent(arguments);
    }
});