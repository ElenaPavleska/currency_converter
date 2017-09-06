convereter = (function() {

    var $container;

    var that = {
        init: function($converterContainer) {
            $container = $converterContainer;
            initComponents();
        }
    };

    var initComponents = function() {
        var that = {
            formModel: {
                leftCurrency: 'RSD',
                rightCurrency: 'EUR',
                leftValue: 1,
                rightValue: 1
            },
            init: function () {
                converterController = controller.create({
                    $container: $container,
                    model: that.formModel
                });

                converterController.add(new componentSelectbox('leftCurrencySelectBox', {
                    init: {
                        id: 'leftCurrencySelectBox',
                        name: 'leftCurrencySelectBox',
                        selectValue: converterController.getModel().leftCurrency,
                        options: {
                            RSD:'RSD',
                            EUR: 'EUR',
                            USD: 'USD'
                        },
                        componentClass: 'leftCurrencySelectBox'
                    },
                    change: function (value) {
                        converterController.getModel().leftCurrency = value;
                    }

                }));

                converterController.add(new componentInput('leftValue', {
                    init : {
                        id: 'leftValue',
                        type: 'number',
                        className: 'inputCurrencyNumberLeft'
                    },
                    map: function(model){
                        return {
                            value: model.leftValue
                        }
                    },
                    events: {
                        change: function (object, value) {
                            if(value == '') {
                                value = 0;
                            }
                            var changeCurrency = currencies[converterController.getModel().leftCurrency]['' + converterController.getModel().rightCurrency];
                            converterController.getModel().leftValue = value;
                            converterController.getModel().rightValue = parseFloat(value) * parseFloat(changeCurrency);

                            converterController.build();
                        }
                    }
                }));

                converterController.add(new componentButton('switch', {
                    init : {
                        id: 'switchButton',
                        className: 'switchButton'
                    },

                    click: function () {
                        var left = converterController.getModel().leftValue;
                        var right = converterController.getModel().rightValue;
                        converterController.getModel().leftValue = right;
                        converterController.getModel().rightValue = left;
                        converterController.build();
                    }
                }));

                converterController.add(new componentInput('rightValue', {
                    init : {
                        id: 'rightValue',
                        type: 'number',
                        className: 'inputCurrencyNumberRight'
                    },
                    map: function(model){
                        return {
                            value: model.rightValue
                        }
                    },
                    events: {
                        change: function (object, value) {
                            if(value == '') {
                                value = 0;
                            }
                            var changeCurrency = currencies[converterController.getModel().rightCurrency]['' + converterController.getModel().leftCurrency];
                            converterController.getModel().rightValue = value;

                            converterController.getModel().leftValue = parseFloat(value) * parseFloat(changeCurrency);

                            converterController.build();
                        }
                    }
                }));

                converterController.add(new componentSelectbox('rightSelectBox', {
                    init: {
                        id: 'rightSelectBox',
                        name: 'rightSelectBox',
                        width: '200px',
                        selectValue: converterController.getModel().rightCurrency,
                        options: {
                            RSD:'RSD',
                            EUR: 'EUR',
                            USD: 'USD'
                        },
                        componentClass: 'rightCurrencySelectBox'
                    },
                    change: function (value) {
                        converterController.getModel().rightCurrency = value;
                    }

                }));

                converterController.add(new componentButton('reset', {
                    init : {
                        id: 'resetButton',
                        className: 'resetButton',
                        label: 'Reset'
                    },

                    click: function () {
                        converterController.getModel().leftValue = 1;
                        converterController.getModel().rightValue = 1;
                        converterController.build();
                    }
                }));

                converterController.build();
            }
        };

        that.init();
    };

    return that;
})();