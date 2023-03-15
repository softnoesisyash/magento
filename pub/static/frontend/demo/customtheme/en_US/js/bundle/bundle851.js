require.config({"config": {
        "jsbuild":{"jquery/ui-modules/i18n/datepicker-hr.js":"/* Croatian i18n for the jQuery UI date picker plugin. */\n/* Written by Vjekoslav Nesek. */\n( function( factory ) {\n\t\"use strict\";\n\n\tif ( typeof define === \"function\" && define.amd ) {\n\n\t\t// AMD. Register as an anonymous module.\n\t\tdefine( [ \"../widgets/datepicker\" ], factory );\n\t} else {\n\n\t\t// Browser globals\n\t\tfactory( jQuery.datepicker );\n\t}\n} )( function( datepicker ) {\n\"use strict\";\n\ndatepicker.regional.hr = {\n\tcloseText: \"Zatvori\",\n\tprevText: \"&#x3C;\",\n\tnextText: \"&#x3E;\",\n\tcurrentText: \"Danas\",\n\tmonthNames: [ \"Sije\u010danj\", \"Velja\u010da\", \"O\u017eujak\", \"Travanj\", \"Svibanj\", \"Lipanj\",\n\t\"Srpanj\", \"Kolovoz\", \"Rujan\", \"Listopad\", \"Studeni\", \"Prosinac\" ],\n\tmonthNamesShort: [ \"Sij\", \"Velj\", \"O\u017eu\", \"Tra\", \"Svi\", \"Lip\",\n\t\"Srp\", \"Kol\", \"Ruj\", \"Lis\", \"Stu\", \"Pro\" ],\n\tdayNames: [ \"Nedjelja\", \"Ponedjeljak\", \"Utorak\", \"Srijeda\", \"\u010cetvrtak\", \"Petak\", \"Subota\" ],\n\tdayNamesShort: [ \"Ned\", \"Pon\", \"Uto\", \"Sri\", \"\u010cet\", \"Pet\", \"Sub\" ],\n\tdayNamesMin: [ \"Ne\", \"Po\", \"Ut\", \"Sr\", \"\u010ce\", \"Pe\", \"Su\" ],\n\tweekHeader: \"Tje\",\n\tdateFormat: \"dd.mm.yy.\",\n\tfirstDay: 1,\n\tisRTL: false,\n\tshowMonthAfterYear: false,\n\tyearSuffix: \"\" };\ndatepicker.setDefaults( datepicker.regional.hr );\n\nreturn datepicker.regional.hr;\n\n} );\n"}
}});