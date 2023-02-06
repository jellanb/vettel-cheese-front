import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Fragment} from "react";

export function AutocompleteAddItem({productsGridData, dispatchProducts, setDispatchProducts}) {
    const products = productsGridData.map((item) => {
        return { label: item.description, id: parseInt(item.barcode) };
    });

    const handleProductSelected = async (product) => {
        const productSelected = productsGridData.find((item) => item.barcode === product.id.toString());

        //if (dispatchProducts.find((item) => item === productSelected) !== undefined) return;

        if (!dispatchProducts) {
            setDispatchProducts([{
                createdDate: productSelected.createdDate,
                updateDate: productSelected.updateDate,
                description: productSelected.description,
                barcode: productSelected.barcode,
                quantity: productSelected.quantity,
                saleAmount: productSelected.saleAmount
            }])
        }   else {
            await setDispatchProducts( [...dispatchProducts, {
                createdDate: productSelected.createdDate,
                updateDate: productSelected.updateDate,
                description: productSelected.description,
                barcode: productSelected.barcode,
                quantity: productSelected.quantity,
                saleAmount: productSelected.saleAmount
            }]);
        };
    };

    return (
        <Fragment>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={products}
                onChange={async (event, newValue) => {
                    await handleProductSelected(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Select product" />}
            />

        </Fragment>
    );
};