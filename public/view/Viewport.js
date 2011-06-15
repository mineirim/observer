
 Ext.define('Js.Viewport', {

        extend: 'Ext.container.Viewport',
        id: 'criaLayout',
        alias: 'myviewport',
        layout: {
            type: 'border',
            padding: 5
        },
        defaults: {
            split: true
        },
        items : [
            {
                
                region: 'north',
                 split       : false,
        collapsible : false,
        margins     : '0 0 0 0',
                id: 'ctnTop',
                
                tbar        : {
                    id          : 'basic-statusbar',
                    items       : [
                    '<b>OBSERVER - Sistema de Planejamento e Monitoramento da UNASUS</b>',
                    '->',{
                        text    : '',
                         id      : 'text',
                         iconCls : 'silk-user'
                     },
                     'Bem Vindo(a), <span id="main_username" class="username">'+usuario+'</span></b>',
                     '-']
                },
                items : {
                         xtype : 'mytoolbar'
                      }
            },
            {
                xtype: 'container',
                region: 'west',
                width: 150,
                layout: 'accordion',
                activeItem: 0,
                id: 'ctnLeft',
                items: [
                    
                    {
                        xtype: 'panel',
                        title: 'Instrumentos',
                        id: 'pnlInstrumentos'
                    },{
                        xtype: 'panel',
                        title: 'Organizações',
                        id: 'pnlOrganizacoes'
                    }
                ]
            },
            {
                xtype: 'container',
                region: 'center',
                height: 404,
                id: 'ctnCenter',
                layout: 'fit',
                items :
                    {xtype : 'tabpanel',layout:'fit',id:'ctnPrincipal',items:{html:'Bem vindo',title:'Home',iconCls:'icon-home',closable : 'true'}}
            },
            {
                xtype: 'container',
                region: 'east',
                width: 100,
                id: 'ctnRight'
            },
            {
                xtype: 'container',
                region: 'south',
                height: 46,
                width: 793,
                id: 'ctnBotton'
            }
        ]
    });