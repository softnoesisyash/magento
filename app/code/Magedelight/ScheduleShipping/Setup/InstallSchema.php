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

namespace Magedelight\ScheduleShipping\Setup;

use Magento\Framework\Setup\InstallSchemaInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
use Magento\Framework\DB\Ddl\Table;
use Magento\Framework\DB\Adapter\AdapterInterface;

/**
 * @codeCoverageIgnore
 */
class InstallSchema implements InstallSchemaInterface
{

    /**
     *
     * @param SchemaSetupInterface $setup
     * @param ModuleContextInterface $context
     */
    public function install(SchemaSetupInterface $setup, ModuleContextInterface $context)
    {
        $installer = $setup;

        $installer->startSetup();

        $installer->getConnection()->addColumn(
            $installer->getTable('quote'),
            'delivery_date',
            [
            'type' => 'datetime',
            'nullable' => true,
            'comment' => 'Delivery Date',
                ]
        );

        $installer->getConnection()->addColumn(
            $installer->getTable('quote'),
            'delivery_timeslot',
            [
            'type' => 'text',
            'nullable' => true,
            'comment' => 'Delivery Timeslot',
                ]
        );

        $installer->getConnection()->addColumn(
            $installer->getTable('quote'),
            'delivery_comment',
            [
            'type' => 'text',
            'nullable' => false,
            'comment' => 'Delivery comment',
                ]
        );

        $installer->getConnection()->addColumn(
            $installer->getTable('quote'),
            'delivery_call',
            [
            'type' => \Magento\Framework\DB\Ddl\Table::TYPE_BOOLEAN,
            'default' => 0,
            'nullable' => false,
            'comment' => 'Call Before Delivery',
                ]
        );

        $installer->getConnection()->addColumn(
            $installer->getTable('sales_order'),
            'delivery_date',
            [
            'type' => 'datetime',
            'nullable' => true,
            'comment' => 'Delivery Date',
                ]
        );

        $installer->getConnection()->addColumn(
            $installer->getTable('sales_order'),
            'delivery_timeslot',
            [
            'type' => 'text',
            'nullable' => true,
            'comment' => 'Delivery Timeslot',
                ]
        );

        $installer->getConnection()->addColumn(
            $installer->getTable('sales_order'),
            'delivery_comment',
            [
            'type' => 'text',
            'nullable' => false,
            'comment' => 'Delivery comment',
                ]
        );

        $installer->getConnection()->addColumn(
            $installer->getTable('sales_order'),
            'delivery_call',
            [
            'type' => \Magento\Framework\DB\Ddl\Table::TYPE_BOOLEAN,
            'default' => 0,
            'nullable' => false,
            'comment' => 'Call Before Delivery',
                ]
        );

        $installer->getConnection()->addColumn(
            $installer->getTable('sales_order_grid'),
            'delivery_date',
            [
            'type' => 'datetime',
            'nullable' => true,
            'comment' => 'Delivery Date',
                ]
        );

        //Setup two columns for quote, quote_address and order
        //Quote address tables
        $installer->getConnection()
                ->addColumn(
                    $installer->getTable('quote_address'),
                    'fee',
                    [
                    'type' => \Magento\Framework\DB\Ddl\Table::TYPE_DECIMAL,
                    'length' => '12,4',
                    'default' => 0.0000,
                    'nullable' => true,
                    'comment' => 'Fee'
                        ]
                );
        $installer->getConnection()
                ->addColumn(
                    $installer->getTable('quote_address'),
                    'base_fee',
                    [
                    'type' => \Magento\Framework\DB\Ddl\Table::TYPE_DECIMAL,
                    'length' => '12,4',
                    'default' => 0.0000,
                    'nullable' => true,
                    'comment' => 'Base Fee'
                        ]
                );

        //Quote tables
        $installer->getConnection()
                ->addColumn(
                    $installer->getTable('quote'),
                    'fee',
                    [
                    'type' => \Magento\Framework\DB\Ddl\Table::TYPE_DECIMAL,
                    'length' => '12,4',
                    'default' => 0.0000,
                    'nullable' => true,
                    'comment' => 'Fee'
                        ]
                );

        $installer->getConnection()
                ->addColumn(
                    $installer->getTable('quote'),
                    'base_fee',
                    [
                    'type' => \Magento\Framework\DB\Ddl\Table::TYPE_DECIMAL,
                    'length' => '12,4',
                    'default' => 0.0000,
                    'nullable' => true,
                    'comment' => 'Base Fee'
                        ]
                );

        //Order tables
        $installer->getConnection()
                ->addColumn(
                    $installer->getTable('sales_order'),
                    'fee',
                    [
                    'type' => \Magento\Framework\DB\Ddl\Table::TYPE_DECIMAL,
                    'length' => '12,4',
                    'default' => 0.0000,
                    'nullable' => true,
                    'comment' => 'Fee'
                        ]
                );

        $installer->getConnection()
                ->addColumn(
                    $installer->getTable('sales_order'),
                    'base_fee',
                    [
                    'type' => \Magento\Framework\DB\Ddl\Table::TYPE_DECIMAL,
                    'length' => '12,4',
                    'default' => 0.0000,
                    'nullable' => true,
                    'comment' => 'Base Fee'
                        ]
                );
        //Invoice tables
        $installer->getConnection()
                ->addColumn(
                    $installer->getTable('sales_invoice'),
                    'fee',
                    [
                    'type' => \Magento\Framework\DB\Ddl\Table::TYPE_DECIMAL,
                    'length' => '12,4',
                    'default' => 0.0000,
                    'nullable' => true,
                    'comment' => 'Fee'
                        ]
                );
        $installer->getConnection()
                ->addColumn(
                    $installer->getTable('sales_invoice'),
                    'base_fee',
                    [
                    'type' => \Magento\Framework\DB\Ddl\Table::TYPE_DECIMAL,
                    'length' => '12,4',
                    'default' => 0.0000,
                    'nullable' => true,
                    'comment' => 'Base Fee'
                        ]
                );
        //Credit memo tables
        $installer->getConnection()
                ->addColumn(
                    $installer->getTable('sales_creditmemo'),
                    'fee',
                    [
                    'type' => \Magento\Framework\DB\Ddl\Table::TYPE_DECIMAL,
                    'length' => '12,4',
                    'default' => 0.0000,
                    'nullable' => true,
                    'comment' => 'Fee'
                        ]
                );
        $installer->getConnection()
                ->addColumn(
                    $installer->getTable('sales_creditmemo'),
                    'base_fee',
                    [
                    'type' => \Magento\Framework\DB\Ddl\Table::TYPE_DECIMAL,
                    'length' => '12,4',
                    'default' => 0.0000,
                    'nullable' => true,
                    'comment' => 'Base Fee'
                        ]
                );

        $installer->endSetup();
    }
}
