var application = (function () {
    var that = {

        version: false,
        templateCache: {},

        init: function (options) {
        },

        renderTemplate: function(templateId, data) {
            return that.template.renderHandlebarsTemplate(templateId, data);
        },

        template: {
            renderHandlebarsTemplate: function(templateId, data) {
                var theTemplateScript = $("#"+templateId).html();
                Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
                    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
                });
                var theTemplate = Handlebars.compile (theTemplateScript);

                return theTemplate(data);
            },

            include: function (templates) {
                if (!(templates instanceof Array)) {
                    templates = [templates];
                }
                var templatesContainer = $('#handlebars-templates');
                if (!templatesContainer.length) {
                    templatesContainer = $('<div id="handlebars-templates"></div>');
                    $('body').append(templatesContainer);
                }

                for (var i = 0; i < templates.length; i++) {
                    var url = 'templates/'+ templates[i] + '.html';
                    if (!$('div[data-source="' + templates[i] + '"]').length) {
                        $.ajax({
                            url: url,
                            async: false
                        }).done(function (data) {
                            var includeTemplatesContainer = $('<div data-source="' + templates[i] + '"></div>');
                            templatesContainer.append(includeTemplatesContainer);
                            includeTemplatesContainer.append(data);
                        });
                    }
                }
            }
        }
    };

    return that;

}());
