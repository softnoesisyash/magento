<?php

namespace Softnoesis\Addtocartpopup\Cron;
use Magento\Framework\App\ResourceConnection;

class CoupanCode
{
	protected $resourceConnection;
	protected $logger;
	public function __construct(

        ResourceConnection $resourceConnection,
        \Psr\Log\LoggerInterface $logger

	)
	{
        $this->resourceConnection = $resourceConnection;
        $this->logger = $logger;
	}

	public function execute()
	{
		 $connection = $this->resourceConnection->getConnection();
		 $discount_amount = 20;
         $salesrule = "update salesrule set discount_amount='".$discount_amount."' where rule_id = 4";
         $connection->query($salesrule);

         $date = date("d");
         if($date%2==0)
         {
         	$code = 20;
         }
         else
         {
         	$code = 15;
         }

		 $rule_id = 5;
		 $seed = str_split('abcdefghijklmnopqrstuvwxyz'.'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.'0123456789!@#$%^&*()'); // and any other characters
        shuffle($seed); // probably optional since array_is randomized; this may be redundant
        $rand = '';
        foreach (array_rand($seed, 10) as $k) {
            $rand .= $seed[$k];
        }

         $sqltheir = "update salesrule_coupon set code='".$rand."' where coupon_id = 2";
         $connection->query($sqltheir);
	}
}
