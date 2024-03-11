import React, { useState } from 'react'
import styles from "./CartItem.module.css"
import { useCart } from '../Context/CartContext';
import toast from 'react-hot-toast';

export default function CartItem({count, price, product}) {
  const [loading, setLoading] = useState(false)
  const { getCartItems, removeCartItem, updateQuantity } = useCart();
  let notify;
  const removeCartProduct = async (productId) => {
    const res = await removeCartItem(productId);
    if (res.status === "success") {
      notify = () => toast.success('Product removed successfully',{icon: "👏", duration: 3000});
      getCartItems()
    } else {
      notify = () => toast.error("Can't remove product!", {icon: "🔥", duration: 3000});
    }
    return notify();
  }

  const updateProductCount = async (productId, count) => {
    setLoading(true);
    const res = await updateQuantity(productId, count)

    if (res.status === "success") {
      await getCartItems();
      setLoading(false);

      if (count === 0) {
        removeCartProduct(product._id)
      }
    }
  }
  return (
    <div className='row pt-2'>
      <div className="col-sm-3">
        <img src={product?.imageCover} className={`${styles.image_cover} w-100 object-fit-cover`} alt={product.title} />
      </div>
      <div className='col-sm-9 mt-3 mt-sm-0'>
        <div className='d-flex justify-content-between align-items-center h-100'>
          <div>
            <h5 className='fs-4 mb-2'>{product.title}</h5>
            <p className='mb-2'>{price} EGP</p>
            <button className='btn btn-outline-danger rounded-1' onClick={() => removeCartProduct(product._id)}><i className='fa fa-trash'></i></button>
          </div>
          <div className='d-flex flex-nowrap align-items-center'>
            <button className={`btn btn-outline-success rounded-1 fs-3 ${styles.quantity}`} onClick={() => updateProductCount(product._id, count + 1)}>&#8314;</button>
            <span className='d-inline-block mx-3'>{loading? <i className="fa fa-spinner fa-spin"></i> : count}</span>
            <button className={`btn btn-outline-success rounded-1 fs-3 ${styles.quantity}`} onClick={() => updateProductCount(product._id, count - 1)}>&#8315;</button>
          </div>
        </div>
      </div>
      <div className='px-2'>
        <p className={`${styles.break_line}`}></p>
      </div>
    </div>
  )
}
