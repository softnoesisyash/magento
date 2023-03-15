require.config({"config": {
        "jsbuild":{"jquery/ui-modules/i18n/datepicker-eo.js":"/* Esperanto initialisation for the jQuery UI date picker plugin. */\n/* Written by Olivier M. (olivierweb@ifrance.com). */\n( function( factory ) {\n\t\"use strict\";\n\n\tif ( typeof define === \"function\" && define.amd ) {\n\n\t\t// AMD. Register as an anonymous module.\n\t\tdefine( [ \"../widgets/datepicker\" ], factory );\n\t} else {\n\n\t\t// Browser globals\n\t\tfactory( jQuery.datepicker );\n\t}\n} )( function( datepicker ) {\n\"use strict\";\n\ndatepicker.regional.eo = {\n\tcloseText: \"Fermi\",\n\tprevText: \"&#x3C;Anta\",\n\tnextText: \"Sekv&#x3E;\",\n\tcurrentText: \"Nuna\",\n\tmonthNames: [ \"Januaro\", \"Februaro\", \"Marto\", \"Aprilo\", \"Majo\", \"Junio\",\n\t\"Julio\", \"A\u016dgusto\", \"Septembro\", \"Oktobro\", \"Novembro\", \"Decembro\" ],\n\tmonthNamesShort: [ \"Jan\", \"Feb\", \"Mar\", \"Apr\", \"Maj\", \"Jun\",\n\t\"Jul\", \"A\u016dg\", \"Sep\", \"Okt\", \"Nov\", \"Dec\" ],\n\tdayNames: [ \"Diman\u0109o\", \"Lundo\", \"Mardo\", \"Merkredo\", \"\u0134a\u016ddo\", \"Vendredo\", \"Sabato\" ],\n\tdayNamesShort: [ \"Dim\", \"Lun\", \"Mar\", \"Mer\", \"\u0134a\u016d\", \"Ven\", \"Sab\" ],\n\tdayNamesMin: [ \"Di\", \"Lu\", \"Ma\", \"Me\", \"\u0134a\", \"Ve\", \"Sa\" ],\n\tweekHeader: \"Sb\",\n\tdateFormat: \"dd/mm/yy\",\n\tfirstDay: 0,\n\tisRTL: false,\n\tshowMonthAfterYear: false,\n\tyearSuffix: \"\" };\ndatepicker.setDefaults( datepicker.regional.eo );\n\nreturn datepicker.regional.eo;\n\n} );\n"}
}});