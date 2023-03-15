require.config({"config": {
        "jsbuild":{"Magento_Ui/js/grid/columns/column.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n\n/**\n * @api\n */\ndefine([\n    'underscore',\n    'uiRegistry',\n    'mageUtils',\n    'uiElement'\n], function (_, registry, utils, Element) {\n    'use strict';\n\n    return Element.extend({\n        defaults: {\n            headerTmpl: 'ui/grid/columns/text',\n            bodyTmpl: 'ui/grid/cells/text',\n            disableAction: false,\n            controlVisibility: true,\n            sortable: true,\n            sorting: false,\n            visible: true,\n            draggable: true,\n            fieldClass: {},\n            ignoreTmpls: {\n                fieldAction: true\n            },\n            statefull: {\n                visible: true,\n                sorting: true\n            },\n            imports: {\n                exportSorting: 'sorting'\n            },\n            listens: {\n                '${ $.provider }:params.sorting.field': 'onSortChange'\n            },\n            modules: {\n                source: '${ $.provider }'\n            }\n        },\n\n        /**\n         * Initializes column component.\n         *\n         * @returns {Column} Chainable.\n         */\n        initialize: function () {\n            this._super()\n                .initFieldClass();\n\n            return this;\n        },\n\n        /**\n         * Initializes observable properties.\n         *\n         * @returns {Column} Chainable.\n         */\n        initObservable: function () {\n            this._super()\n                .track([\n                    'visible',\n                    'sorting',\n                    'disableAction'\n                ])\n                .observe([\n                    'dragging'\n                ]);\n\n            return this;\n        },\n\n        /**\n         * Extends list of field classes.\n         *\n         * @returns {Column} Chainable.\n         */\n        initFieldClass: function () {\n            _.extend(this.fieldClass, {\n                _dragging: this.dragging\n            });\n\n            return this;\n        },\n\n        /**\n         * Applies specified stored state of a column or one of its' properties.\n         *\n         * @param {String} state - Defines what state should be used: saved or default.\n         * @param {String} [property] - Defines what columns' property should be applied.\n         *      If not specified, then all columns stored properties will be used.\n         * @returns {Column} Chainable.\n         */\n        applyState: function (state, property) {\n            var namespace = this.storageConfig.root;\n\n            if (property) {\n                namespace += '.' + property;\n            }\n\n            this.storage('applyStateOf', state, namespace);\n\n            return this;\n        },\n\n        /**\n         * Sets columns' sorting. If column is currently sorted,\n         * than its' direction will be toggled.\n         *\n         * @param {*} [enable=true] - If false, than sorting will\n         *      be removed from a column.\n         * @returns {Column} Chainable.\n         */\n        sort: function (enable) {\n            if (!this.sortable) {\n                return this;\n            }\n\n            enable !== false ?\n                this.toggleSorting() :\n                this.sorting = false;\n\n            return this;\n        },\n\n        /**\n         * Sets descending columns' sorting.\n         *\n         * @returns {Column} Chainable.\n         */\n        sortDescending: function () {\n            if (this.sortable) {\n                this.sorting = 'desc';\n            }\n\n            return this;\n        },\n\n        /**\n         * Sets ascending columns' sorting.\n         *\n         * @returns {Column} Chainable.\n         */\n        sortAscending: function () {\n            if (this.sortable) {\n                this.sorting = 'asc';\n            }\n\n            return this;\n        },\n\n        /**\n         * Toggles sorting direction.\n         *\n         * @returns {Column} Chainable.\n         */\n        toggleSorting: function () {\n            this.sorting === 'asc' ?\n                this.sortDescending() :\n                this.sortAscending();\n\n            return this;\n        },\n\n        /**\n         * Checks if column is sorted.\n         *\n         * @returns {Boolean}\n         */\n        isSorted: function () {\n            return !!this.sorting;\n        },\n\n        /**\n         * Exports sorting data to the dataProvider if\n         * sorting of a column is enabled.\n         */\n        exportSorting: function () {\n            if (!this.sorting) {\n                return;\n            }\n\n            this.source('set', 'params.sorting', {\n                field: this.index,\n                direction: this.sorting\n            });\n        },\n\n        /**\n         * Checks if column has an assigned action that will\n         * be performed when clicking on one of its' fields.\n         *\n         * @returns {Boolean}\n         */\n        hasFieldAction: function () {\n            return !!this.fieldAction || !!this.fieldActions;\n        },\n\n        /**\n         * Applies action described in a 'fieldAction' property\n         * or actions described in 'fieldActions' property.\n         *\n         * @param {Number} rowIndex - Index of a row which initiates action.\n         * @returns {Column} Chainable.\n         *\n         * @example Example of fieldAction definition, which is equivalent to\n         *      referencing to external component named 'listing.multiselect'\n         *      and calling its' method 'toggleSelect' with params [rowIndex, true] =>\n         *\n         *      {\n         *          provider: 'listing.multiselect',\n         *          target: 'toggleSelect',\n         *          params: ['${ $.$data.rowIndex }', true]\n         *      }\n         */\n        applyFieldAction: function (rowIndex) {\n            if (!this.hasFieldAction() || this.disableAction) {\n                return this;\n            }\n\n            if (this.fieldActions) {\n                this.fieldActions.forEach(this.applySingleAction.bind(this, rowIndex), this);\n            } else {\n                this.applySingleAction(rowIndex);\n            }\n\n            return this;\n        },\n\n        /**\n         * Applies single action\n         *\n         * @param {Number} rowIndex - Index of a row which initiates action.\n         * @param {Object} action - Action (fieldAction) to be applied\n         *\n         */\n        applySingleAction: function (rowIndex, action) {\n            var callback;\n\n            action = action || this.fieldAction;\n            action = utils.template(action, {\n                column: this,\n                rowIndex: rowIndex\n            }, true);\n\n            callback = this._getFieldCallback(action);\n\n            if (_.isFunction(callback)) {\n                callback();\n            }\n        },\n\n        /**\n         * Returns field action handler if it was specified.\n         *\n         * @param {Object} record - Record object with which action is associated.\n         * @returns {Function|Undefined}\n         */\n        getFieldHandler: function (record) {\n            if (this.hasFieldAction()) {\n                return this.applyFieldAction.bind(this, record._rowIndex);\n            }\n        },\n\n        /**\n         * Creates action callback based on its' data.\n         *\n         * @param {Object} action - Actions' object.\n         * @returns {Function|Boolean} Callback function or false\n         *      value if it was impossible create a callback.\n         */\n        _getFieldCallback: function (action) {\n            var args     = action.params || [],\n                callback = action.target;\n\n            if (action.provider && action.target) {\n                args.unshift(action.target);\n\n                callback = registry.async(action.provider);\n            }\n\n            if (!_.isFunction(callback)) {\n                return false;\n            }\n\n            return function () {\n                callback.apply(callback, args);\n            };\n        },\n\n        /**\n         * Ment to preprocess data associated with a current columns' field.\n         *\n         * @param {Object} record - Data to be preprocessed.\n         * @returns {String}\n         */\n        getLabel: function (record) {\n            return record[this.index];\n        },\n\n        /**\n         * UnsanitizedHtml version of getLabel.\n         *\n         * @param {Object} record - Data to be preprocessed.\n         * @returns {String}\n         */\n        getLabelUnsanitizedHtml: function (record) {\n            return this.getLabel(record);\n        },\n\n        /**\n         * Returns list of classes that should be applied to a field.\n         *\n         * @returns {Object}\n         */\n        getFieldClass: function () {\n            return this.fieldClass;\n        },\n\n        /**\n         * Returns path to the columns' header template.\n         *\n         * @returns {String}\n         */\n        getHeader: function () {\n            return this.headerTmpl;\n        },\n\n        /**\n         * Returns path to the columns' body template.\n         *\n         * @returns {String}\n         */\n        getBody: function () {\n            return this.bodyTmpl;\n        },\n\n        /**\n         * Listener of the providers' sorting state changes.\n         *\n         * @param {Srting} field - Field by which current sorting is performed.\n         */\n        onSortChange: function (field) {\n            if (field !== this.index) {\n                this.sort(false);\n            }\n        }\n    });\n});\n"}
}});