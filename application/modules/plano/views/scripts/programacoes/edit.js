Ext.define('ExtZF.view.plano.programacoes.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.planoProgramacoesEdit', // nome definido a janela
    title : 'Edição',
    layout: 'fit',
    width : 740,
    minHeight : '690px',
    
    
    autoShow: true, // exibir a janela automaticamente ao chamá-la
    criaDetail : function(){
        var andamento =  Ext.create('Ext.data.Store', {
            fields: ['id', 'descricao'],
            data : [
                {"id":"1", "descricao":"Iniciado"},
                {"id":"2", "descricao":"Parado"},
                {"id":"3", "descricao":"Concluído"}
            ]
        });

        var formDetail =  Ext.create('Ext.form.Panel', {
            id: 'frmDetail',
            padding:8,
            items: [
            {
                width: 400,
                increment: 5,
                minValue: 0,
                maxValue: 100,
                xtype: 'sliderfield',
                tipText: function(thumb){
                    return String(thumb.value) + '%';

                }, 
                name : 'peso',
                ref: 'peso',
                fieldLabel: 'Peso',
                anchor:'95%'
            },
            {
                xtype: 'datefield',
                name : 'data_inicio',
                ref: 'data_inicio',
                fieldLabel: 'Data Início',
                format: 'd/m/Y'
            },
            {
                xtype: 'datefield',
                name : 'data_prazo',
                ref: 'data_prazo',
                fieldLabel: 'Data Prazo',
                format: 'd/m/Y'
            },
            {
                xtype: 'combo',
                name        : 'responsavel_id',
                ref         : 'responsavel_id',
                fieldLabel  : 'Responsável', 
                store       : 'Usuarios',
                displayField: 'nome',
                valueField  : 'id',
                queryMode   : 'local'
                
            }
            ]            
            
        });
        this.add(formDetail);
    },
    initComponent: function() {
                        
        var formDefault = Ext.create('Ext.form.Panel', {
            id: 'frmDefault',
            padding:8,
            items: [
            {
                
                xtype: 'textfield',
                name : 'menu',
                ref: 'menu',
                fieldLabel: 'Menu',
                anchor:'95%'
            },

            {
                xtype: 'htmleditor',
                name : 'descricao',
                ref: 'descricao',
                fieldLabel: 'Descrição',
                anchor:'95%'

            }, //só exibir se has_responsavel= true
            {
                xtype: 'combo',
                id          : 'responsavel_usuario_id',
                name        : 'responsavel_usuario_id',
                ref         : 'responsavel_usuario_id',
                fieldLabel  : 'Responsável', 
                store       : 'Usuarios',
                displayField: 'nome',
                valueField  : 'id',
                queryMode   : 'local',
                anchor:'95%',
                hidden: true
            },//só exibir se has_supervisor=true
            {
                xtype: 'combo',
                id          : 'supervisor_usuario_id',
                name        : 'supervisor_usuario_id',
                ref         : 'supervisor_usuario_id',
                fieldLabel  : 'Supervisor', 
                store       : 'Usuarios',
                displayField: 'nome',
                valueField  : 'id',
                queryMode   : 'local',
                anchor:'95%',
                hidden: true
            },//só exibir se has_equipe=true
            {
                xtype: 'combo',
                id          : 'setor_id',
                name        : 'setor_id',
                ref         : 'setor_id',
                fieldLabel  : 'Setor', 
                store       : 'Setores',
                displayField: 'descricao',
                valueField  : 'id',
                queryMode   : 'local',
                anchor:'95%',
                hidden: true
            },

            {
                xtype: 'hiddenfield',
                name:'programacao_id',
                ref:'programacao_id'
            },

            {
                xtype: 'hiddenfield',
                name:'instrumento_id',
                ref:'programacao_id'
            }
            ]            
        });
        this.items = [formDefault];
        // botões da janela
        this.buttons = [{
            text: 'Salvar',
            action: 'salvar',
            iconCls: 'icon-save'
        },
        {
            text: 'Cancelar',
            scope: this,
            handler: this.close,
            iconCls : 'icon-cancel'
        }];

        this.callParent(arguments);
    }
});