import {Fragment, useState} from "react";
import Title from "../../helpers/Title/Title";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import * as React from "react";
import {DialogEditProductItemGrid} from "./DialogEditProductItemGrid";
import {DialogDeleteProductItemGrid} from "./DialogDeleteProductItemGrid";
import {DialogAddProductItemGrid} from "./DialogAddProductItemGrid";
import Typography from "@mui/material/Typography";
import moment from "moment/moment";

export function ProductsTable({productsGridData, loadPage, setLoadPage}) {
    const [openDialogEditProduct, setOpenDialogEditProduct] = useState(false);
    const [openDialogDeleteProductDialog, setOpenDialogDeleteProductDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [description, setDescription] = useState();
    const [quantity, setQuantity] = useState();
    const [amount, setAmount] = useState();
    const [itemGrid, setItemGrid] = useState({
        createdDate: "",
        updateDate: "",
        description: "",
        barcode: "",
        quantity: "",
        saleAmount: ""
    });

    const handleGridDeleteItem = (item) =>{
        setDescription(item.description);
        setQuantity(item.quantity);
        setAmount(item.saleAmount);
        setItemGrid(item);
        setOpenDialogDeleteProductDialog(true);
    };
    const handleGridEditItem = (item) =>{
        setDescription(item.description);
        setQuantity(item.quantity);
        setAmount(item.saleAmount);
        setOpenDialogEditProduct(true);
        setItemGrid(item);
    };
    const handleAddButtonClick = () => {
        setOpenAddDialog(true);
    };
    function toDate(dateStr) {
        const dateString = moment(dateStr).format('YYYY-MM-DD');
        return dateString
    };

    return (
        <Fragment>
            <Title>Products</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Update Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Bar code</TableCell>
                        <TableCell>Quanity</TableCell>
                        <TableCell>Unit of messure</TableCell>
                        <TableCell align="right">Sale Amount</TableCell>
                        <TableCell align="left">Edit</TableCell>
                        <TableCell align="left">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productsGridData ? productsGridData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{toDate(row.createdDate)}</TableCell>
                            <TableCell>{toDate(row.updateDate)}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.barcode}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                            <TableCell>{row.unitOfMeasurement}</TableCell>
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
            <DialogEditProductItemGrid
                openDialogEditProduct={openDialogEditProduct}
                setOpenDialogEditProduct={setOpenDialogEditProduct}
                item={itemGrid} setItem={setItemGrid}
                loadPage={loadPage}
                setLoadPage={setLoadPage}
                description={description}
                setDescription={setDescription}
                quantity={quantity}
                setQuantity={setQuantity}
                amount={amount}
                setAmount={setAmount}
            />
            <DialogDeleteProductItemGrid
                item={itemGrid}
                open={openDialogDeleteProductDialog}
                setOpen={setOpenDialogDeleteProductDialog}
                loadPage={loadPage}
                setLoadPage={setLoadPage}/>
            <DialogAddProductItemGrid
                open={openAddDialog}
                setOpen={setOpenAddDialog}
                loadPage={loadPage}
                setLoadPage={setLoadPage}/>
        </Fragment>
    )
}