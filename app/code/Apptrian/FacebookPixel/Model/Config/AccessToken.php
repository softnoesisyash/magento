<?php
/**
 * @category  Apptrian
 * @package   Apptrian_FacebookPixel
 * @author    Apptrian
 * @copyright Copyright (c) Apptrian (http://www.apptrian.com)
 * @license   http://www.apptrian.com/license Proprietary Software License EULA
 */
 
namespace Apptrian\FacebookPixel\Model\Config;

use Magento\Framework\Exception\LocalizedException;

class AccessToken extends \Magento\Framework\App\Config\Value
{
    /**
     * @return $this
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function beforeSave()
    {
        $value = $this->getValue();
        $validator = \Zend_Validate::is(
            $value,
            'Regex',
            ['pattern' => '/^[\p{L}\p{N}_,;:!&#\+\*\$\?\|\'\.\-]*$/iu']
        );
        
        if (!$validator) {
            $message = __(
                'The Access Token is not valid.'
            );
            throw new LocalizedException($message);
        }
        
        return $this;
    }
}
