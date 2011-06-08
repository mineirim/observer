Ext.require('Ext.window.MessageBox');
Ext.define('ExtZF.controller.Navigation', {
    extend: 'Ext.app.Controller',
     views: [
    'navigation.MyToolbar'
    ],
    constructor: function() {
            this.ref({
                    ref: 'viewport',
                    selector: 'viewport'
                },{
                    ref: 'ctnPrincipal',
                    selector: 'principal'
                });

            this.callParent(arguments);
	},
    init: function() {
        this.control(
        {
            'menuitem[action=loadController]': {
                click: this.loadController
            }
        });
    },
    loadController : function(a,b,c){
        var controller = this.getController(a.data),
                args = Array.prototype.slice.call(arguments, 1);
        
        //controller.init.apply(controller, args);
        var view ="",
                screen = Ext.getCmp('ctnPrincipal'),
                options;
        
            view = Ext.widget(a.createView)
        

        options = { single: true };

        // Call the controller init method when the view is rendered
        view.mon(view, 'render', function() {
                console.log('executing init on Controller ' + controller.id + ' passing: ', args);

                controller.init.apply(controller, args);
        }, this, options);

        // Remove the controller and destroy the view when the view component is deactivated
        
        view.mon(view, 'destroy', function(view) {
                console.log('removing controller ' + controller.id + ' & destroying controller ' + view.id);

                view.destroy();

               // Ext.destroy(this.application.controllers.remove(this));
        }, this, options);
        
        if(screen.down('panel')){
            //screen.remove(screen.down('panel'),true);
        }
        screen.add(view);
        screen.setActive(true,view);
        view.show();
    }

});