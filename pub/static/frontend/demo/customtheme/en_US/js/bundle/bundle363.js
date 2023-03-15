require.config({"config": {
        "jsbuild":{"mage/backend/tree-suggest.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n\ndefine([\n    'jquery',\n    'jquery/ui',\n    'jquery/jstree/jquery.jstree',\n    'mage/backend/suggest'\n], function ($) {\n    'use strict';\n\n    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */\n    var hover_node, dehover_node, select_node, init;\n\n    $.extend(true, $, {\n        // @TODO: Move method 'treeToList' in file with utility functions\n        mage: {\n            /**\n             * @param {Array} list\n             * @param {Object} nodes\n             * @param {*} level\n             * @param {*} path\n             * @return {*}\n             */\n            treeToList: function (list, nodes, level, path) {\n                $.each(nodes, function () {\n                    if (typeof this === 'object') {\n                        list.push({\n                            label: this.label,\n                            id: this.id,\n                            level: level,\n                            item: this,\n                            path: path + this.label\n                        });\n\n                        if (this.children) {\n                            $.mage.treeToList(list, this.children, level + 1, path + this.label + ' / ');\n                        }\n                    }\n                });\n\n                return list;\n            }\n        }\n    });\n\n    hover_node = $.jstree.core.prototype.hover_node;\n    dehover_node = $.jstree.core.prototype.dehover_node;\n    select_node = $.jstree.core.prototype.select_node;\n    init = $.jstree.core.prototype.init;\n\n    $.extend(true, $.jstree.core.prototype, {\n        /**\n         * @override\n         */\n        init: function () {\n            this.get_container()\n                .show()\n                .on('keydown', $.proxy(function (e) {\n                    var o;\n\n                    if (e.keyCode === $.ui.keyCode.ENTER) {\n                        o = this.data.ui.hovered || this.data.ui.last_selected || -1;\n                        this.select_node(o, true);\n                    }\n                }, this));\n            init.call(this);\n        },\n\n        /**\n         * @override\n         */\n        hover_node: function (obj) {\n            hover_node.apply(this, arguments);\n            obj = this._get_node(obj);\n\n            if (!obj.length) {\n                return false;\n            }\n            this.get_container().trigger('hover_node', [{\n                item: obj.find('a:first')\n            }]);\n        },\n\n        /**\n         * @override\n         */\n        dehover_node: function () {\n            dehover_node.call(this);\n            this.get_container().trigger('dehover_node');\n        },\n\n        /**\n         * @override\n         */\n        select_node: function (o) {\n            var node;\n\n            select_node.apply(this, arguments);\n            node = this._get_node(o);\n\n            (node ? $(node) : this.data.ui.last_selected)\n                .trigger('select_tree_node');\n        }\n    });\n\n    $.widget('mage.treeSuggest', $.mage.suggest, {\n        widgetEventPrefix: 'suggest',\n        options: {\n            template:\n                '<% if (data.items.length) { %>' +\n                    '<% if (data.allShown()) { %>' +\n                        '<% if (typeof data.nested === \"undefined\") { %>' +\n                            '<div style=\"display:none;\" data-mage-init=\"{&quot;jstree&quot;:{&quot;plugins&quot;:[&quot;themes&quot;,&quot;html_data&quot;,&quot;ui&quot;,&quot;hotkeys&quot;],&quot;themes&quot;:{&quot;theme&quot;:&quot;default&quot;,&quot;dots&quot;:false,&quot;icons&quot;:false}}}\">' + //eslint-disable-line max-len\n                        '<% } %>' +\n                        '<ul>' +\n                            '<% _.each(data.items, function(value) { %>' +\n                                '<li class=\"<% if (data.itemSelected(value)) { %>mage-suggest-selected<% } %>' +\n                '                   <% if (value.is_active == 0) { %> mage-suggest-not-active<% } %>\">' +\n                                    '<a href=\"#\" <%= data.optionData(value) %>><%- value.label %></a>' +\n                                    '<% if (value.children && value.children.length) { %>' +\n                                        '<%= data.renderTreeLevel(value.children) %>' +\n                                    '<% } %>' +\n                                '</li>' +\n                            '<% }); %>' +\n                        '</ul>' +\n                        '<% if (typeof data.nested === \"undefined\") { %>' +\n                            '</div>' +\n                        '<% } %>' +\n                    '<% } else { %>' +\n                        '<ul data-mage-init=\"{&quot;menu&quot;:[]}\">' +\n                            '<% _.each(data.items, function(value) { %>' +\n                                '<% if (!data.itemSelected(value)) {%>' +\n                                    '<li <%= data.optionData(value) %>>' +\n                                        '<a href=\"#\">' +\n                                            '<span class=\"category-label\"><%- value.label %></span>' +\n                                            '<span class=\"category-path\"><%- value.path %></span>' +\n                                        '</a>' +\n                                    '</li>' +\n                                '<% } %>' +\n                            '<% }); %>' +\n                        '</ul>' +\n                    '<% } %>' +\n                '<% } else { %>' +\n                    '<span class=\"mage-suggest-no-records\"><%- data.noRecordsText %></span>' +\n                '<% } %>',\n            controls: {\n                selector: ':ui-menu, :mage-menu, .jstree',\n                eventsMap: {\n                    focus: ['menufocus', 'hover_node'],\n                    blur: ['menublur', 'dehover_node'],\n                    select: ['menuselect', 'select_tree_node']\n                }\n            }\n        },\n\n        /**\n         * @override\n         */\n        _bind: function () {\n            this._super();\n            this._on({\n                /**\n                 * @param {jQuery.Event} event\n                 */\n                keydown: function (event) {\n                    var keyCode = $.ui.keyCode;\n\n                    switch (event.keyCode) {\n                        case keyCode.LEFT:\n                        case keyCode.RIGHT:\n\n                            if (this.isDropdownShown()) {\n                                event.preventDefault();\n                                this._proxyEvents(event);\n                            }\n                            break;\n                    }\n                }\n            });\n        },\n\n        /**\n         * @override\n         */\n        close: function (e) {\n            var eType = e ? e.type : null;\n\n            if (eType === 'select_tree_node') {\n                this.element.focus();\n            } else {\n                this._superApply(arguments);\n            }\n        },\n\n        /**\n         * @override\n         */\n        _filterSelected: function (items, context) {\n            if (context._allShown) {\n                return items;\n            }\n\n            return this._superApply(arguments);\n        },\n\n        /**\n         * @override\n         */\n        _prepareDropdownContext: function () {\n            var context = this._superApply(arguments),\n                optionData = context.optionData,\n                templates = this.templates,\n                tmplName = this.templateName;\n\n            /**\n             * @param {Object} item\n             * @return {*|String}\n             */\n            context.optionData = function (item) {\n                item = $.extend({}, item);\n                delete item.children;\n\n                return optionData(item);\n            };\n\n            return $.extend(context, {\n                /**\n                 * @param {*} children\n                 * @return {*|jQuery}\n                 */\n                renderTreeLevel: function (children) {\n                    var _context = $.extend({}, this, {\n                        items: children,\n                        nested: true\n                    }),\n                    tmpl = templates[tmplName];\n\n                    tmpl = tmpl({\n                        data: _context\n                    });\n\n                    return $('<div>').append($(tmpl)).html();\n                }\n            });\n        },\n\n        /**\n         * @override\n         */\n        _processResponse: function (e, items, context) {\n            var control;\n\n            if (context && !context._allShown) {\n                items = this.filter($.mage.treeToList([], items, 0, ''), this._term);\n            }\n            control = this.dropdown.find(this._control.selector);\n\n            if (control.length && control.hasClass('jstree')) {\n                control.jstree('destroy');\n            }\n            this._superApply([e, items, context]);\n        }\n    });\n\n    return $.mage.treeSuggest;\n});\n"}
}});