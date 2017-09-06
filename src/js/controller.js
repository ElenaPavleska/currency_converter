controller = {
    create : function(options) {

        var defaults = {
            $container: null,
            components: [],
            model: {}
        };

        var settings = $.extend(defaults, options);

        return {
            build: function (callbacks) {
                var component, i;
                settings.$container.empty();

                for (i in settings.components) {
                    component = settings.components[i];
                    component.build(settings.$container, settings.model);
                }
            },
            add: function (component) {

                if (component.build == undefined || component.getName == undefined) {
                    throw 'No defined build or getName methods for component';
                }

                settings.components.push(component);
            },
            getModel: function () {
                return settings.model;
            }
        };
    }
}