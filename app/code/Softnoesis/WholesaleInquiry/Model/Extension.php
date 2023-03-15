<?php
namespace Softnoesis\WholesaleInquiry\Model;
 
use Magento\Framework\Model\AbstractModel;
use Magento\Framework\Model\ResourceModel\Db\AbstractDb;
use Softnoesis\WholesaleInquiry\Api\Data\GridInterface;

class Extension extends AbstractModel implements GridInterface
{
    /**
     * CMS page cache tag.
     */
    const CACHE_TAG = 'otp_verification';
    /**
     * @var string
     */
    protected $_cacheTag = 'otp_verification';
    /**
     * Prefix of model events names.
     *
     * @var string
     */
    protected $_eventPrefix = 'otp_verification';
    /**
     * Initialize resource model.
     */
    protected function _construct()
    {
        $this->_init('Softnoesis\WholesaleInquiry\Model\ResourceModel\Extension');
    }
    /**
     * Get Id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->getData(self::ID);
    }
    /**
     * Set Id.
     */
    public function setId($id)
    {
        return $this->setData(self::ID, $id);
    }
    /**
     * Get First Name.
     *
     * @return varchar
     */
    public function getFname()
    {
        return $this->getData(self::FIRST_NAME);
    }
    /**
     * Set First Name.
     */
    public function setFname($fname)
    {
        return $this->setData(self::FIRST_NAME, $fname);
    }
    /**
     * Get Last Name.
     *
     * @return varchar
     */
    public function getLname()
    {
        return $this->getData(self::LAST_NAME);
    }
    /**
     * Set Last Name.
     */
    public function setLname($lname)
    {
        return $this->setData(self::LAST_NAME, $lname);
    }
    /**
     * Get Email
     *
     * @return varchar
     */
    public function getEmail()
    {
        return $this->getData(self::EMAIL);
    }
    /**
     * Set Email.
     */
    public function setEmail($email)
    {
        return $this->setData(self::EMAIL, $email);
    }
    /**
     * Get Comment.
     *
     * @return varchar
     */
    public function getComment()
    {
        return $this->getData(self::COMMENT);
    }
    /**
     * Set Comment.
     */
    public function setComment($comment)
    {
        return $this->setData(self::COMMENT, $comment);
    }
    /**
     * Get Phone Number.
     *
     * @return varchar
     */
    public function getPhone()
    {
        return $this->getData(self::PHONE_NUMBER);
    }
    /**
     * Set Phone Number
     */
    public function setPhone($phone)
    {
        return $this->setData(self::PHONE_NUMBER, $phone);
    }
}