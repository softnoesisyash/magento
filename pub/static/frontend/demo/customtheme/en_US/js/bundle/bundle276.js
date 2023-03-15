require.config({"config": {
        "jsbuild":{"Magento_PageBuilder/js/content-type/products/appearance/carousel/widget.js":"/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n\ndefine([\n    'jquery',\n    'underscore',\n    'matchMedia',\n    'Magento_PageBuilder/js/utils/breakpoints',\n    'Magento_PageBuilder/js/events',\n    'slick'\n], function ($, _, mediaCheck, breakpointsUtils, events) {\n    'use strict';\n\n    /**\n     * Build slick\n     *\n     * @param {jQuery} $carouselElement\n     * @param {Object} config\n     */\n    function buildSlick($carouselElement, config) {\n        /**\n         * Prevent each slick slider from being initialized more than once which could throw an error.\n         */\n        if ($carouselElement.hasClass('slick-initialized')) {\n            $carouselElement.slick('unslick');\n        }\n\n        config.slidesToScroll = config.slidesToShow;\n        $carouselElement.slick(config);\n    }\n\n    /**\n     * Initialize slider.\n     *\n     * @param {jQuery} $element\n     * @param {Object} slickConfig\n     * @param {Object} breakpoint\n     */\n    function initSlider($element, slickConfig, breakpoint) {\n        var productCount = $element.find('.product-item').length,\n            $carouselElement = $($element.children()),\n            centerModeClass = 'center-mode',\n            carouselMode = $element.data('carousel-mode'),\n            slidesToShow = breakpoint.options.products[carouselMode] ?\n                breakpoint.options.products[carouselMode].slidesToShow :\n                breakpoint.options.products.default.slidesToShow;\n\n        slickConfig.slidesToShow = parseFloat(slidesToShow);\n\n        if (carouselMode === 'continuous' && productCount > slickConfig.slidesToShow) {\n            $element.addClass(centerModeClass);\n            slickConfig.centerPadding = $element.data('center-padding');\n            slickConfig.centerMode = true;\n        } else {\n            $element.removeClass(centerModeClass);\n            slickConfig.infinite = $element.data('infinite-loop');\n        }\n\n        buildSlick($carouselElement, slickConfig);\n    }\n\n    return function (config, element) {\n        var $element = $(element),\n            $carouselElement = $($element.children()),\n            currentViewport = config.currentViewport,\n            currentBreakpoint = config.breakpoints[currentViewport],\n            slickConfig = {\n                autoplay: $element.data('autoplay'),\n                autoplaySpeed: $element.data('autoplay-speed') || 0,\n                arrows: $element.data('show-arrows'),\n                dots: $element.data('show-dots')\n            };\n\n        _.each(config.breakpoints, function (breakpoint) {\n            mediaCheck({\n                media: breakpointsUtils.buildMedia(breakpoint.conditions),\n\n                /** @inheritdoc */\n                entry: function () {\n                    initSlider($element, slickConfig, breakpoint);\n                }\n            });\n        });\n\n        //initialize slider when content type is added in mobile viewport\n        if (currentViewport === 'mobile') {\n            initSlider($element, slickConfig, currentBreakpoint);\n        }\n\n        // Redraw slide after content type gets redrawn\n        events.on('contentType:redrawAfter', function (args) {\n            if ($carouselElement.closest(args.element).length) {\n                $carouselElement.slick('setPosition');\n            }\n        });\n\n        events.on('stage:viewportChangeAfter', function (args) {\n            var breakpoint = config.breakpoints[args.viewport];\n\n            initSlider($element, slickConfig, breakpoint);\n        });\n    };\n});\n"}
}});