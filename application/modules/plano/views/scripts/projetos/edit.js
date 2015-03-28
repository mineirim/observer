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
    width:800,
    height :150,
    initComponent: function() {
        var me=this;
    	// Itens da janela
        me.items = [{
            xtype: 'form',
            paddin :5,
            items: [
			{xtype: 'hidden',name : 'id',ref: 'id',fieldLabel: 'Id'},
			{xtype: 'textfield',name : 'nome',ref: 'nome',fieldLabel: 'Nome',anchor      : '98%',},
                        {
                            xtype: 'combo',
                            id          : 'coordenador_usuario_id',
                            name        : 'coordenador_usuario_id',
                            ref         : 'coordenador_usuario_id',
                            fieldLabel  : 'Coordenador', 
                            store       : 'Usuarios',
                            displayField: 'nome',
                            valueField  : 'id',
                            queryMode   : 'local',
                            anchor      : '95%',
                            allowBlank  : true,
                            typeAhead   : true
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