/* global Ext */
Ext.define('ExtZF.view.plano.projetos.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.planoProjetosForm',
    id: 'planoProjetosForm',
    padding: 8,
    bodyPadding: 12,
    defaults: {
        labelWidth: 150
    },
    requires: [
        'Ext.ux.form.ItemSelector',
    ],
    items: [{
            xtype: 'hidden',
            name: 'id',
            ref: 'id',
            fieldLabel: 'Id',
            anchor: '95%'
        }, {
            xtype: 'textfield',
            name: 'nome',
            ref: 'nome',
            fieldLabel: 'Título',
            anchor: '95%',
        }, {
            xtype: 'fieldset',
            columnWidth: .8,
            title: '',
            defaultType: 'textfield',
            anchor: '95%',
            defaults: {
                padding: 0,
                border: 0,
                margin: 0,
                anchor: '100%',
                //                            width: 210
                forcefit: true
            },
            layout: {
                type: 'hbox',
                pack: 'start',
                //                            align: 'stretch'
                //                align: 'middle'
            },
            items: [{
                xtype: 'datefield',
                name: 'data_inicio',
                ref: 'data_inicio',
                id: 'data_inicio',
                fieldLabel: 'Data de início',
                labelWidth: 145,
                format: 'd/m/Y',
                flex: 2,
                labelStyle: 'white-space: nowrap;'
            }, {
                xtype: 'datefield',
                name: 'data_fim',
                ref: 'data_fim',
                id: 'data_fim',
                fieldLabel: 'Data de encerramento',
                labelWidth: 145,
                format: 'd/m/Y',
                flex: 2,
                labelStyle: 'white-space: nowrap;'
            }, ]
        }, {
            xtype: 'combo',
            id: 'coordenador_usuario_id',
            name: 'coordenador_usuario_id',
            ref: 'coordenador_usuario_id',
            fieldLabel: 'Coordenador',
            store: 'Usuarios',
            displayField: 'nome',
            valueField: 'id',
            queryMode: 'local',
            anchor: '95%',
            allowBlank: true,
            typeAhead: true
        }, {
            xtype: 'htmleditor',
            name: 'apresentacao',
            ref: 'apresentacao',
            fieldLabel: 'Apresentação',
            enableFont: false,
            //            defaultFont : 'PT Sans',
            fontFamilies: [
                'PT Sans',
            ],
            frame: false,
            height: 150,
            resizable: true,
            anchor: '95%'
        }, {
            xtype: 'textareafield',
            name: 'objetivos',
            ref: 'objetivos',
            fieldLabel: 'Objetivos',
            enableFont: false,
            //            defaultFont : 'PT Sans',
            fontFamilies: [
                'PT Sans',
            ],
            frame: false,
            height: 100,
            resizable: true,
            anchor: '95%'
        }, {
            xtype: 'textareafield',
            name: 'metas',
            ref: 'metas',
            fieldLabel: 'Metas',
            enableFont: false,
            //            defaultFont : 'PT Sans',
            fontFamilies: [
                'PT Sans',
            ],
            frame: false,
            height: 100,
            resizable: true,
            anchor: '95%'
        }, {
            xtype: 'itemselector',
            id: 'financiadores-field',
            name: 'financiadores_ids',
            fieldLabel: 'Financiadores',
            store: 'Organizacoes',
            displayField: 'nome',
            valueField: 'id',
            allowBlank: false,
            msgTarget: 'side',
            frame: false,
            buttons: ['add', 'remove', ],
            minHeight: 60,
            //            fromTitle : 'Instituições',
            //            toTitle : 'Financiadoras'
        }


    ],
});
