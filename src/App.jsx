import { useState, useEffect } from 'react'
import Menu from './conponents/Menu'
import Cart from './conponents/Cart'
import OrderList from './conponents/OrderList'

const data = [
  {
    "id": 1,
    "name": "珍珠奶茶",
    "description": "香濃奶茶搭配QQ珍珠",
    "price": 50
  },
  {
    "id": 2,
    "name": "冬瓜檸檬",
    "description": "清新冬瓜配上新鮮檸檬",
    "price": 45
  },
  {
    "id": 3,
    "name": "翡翠檸檬",
    "description": "綠茶與檸檬的完美結合",
    "price": 55
  },
  {
    "id": 4,
    "name": "四季春茶",
    "description": "香醇四季春茶，回甘無比",
    "price": 45
  },
  {
    "id": 5,
    "name": "阿薩姆奶茶",
    "description": "阿薩姆紅茶搭配香醇鮮奶",
    "price": 50
  },
  {
    "id": 6,
    "name": "檸檬冰茶",
    "description": "檸檬與冰茶的清新組合",
    "price": 45
  },
  {
    "id": 7,
    "name": "芒果綠茶",
    "description": "芒果與綠茶的獨特風味",
    "price": 55
  },
  {
    "id": 8,
    "name": "抹茶拿鐵",
    "description": "抹茶與鮮奶的絕配",
    "price": 60
  }
]

function App() {
  const [product] = useState(data);     //菜單
  const [cart, setCart] = useState([]); //購物車資料
  const [total, setTotal] = useState(0);//金額總計
  const [order, setOrder] = useState([]);//訂單
  const[note, setNote] = useState('');   //備註

  //將產品放進購物車
  const addCart = (prod) => {
    const index = cart.findIndex((item) => item.id === prod.id);
    if (index === -1) { //表示購物車裡沒物品
      
      const tempCart = [
        ...cart, // [] 淺拷貝
				{
					...prod,
					qty: 1 // 數量預設為 1
				}
      ]

      setCart(tempCart);
    }
    else {
      const tempCart = cart.map((cartItem) => {
				return prod.id === cartItem.id ?
        {
          ...cartItem,
          qty: cartItem.qty < 10 ? cartItem.qty + 1 : cartItem.qty, //數量最多10
        }
        : { ...cartItem };
			});
			setCart(tempCart);
    }

  }

  //更新產品數量
  const updateCart = (item, val) => {
    const tempCart = cart.map((cartItem) => {
    return item.id === cartItem.id ?
    {
      ...cartItem,
      qty: Number(val),
    }
    : { ...cartItem };
		});
		setCart(tempCart);
  }

  //刪除
  const deleteItem = (item) => {
		const tempCart = cart.filter((cartItem) => {
			return item.id !== cartItem.id;
		});
		setCart(tempCart);
	};

  //加入訂單
  const createOrder = () => {
		const tempOrder = [
			...order,
			{
				id: new Date().getTime(), //訂單編號
				cart,                     //資料
				note,                     //訂單備註
				total,                    //總金額
			},
		];

		setOrder(tempOrder);
		setCart([]);
		setNote("");
	};

  // 計算總金額
  const accountOrderPayment = (val) => {
    const updateOrderList = order.map((item) => (item.orderId === val.orderId ? { ...item, isPaid: true } : item));
    setOrder(updateOrderList);
  };

  // 計算金額
  useEffect(() => {
		const totalPrice = cart.reduce((prev, curr) => {
			return prev + curr.price * curr.qty;
		}, 0);
		setTotal(totalPrice);
	}, [cart]);

  return (
    <>
      <div id="root">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-5">
              <Menu product={product} onClick={addCart} />
            </div>
            <div className="col-md-7">
              <Cart cart={cart} total={total} note={note} updateCart={updateCart}  createOrder={createOrder} deleteItem={deleteItem} setNote={setNote} />
            </div>
            <hr />
            <div className='col-12'>
                <OrderList order={order} accountOrderPayment={accountOrderPayment} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
