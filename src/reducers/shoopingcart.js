
import {
    ADD_PRODUCT,
    ADD_PRODUCT_ERROR,
    REMOVE_PRODUCT,
    REMOVE_PRODUCT_ERROR,
    UPDATE_PRODUCT,
    SET_FAV_DISH_ERROR,
    SET_FAV_DISH,
    UPDATE_PRODUCT_ERROR,
    UPDATE_PRODUCT_M,
    UPDATE_PRODUCT_M_ERROR,
    EDIT_ORDER,
    ORDER,
    EMPTY_CART_ORDER_ERROR,
    EMPTY_CART_ORDER
   } from '../actions/types';
   
   const initialState = {
     product: null,
     products: [],
     loadingdishs: true,
     qty: 0,
     subtotal: 0,
     error: {},
     orderID: 0,
     tableno:0,
     fav:0,
     favloading:true,
     editorder: false,
     
   };
   
   // all cart reducers 
   export default function (state = initialState, action) {
     

     const { type, payload } = action;

  
     let cart = state.products;
     let qty = state.qty
     let total = state.subtotal
     switch (type) {
  
        //add the product in cart
         case ADD_PRODUCT:
          console.log(state.products)
          cart.push(payload)
          qty++
          total= total + payload.Dish_Price*payload.Qty
          
            return {
              ...state,
              products: state.products.map(product =>
                product.Key === payload.Key ? {...product, variation: payload.variation} : product,
              ),
              qty: qty,
              subtotal: total,
              fav:0,
              favloading:true,
              loadingdishes: false,
            };
          //find and remove the product in the cart
          case REMOVE_PRODUCT:
          qty--
          total= total - payload.Dish_Price
          
            return {
              ...state,
              products: cart.filter(item => item.Key !== payload.Key),
              qty: qty,
              subtotal: total,
              loadingdishes: false,
            };

            //update the product in the cart
            case UPDATE_PRODUCT:
             
              
             
              let totall=total
              
              
              totall = total +  payload.Dish_Price
              
              console.log(state.products)
            
                return {
                  ...state,
                  products: state.products.map(product =>
                    product.Key === payload.Key
                      ? {...product, Qty: product.Qty + 1}
                      : product,
                  ),
                  subtotal: totall,
                  loadingdishes: false,
                };

            case UPDATE_PRODUCT_M:
                 
               
                   
                let totalll=total
                
                totalll = total -  payload.Dish_Price
                
                   
                
                return {
                       ...state,
                       products: state.products.map(product =>
                        product.Key === payload.Key
                          ? {...product, Qty: product.Qty - 1}
                          : product,
                      ),
                       subtotal: totalll,
                       loadingdishes: false,
                     };

        case EDIT_ORDER:
          console.log("Hello Order")
          return {
            ...state,
            products: payload.dish,
            subtotal:payload.result[0].amount,
            loading: false,
            editorder: true,
            orderID: payload.result[0].Order_id,
            tableno: payload.result[0].table_number
          };

          case SET_FAV_DISH:
          console.log("Hello fav Order")
          return {
            ...state,
           fav: payload,
           favloading: false,
            
          };
   
          case EMPTY_CART_ORDER:
            return {
              
              product: null,
              products: [],
              loadingdishs: true,
              qty: 0,
              subtotal: 0,
              error: {},
              orderID: 0,
              tableno:0,
              fav:0,
              favloading:true,
              editorder: false,
     
            }
         //handle errors
         case EMPTY_CART_ORDER_ERROR:
          case ORDER:
          case UPDATE_PRODUCT_M_ERROR:
          case UPDATE_PRODUCT_ERROR:
          case REMOVE_PRODUCT_ERROR:
          case ADD_PRODUCT_ERROR:
          case SET_FAV_DISH_ERROR:
            return {
              ...state,
              error: payload,
              loadingdishes: false,
              favloading:false
            };




       default:
         return state;
     }
   }