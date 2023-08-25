import { useEffect, useState } from 'react';

const Cart = ({cart, total, note, updateCart, createOrder, deleteItem, setNote}) => {

    return(<div>
        <h2>購物車清單</h2>
        {cart.length === 0 ? 
        <div className='pt-3'>購物車尚未有物品</div> :
        (
            <>
            <table className="table">
                <thead>
                  <tr>
                    <th scope="col" width="50">操作</th>
                    <th scope="col">品項</th>
                    <th scope="col">描述</th>
                    <th scope="col" width="90">數量</th>
                    <th scope="col">單價</th>
                    <th scope="col">小計</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    return (
                    <tr key={item.id}>
                        <td><button type="button" className="btn btn-sm" onClick={() => deleteItem(item)}>x</button></td>
                        <td>{item.name}</td>
                        <td><small>{item.description}</small></td>
                        <td>
                        <select  value={item.qty} onChange={(e) => updateCart(item, e.target.value)}>
                            {[...Array(10).keys()].map((optItem) => {
                                return (
                                    <option value={optItem + 1} key={optItem}>
                                        {optItem + 1}
                                    </option>
                                );
                            })}
                        </select>
                        </td>
                        <td>${item.price}</td>
                        <td>${item.price * item.qty}</td>
                    </tr>);
                  })}
                  
                </tbody>
                <tfoot>
                    <tr>
                        {total ? 
                        (
                            <td colSpan={5}>
                                <span className='float-end fw-bolder fs-5'> 總價：${total}</span>
                            </td>
                        ) : null}
                    </tr>
                </tfoot>
              </table>
              <div>
                <label htmlFor='userMsg' className='form-label fw-bolder'>
                    備註
                </label>
                <textarea
                    name='message'
                    id='userMsg'
                    cols='30'
                    rows='5'
                    placeholder='請填寫'
                    className='form-control'
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                ></textarea>
              </div>
              <button type='button' className='float-end btn btn-primary w-50 btn-sm mt-3'
                    onClick={() => createOrder()}>
                  送出
                </button>
            </>
        )
        }
    </div>);
}

export default Cart;