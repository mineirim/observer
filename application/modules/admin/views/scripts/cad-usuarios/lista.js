Ext.define('ExtZF.view.admin.cad-usuarios.Lista' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.adminUsuariosLista', // nome definido para acessar a grid
    store: 'Usuarios', // store definido em store/Usuarios.js
    title : '<?php echo $this->titulo; ?>', // exemplo do título da view passado via PHP
    selModel: {mode: 'MULTI'}, // Permite selecionar mais de uma linha da grid
    // botões do cabeçalho
    tbar :[{
    	text: 'Incluir',
    	action: 'incluir' // action identificada para executar na camada controller
    },{
    	text: 'Excluir',
    	action: 'excluir'
    }],
	columns: [
        {header: 'Cód.',  dataIndex: 'id',  flex: 0, width:20},
	{header: 'Nome',  dataIndex: 'nome',  flex: 1},
        {header: 'E-Mail', dataIndex: 'email', flex: 1},
        {header: 'Login', dataIndex: 'usuario', flex: 1}
    ],
    // Paginação
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Usuarios',
        dock: 'bottom',
        displayInfo: true
    }]
});