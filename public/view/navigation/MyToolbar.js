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
                text: 'Situacoes',
                data: 'admin.Situacoes',
                action: 'loadController',
                createView : 'adminSituacoesList'
            },
            {
                text        : 'Organiza&ccedil;&otilde;es',
                iconCls     : 'silk-add',
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
                text        : 'Programação',
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