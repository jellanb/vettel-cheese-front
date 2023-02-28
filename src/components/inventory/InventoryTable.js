import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../helpers/Title/Title';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DialogDeleteItemGrid from "./DialogDeleteItemGrid";
import DialogEditItemGrid from "./DialogEditItemGrid";
import Button from '@mui/material/Button';
import { DialogAddItemGrid } from "./DialogAddItemGrid";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import moment from "moment/moment";


export default function InventoryTable({itemGridData, loadPage, setLoadPage, productsGridData}) {
    const [open, setOpen] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [description, setDescription] = useState();
    const [quantity, setQuantity] = useState();
    const [itemGrid, setItemGrid] = useState([{
        date: "",
        updateDate: "",
        product: {
            createdDate: "",
            updateDate: "",
            description: "",
            barcode: "",
            quantity: "",
            saleAmount: "",
            unitOfMeasurement:""
        },
        quantity: ""
    }]);

    const handleGridDeleteItem = (item) =>{
        setItemGrid(item);
        setOpen(true);
    };
    const handleGridEditItem = (item) =>{
        setDescription(item.product.quantity);
        setDescription(item.product.description);
        setItemGrid(item);
        setOpenEditDialog(true);
    };
    const handleAddButtonClick = () => {
        setOpenAddDialog(true);
    };

    function toDate(dateStr) {
        const dateString = moment(dateStr).format('YYYY-MM-DD');
        return dateString
    };
    
    return (
        <React.Fragment>
            <Title>Inventory</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Bar code</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell align="right">Sale Amount</TableCell>
                        <TableCell align="left">Edit</TableCell>
                        <TableCell align="left">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {itemGridData ? itemGridData.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell>{toDate(row.date)}</TableCell>
                            <TableCell>{row.product.description}</TableCell>
                            <TableCell>{row.product.barcode}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                            <TableCell align="right">{`$${row.saleAmount}`}</TableCell>
                            <TableCell align="right" onClick={() => handleGridEditItem(row)}>
                                <Stack direction="row"  spacing={2}>
                                    <IconButton color="info" aria-label="delete">
                                        <EditIcon />
                                    </IconButton>
                            </Stack></TableCell>
                            <TableCell align="right" onClick={() => handleGridDeleteItem(row)}>
                                <Stack direction="row"  spacing={2}>
                                    <IconButton color="error" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack></TableCell>
                        </TableRow>
                    )): <Typography>nothing inventory item to show...</Typography>}
                </TableBody>
            </Table>
            <br/>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" onClick={handleAddButtonClick} component="label">
                    Add
                </Button>
            </Stack>
            <DialogDeleteItemGrid
                itemGrid={itemGrid}
                open={open}
                setOpen={setOpen}
                loadPage={loadPage}
                setLoadPage={setLoadPage}
            />
            <DialogEditItemGrid
                open={openEditDialog}
                setOpen={setOpenEditDialog}
                item={itemGrid}
                setItem={setItemGrid}
                loadPage={loadPage}
                setLoadPage={setLoadPage}
                description={description}
                setDescription={setDescription}
                quantity={quantity}
                setQuantity={setQuantity}
            />
            <DialogAddItemGrid
                open={openAddDialog}
                setOpen={setOpenAddDialog}
                item={itemGrid}
                setItem={setItemGrid}
                productsGridData={productsGridData}
                loadPage={loadPage}
                setLoadPage={setLoadPage}
            />
        </React.Fragment>
    );
}