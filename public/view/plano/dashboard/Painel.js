Ext.define('ExtZF.view.plano.dashboard.Painel' ,{
    extend      : 'Ext.panel.Panel',
    alias       : 'widget.planoDashboardPainel', 
    id          : 'planoDashboardPainel',
//    layout: 'anchor',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    defaults    : {forcefit:true},
    initComponent: function() {
        var me=this;
        me.callParent(arguments);
    },
    tbar        :[{
                     xtype: 'combo',
                    id: 'cmbProjetos',
                    ref: 'cmbProjetos',
                    store : 'Projetos',
                    fieldLabel: 'Filtrar por projeto',
                    displayField: 'nome',
                    valueField: 'id',
//                    anchor: '35%',
                    labelWidth: 145,
                    hidden: false,
                    allowBlank: false,
                    typeAhead: true,
                    width: 650,
                    mode: 'remote',
                },{
                    text: 'Recarregar Dashboard',
                    iconCls: 'icon-new',
                    action: 'reload',
                    id: 'btnReload'
                }
            ],
    items: [
        {xtype:'planoDashboardChecklist', flex:1, id:'my_responsability'},
        {xtype:'planoDashboardChecklist', flex:1, id:'my_supervision'},
        {xtype:'planoDashboardPendentes', flex:1, id:'not_approved', hidden:true},
    ]
});