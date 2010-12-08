var fitText = function(container) {
    var height = container.height();
    var origText = $.trim(container.text());
    var text = origText.split(' ');
    var joinText = function() { return text.join(' ') + '...'; }
    var sensor = container.clone().empty().css({ display: 'block',
                                                 visibility: 'hidden',
                                                 position: 'absolute',
                                                 width: container.width() + 'px',
                                                 height: 'auto',
                                                 'max-height': '1000px',
                                                 left: 0,
                                                 top: 0 });

    container.after(sensor);
    sensor.text(origText);

    while (sensor.height() > height) {
        text.pop();
        sensor.text(joinText());
    };

    var ret = sensor.text();
    sensor.remove();

    if (ret != origText) { container.attr('title', origText); }

    return ret;
};

$.fn.textOverflow = function(options) {
    options = $.extend({ multiline: false }, options || {});

    $(this).each(function() {
        if (options.multiline) {
            this.text(fitText(this));
        } else {
            this.
                css({ 'white-space': 'nowrap',
                      'overflow': 'hidden',
                      'text-overflow': 'ellipsis' }).
                attr('title', this.text());
        }
    });
};
