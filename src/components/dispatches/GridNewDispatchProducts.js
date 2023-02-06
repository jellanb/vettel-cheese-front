import {Fragment, useState} from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";


export function GridNewDispatchProducts({dispatchProducts, setDispatchProducts}) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        console.log(dispatchProducts);
      setQuantity(event.target.value);
    };
    const handleGridDeleteItem = () =>{

    };

    if (dispatchProducts){
        return (
            <Fragment>
                <Typography variant="subtitle1" gutterBottom>
                    Product List
                </Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Bar code</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell align="right">Sale Amount</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { dispatchProducts.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.barcode}</TableCell>
                                <TableCell>
                                    <TextField
                                        disabled
                                        required
                                        fullWidth
                                        name="Quantity"
                                        id="number"
                                        autoFocus
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        type="number"
                                        variant={"standard"}
                                    />
                                </TableCell>
                                <TableCell align="right">{`$${product.saleAmount}`}</TableCell>
                                <TableCell align="right" onClick={() => handleGridDeleteItem(product)}>
                                    <Stack direction="row"  spacing={2}>
                                        <IconButton color="error" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Fragment>
        )
    }
}