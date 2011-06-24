Ext.define('ExtZF.view.admin.cad-usuarios.Lista' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.adminUsuariosLista', // nome definido para acessar a grid
    store: 'Usuarios', // store definido em store/Usuarios.js
    title : '<?php echo $this->titulo; ?>', // exemplo do título da view passado via PHP
    selModel: {mode: 'MULTI'}, // Permite selecionar mais de uma linha da grid
    tbar :[{
    	text: 'Incluir',
        iconCls: 'icon-new',
    	action: 'incluir' // action identificada para executar na camada controller
    },{
    	text: 'Excluir',
        iconCls: 'icon-delete',
    	action: 'excluir'
    }],
	columns: [
        {header: 'Cód.',  dataIndex: 'id',  flex: 0, width:20},
	{header: 'Nome',  dataIndex: 'nome',  flex: 1},
        {header: 'E-Mail', dataIndex: 'email', flex: 1},
        {header: 'Login', dataIndex: 'usuario', flex: 1},
        //{header: 'Setor', dataIndex: 'setor_id', flex: 1,renderer : this.getSetor},
        //{header: 'Cargo', dataIndex: 'cargo_id', flex: 1,renderer : this.getCargo}
    ],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Usuarios',
        dock: 'bottom',
        displayInfo: true
    }],
    getSetor : function(setor_id){
        setor = Ext.create('ExtZF.model.Setores');
        return setor.load(setor_id,{
                success : function(){
                    ret = this.nome + ' - ' + this.sigla;
                    return ret;
                }
        })
    },
    getCargo : function(cargo_id){
        cargo = Ext.create('ExtZF.model.Cargos');
        return cargo.load(cargo_id,{
                success : function(){
                    ret = this.nome;
                    return ret;
                }
        })
    }
    
    
});