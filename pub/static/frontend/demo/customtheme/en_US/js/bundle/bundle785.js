require.config({"config": {
        "jsbuild":{"jquery/ui-modules/widgets/progressbar.js":"/*!\n * jQuery UI Progressbar 1.13.1\n * http://jqueryui.com\n *\n * Copyright jQuery Foundation and other contributors\n * Released under the MIT license.\n * http://jquery.org/license\n */\n\n//>>label: Progressbar\n//>>group: Widgets\n/* eslint-disable max-len */\n//>>description: Displays a status indicator for loading state, standard percentage, and other progress indicators.\n/* eslint-enable max-len */\n//>>docs: http://api.jqueryui.com/progressbar/\n//>>demos: http://jqueryui.com/progressbar/\n//>>css.structure: ../../themes/base/core.css\n//>>css.structure: ../../themes/base/progressbar.css\n//>>css.theme: ../../themes/base/theme.css\n\n( function( factory ) {\n\t\"use strict\";\n\n\tif ( typeof define === \"function\" && define.amd ) {\n\n\t\t// AMD. Register as an anonymous module.\n\t\tdefine( [\n\t\t\t\"jquery\",\n\t\t\t\"../version\",\n\t\t\t\"../widget\"\n\t\t], factory );\n\t} else {\n\n\t\t// Browser globals\n\t\tfactory( jQuery );\n\t}\n} )( function( $ ) {\n\"use strict\";\n\nreturn $.widget( \"ui.progressbar\", {\n\tversion: \"1.13.1\",\n\toptions: {\n\t\tclasses: {\n\t\t\t\"ui-progressbar\": \"ui-corner-all\",\n\t\t\t\"ui-progressbar-value\": \"ui-corner-left\",\n\t\t\t\"ui-progressbar-complete\": \"ui-corner-right\"\n\t\t},\n\t\tmax: 100,\n\t\tvalue: 0,\n\n\t\tchange: null,\n\t\tcomplete: null\n\t},\n\n\tmin: 0,\n\n\t_create: function() {\n\n\t\t// Constrain initial value\n\t\tthis.oldValue = this.options.value = this._constrainedValue();\n\n\t\tthis.element.attr( {\n\n\t\t\t// Only set static values; aria-valuenow and aria-valuemax are\n\t\t\t// set inside _refreshValue()\n\t\t\trole: \"progressbar\",\n\t\t\t\"aria-valuemin\": this.min\n\t\t} );\n\t\tthis._addClass( \"ui-progressbar\", \"ui-widget ui-widget-content\" );\n\n\t\tthis.valueDiv = $( \"<div>\" ).appendTo( this.element );\n\t\tthis._addClass( this.valueDiv, \"ui-progressbar-value\", \"ui-widget-header\" );\n\t\tthis._refreshValue();\n\t},\n\n\t_destroy: function() {\n\t\tthis.element.removeAttr( \"role aria-valuemin aria-valuemax aria-valuenow\" );\n\n\t\tthis.valueDiv.remove();\n\t},\n\n\tvalue: function( newValue ) {\n\t\tif ( newValue === undefined ) {\n\t\t\treturn this.options.value;\n\t\t}\n\n\t\tthis.options.value = this._constrainedValue( newValue );\n\t\tthis._refreshValue();\n\t},\n\n\t_constrainedValue: function( newValue ) {\n\t\tif ( newValue === undefined ) {\n\t\t\tnewValue = this.options.value;\n\t\t}\n\n\t\tthis.indeterminate = newValue === false;\n\n\t\t// Sanitize value\n\t\tif ( typeof newValue !== \"number\" ) {\n\t\t\tnewValue = 0;\n\t\t}\n\n\t\treturn this.indeterminate ? false :\n\t\t\tMath.min( this.options.max, Math.max( this.min, newValue ) );\n\t},\n\n\t_setOptions: function( options ) {\n\n\t\t// Ensure \"value\" option is set after other values (like max)\n\t\tvar value = options.value;\n\t\tdelete options.value;\n\n\t\tthis._super( options );\n\n\t\tthis.options.value = this._constrainedValue( value );\n\t\tthis._refreshValue();\n\t},\n\n\t_setOption: function( key, value ) {\n\t\tif ( key === \"max\" ) {\n\n\t\t\t// Don't allow a max less than min\n\t\t\tvalue = Math.max( this.min, value );\n\t\t}\n\t\tthis._super( key, value );\n\t},\n\n\t_setOptionDisabled: function( value ) {\n\t\tthis._super( value );\n\n\t\tthis.element.attr( \"aria-disabled\", value );\n\t\tthis._toggleClass( null, \"ui-state-disabled\", !!value );\n\t},\n\n\t_percentage: function() {\n\t\treturn this.indeterminate ?\n\t\t\t100 :\n\t\t\t100 * ( this.options.value - this.min ) / ( this.options.max - this.min );\n\t},\n\n\t_refreshValue: function() {\n\t\tvar value = this.options.value,\n\t\t\tpercentage = this._percentage();\n\n\t\tthis.valueDiv\n\t\t\t.toggle( this.indeterminate || value > this.min )\n\t\t\t.width( percentage.toFixed( 0 ) + \"%\" );\n\n\t\tthis\n\t\t\t._toggleClass( this.valueDiv, \"ui-progressbar-complete\", null,\n\t\t\t\tvalue === this.options.max )\n\t\t\t._toggleClass( \"ui-progressbar-indeterminate\", null, this.indeterminate );\n\n\t\tif ( this.indeterminate ) {\n\t\t\tthis.element.removeAttr( \"aria-valuenow\" );\n\t\t\tif ( !this.overlayDiv ) {\n\t\t\t\tthis.overlayDiv = $( \"<div>\" ).appendTo( this.valueDiv );\n\t\t\t\tthis._addClass( this.overlayDiv, \"ui-progressbar-overlay\" );\n\t\t\t}\n\t\t} else {\n\t\t\tthis.element.attr( {\n\t\t\t\t\"aria-valuemax\": this.options.max,\n\t\t\t\t\"aria-valuenow\": value\n\t\t\t} );\n\t\t\tif ( this.overlayDiv ) {\n\t\t\t\tthis.overlayDiv.remove();\n\t\t\t\tthis.overlayDiv = null;\n\t\t\t}\n\t\t}\n\n\t\tif ( this.oldValue !== value ) {\n\t\t\tthis.oldValue = value;\n\t\t\tthis._trigger( \"change\" );\n\t\t}\n\t\tif ( value === this.options.max ) {\n\t\t\tthis._trigger( \"complete\" );\n\t\t}\n\t}\n} );\n\n} );\n"}
}});