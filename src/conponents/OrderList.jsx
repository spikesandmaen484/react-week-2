const OrderList = ({order, accountOrderPayment}) => {
    return(<>
        <div className="row justify-content-center">
            <h2>訂單</h2>
            {order.map((item) => {
                return (
                <div className='border border-2 p-3 mb-3' key={item.id}>
                    <div>訂單編號：{item.id}</div>
                    <div>
                        訂單狀態：
                        {item.isPaid ? (<span className='text-success'>已付款</span>) :
                        (
                            <button type='button' onClick={() => accountOrderPayment(item)} className='btn btn-sm btn-outline-dark py-0'>
                                付款
                            </button>
                        )}
                    </div>
                    <div>訂單備註：{item.note}</div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">品項</th>
                                <th scope="col">數量</th>
                                <th scope="col">小計</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.cart.map((objItem) => {
                                return(
                                <tr key={objItem.id}>
                                    <td>{objItem.name}</td>
                                    <td>{objItem.qty}</td>
                                    <td>{objItem.price * objItem.qty}</td>
                                </tr>);
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5}>
                                    <span className='fs-4 fw-bolder'>總金額：{item.total}</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>);
            })}
            
          </div>
    </>);
}

export default OrderList;