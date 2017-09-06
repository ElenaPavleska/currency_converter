function componentSelectbox(name, options){
    var
        map = options && options.map,
        TEMPLATE = options && options.template ? options.template :'componentSelectbox',
        model = {
            id: null,
            name: null,
            selectValue: null,
            componentClass: ''
        },
        events = {
            change: options && options.change
        };

    if (name == undefined) {
        throw 'Component name not defined';
    }


    model = $.extend(model, options && options.init);
    return {
        build: function ($container, formModel) {
            var $content;
            if (map) {
                model = $.extend(model, map(formModel));
            }
            $content = application.renderTemplate(TEMPLATE, model);
            $container.append($content);

            $(document).find('select#'+model.id+' option[value="'+model.selectValue+'"]').prop('selected', true);
            $(document).on('change','select#'+model.id,function(){
                model.selectValue = $(this).val();
                if(events.change) {
                    events.change(model.selectValue);
                }
            });
        },
        getName: function () {
            return name;
        },
        getData: function () {
            return model.selectValue;
        },
        addEvent: function(type, callback) {
            if(type == 'change') {
                events.change = callback;
            }
        }
    }
}

function componentInput(name, options) {
    var map = options && options.map,
        TEMPLATE = options && options.template ? options.template :'componentInput',
        model = {
            id: null,
            name: null,
            value: null,
            label: null,
            type: 'text',
            className: 'inputText',
            componentClassName: '',
            defaultValue: 1,
        },
        events = options && options.events;

    if (name == undefined) {
        throw 'Component name not defined';
    }

    model = $.extend(model, options && options.init);

    return {
        build: function ($container, formModel) {
            if (map) {
                model = $.extend(model, map(formModel));
            }

            var $content = application.renderTemplate(TEMPLATE, model);

            $container.append($content);

            for(var event in events) {
                $('input#'+model.id, $container).on(event, function(e){
                    e.preventDefault();
                    var inputField = $(this);
                    model.value = inputField.val();
                    callback = events[event];
                    callback(this, model.value);
                });
            }
        },
        getName: function () {
            return name;
        },
        getData: function(){
            return model.value;
        }
    }
}

function componentButton(name, options) {
    var
        map = options && options.map,
        TEMPLATE = options && options.template ? options.template :'componentButton',
        model = {
            id : options && options.id ? options.id : '',
            label : '',
            className : options && options.className ? options.className : 'button'
        }
        ;
    model = $.extend(model, options && options.init);
    return {
        getName: function() {
            return name;
        },
        build: function($container, formModel) {
            var $content;

            $content = application.renderTemplate(TEMPLATE, model);

            $(document).on('click','button#'+model.id,function(e){
                if(options && options.click) {
                    options.click(e);
                }
            });

            $container.append($content);
        },
        addEvent: function(type, callback) {
            if(type == 'click') {
                options.click = callback;
            }
        }
    }
}