
Ext.define('ExtZF.view.plano.programacoes.Container' ,{
    extend      : 'Ext.Panel', 
    alias       : 'widget.planoProgramacoesContainer',
    frame: true,
    title: 'Programação',
    width: 740,
    height: 700,
    layout: 'border',// {type: 'vbox', align: 'stretch'},
    items: [
     {
        id: 'gridPanel',
        viewConfig: {
            forceFit: true
        },
        height:210,
        split: true,
        region: 'north',
        xtype : 'planoProgramacoesTreegrid'
    }, 
     {
        id: 'detailPanel',
        region: 'center',
        bodyPadding: 7,
        bodyStyle: "background: #ffffff;",        
        html: 'Escolha um instrumento para mostar a descrição.'
    }]
});


