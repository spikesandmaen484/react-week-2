import { useEffect } from 'react';

const Menu = ({product, onClick}) => {
    return(<>
        <h1>菜單</h1>
        <ul>
            {product?.map((item) => (
                <li key={item.id} className='mb-1'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div style={{ width: `100px` }}>{item.name}</div>
                        <div className='flex-grow-1 '>{item.description}</div>
                        <div className='pe-4'>${item.price}</div>
                        <div>
                            <button type='button' className='btn btn-warning btn-sm'
                                onClick={() => onClick({ ...item, qty: 1 })}>
                                加入購物車
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </>);
}

export default Menu;