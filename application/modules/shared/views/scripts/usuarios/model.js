// Modelagem dos dados - utilizada no store
Ext.define('ExtZF.model.Usuarios', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nome', 'email','usuario'],

    validations: [{
        type: 'length',
        field: 'nome',
        min: 1
    }, {
        type: 'length',
        field: 'email',
        min: 1
    }],
    proxy: {
    	simpleSortMode: true, // envia parametros de ordena��o separadamente (o padr�o � sort	[{"property":"id","direction":"ASC"}])
        type: 'rest',
        url :   'data/usuarios',
        reader: {
            type: 'json',
            root: 'rows',
            successProperty: 'success'
        },
        writer: {
            root: 'rows',
            type:   'json',
            encode: true //importante para enviar os dados com uma array
        }
    }
});