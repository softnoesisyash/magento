require.config({"config": {
        "jsbuild":{"jquery/ui-modules/i18n/datepicker-bs.js":"/* Bosnian i18n for the jQuery UI date picker plugin. */\n/* Written by Kenan Konjo. */\n( function( factory ) {\n\t\"use strict\";\n\n\tif ( typeof define === \"function\" && define.amd ) {\n\n\t\t// AMD. Register as an anonymous module.\n\t\tdefine( [ \"../widgets/datepicker\" ], factory );\n\t} else {\n\n\t\t// Browser globals\n\t\tfactory( jQuery.datepicker );\n\t}\n} )( function( datepicker ) {\n\"use strict\";\n\ndatepicker.regional.bs = {\n\tcloseText: \"Zatvori\",\n\tprevText: \"&#x3C;\",\n\tnextText: \"&#x3E;\",\n\tcurrentText: \"Danas\",\n\tmonthNames: [ \"Januar\", \"Februar\", \"Mart\", \"April\", \"Maj\", \"Juni\",\n\t\"Juli\", \"August\", \"Septembar\", \"Oktobar\", \"Novembar\", \"Decembar\" ],\n\tmonthNamesShort: [ \"Jan\", \"Feb\", \"Mar\", \"Apr\", \"Maj\", \"Jun\",\n\t\"Jul\", \"Aug\", \"Sep\", \"Okt\", \"Nov\", \"Dec\" ],\n\tdayNames: [ \"Nedelja\", \"Ponedeljak\", \"Utorak\", \"Srijeda\", \"\u010cetvrtak\", \"Petak\", \"Subota\" ],\n\tdayNamesShort: [ \"Ned\", \"Pon\", \"Uto\", \"Sri\", \"\u010cet\", \"Pet\", \"Sub\" ],\n\tdayNamesMin: [ \"Ne\", \"Po\", \"Ut\", \"Sr\", \"\u010ce\", \"Pe\", \"Su\" ],\n\tweekHeader: \"Wk\",\n\tdateFormat: \"dd.mm.yy\",\n\tfirstDay: 1,\n\tisRTL: false,\n\tshowMonthAfterYear: false,\n\tyearSuffix: \"\" };\ndatepicker.setDefaults( datepicker.regional.bs );\n\nreturn datepicker.regional.bs;\n\n} );\n"}
}});