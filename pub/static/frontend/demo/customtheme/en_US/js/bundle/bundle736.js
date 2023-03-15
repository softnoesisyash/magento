require.config({"config": {
        "jsbuild":{"jquery/ui-modules/disable-selection.js":"/*!\n * jQuery UI Disable Selection 1.13.1\n * http://jqueryui.com\n *\n * Copyright jQuery Foundation and other contributors\n * Released under the MIT license.\n * http://jquery.org/license\n */\n\n//>>label: disableSelection\n//>>group: Core\n//>>description: Disable selection of text content within the set of matched elements.\n//>>docs: http://api.jqueryui.com/disableSelection/\n\n// This file is deprecated\n( function( factory ) {\n\t\"use strict\";\n\n\tif ( typeof define === \"function\" && define.amd ) {\n\n\t\t// AMD. Register as an anonymous module.\n\t\tdefine( [ \"jquery\", \"./version\" ], factory );\n\t} else {\n\n\t\t// Browser globals\n\t\tfactory( jQuery );\n\t}\n} )( function( $ ) {\n\"use strict\";\n\nreturn $.fn.extend( {\n\tdisableSelection: ( function() {\n\t\tvar eventType = \"onselectstart\" in document.createElement( \"div\" ) ?\n\t\t\t\"selectstart\" :\n\t\t\t\"mousedown\";\n\n\t\treturn function() {\n\t\t\treturn this.on( eventType + \".ui-disableSelection\", function( event ) {\n\t\t\t\tevent.preventDefault();\n\t\t\t} );\n\t\t};\n\t} )(),\n\n\tenableSelection: function() {\n\t\treturn this.off( \".ui-disableSelection\" );\n\t}\n} );\n\n} );\n"}
}});