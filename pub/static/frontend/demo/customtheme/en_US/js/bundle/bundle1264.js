require.config({"config": {
        "text":{"Magedelight_ScheduleShipping/template/checkout/summary/fee.html":"<!--\n/**\n * Magedelight\n * Copyright (C) 2016 Magedelight <info@magedelight.com>\n *\n * NOTICE OF LICENSE\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with this program. If not, see http://opensource.org/licenses/gpl-3.0.html.\n *\n * @category Magedelight\n * @package Magedelight_ScheduleShipping\n * @copyright Copyright (c) 2016 Mage Delight (http://www.magedelight.com/)\n * @license http://opensource.org/licenses/gpl-3.0.html GNU General Public License,version 3 (GPL-3.0)\n * @author Magedelight <info@magedelight.com>\n */\n-->\n<!-- ko -->\n\n<tr class=\"totals fee excl\">\n    <th class=\"mark\" scope=\"row\">\n        <span class=\"label\" data-bind=\"text: title\"></span>\n        <span class=\"value\" data-bind=\"text: getValue()\"></span>\n    </th>\n    <td class=\"amount\">\n\n        <span class=\"price\"\n              data-bind=\"text: getValue(), attr: {'data-th': title}\"></span>\n\n\n    </td>\n</tr>\n\n<!-- /ko -->\n"}
}});