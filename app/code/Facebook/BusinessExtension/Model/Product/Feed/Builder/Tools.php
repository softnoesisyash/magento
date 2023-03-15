<?php
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates. All Rights Reserved
 */

namespace Facebook\BusinessExtension\Model\Product\Feed\Builder;

use Exception;
use Magento\Framework\Currency;
use Magento\Framework\Pricing\PriceCurrencyInterface;

class Tools
{
    /**
     * @var PriceCurrencyInterface
     */
    protected $priceCurrency;

    /**
     * @param PriceCurrencyInterface $priceCurrency
     */
    public function __construct(PriceCurrencyInterface $priceCurrency)
    {
        $this->priceCurrency = $priceCurrency;
    }

    /**
     * @param $string
     * @return false|string|string[]|null
     */
    public function lowercaseIfAllCaps($string)
    {
        // if contains lowercase, don't update string
        if (!preg_match('/[a-z]/', $string)) {
            if (mb_strtoupper($string, 'utf-8') === $string) {
                return mb_strtolower($string, 'utf-8');
            }
        }
        return $string;
    }

    /**
     * @param $value
     * @return string
     */
    public function htmlDecode($value)
    {
        return strip_tags(html_entity_decode($value));
    }

    /**
     * Return formatted price with currency code. Examples: "9.99 USD", "27.02 GBP"
     *
     * @param $price
     * @param null $storeId
     * @return string
     */
    public function formatPrice($price, $storeId = null)
    {
        $currencyModel = $this->priceCurrency->getCurrency($storeId);
        $amount = $this->priceCurrency->convert($price, $storeId, $currencyModel);
        try {
            return sprintf(
                '%s %s',
                $currencyModel->formatTxt($amount, ['display' => Currency::NO_SYMBOL]),
                $currencyModel->getCode()
            );
        } catch (Exception $e) {
            return '';
        }
    }

    /**
     * Facebook product feed validator will throw an error
     * if a local URL like https://localhost/product.html was provided
     * so replacing with a dummy URL to allow for local testing
     *
     * @param string $url
     * @return string
     */
    public function replaceLocalUrlWithDummyUrl($url)
    {
        return str_replace('localhost', 'magento.com', $url);
    }
}
