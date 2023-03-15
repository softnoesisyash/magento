<?php

namespace OX\AjaxWishlist\Api;

interface AjaxWishlistInterface
{
    /**
     * To Wishlist Action
     *
     * @param int $productId
     * @return mixed
     */
    public function wishlistAction($productId);
}
