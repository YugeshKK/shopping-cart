import {Card} from 'react-bootstrap'
import { FormatCurrency } from '../utilities/FormatCurrency'
import {Button} from 'react-bootstrap'
import { useShoppingCart } from '../Context/ShoppingCartContext'


type StoreItemsProp={
    id:number
    name:string
    price: number
    imgUrl: string
    
}

export function StoreItems({id,name, price,imgUrl}:
    StoreItemsProp){

    const{ 
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCartQuantity} = useShoppingCart()

    const quantity=getItemQuantity(id);

return(

    // Rendering Card Items
    <Card>
        <Card.Img
         variant='top'
         src={imgUrl}
         height='200px'
         style={{objectFit:"cover"}}
        />
         <Card className='d-flex flex-columns text-light' style={{backgroundColor:"#303134"}}>
            <Card.Title className='d-flex justify-content-between
             align-items-center mb-4'>
                <span className='fs-2'>{name}</span>
                <span  className='ms-2 text-muted '> {FormatCurrency(price)}</span>
            </Card.Title>
        <div className='mt-auto d-flex align-items-center flex-column'>
            {quantity === 0  ? (
                <Button className='w-100' onClick={ ()=> increaseCartQuantity(id)}>Add To Cart</Button>
            ) : 
            <div className='d-flex align-items-center 
            flex-row' 
            style={{gap:'.5rem'}}>
            
            <Button className='w-100' onClick={ ()=> increaseCartQuantity(id)}>+</Button>
            <div>
                <span className='fs-3'>{quantity}</span>in cart
            </div>
            <Button className='w-100' onClick={ ()=> decreaseCartQuantity(id)}>-</Button>
            </div>} 
            <Button className='bg-danger' onClick={ ()=> removeCartQuantity(id)}>Remove</Button>
        </div>
        </Card>
    </Card>
   
)
}
