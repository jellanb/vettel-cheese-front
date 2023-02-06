export const registerPayment = async (order) => {
    console.log(JSON.stringify(order))
    const url = `${process.env.REACT_APP_API_URL}/register-payment`;
    return (await fetch(url, { mode: 'cors', method: 'PUT', body:JSON.stringify(order), headers:{ 'Content-Type': 'application/json' } })).json();
};