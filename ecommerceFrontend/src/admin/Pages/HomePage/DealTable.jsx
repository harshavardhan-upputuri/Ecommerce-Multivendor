import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import {useAppDispatch, useAppSelector } from '../../../State/Store'
import { fetchDeals } from '../../../State/admin/DealSlice';
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function DealTable() {
  const dispatch=useAppDispatch();
  const {deal} =useAppSelector(store=>store);


  useEffect(()=>{
    console.log(deal.deals)
    dispatch(fetchDeals());
  },[])
 
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Discount</StyledTableCell>
            <StyledTableCell>Edit</StyledTableCell>
            <StyledTableCell>Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deal.deals.map((row,index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell >
                <img src={row.category.image} className='w-20 h-20 rounded-md' alt="" />
              </StyledTableCell>
              <StyledTableCell >{row.category.categoryId}</StyledTableCell>
              <StyledTableCell >{row.discount}% </StyledTableCell>
              <StyledTableCell >
                <Button>
                    <Edit/>
                </Button>
              </StyledTableCell>
               <StyledTableCell >
                <Button>
                    <Delete sx={{color:"red"}}/>
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
 

 
