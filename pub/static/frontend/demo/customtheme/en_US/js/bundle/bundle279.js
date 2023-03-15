require.config({"config": {
        "jsbuild":{"Magento_PageBuilder/js/content-type/slider/appearance/default/widget.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n\ndefine([\n    'jquery',\n    'Magento_PageBuilder/js/events',\n    'slick'\n], function ($, events) {\n    'use strict';\n\n    return function (config, sliderElement) {\n        var $element = $(sliderElement);\n\n        /**\n         * Prevent each slick slider from being initialized more than once which could throw an error.\n         */\n        if ($element.hasClass('slick-initialized')) {\n            $element.slick('unslick');\n        }\n\n        $element.slick({\n            autoplay: $element.data('autoplay'),\n            autoplaySpeed: $element.data('autoplay-speed') || 0,\n            fade: $element.data('fade'),\n            infinite: $element.data('infinite-loop'),\n            arrows: $element.data('show-arrows'),\n            dots: $element.data('show-dots')\n        });\n\n        // Redraw slide after content type gets redrawn\n        events.on('contentType:redrawAfter', function (args) {\n            if ($element.closest(args.element).length) {\n                $element.slick('setPosition');\n            }\n        });\n        // eslint-disable-next-line jquery-no-bind-unbind\n        events.on('stage:viewportChangeAfter', $element.slick.bind($element, 'setPosition'));\n    };\n});\n"}
}});