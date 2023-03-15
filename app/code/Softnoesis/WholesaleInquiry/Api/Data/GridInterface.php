<?php
/**
 * Grid GridInterface.
 * @category  Softnoesis
 * @package   Softnoesis_Grid
 * @author    Softnoesis
 * @copyright Copyright (c) 2010-2017 Softnoesis Private Limited (https://softnoesis.com)
 */

namespace Softnoesis\WholesaleInquiry\Api\Data;

interface GridInterface
{
    /**
     * Constants for keys of data array. Identical to the name of the getter in snake case.
     */
    const ID = 'id';
    const FIRST_NAME = 'fname';
    const LAST_NAME = 'lname';
    const EMAIL = 'email';
    const COMMENT = 'comment';
    const PHONE_NUMBER = 'phone';

   /**
    * Get Id.
    *
    * @return int
    */
    public function getId();

   /**
    * Set Id.
    */
    public function setId($id);

   /**
    * Get First Name.
    *
    * @return varchar
    */
    public function getFname();

   /**
    * Set First Name.
    */
    public function setFname($fname);

   /**
    * Get Last Name.
    *
    * @return varchar
    */
    public function getLname();

   /**
    * Set Last Name.
    */
    public function setLname($lname);

   /**
    * Get Email.
    *
    * @return varchar
    */
    public function getEmail();

   /**
    * Set Email.
    */
    public function setEmail($email);

   /**
    * Get Comment.
    *
    * @return varchar
    */
    public function getComment();

   /**
    * Set Comment.
    */
    public function setComment($comment);

   /**
    * Get Phone Number.
    *
    * @return varchar
    */
    public function getPhone();

   /**
    * Set Phone Number.
    */
    public function setPhone($phone);
}
