require.config({"config": {
        "jsbuild":{"jquery/ui-modules/i18n/datepicker-ka.js":"/* Georgian (UTF-8) initialisation for the jQuery UI date picker plugin. */\n/* Written by Lado Lomidze (lado.lomidze@gmail.com). */\n( function( factory ) {\n\t\"use strict\";\n\n\tif ( typeof define === \"function\" && define.amd ) {\n\n\t\t// AMD. Register as an anonymous module.\n\t\tdefine( [ \"../widgets/datepicker\" ], factory );\n\t} else {\n\n\t\t// Browser globals\n\t\tfactory( jQuery.datepicker );\n\t}\n} )( function( datepicker ) {\n\"use strict\";\n\ndatepicker.regional.ka = {\n\tcloseText: \"\u10d3\u10d0\u10ee\u10e3\u10e0\u10d5\u10d0\",\n\tprevText: \"&#x3c; \u10ec\u10d8\u10dc\u10d0\",\n\tnextText: \"\u10e8\u10d4\u10db\u10d3\u10d4\u10d2\u10d8 &#x3e;\",\n\tcurrentText: \"\u10d3\u10e6\u10d4\u10e1\",\n\tmonthNames: [\n\t\t\"\u10d8\u10d0\u10dc\u10d5\u10d0\u10e0\u10d8\",\n\t\t\"\u10d7\u10d4\u10d1\u10d4\u10e0\u10d5\u10d0\u10da\u10d8\",\n\t\t\"\u10db\u10d0\u10e0\u10e2\u10d8\",\n\t\t\"\u10d0\u10de\u10e0\u10d8\u10da\u10d8\",\n\t\t\"\u10db\u10d0\u10d8\u10e1\u10d8\",\n\t\t\"\u10d8\u10d5\u10dc\u10d8\u10e1\u10d8\",\n\t\t\"\u10d8\u10d5\u10da\u10d8\u10e1\u10d8\",\n\t\t\"\u10d0\u10d2\u10d5\u10d8\u10e1\u10e2\u10dd\",\n\t\t\"\u10e1\u10d4\u10e5\u10e2\u10d4\u10db\u10d1\u10d4\u10e0\u10d8\",\n\t\t\"\u10dd\u10e5\u10e2\u10dd\u10db\u10d1\u10d4\u10e0\u10d8\",\n\t\t\"\u10dc\u10dd\u10d4\u10db\u10d1\u10d4\u10e0\u10d8\",\n\t\t\"\u10d3\u10d4\u10d9\u10d4\u10db\u10d1\u10d4\u10e0\u10d8\"\n\t],\n\tmonthNamesShort: [ \"\u10d8\u10d0\u10dc\", \"\u10d7\u10d4\u10d1\", \"\u10db\u10d0\u10e0\", \"\u10d0\u10de\u10e0\", \"\u10db\u10d0\u10d8\", \"\u10d8\u10d5\u10dc\", \"\u10d8\u10d5\u10da\", \"\u10d0\u10d2\u10d5\", \"\u10e1\u10d4\u10e5\", \"\u10dd\u10e5\u10e2\", \"\u10dc\u10dd\u10d4\", \"\u10d3\u10d4\u10d9\" ],\n\tdayNames: [ \"\u10d9\u10d5\u10d8\u10e0\u10d0\", \"\u10dd\u10e0\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8\", \"\u10e1\u10d0\u10db\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8\", \"\u10dd\u10d7\u10ee\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8\", \"\u10ee\u10e3\u10d7\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8\", \"\u10de\u10d0\u10e0\u10d0\u10e1\u10d9\u10d4\u10d5\u10d8\", \"\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8\" ],\n\tdayNamesShort: [ \"\u10d9\u10d5\", \"\u10dd\u10e0\u10e8\", \"\u10e1\u10d0\u10db\", \"\u10dd\u10d7\u10ee\", \"\u10ee\u10e3\u10d7\", \"\u10de\u10d0\u10e0\", \"\u10e8\u10d0\u10d1\" ],\n\tdayNamesMin: [ \"\u10d9\u10d5\", \"\u10dd\u10e0\u10e8\", \"\u10e1\u10d0\u10db\", \"\u10dd\u10d7\u10ee\", \"\u10ee\u10e3\u10d7\", \"\u10de\u10d0\u10e0\", \"\u10e8\u10d0\u10d1\" ],\n\tweekHeader: \"\u10d9\u10d5\u10d8\u10e0\u10d0\",\n\tdateFormat: \"dd-mm-yy\",\n\tfirstDay: 1,\n\tisRTL: false,\n\tshowMonthAfterYear: false,\n\tyearSuffix: \"\" };\ndatepicker.setDefaults( datepicker.regional.ka );\n\nreturn datepicker.regional.ka;\n\n} );\n"}
}});