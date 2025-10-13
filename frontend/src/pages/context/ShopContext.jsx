import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./authContext";
import axios from "axios";
import { userDataContext } from "./UserContext";


export const shopDataContext = createContext();

function ShopContext({ children }) {
  const { serverUrl } = useContext(authDataContext);
  const {userData} = useContext(userDataContext)
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});

  const currency = "₹";
  const delivery_fee = 40;

  // ✅ Fetch products from backend
  const getProducts = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`);
      setProducts(result.data);
    } catch (error) {
      console.log("❌ Error fetching products:", error);
    }
  };

  // ✅ Add product to cart
  const addtoCart = async (itemId, size) => {
    if (!size) {
      console.log("⚠️ Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItem); // Clone the product

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);
  
 if (userData) {
  try {
   let result = await axios.post(
      serverUrl + '/api/cart/add',
      { itemId, size },
      { withCredentials: true } );
      console.log(result.data)
    
  } catch (error) {
    console.log("❌ Error adding to cart:", error);
  }
}
};




const getUserCart = async () => {
  try {
    const result = await axios.post(
      serverUrl + '/api/cart/get',
      {}, // body data (empty object here)
      { withCredentials: true } 
    );

    setCartItem(result.data);
  } catch (error) {
    console.log("❌ Error fetching user cart:", error);
  }
};


const UpdateQuantity = async (itemId , size , quantity) => {
  let cartData = structuredClone(cartItem);
  cartData[itemId][size]= quantity
  setCartItem(cartData)
  if (userData){
  try{
  await axios.post(serverUrl +'/api/cart/update',{itemId,size,quantity},
    {withCredentials:true}
  )
  }catch(error){
    console.log(error)
  }
}
}

  // ✅ Calculate total items in cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const size in cartItem[items]) {
        try {
          if (cartItem[items][size] > 0) {
            totalCount += cartItem[items][size];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  // ✅ Fetch product list on mount
  useEffect(() => {
    getProducts();
   
  }, []);

   useEffect(() => {
    getUserCart()
  }, []);


const getCartAmount = () => {
  let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {
 console.log(error)
        }
      }
    }
    return totalAmount
    
  }


  const value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    getCartCount,
    addtoCart,
    setCartItem,
    cartItem,
    UpdateQuantity ,
    getCartAmount
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContext;
