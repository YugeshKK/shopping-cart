import {Col,Row} from 'react-bootstrap'
import {StoreItems} from '../Components/StoreItems';
import storeItem from '../Data/items.json'


export   function Store(){
    return(
        <>
        <h1 className='text-light text-center'>Store</h1>
        <Row md={2} xs={1} lg={3} className="g-3">
          {storeItem.map(item => (
            <Col key={item.id}>
              <StoreItems {...item} />
            </Col>
          ))}
        </Row>
      </>
    )
  }

