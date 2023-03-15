require.config({"config": {
        "jsbuild":{"mage/backend/tabs.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n\n/* global FORM_KEY */\ndefine([\n    'jquery',\n    'jquery/ui',\n    'jquery/ui-modules/widgets/tabs'\n], function ($) {\n    'use strict';\n\n    var rhash, isLocal;\n\n    // mage.tabs base functionality\n    $.widget('mage.tabs', $.ui.tabs, {\n        options: {\n            spinner: false,\n            groups: null,\n            tabPanelClass: '',\n            excludedPanel: ''\n        },\n\n        /**\n         * Tabs creation\n         * @protected\n         */\n        _create: function () {\n            var activeIndex = this._getTabIndex(this.options.active);\n\n            this.options.active = activeIndex >= 0 ? activeIndex : 0;\n            this._super();\n        },\n\n        /**\n         * @override\n         * @private\n         * @return {Array} Array of DOM-elements\n         */\n        _getList: function () {\n            if (this.options.groups) {\n                return this.element.find(this.options.groups);\n            }\n\n            return this._super();\n        },\n\n        /**\n         * Get active anchor\n         * @return {Element}\n         */\n        activeAnchor: function () {\n            return this.anchors.eq(this.option('active'));\n        },\n\n        /**\n         * Get tab index by tab id\n         * @protected\n         * @param {String} id - id of tab\n         * @return {Number}\n         */\n        _getTabIndex: function (id) {\n            var anchors = this.anchors ?\n                this.anchors :\n                this._getList().find('> li > a[href]');\n\n            return anchors.index($('#' + id));\n        },\n\n        /**\n         * Switch between tabs\n         * @protected\n         * @param {Object} event - event object\n         * @param {undefined|Object} eventData\n         */\n        _toggle: function (event, eventData) {\n            var anchor = $(eventData.newTab).find('a');\n\n            if ($(eventData.newTab).find('a').data().tabType === 'link') {\n                location.href = anchor.prop('href');\n            } else {\n                this._superApply(arguments);\n            }\n        }\n    });\n\n    rhash = /#.*$/;\n\n    /**\n     * @param {*} anchor\n     * @return {Boolean}\n     */\n    isLocal = function (anchor) {\n        return anchor.hash.length > 1 &&\n            anchor.href.replace(rhash, '') ===\n                location.href.replace(rhash, '')\n                    // support: Safari 5.1\n                    // Safari 5.1 doesn't encode spaces in window.location\n                    // but it does encode spaces from anchors (#8777)\n                    .replace(/\\s/g, '%20');\n    };\n\n    // Extension for mage.tabs - Move panels in destination element\n    $.widget('mage.tabs', $.mage.tabs, {\n        /**\n         * Move panels in destination element on creation\n         * @protected\n         * @override\n         */\n        _create: function () {\n            this._super();\n            this._movePanelsInDestination(this.panels);\n        },\n\n        /**\n         * Get panel for tab. If panel no exist in tabs container, then find panel in destination element\n         * @protected\n         * @override\n         * @param {Element} tab - tab \"li\" DOM-element\n         * @return {Element}\n         */\n        _getPanelForTab: function (tab) {\n            var panel = this._superApply(arguments),\n                id;\n\n            if (!panel.length) {\n                id = $(tab).attr('aria-controls');\n                panel = $(this.options.destination).find(this._sanitizeSelector('#' + id));\n            }\n\n            return panel;\n        },\n\n        /**\n         * @private\n         */\n        _processTabs: function () {\n            var that = this;\n\n            this.tablist = this._getList()\n                .addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all')\n                .attr('role', 'tablist');\n\n            this.tabs = this.tablist.find('> li:has(a[href])')\n                .addClass('ui-state-default ui-corner-top')\n                .attr({\n                    role: 'tab',\n                    tabIndex: -1\n                });\n\n            this.anchors = this.tabs.map(function () {\n                return $('a', this)[ 0 ];\n            })\n                .addClass('ui-tabs-anchor')\n                .attr({\n                    role: 'presentation',\n                    tabIndex: -1\n                });\n\n            this.panels = $();\n\n            this.anchors.each(function (i, anchor) {\n                var selector, panel, panelId,\n                    anchorId = $(anchor).uniqueId().attr('id'),\n                    tab = $(anchor).closest('li'),\n                    originalAriaControls = tab.attr('aria-controls');\n\n                // inline tab\n                if (isLocal(anchor)) {\n                    selector = anchor.hash;\n                    panel = that.document.find(that._sanitizeSelector(selector));\n                    // remote tab\n                } else {\n                    panelId = tab.attr('aria-controls') || $({}).uniqueId()[ 0 ].id;\n                    selector = '#' + panelId;\n                    panel = that.element.find(selector);\n\n                    if (!panel.length) {\n                        panel = that._createPanel(panelId);\n                        panel.insertAfter(that.panels[ i - 1 ] || that.tablist);\n                    }\n                    panel.attr('aria-live', 'polite');\n                }\n\n                if (panel.length) {\n                    that.panels = that.panels.add(panel);\n                }\n\n                if (originalAriaControls) {\n                    tab.data('ui-tabs-aria-controls', originalAriaControls);\n                }\n                tab.attr({\n                    'aria-controls': selector.substring(1),\n                    'aria-labelledby': anchorId\n                });\n                panel.attr('aria-labelledby', anchorId);\n\n                if (that.options.excludedPanel.indexOf(anchorId + '_content') < 0) {\n                    panel.addClass(that.options.tabPanelClass);\n                }\n            });\n\n            this.panels\n                .addClass('ui-tabs-panel ui-widget-content ui-corner-bottom')\n                .attr('role', 'tabpanel');\n        },\n\n        /**\n         * Move panels in destination element\n         * @protected\n         * @override\n         */\n        _movePanelsInDestination: function (panels) {\n            if (this.options.destination && !panels.parents(this.options.destination).length) {\n                this.element.trigger('beforePanelsMove', panels);\n\n                panels.find('script:not([type]), script[type=\"text/javascript\"]').remove();\n\n                panels.appendTo(this.options.destination)\n                    .each($.proxy(function (i, panel) {\n                        $(panel).trigger('move.tabs', this.anchors.eq(i));\n                    }, this));\n            }\n        },\n\n        /**\n         * Move panels in destination element on tabs switching\n         * @protected\n         * @override\n         * @param {Object} event - event object\n         * @param {Object} eventData\n         */\n        _toggle: function (event, eventData) {\n            this._movePanelsInDestination(eventData.newPanel);\n            this._superApply(arguments);\n        }\n    });\n\n    // Extension for mage.tabs - Ajax functionality for tabs\n    $.widget('mage.tabs', $.mage.tabs, {\n        options: {\n            /**\n             * Add form key to ajax call\n             * @param {Object} event - event object\n             * @param {Object} ui\n             */\n            beforeLoad: function (event, ui) {\n                ui.ajaxSettings.type = 'POST';\n                ui.ajaxSettings.hasContent = true;\n                ui.jqXHR.setRequestHeader('Content-Type', ui.ajaxSettings.contentType);\n                ui.ajaxSettings.data = jQuery.param(\n                    {\n                        isAjax: true,\n                        'form_key': typeof FORM_KEY !== 'undefined' ? FORM_KEY : null\n                    },\n                    ui.ajaxSettings.traditional\n                );\n            },\n\n            /**\n             * Replacing href attribute with loaded panel id\n             * @param {Object} event - event object\n             * @param {Object} ui\n             */\n            load: function (event, ui) {\n                var panel = $(ui.panel);\n\n                $(ui.tab).prop('href', '#' + panel.prop('id'));\n                panel.trigger('contentUpdated');\n            }\n        }\n    });\n\n    // Extension for mage.tabs - Attach event handlers to tabs\n    $.widget('mage.tabs', $.mage.tabs, {\n        options: {\n            tabIdArgument: 'tab',\n            tabsBlockPrefix: null\n        },\n\n        /**\n         * Attach event handlers to tabs, on creation\n         * @protected\n         * @override\n         */\n        _refresh: function () {\n            this._super();\n            $.each(this.tabs, $.proxy(function (i, tab) {\n                $(this._getPanelForTab(tab))\n                    .off('changed' + this.eventNamespace)\n                    .off('highlight.validate' + this.eventNamespace)\n                    .off('focusin' + this.eventNamespace)\n\n                    .on('changed' + this.eventNamespace, {\n                        index: i\n                    }, $.proxy(this._onContentChange, this))\n                    .on('highlight.validate' + this.eventNamespace, {\n                        index: i\n                    }, $.proxy(this._onInvalid, this))\n                    .on('focusin' + this.eventNamespace, {\n                        index: i\n                    }, $.proxy(this._onFocus, this));\n            }, this));\n\n            ($(this.options.destination).is('form') ?\n                $(this.options.destination) :\n                $(this.options.destination).closest('form'))\n                    .off('beforeSubmit' + this.eventNamespace)\n                    .on('beforeSubmit' + this.eventNamespace, $.proxy(this._onBeforeSubmit, this));\n        },\n\n        /**\n         * Mark tab as changed if some field inside tab panel is changed\n         * @protected\n         * @param {Object} e - event object\n         */\n        _onContentChange: function (e) {\n            var cssChanged = '_changed';\n\n            this.anchors.eq(e.data.index).addClass(cssChanged);\n            this._updateNavTitleMessages(e, cssChanged);\n        },\n\n        /**\n         * Clone messages (tooltips) from anchor to parent element\n         * @protected\n         * @param {Object} e - event object\n         * @param {String} messageType - changed or error\n         */\n        _updateNavTitleMessages: function (e, messageType) {\n            var curAnchor = this.anchors.eq(e.data.index),\n                curItem = curAnchor.parents('[data-role=\"container\"]').find('[data-role=\"title\"]'),\n                curItemMessages = curItem.find('[data-role=\"title-messages\"]'),\n                activeClass = '_active';\n\n            if (curItemMessages.is(':empty')) {\n                curAnchor\n                    .find('[data-role=\"item-messages\"]')\n                    .clone()\n                    .appendTo(curItemMessages);\n            }\n\n            curItemMessages.find('.' + messageType).addClass(activeClass);\n        },\n\n        /**\n         * Mark tab as error if some field inside tab panel is not passed validation\n         * @param {Object} e - event object\n         * @protected\n         */\n        _onInvalid: function (e) {\n            var cssError = '_error',\n                fakeEvent = e;\n\n            fakeEvent.currentTarget = $(this.anchors).eq(e.data.index);\n            this._eventHandler(fakeEvent);\n            this.anchors.eq(e.data.index).addClass(cssError).find('.' + cssError).show();\n            this._updateNavTitleMessages(e, cssError);\n        },\n\n        /**\n         * Show tab panel if focus event triggered of some field inside tab panel\n         * @param {Object} e - event object\n         * @protected\n         */\n        _onFocus: function (e) {\n            this.option('_active', e.data.index);\n        },\n\n        /**\n         * Add active tab id in data object when \"beforeSubmit\" event is triggered\n         * @param {Object} e - event object\n         * @param {Object} data - event data object\n         * @protected\n         */\n        _onBeforeSubmit: function (e, data) { //eslint-disable-line no-unused-vars\n            var activeAnchor = this.activeAnchor(),\n                activeTabId = activeAnchor.prop('id'),\n                options;\n\n            if (this.options.tabsBlockPrefix) {\n                if (activeAnchor.is('[id*=\"' + this.options.tabsBlockPrefix + '\"]')) {\n                    activeTabId = activeAnchor.prop('id').substr(this.options.tabsBlockPrefix.length);\n                }\n            }\n            $(this.anchors).removeClass('error');\n            options = {\n                action: {\n                    args: {}\n                }\n            };\n            options.action.args[this.options.tabIdArgument] = activeTabId;\n        }\n    });\n\n    // Extension for mage.tabs - Shadow tabs functionality\n    $.widget('mage.tabs', $.mage.tabs, {\n        /**\n         * Add shadow tabs functionality on creation\n         * @protected\n         * @override\n         */\n        _refresh: function () {\n            var anchors, shadowTabs, tabs;\n\n            this._super();\n            anchors = this.anchors;\n            shadowTabs = this.options.shadowTabs;\n            tabs = this.tabs;\n\n            if (shadowTabs) {\n                anchors.each($.proxy(function (i, anchor) {\n                    var anchorId = $(anchor).prop('id');\n\n                    if (shadowTabs[anchorId]) {\n                        $(anchor).parents('li').on('click', $.proxy(function () {\n                            $.each(shadowTabs[anchorId], $.proxy(function (key, id) {\n                                this.load($(tabs).index($('#' + id).parents('li')), {});\n                            }, this));\n                        }, this));\n                    }\n                }, this));\n            }\n        }\n    });\n\n    return $.mage.tabs;\n});\n"}
}});