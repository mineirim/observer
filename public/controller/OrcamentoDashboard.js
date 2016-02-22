/* global Ext, Etc */

Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.OrcamentoDashboard', {
    extend: 'Ext.app.Controller',
    stores: ['orcamento.GrupoDespesas', 'orcamento.ResumoMacro', 'orcamento.Execucao'],
    models: ['orcamento.GrupoDespesas', 'orcamento.ResumoMacro', 'orcamento.Execucao'],
    views: [
        'orcamento.Dashboard',
        'orcamento.Macro',
        'orcamento.MacroChart',
        'orcamento.Execucao',
        'orcamento.GrupoChart',
        'orcamento.ExecucaoChart',
        'orcamento.Planilha'
    ],
    refs: [],
    init: function() {
        var me = this;
        me.application.on('navigation.changeSelectedMenu' , me.reloadDashboard);
    },
    selectComboProjetos: function(cmb, records) {
        var me = this;
        var record = records[0];
        me.filterByProjetoId(record.get('id'));
    },
    filterByProjetoId: function(projetoId) {
        if (Etc.getLoggedUser().get('is_su') === "true") {
            var pendentes = Ext.getCmp('not_approved');
            pendentes.show();
            var pendentesStore = pendentes.getView().getStore();
            var pendentesParams = Ext.merge(pendentesStore.getProxy().extraParams, { projeto_id: projetoId });
            pendentesStore.getProxy().extraParams = pendentesParams;
            pendentesStore.load({
                callback: function(r, option, success) {
                    pendentes.getView().refresh();
                    pendentes.ownerCt.doLayout();
                }
            });
        }

    },
    itemContextMenu: function(view, record, item, index, event, options) {
        event.stopEvent();
        var me = this;
        var items = [];
        var mycontroller = me.getController('ExtZF.controller.plano.Programacoes');
        items.push({
            text: 'Exibir',
            handler: function() {
                mycontroller.editarProgramacao(record);
            }
        });

        items.push({
            text: 'Execução',
            handler: function() {
                me.application.fireEvent('showExecutionWindow', record);
            }
        });
        items.push('-');
        items.push({
            text: "Anexo",
            data: { record: record },
            iconCls: 'icon-attach-file',
            handler: function() {
                mycontroller.attachFile(record);
            }
        });
        items.push('-');

        var submenu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: "Resultados",
                data: { record: record },
                handler: function() {
                    mycontroller.showReport(record, 1);
                }
            }, {
                text: "Relatório Execução Física",
                data: { record: record },
                handler: function() {
                    mycontroller.showReport(record, 2);
                }
            }, {
                text: "Relatório Físico/Financeiro",
                data: { record: record },
                handler: function() {
                    mycontroller.showReport(record, 3);
                }
            }, ]
        });

        items.push({
            text: 'Relatórios',
            iconCls: 'icon-report',
            hideOnClick: false,
            menu: submenu
        });
        var menu = Ext.create('Ext.menu.Menu', {
            items: items
        });
        menu.showAt(event.xy);
    },
    defaultContextMenu: function(record) {
        var me = this;
        var items = [];
        var mycontroller = me.getController('ExtZF.controller.plano.Programacoes');
        items.push({
            text: 'Exibir',
            handler: function() {
                mycontroller.editarProgramacao(record);
            }
        });
        items.push('-');
        items.push({
            text: "Anexo",
            data: { record: record },
            iconCls: 'icon-attach-file',
            handler: function() {
                mycontroller.attachFile(record);
            }
        });
        items.push('-');
        items.push({
            text: 'Relatórios',
            iconCls: 'icon-report',
            menu: {
                items: [{
                    text: "Resultados",
                    data: { record: record },
                    handler: function() {
                        mycontroller.showReport(record, 1);
                    }
                }, {
                    text: "Relatório Execução Física",
                    data: { record: record },
                    handler: function() {
                        mycontroller.showReport(record, 2);
                    }
                }, {
                    text: "Relatório Físico/Financeiro",
                    data: { record: record },
                    handler: function() {
                        mycontroller.showReport(record, 3);
                    }
                }, ]
            }
        });


        return items;
    },
    reloadDashboard: function(record) {
        var me=this;
        var idProgramacao = record.get('id');
        var execucaoStore = me.getStore('orcamento.Execucao');
        execucaoStore.load({
            scope: me,
            params : {programacaoId:record.data.id},
            callback: function(r,option,success){
            }
        });

        if (Etc.getLoggedUser().get('is_su') === "true") {
            var pendentes = Ext.getCmp('not_approved');
            pendentes.show();
            pendentes.getView().getStore().load({
                callback: function(r, option, success) {
                    pendentes.getView().refresh();
                    pendentes.ownerCt.doLayout();
                }
            });
        }

    },
    checkList: function() {
        var me = this;
        me.checkMyItems();
        me.checkSupervisor();
        me.checkPendentes();
        var dashboard = me.getPainel();
        dashboard.doLayout();

    },

});



//        Ext.create('Ext.data.Store', {
//            id:'supItemsStore',
//            fields    :  ['id',
//                            'menu',
//                            'descricao',
//                            'ordem',
//                            {name:'instrumento_id', type: 'int'},
//                            'programacao_id',
//                            'setor_id',
//                            'responsavel_usuario_id',
//                            'supervisor_usuario_id'
//                        ],
//            proxy     : {
//                        type           : 'rest',
//                        url            :   'data/programacoes',
//                        extraParams    : {get_my:true},
//                        reader         : {
//                                type    : 'json',
//                                root    : 'rows',
//                  successProperty: 'success'
//                        }
//            },
//            autoLoad :true,
//            filters : {property: 'supervisor_usuario_id',
//                        value:1}
//        });
//        var checklist = Ext.create('ExtZF.view.plano.dashboard.Checklist',{store: Ext.data.StoreManager.lookup('supItemsStore')});
//        checklist.title = "Sob minha supervisão";
//        return checklist;
