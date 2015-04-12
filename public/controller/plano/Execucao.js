/* global Ext, Etc */
Ext.define('ExtZF.controller.plano.Execucao', {
    extend: 'Ext.app.Controller',
    stores: ['Setores','Usuarios','Instrumentos','Operativos','Vinculos', 'Tarefas', 'Planejamento', 'Financeiro', 'GrupoDespesas', 'OperativosHistorico', 'Projetos'], 
    models: ['Setores','Usuarios','Instrumentos','Operativos','Vinculos', 'Tarefas', 'Planejamento', 'Financeiro', 'GrupoDespesas', 'OperativosHistorico', 'Projetos'], 
     views: [
    'plano.financeiro.List',
    'plano.financeiro.Edit',
    'plano.operativos.Form',
    'plano.execucao.Window'
    ],
    refs: [
        {ref:'window',selector:'planoExecucaoWindow'},
        ],
    init: function() {
        var me = this;
        me.control(
        {

        });
        me.application.on({
            showExecutionWindow: me.showExecutionWindow, 
            scope: this
        });
    },
    showExecutionWindow : function(programacao){
        var me=this;
        var view = Ext.widget('planoExecucaoWindow');
        view.setTitle('Execução Físico Financeira');
        me.showOperativos(programacao);
//      	view.down('form').loadRecord(record);
        view.show();
    },
    showOperativos : function(record){
        var me=this;
        var operativosStore = me.getOperativosStore();
        operativosStore.remoteFilter = false;
        operativosStore.suspendEvents();
        operativosStore.clearFilter();
        operativosStore.resumeEvents();
        operativosStore.filter('programacao_id',record.get('id'))
        operativosStore.remoteFilter = true;
        operativosStore.load({
            callback : function(records, operation, success) {
                var operativoRecord = operativosStore.findRecord('programacao_id',parseInt(record.get('id'),10));
                if(parseInt(operativoRecord.get('andamento_id'),10)===1){
                    operativoRecord.set('andamento_id',2);
                    me.getOperativosStore().sync();
                }
                var operativosForm = Ext.getCmp('planoOperativosForm');
                operativosForm.loadRecord(operativoRecord);
                me.application.fireEvent('filtrarHistoricoPorOperativo', operativoRecord.get('id'));
                
            }
        });
        me.application.fireEvent('planoProgramacaoFinanceiro.filterByProgramacao', record.get('id'));
        me.application.fireEvent('filterDespesasByProgramacao', record.get('id'));
    }

});
