import { useReducer, useContext, createContext,useEffect} from "react"

const CartStateContext = createContext();
const CartDispatchContext = createContext();



const reducer = (state,action)=>{
    switch(action.type){
        case "ADD":
            // console.log('Adding item to cart:', action.payload);
            return [...state,action.payload];
        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index,1);
            return newArr;
        case "DROP":
            let empArray = []
            return empArray
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    // console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr
        default:
            throw new Error(`unknown action ${action.type}`);
    }
}



export const CartProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, [])
    useEffect(() => {
        // console.log(state);
      }, [state])

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);