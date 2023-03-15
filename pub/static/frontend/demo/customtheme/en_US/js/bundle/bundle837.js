require.config({"config": {
        "jsbuild":{"jquery/ui-modules/i18n/datepicker-sk.js":"/* Slovak initialisation for the jQuery UI date picker plugin. */\n/* Written by Vojtech Rinik (vojto@hmm.sk). */\n( function( factory ) {\n\t\"use strict\";\n\n\tif ( typeof define === \"function\" && define.amd ) {\n\n\t\t// AMD. Register as an anonymous module.\n\t\tdefine( [ \"../widgets/datepicker\" ], factory );\n\t} else {\n\n\t\t// Browser globals\n\t\tfactory( jQuery.datepicker );\n\t}\n} )( function( datepicker ) {\n\"use strict\";\n\ndatepicker.regional.sk = {\n\tcloseText: \"Zavrie\u0165\",\n\tprevText: \"&#x3C;Predch\u00e1dzaj\u00faci\",\n\tnextText: \"Nasleduj\u00faci&#x3E;\",\n\tcurrentText: \"Dnes\",\n\tmonthNames: [ \"janu\u00e1r\", \"febru\u00e1r\", \"marec\", \"apr\u00edl\", \"m\u00e1j\", \"j\u00fan\",\n\t\"j\u00fal\", \"august\", \"september\", \"okt\u00f3ber\", \"november\", \"december\" ],\n\tmonthNamesShort: [ \"Jan\", \"Feb\", \"Mar\", \"Apr\", \"M\u00e1j\", \"J\u00fan\",\n\t\"J\u00fal\", \"Aug\", \"Sep\", \"Okt\", \"Nov\", \"Dec\" ],\n\tdayNames: [ \"nede\u013ea\", \"pondelok\", \"utorok\", \"streda\", \"\u0161tvrtok\", \"piatok\", \"sobota\" ],\n\tdayNamesShort: [ \"Ned\", \"Pon\", \"Uto\", \"Str\", \"\u0160tv\", \"Pia\", \"Sob\" ],\n\tdayNamesMin: [ \"Ne\", \"Po\", \"Ut\", \"St\", \"\u0160t\", \"Pia\", \"So\" ],\n\tweekHeader: \"Ty\",\n\tdateFormat: \"dd.mm.yy\",\n\tfirstDay: 1,\n\tisRTL: false,\n\tshowMonthAfterYear: false,\n\tyearSuffix: \"\" };\ndatepicker.setDefaults( datepicker.regional.sk );\n\nreturn datepicker.regional.sk;\n\n} );\n"}
}});