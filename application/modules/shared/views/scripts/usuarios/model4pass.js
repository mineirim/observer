// Modelagem dos dados - utilizada no store
Ext.define('ExtZF.model.usuarios.Model4pass', {
    extend: 'Ext.data.Model',
    fields: ['id','usuario','senha'],

    validations: [{
        type: 'length',
        field: 'senha',
        min: 4
    }],
    proxy: {
    	simpleSortMode: true, 
        type: 'rest',
        url :   'data/usuarios',
        totalProperty: 'total',
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