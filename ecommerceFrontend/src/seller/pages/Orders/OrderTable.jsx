import { React, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { fetchSellerOrders, updateOrderStatus } from '../../../State/seller/sellerOrderSlice';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



const orderStatus = [
  { color: '#FFA500', label: 'PENDING' },
  { color: '#F5BCBA', label: 'PLACED' },
  { color: '#F5BCBA', label: 'CONFIRMED' },
  { color: '#1E90FF', label: 'SHIPPED' },
  { color: '#32CD32', label: 'DELIVERED' },
  { color: '#FF0000', label: 'CANCELLED' },
];

const orderStatusColor = {
  PENDING: { color: '#FFA500', label: 'PENDING' },
  PLACED: { color: '#F5BCBA', label: 'PLACED' },
  CONFIRMED: { color: '#F5BCBA', label: 'CONFIRMED' },
  SHIPPED: { color: '#1E90FF', label: 'SHIPPED' },
  DELIVERED: { color: '#32CD32', label: 'DELIVERED' },
  CANCELLED: { color: '#FF0000', label: 'CANCELLED' },
};


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function OrderTable() {

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget); // <-- correct property
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };


  const handleUpdateOrderStatus = (orderId, orderStatus) => {
    console.log(orderId);
    console.log(orderStatus);
    const jwt = localStorage.getItem("jwt");
    if (!jwt || !orderId || !orderStatus) return;
    dispatch(updateOrderStatus({jwt, orderId, orderStatus}));
    handleClose();
  }


  const dispatch = useAppDispatch();
  const { sellerOrder } = useAppSelector(store => store);

  useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem("jwt")))
  }, [])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Id</StyledTableCell>
            <StyledTableCell>Products</StyledTableCell>
            <StyledTableCell align="right">Shipping Address</StyledTableCell>
            <StyledTableCell align="right">Order Status</StyledTableCell>
            <StyledTableCell align="right">update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerOrder.orders.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {item.id}
              </StyledTableCell>
              <StyledTableCell >
                <div className="flex gap-1 flex-wrap">
                  {
                    item.orderItems.map((orderItem) => <div className='flex gap-5'>
                      <img className='w-20 rounded-md' src={orderItem.product.images[0]} alt="" />
                      <div className="flex flex-col justify-between py-2">
                        <h1>Title : {orderItem.product.title}</h1>
                        <h1>Selling Price : {orderItem.product.sellingPrice}</h1>
                        <h1>Color : {orderItem.product.color}</h1>
                      </div>
                    </div>)
                  }
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                <div className="flex flex-col gap-y-2">
                  <h1>{item.shippingAddress.name}</h1>
                  <h1>{item.shippingAddress.address},{item.shippingAddress.city}</h1>
                  <h1>{item.shippingAddress.state}- {item.shippingAddress.pinCode}</h1>
                  <h1><strong>Mobile:</strong>{item.shippingAddress.mobile}</h1>
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                <span className='px-5 py-2 border border-primary rounded-full text-primary'>{item.orderStatus}</span>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={(e) => handleClick(e, item.id)}
                >
                  status
                </Button>
                <Menu
                  id={`status-menu-${item.id}`}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedOrderId === item.id}
                  onClose={handleClose}
                >
                  {orderStatus.map((status) => <MenuItem key={status.label} onClick={() => handleUpdateOrderStatus(item.id, status.label)}>{status.label}</MenuItem>)}

                </Menu>

              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}