require.config({"config": {
        "jsbuild":{"jquery/ui-modules/i18n/datepicker-es.js":"/* Inicializaci\u00f3n en espa\u00f1ol para la extensi\u00f3n 'UI date picker' para jQuery. */\n/* Traducido por Vester (xvester@gmail.com). */\n( function( factory ) {\n\t\"use strict\";\n\n\tif ( typeof define === \"function\" && define.amd ) {\n\n\t\t// AMD. Register as an anonymous module.\n\t\tdefine( [ \"../widgets/datepicker\" ], factory );\n\t} else {\n\n\t\t// Browser globals\n\t\tfactory( jQuery.datepicker );\n\t}\n} )( function( datepicker ) {\n\"use strict\";\n\ndatepicker.regional.es = {\n\tcloseText: \"Cerrar\",\n\tprevText: \"&#x3C;Ant\",\n\tnextText: \"Sig&#x3E;\",\n\tcurrentText: \"Hoy\",\n\tmonthNames: [ \"enero\", \"febrero\", \"marzo\", \"abril\", \"mayo\", \"junio\",\n\t\"julio\", \"agosto\", \"septiembre\", \"octubre\", \"noviembre\", \"diciembre\" ],\n\tmonthNamesShort: [ \"ene\", \"feb\", \"mar\", \"abr\", \"may\", \"jun\",\n\t\"jul\", \"ago\", \"sep\", \"oct\", \"nov\", \"dic\" ],\n\tdayNames: [ \"domingo\", \"lunes\", \"martes\", \"mi\u00e9rcoles\", \"jueves\", \"viernes\", \"s\u00e1bado\" ],\n\tdayNamesShort: [ \"dom\", \"lun\", \"mar\", \"mi\u00e9\", \"jue\", \"vie\", \"s\u00e1b\" ],\n\tdayNamesMin: [ \"D\", \"L\", \"M\", \"X\", \"J\", \"V\", \"S\" ],\n\tweekHeader: \"Sm\",\n\tdateFormat: \"dd/mm/yy\",\n\tfirstDay: 1,\n\tisRTL: false,\n\tshowMonthAfterYear: false,\n\tyearSuffix: \"\" };\ndatepicker.setDefaults( datepicker.regional.es );\n\nreturn datepicker.regional.es;\n\n} );\n"}
}});