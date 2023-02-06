export const addDispatchItem = async (body) => {
    const url = `${process.env.REACT_APP_API_URL}/register-new-dispatch`;
    const response = (await fetch(url, { mode: 'cors', method: 'POST', body:JSON.stringify(body), headers:{ 'Content-Type': 'application/json' } }));
    if (response.status === 200) return response.json();
    if (response.status !== 200) return undefined;
};

export const loadAllDispatches = async () => {
    const url = `${process.env.REACT_APP_API_URL}/orders`;
    return (await fetch(url, { mode: 'cors', method: 'GET' })).json();
};

export const editOrder = async (order) => {
    console.log(JSON.stringify(order))
    const url = `${process.env.REACT_APP_API_URL}/update-order`;
    return (await fetch(url, { mode: 'cors', method: 'PUT', body:JSON.stringify(order), headers:{ 'Content-Type': 'application/json' } })).json();
};

export const deleteOrder = async (order) => {
    const url = `${process.env.REACT_APP_API_URL}/delete-order?orderNumber=${order}`;
    return (await fetch(url, { mode: 'cors', method: 'DELETE' })).json();
};


