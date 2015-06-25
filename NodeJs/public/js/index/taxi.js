(function(futu, $, undefined) {
    futu.taxi = (function () {
        var instance;
        var config;
        var $frames;
        var orderNumber;
        var pressedCounterTimeoutObject;

        var showFrame = function (frameClass) {
            $frames.find('.frame').css('display', 'none');
            $frames.find('.frame.' + frameClass).css('display', 'table-cell');
        };

        var newStateFunctions = {
            'IDLE': function(t) {showFrame('idle');},
            'PRESSED': function(t) {
                var counter = (config.pressedTimeout / 1000).toFixed(0);

                var $counter = $frames.find('.frame.pressed .counter');
                $counter.text(counter);
                
                clearTimeout(pressedCounterTimeoutObject);
                pressedCounterTimeoutObject = setInterval(function() {
                    $counter.text(--counter);
                    if (counter == 0) {
                        clearTimeout(pressedCounterTimeoutObject);
                    };
                }, 1000);

                showFrame('pressed');
            },
            'QUICKIE': function(t) {showFrame('quickie');},
            'ORDERING_TAXI': function(t) {showFrame('ordering-taxi');},
            'AWAITING_TAXI': function(t) {
                orderNumber = t.parameters.orderNumber;
                showFrame('awaiting-taxi');
            },
            'TAXI_CONFIRMED': function(t) {
                var $frame = $frames.find('.frame.taxi-confirmed');
                $frame.find('.order-number').text(orderNumber);
                $frame.find('.taxi-number').text(t.parameters.taxiNumber);
                showFrame('taxi-confirmed');
            },
            'ALL_BUSY': function(t) {showFrame('all-busy');},
            'ORDER_FAILED': function(t) {showFrame('order-failed');}
        };

        function init() {
            return {
                start: function (options) {
                    config = options;

                    $frames = $('#taxi .frames');
                },
                transition: function (data) {
                    newStateFunctions[data.newState](data);
                }
            };
        };
         
        return {
            getInstance: function () {
                if (!instance)
                {
                    instance = init();
                }
                return instance;
            }
        };
    })();
}(window.futu = window.futu || {}, jQuery));