// Modelagem dos dados - utilizada no store
Ext.define('ExtZF.model.Usuarios', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nome', 'email','usuario','cargo_id','setor_id'],

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
    	simpleSortMode: true, 
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
            encode: true 
        }
    }
});