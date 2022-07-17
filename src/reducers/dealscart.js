
import {
    ADD_PRODUCT_DEAL,
    ADD_PRODUCT_DEAL_ERROR,
    REMOVE_PRODUCT_DEAL,
    REMOVE_PRODUCT_DEAL_ERROR,
    UPDATE_PRODUCT_DEAL,
    UPDATE_PRODUCT_DEAL_ERROR,
    UPDATE_PRODUCT_DEAL_M,
    UPDATE_PRODUCT_DEAL_M_ERROR,
    EDIT_ORDER_DEAL,
    ORDER_DEAL,
    EMPTY_CART,
    EMPTY_CART_ERROR
   } from '../actions/types';
   


   const initialState = {
     deal: null,
     deals: [],
     loadingdishs: true,
     qty: 0,
     subtotal: 0,
     error: {},
     orderID: 0,
     editorder: false,
     
   };
   
   // all cart reducers 
   export default function (state = initialState, action) {
     

     const { type, payload } = action;

  
     let cart = state.deals;
     let qty = state.qty
     let total = state.subtotal
     switch (type) {
  
        //add the product in cart
         case ADD_PRODUCT_DEAL:
         
       console.log(payload.Total)
          qty=payload.Total
          total= total + payload.Dish_Price*payload.Qty



          let addedItem = state.deals.find(product=>  product.DishID === payload.DishID)
          //check if the action id exists in the addedproducts
         let existed_item= state.deals.find(product=>  product.DishID === payload.DishID)
         if(existed_item)
         {
            addedItem.variation = payload.variation 
             return{
                ...state,
                qty: qty,
              subtotal: total,
              loadingdishes: false,
                  }
        }
         else{
          cart.push(payload)
            
            return{
                ...state,
                qty: qty,
              subtotal: total,
              loadingdishes: false,
            }
            
        }

          
           
          //find and remove the product in the cart
          case REMOVE_PRODUCT_DEAL:
          qty--
          total= total - payload.Dish_Price
          
            return {
              ...state,
              deals: cart.filter(item => item.Key !== payload.Key),
              qty: qty,
              subtotal: total,
              loadingdishes: false,
            };

            //update the product in the cart
            case UPDATE_PRODUCT_DEAL:
             
              
             
              let totall=total
              
              
              totall = total +  payload.Dish_Price
              
              console.log(state.deals)
            
                return {
                  ...state,
                  deals: state.deals.map(product =>
                    product.Key === payload.Key
                      ? {...product, Qty: product.Qty + 1}
                      : product,
                  ),
                  subtotal: totall,
                  loadingdishes: false,
                };

            case UPDATE_PRODUCT_DEAL_M:
                 
               
                   
                let totalll=total
                
                totalll = total -  payload.Dish_Price
                
                   
                
                return {
                       ...state,
                       deals: state.deals.map(product =>
                        product.Key === payload.Key
                          ? {...product, Qty: product.Qty - 1}
                          : product,
                      ),
                       subtotal: totalll,
                       loadingdishes: false,
                     };

        case EDIT_ORDER_DEAL:
          console.log("Hello Order")
          return {
            ...state,
            deals: payload.dish,
            subtotal:payload.result[0].amount,
            loading: false,
            editorder: true,
            orderID: payload.result[0].Order_id

          };
   

         //handle errors
         case EMPTY_CART:
          return {
        
           deals: [],
           qty: 0,
           subtotal: 0,
           loadingdishes: true,
          }
     
              //handle errors
              case EMPTY_CART_ERROR:
              case ORDER_DEAL:
              case UPDATE_PRODUCT_DEAL_M_ERROR:
               case UPDATE_PRODUCT_DEAL_ERROR:
               case REMOVE_PRODUCT_DEAL_ERROR:
               case ADD_PRODUCT_DEAL_ERROR:
                 return {
                   ...state,
                   error: payload,
                   loadingdishes: false,
                 };




       default:
         return state;
     }
   }