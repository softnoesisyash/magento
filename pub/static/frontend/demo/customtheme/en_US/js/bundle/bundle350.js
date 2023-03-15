require.config({"config": {
        "jsbuild":{"mage/adminhtml/wysiwyg/tiny_mce/plugins/magentowidget/editor_plugin.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n\n/* global tinymce, widgetTools, Base64 */\n/* eslint-disable strict */\ndefine([\n    'wysiwygAdapter',\n    'mage/adminhtml/events',\n    'mage/adminhtml/wysiwyg/widget'\n], function (wysiwyg, varienGlobalEvents) {\n    return function (config) {\n        tinymce.create('tinymce.plugins.magentowidget', {\n\n            /**\n             * @param {tinymce.Editor} editor - Editor instance that the plugin is initialized in.\n             */\n            init: function (editor) {\n                var self = this;\n\n                this.activePlaceholder = null;\n\n                editor.addCommand('mceMagentowidget', function (img) {\n                    if (self.activePlaceholder) {\n                        img = self.activePlaceholder;\n                    }\n\n                    widgetTools.setActiveSelectedNode(img);\n                    widgetTools.openDialog(\n                        config['window_url'] + 'widget_target_id/' + editor.getElement().id + '/'\n                    );\n                });\n\n                // Register Widget plugin button\n                editor.ui.registry.addIcon(\n                    'magentowidget',\n                    '<svg width=\"24\" height=\"24\" viewBox=\"0 0 32.000000 32.000000\" ' +\n                    'preserveAspectRatio=\"xMidYMid meet\"> <g transform=\"translate(0.000000,32.000000) ' +\n                    'scale(0.100000,-0.100000)\" fill=\"#000000\" stroke=\"none\"> <path d=\"M130 290 c0 -5 13 -10 30 ' +\n                    '-10 22 0 28 -4 24 -15 -5 -11 2 -15 26 -15 21 0 30 -4 28 -12 -7 -20 -40 -22 -50 -4 -5 9 -14 16 ' +\n                    '-20 16 -6 0 -19 7 -28 15 -9 8 -25 12 -38 8 -33 -8 -27 -26 8 -21 34 5 40 -6 12 -21 -14 -7 -25 -6 ' +\n                    '-40 5 -12 8 -23 10 -27 5 -5 -8 88 -71 105 -71 3 0 29 14 58 31 l53 30 -23 18 c-13 10 -31 20 -40 ' +\n                    '24 -10 3 -18 11 -18 17 0 5 -13 10 -30 10 -16 0 -30 -4 -30 -10z m58 -82 c-3 -7 -15 -13 -28 -13 ' +\n                    '-13 0 -25 6 -27 13 -3 8 6 12 27 12 21 0 30 -4 28 -12z\"/> <path d=\"M30 151 l0 -60 61 -36 c33 ' +\n                    '-19 64 -35 69 -35 5 0 36 16 69 35 l61 36 0 60 0 61 -65 -37 -65 -36 -65 36 -65 37 0 -61z\"/> </g>' +\n                    '</svg>'\n                );\n                editor.ui.registry.addToggleButton('magentowidget', {\n                    icon: 'magentowidget',\n                    tooltip: jQuery.mage.__('Insert Widget'),\n\n                    /**\n                     * execute openVariablesSlideout for onAction callback\n                     */\n                    onAction: function () {\n                        editor.execCommand('mceMagentowidget');\n                    },\n\n                    /**\n                     * Add a node change handler, selects the button in the UI when a image is selected\n                     * @param {ToolbarToggleButtonInstanceApi} api\n                     */\n                    onSetup: function (api) {\n                        /**\n                         * NodeChange handler\n                         */\n                        editor.on('NodeChange', function (e) {\n                            var placeholder = e.element;\n\n                            if (self.isWidgetPlaceholderSelected(placeholder)) {\n                                widgetTools.setEditMode(true);\n                                api.setActive(true);\n                            } else {\n                                widgetTools.setEditMode(false);\n                                api.setActive(false);\n                            }\n                        });\n                    }\n                });\n\n                // Add a widget placeholder image double click callback\n                editor.on('dblClick', function (e) {\n                    var placeholder = e.target;\n\n                    if (self.isWidgetPlaceholderSelected(placeholder)) {\n                        widgetTools.setEditMode(true);\n                        this.execCommand('mceMagentowidget', null);\n                    }\n                });\n\n                /**\n                 * Attach event handler for when wysiwyg editor is about to encode its content\n                 */\n                varienGlobalEvents.attachEventHandler('wysiwygEncodeContent', function (content) {\n                    content = self.encodeWidgets(self.decodeWidgets(content));\n                    content = self.removeDuplicateAncestorWidgetSpanElement(content);\n\n                    return content;\n                });\n\n                /**\n                 * Attach event handler for when wysiwyg editor is about to decode its content\n                 */\n                varienGlobalEvents.attachEventHandler('wysiwygDecodeContent', function (content) {\n                    content = self.decodeWidgets(content);\n\n                    return content;\n                });\n\n                /**\n                 * Attach event handler for when popups associated with wysiwyg are about to be closed\n                 */\n                varienGlobalEvents.attachEventHandler('wysiwygClosePopups', function () {\n                    wysiwyg.closeEditorPopup('widget_window' + wysiwyg.getId());\n                });\n            },\n\n            /**\n             * @param {Object} placeholder - Contains the selected node\n             * @returns {Boolean}\n             */\n            isWidgetPlaceholderSelected: function (placeholder) {\n                var isSelected = false;\n\n                if (placeholder.nodeName &&\n                    (placeholder.nodeName === 'SPAN' || placeholder.nodeName === 'IMG') &&\n                    placeholder.className && placeholder.className.indexOf('magento-widget') !== -1\n                ) {\n                    this.activePlaceholder = placeholder;\n                    isSelected = true;\n                } else {\n                    this.activePlaceholder = null;\n                }\n\n                return isSelected;\n            },\n\n            /**\n             * Convert {{widget}} style syntax to image placeholder HTML\n             * @param {String} content\n             * @return {*}\n             */\n            encodeWidgets: function (content) {\n                return content.gsub(/\\{\\{widget([\\S\\s]*?)\\}\\}/i, function (match) {\n                    var attributes = wysiwyg.parseAttributesString(match[1]),\n                        imageSrc,\n                        imageHtml = '';\n\n                    if (attributes.type) {\n                        attributes.type = attributes.type.replace(/\\\\\\\\/g, '\\\\');\n                        imageSrc = config.placeholders[attributes.type];\n\n                        if (imageSrc) {\n                            imageHtml += '<span class=\"magento-placeholder magento-widget mceNonEditable\" ' +\n                                'contenteditable=\"false\">';\n                        } else {\n                            imageSrc = config['error_image_url'];\n                            imageHtml += '<span ' +\n                                'class=\"magento-placeholder magento-placeholder-error magento-widget mceNonEditable\" ' +\n                                'contenteditable=\"false\">';\n                        }\n\n                        imageHtml += '<img';\n                        imageHtml += ' id=\"' + Base64.idEncode(match[0]) + '\"';\n                        imageHtml += ' src=\"' + imageSrc + '\"';\n                        imageHtml += ' />';\n\n                        if (config.types[attributes.type]) {\n                            imageHtml += config.types[attributes.type];\n                        }\n\n                        imageHtml += '</span>';\n\n                        return imageHtml;\n                    }\n                });\n            },\n\n            /**\n             * Convert image placeholder HTML to {{widget}} style syntax\n             * @param {String} content\n             * @return {*}\n             */\n            decodeWidgets: function (content) {\n                return content.gsub(\n                    /(<span class=\"[^\"]*magento-widget[^\"]*\"[^>]*>)?<img([^>]+id=\"[^>]+)>(([^>]*)<\\/span>)?/i,\n                    function (match) {\n                        var attributes = wysiwyg.parseAttributesString(match[2]),\n                            widgetCode,\n                            result = match[0];\n\n                        if (attributes.id) {\n                            try {\n                                widgetCode = Base64.idDecode(attributes.id);\n                            } catch (e) {\n                                // Ignore and continue.\n                            }\n\n                            if (widgetCode && widgetCode.indexOf('{{widget') !== -1) {\n                                result = widgetCode;\n                            }\n                        }\n\n                        return result;\n                    }\n                );\n            },\n\n            /**\n             * Tinymce has strange behavior with html and this removes one of its side-effects\n             * @param {String} content\n             * @return {String}\n             */\n            removeDuplicateAncestorWidgetSpanElement: function (content) {\n                var parser, doc, returnval = '';\n\n                if (!window.DOMParser) {\n                    return content;\n                }\n\n                parser = new DOMParser();\n                doc = parser.parseFromString(content.replace(/&quot;/g, '&amp;quot;'), 'text/html');\n\n                [].forEach.call(doc.querySelectorAll('.magento-widget'), function (widgetEl) {\n                    var widgetChildEl = widgetEl.querySelector('.magento-widget');\n\n                    if (!widgetChildEl) {\n                        return;\n                    }\n\n                    [].forEach.call(widgetEl.childNodes, function (el) {\n                        widgetEl.parentNode.insertBefore(el, widgetEl);\n                    });\n\n                    widgetEl.parentNode.removeChild(widgetEl);\n                });\n\n                returnval += doc.head ? doc.head.innerHTML.replace(/&amp;quot;/g, '&quot;') : '';\n                returnval += doc.body ? doc.body.innerHTML.replace(/&amp;quot;/g, '&quot;') : '';\n\n                return returnval ? returnval : content;\n            },\n\n            /**\n             * @return {Object}\n             */\n            getInfo: function () {\n                return {\n                    longname: 'Magento Widget Manager Plugin',\n                    author: 'Magento Core Team',\n                    authorurl: 'http://magentocommerce.com',\n                    infourl: 'http://magentocommerce.com',\n                    version: '1.0'\n                };\n            }\n        });\n\n        // Register plugin\n        tinymce.PluginManager.add('magentowidget', tinymce.plugins.magentowidget);\n    };\n});\n"}
}});