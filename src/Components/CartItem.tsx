import { useShoppingCart } from "../Context/ShoppingCartContext"
import storeItems from '../Data/items.json'
import { Button, Stack } from "react-bootstrap"
import { FormatCurrency } from "../utilities/FormatCurrency"



type CartItemProps={
    id:number
    quantity:number
}

export function CartItem({id,quantity }: CartItemProps) {
    const {removeCartQuantity}=useShoppingCart()
    const item = storeItems.find(i=> i.id === id)
    if(item == null) return null

    return(
        <Stack direction='horizontal' gap={2}> 
        <img src={item.imgUrl} style={{width:"125px", height:"75px", objectFit:"cover"}}/>
        <div className="me-auto">
            <div>
                {item.name}{" "}
                {quantity > 1 && 
                    (<span className="text-muted" style={{fontSize:".65rem"}}>
                        x {quantity}
                    </span>
                    )}
            </div>
        </div>
        <div className="text-muted" style={{fontSize:".75rem"}}>
            {FormatCurrency(item.price)}
        </div>
        <div>{FormatCurrency(item.price*quantity)}</div>
        <Button variant='outlined-danger' size="sm" onClick={()=> removeCartQuantity(item.id)}>x</Button>
        </Stack>
    )

}