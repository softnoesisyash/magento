<?php

/**
 * Magedelight
 * Copyright (C) 2017 Magedelight <info@magedelight.com>
 *
 * @category Magedelight
 * @package Magedelight_ScheduleShipping
 * @copyright Copyright (c) 2017 Mage Delight (http://www.magedelight.com/)
 * @license http://opensource.org/licenses/gpl-3.0.html GNU General Public License,version 3 (GPL-3.0)
 * @author Magedelight <info@magedelight.com>
 */

namespace Magedelight\ScheduleShipping\Model\Email;

class TemplateContainer
{

    /**
     * @var array
     */
    protected $vars;

    /**
     * @var array
     */
    protected $options;

    /**
     * @var string
     */
    protected $templateId;

    /**
     * @var int
     */
    protected $id;

    /**
     * Set email template variables.
     *
     * @param array $vars
     */
    public function setTemplateVars(array $vars)
    {
        $this->vars = $vars;
    }

    /**
     * Set email template options.
     *
     * @param array $options
     */
    public function setTemplateOptions(array $options)
    {
        $this->options = $options;
    }

    /**
     * Get email template variables.
     *
     * @return array
     */
    public function getTemplateVars()
    {
        return $this->vars;
    }

    /**
     * Get email template options.
     *
     * @return array
     */
    public function getTemplateOptions()
    {
        return $this->options;
    }

    /**
     * Set email template id.
     *
     * @param int $id
     */
    public function setTemplateId($id)
    {
        $this->id = $id;
    }

    /**
     * Get email template id.
     *
     * @return int
     */
    public function getTemplateId()
    {
        return $this->id;
    }
}
