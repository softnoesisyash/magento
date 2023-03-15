(function ($) {

    $.fn.tableHeadFixer = function (param) {

        return this.each(function () {
            table.call(this);
        });

        function table() {

            {
                var defaults = {
                    left: 0,
                    'z-index': 0
                };

                var settings = $.extend({}, defaults, param);

                settings.table = this;
                settings.parent = $(settings.table).parent();
                setParent();





                if (settings.left > 0)
                    fixLeft();



                setCorner();

                $(settings.parent).trigger("scroll");

                $(window).resize(function () {
                    $(settings.parent).trigger("scroll");
                });




                function setCorner() {
                    var table = $(settings.table);

                    if (settings.head) {
                        if (settings.left > 0) {
                            var tr = table.find("thead tr");

                            tr.each(function (k, row) {
                                solverLeftColspan(row, function (cell) {
                                    $(cell).css("z-index", settings['z-index'] + 1);
                                });
                            });
                        }


                    }


                }


                function setParent() {
                    var parent = $(settings.parent);
                    var table = $(settings.table);

                    parent.append(table);
                    parent
                            .css({
                                'overflow-x': 'auto',
                                'overflow-y': 'auto'
                            });

                    parent.scroll(function () {
                        var scrollWidth = parent[0].scrollWidth;
                        var clientWidth = parent[0].clientWidth;
                        var scrollHeight = parent[0].scrollHeight;
                        var clientHeight = parent[0].clientHeight;
                        var top = parent.scrollTop();
                        var left = parent.scrollLeft();

                        if (settings.head)
                            this.find("thead tr > *").css("top", top);

                        if (settings.foot)
                            this.find("tfoot tr > *").css("bottom", scrollHeight - clientHeight - top);

                        if (settings.left > 0)
                            settings.leftColumns.css("left", left);

                        if (settings.right > 0)
                            settings.rightColumns.css("right", scrollWidth - clientWidth - left);
                    }.bind(table));
                }





                function fixLeft() {
                    var table = $(settings.table);



                    settings.leftColumns = $();

                    var tr = table.find("tr");
                    tr.each(function (k, row) {

                        solverLeftColspan(row, function (cell) {
                            settings.leftColumns = settings.leftColumns.add(cell);
                        });

                    });

                    var column = settings.leftColumns;

                    column.each(function (k, cell) {
                        var cell = $(cell);

                        setBackground(cell);
                        cell.css({
                            'position': 'relative'
                        });
                    });
                }


                function setBackground(elements) {
                    elements.each(function (k, element) {
                        var element = $(element);
                        var parent = $(element).parent();

                        var elementBackground = element.css("background-color");
                        elementBackground = (elementBackground == "transparent" || elementBackground == "rgba(0, 0, 0, 0)") ? null : elementBackground;

                        var parentBackground = parent.css("background-color");
                        parentBackground = (parentBackground == "transparent" || parentBackground == "rgba(0, 0, 0, 0)") ? null : parentBackground;

                        var background = parentBackground ? parentBackground : "gray";
                        background = elementBackground ? elementBackground : background;

                        element.css("background-color", background);
                    });
                }

                function solverLeftColspan(row, action) {
                    var fixColumn = settings.left;
                    var inc = 1;

                    for (var i = 1; i <= fixColumn; i = i + inc) {
                        var nth = inc > 1 ? i - 1 : i;

                        var cell = $(row).find("> *:nth-child(" + nth + ")");
                        var colspan = cell.prop("colspan");

                        if (cell.cellPos().left < fixColumn) {
                            action(cell);
                        }

                        inc = colspan;
                    }
                }


            }

        }




    };

})(jQuery);


(function ($) {
    function scanTable($table) {
        var m = [];
        $table.children("tr").each(function (y, row) {
            $(row).children("td, th").each(function (x, cell) {
                var $cell = $(cell),
                        cspan = $cell.attr("colspan") | 0,
                        rspan = $cell.attr("rowspan") | 0,
                        tx, ty;
                cspan = cspan ? cspan : 1;
                rspan = rspan ? rspan : 1;
                for (; m[y] && m[y][x]; ++x)
                    ;
                for (tx = x; tx < x + cspan; ++tx) {
                    for (ty = y; ty < y + rspan; ++ty) {
                        if (!m[ty]) {
                            m[ty] = [];
                        }
                        m[ty][tx] = true;
                    }
                }
                var pos = {top: y, left: x};
                $cell.data("cellPos", pos);
            });
        });
    }
    ;


    $.fn.cellPos = function (rescan) {
        var $cell = this.first(),
                pos = $cell.data("cellPos");
        if (!pos || rescan) {
            var $table = $cell.closest("table, thead, tbody");
            scanTable($table);
        }
        pos = $cell.data("cellPos");
        return pos;
    }
})(jQuery);