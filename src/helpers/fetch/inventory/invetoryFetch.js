export const AddInventoryItem = async (item) => {
    const url = `${process.env.REACT_APP_API_URL}/register-new-item-inventory`;
    const response = (await fetch(url, { mode: 'cors', method: 'POST', body:JSON.stringify(item), headers:{ 'Content-Type': 'application/json' } }));
    if (response.status === 200) return response.json();
    if (response.status !== 200) return undefined;
}

export const LoadInventory = async () => {
    const url = `${process.env.REACT_APP_API_URL}/get-all-inventory`;
    return (await fetch(url, { mode: 'cors', method: 'GET' })).json();
}

export const EditInventoryItem = async (item) => {
    const url = `${process.env.REACT_APP_API_URL}/update-inventory-item`;
    return (await fetch(url, { mode: 'cors', method: 'POST', body:JSON.stringify(item), headers:{ 'Content-Type': 'application/json' } })).json();
}

export const DeleteInventoryItem = async (barcode) => {
    console.log(barcode)
    const url = `${process.env.REACT_APP_API_URL}/delete-inventory-item?barcode=${barcode}`;
    return (await fetch(url, { mode: 'cors', method: 'DELETE'})).json();
}