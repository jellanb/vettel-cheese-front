export const CreateNewProduct = async (item) => {
    const url = `${process.env.REACT_APP_API_URL}/create-product`;
    return (await fetch(url, { mode: 'cors', method: 'POST',body:JSON.stringify(item), headers:{ 'Content-Type': 'application/json' } })).json();
}

export const LoadAllProducts = async () => {
    const url = `${process.env.REACT_APP_API_URL}/load-all-products`;
    return (await fetch(url, { mode: 'cors', method: 'GET' })).json();
}

export const EditProductByBarcode = async (item) => {
    console.log(JSON.stringify(item))
    const url = `${process.env.REACT_APP_API_URL}/update-product`;
    return (await fetch(url, { mode: 'cors', method: 'PUT', body:JSON.stringify(item), headers:{ 'Content-Type': 'application/json' } })).json();
}

export const DeleteProductByBarcode = async (barcode) => {
    console.log(JSON.stringify(barcode))
    const url = `${process.env.REACT_APP_API_URL}/delete-product?barcode=${barcode}`;
    return (await fetch(url, { mode: 'cors', method: 'DELETE'})).json();
}