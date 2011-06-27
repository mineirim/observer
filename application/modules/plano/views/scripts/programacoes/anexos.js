
Ext.define('ExtZF.view.plano.programacoes.Anexos' ,{
    extend      : 'Ext.Panel', 
    alias       : 'widget.planoProgramacoesAnexos',
    frame: true,
    title: 'Anexos',
    height: 100,
    layout: 'fit',
    collapsible:true,
    iconCls :   'icon-attach',
    lbar:[{xtype:'button',
          iconCls:'icon-attach-file',
          action    : 'attach',
          text      : 'Adicionar'
      }]
});


