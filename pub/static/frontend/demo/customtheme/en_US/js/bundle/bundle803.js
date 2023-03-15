require.config({"config": {
        "jsbuild":{"jquery/ui-modules/i18n/datepicker-ta.js":"/* Tamil (UTF-8) initialisation for the jQuery UI date picker plugin. */\n/* Written by S A Sureshkumar (saskumar@live.com). */\n( function( factory ) {\n\t\"use strict\";\n\n\tif ( typeof define === \"function\" && define.amd ) {\n\n\t\t// AMD. Register as an anonymous module.\n\t\tdefine( [ \"../widgets/datepicker\" ], factory );\n\t} else {\n\n\t\t// Browser globals\n\t\tfactory( jQuery.datepicker );\n\t}\n} )( function( datepicker ) {\n\"use strict\";\n\ndatepicker.regional.ta = {\n\tcloseText: \"\u0bae\u0bc2\u0b9f\u0bc1\",\n\tprevText: \"\u0bae\u0bc1\u0ba9\u0bcd\u0ba9\u0bc8\u0baf\u0ba4\u0bc1\",\n\tnextText: \"\u0b85\u0b9f\u0bc1\u0ba4\u0bcd\u0ba4\u0ba4\u0bc1\",\n\tcurrentText: \"\u0b87\u0ba9\u0bcd\u0bb1\u0bc1\",\n\tmonthNames: [ \"\u0ba4\u0bc8\", \"\u0bae\u0bbe\u0b9a\u0bbf\", \"\u0baa\u0b99\u0bcd\u0b95\u0bc1\u0ba9\u0bbf\", \"\u0b9a\u0bbf\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bc8\", \"\u0bb5\u0bc8\u0b95\u0bbe\u0b9a\u0bbf\", \"\u0b86\u0ba9\u0bbf\",\n\t\"\u0b86\u0b9f\u0bbf\", \"\u0b86\u0bb5\u0ba3\u0bbf\", \"\u0baa\u0bc1\u0bb0\u0b9f\u0bcd\u0b9f\u0bbe\u0b9a\u0bbf\", \"\u0b90\u0baa\u0bcd\u0baa\u0b9a\u0bbf\", \"\u0b95\u0bbe\u0bb0\u0bcd\u0ba4\u0bcd\u0ba4\u0bbf\u0b95\u0bc8\", \"\u0bae\u0bbe\u0bb0\u0bcd\u0b95\u0bb4\u0bbf\" ],\n\tmonthNamesShort: [ \"\u0ba4\u0bc8\", \"\u0bae\u0bbe\u0b9a\u0bbf\", \"\u0baa\u0b99\u0bcd\", \"\u0b9a\u0bbf\u0ba4\u0bcd\", \"\u0bb5\u0bc8\u0b95\u0bbe\", \"\u0b86\u0ba9\u0bbf\",\n\t\"\u0b86\u0b9f\u0bbf\", \"\u0b86\u0bb5\", \"\u0baa\u0bc1\u0bb0\", \"\u0b90\u0baa\u0bcd\", \"\u0b95\u0bbe\u0bb0\u0bcd\", \"\u0bae\u0bbe\u0bb0\u0bcd\" ],\n\tdayNames: [\n\t\t\"\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bcd\u0bb1\u0bc1\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8\",\n\t\t\"\u0ba4\u0bbf\u0b99\u0bcd\u0b95\u0b9f\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8\",\n\t\t\"\u0b9a\u0bc6\u0bb5\u0bcd\u0bb5\u0bbe\u0baf\u0bcd\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8\",\n\t\t\"\u0baa\u0bc1\u0ba4\u0ba9\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8\",\n\t\t\"\u0bb5\u0bbf\u0baf\u0bbe\u0bb4\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8\",\n\t\t\"\u0bb5\u0bc6\u0bb3\u0bcd\u0bb3\u0bbf\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8\",\n\t\t\"\u0b9a\u0ba9\u0bbf\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8\"\n\t],\n\tdayNamesShort: [\n\t\t\"\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bc1\",\n\t\t\"\u0ba4\u0bbf\u0b99\u0bcd\u0b95\u0bb3\u0bcd\",\n\t\t\"\u0b9a\u0bc6\u0bb5\u0bcd\u0bb5\u0bbe\u0baf\u0bcd\",\n\t\t\"\u0baa\u0bc1\u0ba4\u0ba9\u0bcd\",\n\t\t\"\u0bb5\u0bbf\u0baf\u0bbe\u0bb4\u0ba9\u0bcd\",\n\t\t\"\u0bb5\u0bc6\u0bb3\u0bcd\u0bb3\u0bbf\",\n\t\t\"\u0b9a\u0ba9\u0bbf\"\n\t],\n\tdayNamesMin: [ \"\u0b9e\u0bbe\", \"\u0ba4\u0bbf\", \"\u0b9a\u0bc6\", \"\u0baa\u0bc1\", \"\u0bb5\u0bbf\", \"\u0bb5\u0bc6\", \"\u0b9a\" ],\n\tweekHeader: \"\u041d\u0435\",\n\tdateFormat: \"dd/mm/yy\",\n\tfirstDay: 1,\n\tisRTL: false,\n\tshowMonthAfterYear: false,\n\tyearSuffix: \"\" };\ndatepicker.setDefaults( datepicker.regional.ta );\n\nreturn datepicker.regional.ta;\n\n} );\n"}
}});