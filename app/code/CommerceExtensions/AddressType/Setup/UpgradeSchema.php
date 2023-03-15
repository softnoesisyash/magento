<?php
namespace CommerceExtensions\AddressType\Setup;
use Magento\Framework\Setup\UpgradeSchemaInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
use Magento\Framework\DB\Ddl\Table;

class UpgradeSchema implements UpgradeSchemaInterface
{
  public function upgrade(SchemaSetupInterface $setup, ModuleContextInterface $context)
  {
    if (version_compare($context->getVersion(), '0.0.7') < 0) {
      $connection = $setup->getConnection();
      $connection->addColumn(
        $setup->getTable('sales_order_address'),
        'other_address',
        [
          'type' => Table::TYPE_TEXT,
          'length' => 2500,
          'nullable' => true,
          'default' => '',
          'comment' => 'Other Address'
        ]
      );
       $connection->addColumn(
        $setup->getTable('quote_address'),
        'other_address',
        [
          'type' => Table::TYPE_TEXT,
          'length' => 2500,
          'nullable' => true,
          'default' => '',
          'comment' => 'Other Address'
        ]
      );
       $connection->addColumn(
        $setup->getTable('customer_address_entity'),
        'address_type_indicator',
        [
          'type' => Table::TYPE_TEXT,
          'length' => 2500,
          'nullable' => true,
          'default' => '',
          'comment' => 'Address Type Indicator'
        ]
      );
       $connection->addColumn(
        $setup->getTable('customer_address_entity'),
        'other_address',
        [
          'type' => Table::TYPE_TEXT,
          'length' => 2500,
          'nullable' => true,
          'default' => '',
          'comment' => 'Other Address'
        ]
      );
    }
  }
}