/*
 * código gerado automaticamente pelo template js/list.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

/* global Ext */

Ext.define('ExtZF.view.plano.projetos.Edit', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.planoProjetosEdit', 
    title   : 'Edição',
    layout  : 'fit',
    autoShow: true, 
    width   : 1000,
    height  : 600,
    initComponent: function() {
        var me=this;
    	// Itens da janela
        me.items = [{
            xtype: 'form',
            paddin :5,
            items: [{xtype:'planoProjetosForm'}]}
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