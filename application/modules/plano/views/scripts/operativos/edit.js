Ext.define('ExtZF.view.plano.operativos.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.planoOperativosEdit', // nome definido a janela
    title: 'Edição',
    layout: 'fit',
    width: 840,
    minHeight: 390,
    height: 400,
    maxHeight: 590,
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    initComponent: function() {
        var me = this;
        me.items = [{
                xtype: 'form',
                items: [
                    {xtype: 'displayfield', name: 'peso', ref: 'peso', fieldLabel: 'Peso'},
                    {xtype: 'displayfield', name: 'data_inicio', ref: 'data_inicio', fieldLabel: 'Inicio',
                        renderer: Ext.util.Format.dateRenderer('d/m/y')
                    },
                    {xtype: 'displayfield', name: 'data_prazo', ref: 'data_prazo', fieldLabel: 'Prazo',
                        renderer: Ext.util.Format.dateRenderer('d/m/y')
                    },
                    {xtype: 'combo', name: 'andamento_id', ref: 'andamento_id', fieldLabel: 'Andamento',
                        store: 'Andamentos',
                        displayField: 'descricao',
                        valueField: 'id',
                        queryMode: 'local',
                        anchor: '90%',
                        typeAhead: true,
                        listConfig: {
                                itemTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<div style="clear: both; border: 1px solid white; width: 98%;">',
                                        '<div style="text-align: left; clear: both;"><b>{descricao}</b></div>',
                                        '<div style="text-align: left; clear: both;font-size:0.9em;font-style: italic;">{conceito}</div>',
                                '</div>',
                                '</tpl>'
                                )
                        }
                    },
                    {xtype: 'htmleditor', name: 'avaliacao_andamento', ref: 'avaliacao_andamento',
                        fieldLabel: 'Avaliacao do andamento',
                        anchor: '90%'
                    },
                    {xtype: 'sliderfield', name: 'percentual_execucao', ref: 'percentual_execucao', fieldLabel: 'Percentual de execucao',
                        increment: 1,
                        minValue: 0,
                        maxValue: 100,
                        tipText: function(thumb) {
                            return String(thumb.value) + '%';

                        },
                        anchor: '90%'
                    },
                    {xtype: 'datefield', name: 'data_encerramento', ref: 'data_encerramento',
                        fieldLabel: 'Data de encerramento',
                        format: 'd/m/Y'
                    }
                ]}
        ];

        // botões da janela
        me.buttons = [{
                text: 'Salvar',
                iconCls: 'icon-save',
                action: 'salvar'
            },
            {
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                scope: this,
                handler: me.close
            }];

        me.callParent(arguments);
    }
});