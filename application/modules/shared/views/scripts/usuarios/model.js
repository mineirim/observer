// Modelagem dos dados - utilizada no store
Ext.define('ExtZF.model.Usuarios', {
    extend: 'Ext.data.Model',
    fields: ['id', 
            'nome', 
            'email',
            {name : 'usuario', type: 'string'},
            {name: 'cargo_id', type: 'int', useNull:true},
            {name: 'setor_id', type: 'int', useNull:true},
            {name: 'is_su', type: 'boolean', useNull:true}],

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