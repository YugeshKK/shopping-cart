import { Offcanvas, OffcanvasHeader, OffcanvasTitle, Stack } from "react-bootstrap"
import { useShoppingCart } from "../Context/ShoppingCartContext"
import {CartItem} from '../Components/CartItem'
import { FormatCurrency } from "../utilities/FormatCurrency"
import storeItem from '../Data/items.json'


type ShoppingCartProps={
    isOpen :boolean
}


export  function ShoppingCart({isOpen}: ShoppingCartProps){

    const {closeCart,cartItems}= useShoppingCart()

    return(
        <Offcanvas show={isOpen} onHide={closeCart}>
            <Offcanvas.Header closeButton>
                <OffcanvasTitle>Cart</OffcanvasTitle>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                      <CartItem key={item.id} {...item}/> 
                    ))}
    <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {FormatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItem.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}