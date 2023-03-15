require.config({"config": {
        "jsbuild":{"jquery/ui-modules/i18n/datepicker-pl.js":"/* Polish initialisation for the jQuery UI date picker plugin. */\n/* Written by Jacek Wysocki (jacek.wysocki@gmail.com). */\n( function( factory ) {\n\t\"use strict\";\n\n\tif ( typeof define === \"function\" && define.amd ) {\n\n\t\t// AMD. Register as an anonymous module.\n\t\tdefine( [ \"../widgets/datepicker\" ], factory );\n\t} else {\n\n\t\t// Browser globals\n\t\tfactory( jQuery.datepicker );\n\t}\n} )( function( datepicker ) {\n\"use strict\";\n\ndatepicker.regional.pl = {\n\tcloseText: \"Zamknij\",\n\tprevText: \"&#x3C;Poprzedni\",\n\tnextText: \"Nast\u0119pny&#x3E;\",\n\tcurrentText: \"Dzi\u015b\",\n\tmonthNames: [ \"Stycze\u0144\", \"Luty\", \"Marzec\", \"Kwiecie\u0144\", \"Maj\", \"Czerwiec\",\n\t\"Lipiec\", \"Sierpie\u0144\", \"Wrzesie\u0144\", \"Pa\u017adziernik\", \"Listopad\", \"Grudzie\u0144\" ],\n\tmonthNamesShort: [ \"Sty\", \"Lu\", \"Mar\", \"Kw\", \"Maj\", \"Cze\",\n\t\"Lip\", \"Sie\", \"Wrz\", \"Pa\", \"Lis\", \"Gru\" ],\n\tdayNames: [ \"Niedziela\", \"Poniedzia\u0142ek\", \"Wtorek\", \"\u015aroda\", \"Czwartek\", \"Pi\u0105tek\", \"Sobota\" ],\n\tdayNamesShort: [ \"Nie\", \"Pn\", \"Wt\", \"\u015ar\", \"Czw\", \"Pt\", \"So\" ],\n\tdayNamesMin: [ \"N\", \"Pn\", \"Wt\", \"\u015ar\", \"Cz\", \"Pt\", \"So\" ],\n\tweekHeader: \"Tydz\",\n\tdateFormat: \"dd.mm.yy\",\n\tfirstDay: 1,\n\tisRTL: false,\n\tshowMonthAfterYear: false,\n\tyearSuffix: \"\" };\ndatepicker.setDefaults( datepicker.regional.pl );\n\nreturn datepicker.regional.pl;\n\n} );\n"}
}});