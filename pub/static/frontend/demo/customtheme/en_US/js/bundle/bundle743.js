require.config({"config": {
        "jsbuild":{"jquery/ui-modules/safe-active-element.js":"( function( factory ) {\n\t\"use strict\";\n\n\tif ( typeof define === \"function\" && define.amd ) {\n\n\t\t// AMD. Register as an anonymous module.\n\t\tdefine( [ \"jquery\", \"./version\" ], factory );\n\t} else {\n\n\t\t// Browser globals\n\t\tfactory( jQuery );\n\t}\n} )( function( $ ) {\n\"use strict\";\n\nreturn $.ui.safeActiveElement = function( document ) {\n\tvar activeElement;\n\n\t// Support: IE 9 only\n\t// IE9 throws an \"Unspecified error\" accessing document.activeElement from an <iframe>\n\ttry {\n\t\tactiveElement = document.activeElement;\n\t} catch ( error ) {\n\t\tactiveElement = document.body;\n\t}\n\n\t// Support: IE 9 - 11 only\n\t// IE may return null instead of an element\n\t// Interestingly, this only seems to occur when NOT in an iframe\n\tif ( !activeElement ) {\n\t\tactiveElement = document.body;\n\t}\n\n\t// Support: IE 11 only\n\t// IE11 returns a seemingly empty object in some cases when accessing\n\t// document.activeElement from an <iframe>\n\tif ( !activeElement.nodeName ) {\n\t\tactiveElement = document.body;\n\t}\n\n\treturn activeElement;\n};\n\n} );\n"}
}});