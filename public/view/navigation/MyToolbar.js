Ext.define('ExtZF.view.navigation.MyToolbar', {
    extend: 'Ext.Toolbar',
    alias:      'widget.mytoolbar',
    id:         'tbrMenu',
    initComponent: function() {
        this.items = [
        {
            text: 'Instrumentos',
            id: 'btnInstrumentos',
            menu: [
            {
                text: 'Item I',
                id: 'mniItemI'
            }
            ]
        },
        {
            text: 'Administra&ccedil;&atilde;o',
            id: 'btnAdministracao',
            menu: [
            {
                text: 'Situa&ccedil;&otilde;es',
                data: 'admin.Situacoes',
                action: 'loadController',
                createView : 'adminSituacoesList',
                iconCls: 'x-menu-item-lst'
            },
            {
                text        : 'Organiza&ccedil;&otilde;es',
                iconCls     : 'item-lst',
                data        : 'admin.Organizacoes',
                action      : "loadController",
                createView  : "adminOrganizacoesList"
            },
            {
                text        : 'Setores',
                iconCls     : 'silk-add',
                data        : 'admin.Setores',
                action      : "loadController",
                createView  : "adminSetoresList"
            },
            {
                text        : 'Instrumentos',
                iconCls     : 'silk-add',
                data        : 'admin.Instrumentos',
                action      : "loadController",
                createView  : "adminInstrumentosList"
            },
            {
                text        : 'Programa&ccedil;&atilde;o',
                iconCls     : 'silk-add',
                data        : 'plano.Programacoes',
                action      : "loadController",
                createView  : "planoProgramacoesTreegrid"
            }
            ]

        }
        ];
        this.superclass.initComponent.call(this);
    }
});