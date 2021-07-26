# API for Cupango (Rishav Panda)

## Update as of 26th July, 2021
<br/>

## Models Created in src/models : 

1)&nbsp;  deliveryguys.model

2)&nbsp; items.model

3)&nbsp; orders.model

## Implemented the following routes for Items and Orders respectively : 

### Items 

1) getAllItems (requires Admin authorization)
2) getItemsbyHotel (requires Admin authorization)
3) getItemsById (requires Admin authorization)
4) createAnItem (requires HotelAdmin authorization)
5) updateAnItem (requires HotelAdmin authorization)
6) deleteAnItem (requires HotelAdmin authorization)

Middleware files added to existing code to implement the above Operations : itemValidator.middleware.js

### Orders

1) getAllOrders (requires Admin authorization)
2) getMyOrders (requires NormalUser authorization)
3) placeMyOrder (requires NormalUser authorization)
4) updateMyOrder (requires NormalUser authorization)
5) deleteMyOrder (requires NormalUser authorization)

Middleware files added to existing code to implement the above Operations : orderValidator.middleware.js
