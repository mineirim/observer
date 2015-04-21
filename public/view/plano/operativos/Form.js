/* global Ext */

Ext.define('ExtZF.view.plano.operativos.Form', {
    extend  : 'Ext.form.Panel',
    alias   : 'widget.planoOperativosForm',
    id      : 'planoOperativosForm',
    items: [
        {
            xtype: 'fieldset',
            columnWidth: .8,
            title: '',
            defaultType: 'textfield',
            defaults: {
                anchor: '94%',
                //                            width: 210
                //                              forcefit:true
            },
            layout: {
                type: 'hbox',
                pack: 'start',
                //                            align: 'stretch'
                align: 'middle'
            },
            items: [{xtype: 'displayfield', name: 'peso', ref: 'peso', fieldLabel: 'Peso', flex: 1, labelStyle: 'white-space: nowrap;', labelWidth: 60, flex:1},
                {xtype: 'displayfield', name: 'data_inicio', ref: 'data_inicio', fieldLabel: 'Inicio', labelStyle: 'white-space: nowrap;', labelWidth: 60, flex: 1,
                    renderer: Ext.util.Format.dateRenderer('d/m/y')
                },
                {xtype: 'displayfield', name: 'data_prazo', ref: 'data_prazo', fieldLabel: 'Prazo', flex: 1, labelStyle: 'white-space: nowrap;', labelWidth: 60,
                    renderer: Ext.util.Format.dateRenderer('d/m/y')
                }]
        },
        {xtype: 'combo', name: 'andamento_id', ref: 'andamento_id', id: 'andamento_id', fieldLabel: 'Andamento',
            store: 'Andamentos',
            displayField: 'descricao',
            valueField: 'id',
            queryMode: 'local',
            anchor: '94%',
            typeAhead: true,
            listConfig: {
                itemTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                        '<div style="clear: both; border: 1px solid white; width: 98%;" class="andamento-{id}">',
                        '<div style="text-align: left; clear: both;" class="andamento-{id}"><b>{descricao}</b></div>',
                        '<div style="text-align: left; clear: both;font-size:0.9em;font-style: italic;" class="andamento-{id}">{conceito}</div>',
                        '</div>',
                        '</tpl>'
                        )
            }
        },
        {xtype: 'htmleditor', name: 'avaliacao_andamento', ref: 'avaliacao_andamento',
            fieldLabel: 'Avaliacao do andamento',
            enableFont: false,
            frame: false,
            height: 100,
            resizable: true,
            anchor: '94%'
        },
        {
            xtype: 'fieldset',
            columnWidth: .8,
            title: '',
            defaultType: 'textfield',
            defaults: {
                anchor: '90%',
                //                            width: 210
                //                              forcefit:true
            },
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
                        //                            align: 'middle'
            },
            items: [
                {xtype: 'sliderfield', name: 'percentual_execucao',
                    ref: 'percentual_execucao',
                    id: 'percentual_execucao',
                    fieldLabel: 'Percentual de execucao', labelWidth: 150,
                    increment: 1,
                    minValue: 0,
                    maxValue: 100,
                    tipText: function (thumb) {
                        return String(thumb.value) + '%';

                    },
                    flex: 3,
                    //                            anchor: '80%',
                },
                {xtype: 'datefield', name: 'data_encerramento', ref: 'data_encerramento', id: 'data_encerramento',
                    fieldLabel: 'Data de encerramento', labelWidth: 145,
                    format: 'd/m/Y',
                    flex: 2,
                    labelStyle: 'white-space: nowrap;'
                }
            ]
        }
    ],
    buttons : [
    {
        text: 'Salvar',
        iconCls: 'icon-save',
        action: 'salvar'
    },  
    {
        text: 'Salvar e enviar e-mail',
        action: 'salvar',
//                        xtype : 'checkbox',
//                        boxLabel : 'Salvar e enviar e-mail',
        iconCls: 'icon-email',
        itemId : 'sendmail'
    }]
});