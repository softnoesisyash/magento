require.config({"config": {
        "text":{"Magento_Ui/templates/form/element/uploader/image.html":"<!--\n/**\n * Copyright \u00a9 Magento, Inc. All rights reserved.\n * See COPYING.txt for license details.\n */\n-->\n<div class=\"admin__field\" visible=\"visible\" css=\"$data.additionalClasses\">\n    <label class=\"admin__field-label\" if=\"$data.label\" attr=\"for: uid\">\n        <span translate=\"label\" attr=\"'data-config-scope': $data.scopeLabel\"></span>\n    </label>\n\n    <div class=\"admin__field-control\" css=\"'_with-tooltip': $data.tooltip\">\n        <div class=\"file-uploader image-uploader\" data-role=\"drop-zone\" css=\"_loading: isLoading\">\n            <div class=\"file-uploader-area\">\n                <input type=\"file\" afterRender=\"onElementRender\" attr=\"id: uid, name: inputName, multiple: isMultipleFiles\" disable=\"disabled\" />\n                <label class=\"file-uploader-button action-default\" attr=\"for: uid, disabled: disabled\" disable=\"disabled\" translate=\"'Upload'\"></label>\n                <label\n                    data-bind=\"event: {change: addFileFromMediaGallery, click: openMediaBrowserDialog}\"\n                    class=\"file-uploader-button action-default\"\n                    attr=\"id: mediaGalleryUid, disabled: disabled\"\n                    data-force_static_path=\"1\"\n                    translate=\"'Select from Gallery'\"></label>\n                <render args=\"fallbackResetTpl\" if=\"$data.showFallbackReset && $data.isDifferedFromDefault\"></render>\n                <p class=\"image-upload-requirements\">\n                    <span if=\"$data.maxFileSize\">\n                        <span translate=\"'Maximum file size'\"></span>: <text args=\"formatSize($data.maxFileSize)\"></text>.\n                    </span>\n                    <span if=\"$data.allowedExtensions\">\n                        <span translate=\"'Allowed file types'\"></span>: <text args=\"getAllowedFileExtensionsInCommaDelimitedFormat()\"></text>.\n                    </span>\n                </p>\n            </div>\n\n            <render args=\"tooltipTpl\" if=\"$data.tooltip\"></render>\n\n            <div class=\"admin__field-note\" if=\"$data.notice\" attr=\"id: noticeId\">\n                <!-- ko with: {noticeUnsanitizedHtml: notice} -->\n                <span html=\"noticeUnsanitizedHtml\"></span>\n                <!-- /ko -->\n            </div>\n\n            <label class=\"admin__field-error\" if=\"error\" attr=\"for: uid\" text=\"error\"></label>\n\n            <each args=\"data: value, as: '$file'\" render=\"$parent.getPreviewTmpl($file)\"></each>\n\n            <div if=\"!hasData()\" class=\"image image-placeholder\" click=\"triggerImageUpload\">\n                <div class=\"file-uploader-summary product-image-wrapper\">\n                    <div class=\"file-uploader-spinner image-uploader-spinner\"></div>\n                    <p class=\"image-placeholder-text\" translate=\"'Browse to find or drag image here'\"></p>\n                </div>\n            </div>\n        </div>\n        <render args=\"$data.service.template\" if=\"$data.hasService()\"></render>\n    </div>\n</div>\n"}
}});