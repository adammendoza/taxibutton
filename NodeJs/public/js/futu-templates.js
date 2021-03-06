(function(futu, $, undefined) {

    futu.templates = {
	    find: function (selector) {
	        return $.trim($(selector).html());
	    },

	    render: function (template, values) {
	        return template.replace(/{{(\w+)}}/ig, function (match, p1) { return values[p1]; });
	    },

	    renderMany: function (template, valuesCollection, joinWith) {
	    	joinWith = joinWith || '';
	        return _.map(valuesCollection, function(x) {
	            return futu.templates.render(template, x);
	        }).join(joinWith);
	    }
	};

}(window.futu = window.futu || {}, jQuery));