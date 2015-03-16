/*
 * código gerado automaticamente pelo template js/list.tpl 
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
*/

Ext.define('ExtZF.view..email.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.EmailEdit', 
    title : 'Edição',
    layout: 'fit',
    autoShow: true,     
    width: 1000,
    minHeight: 300,
    height: 400,
    maxHeight: 590,
    initComponent: function() {
        var me =this;
    	// Itens da janela
            me.items = [
            {
                xtype: 'form',
                items: [
                    {xtype: 'hidden', name: 'reference_id', ref: 'reference_id'}, 
                    {xtype: 'displayfield', name: 'responsavel', ref: 'responsavel', fieldLabel: 'Para:', labelStyle: 'white-space: nowrap;'}, 
                    {xtype: 'textfield', name : 'mail_cc', ref: 'mail_cc', fieldLabel: 'CC:',labelStyle: 'white-space: nowrap;',anchor: '94%'},
                    {xtype: 'displayfield', name: 'subject', ref: 'subject', fieldLabel: 'Assunto',labelStyle: 'white-space: nowrap;'},
                    {xtype: 'htmleditor', name: 'message', ref: 'message',
                        fieldLabel: 'Mensagem',
                        enableFont: false, 
                        frame   : false,
                        height  : 200,
                        resizable : true,
                        anchor: '94%'
                    },
                ],
                buttons : [{
                        text: 'Enviar',
                        iconCls: 'icon-mail',
                        action: 'send'
                    },
                    {
                        text: 'Cancelar',
                        iconCls: 'icon-cancel',
                        scope: this,
                        handler: me.close
                    }]
            }
        ];
        me.callParent(arguments);
    }
});