import {registerPayment} from "../helpers/fetch/payments/paymentsFetch";


export default function PaymentHooks() {
    const newPayment = async (order) => {
        const orderUpdatedResp = await registerPayment(order)
        return orderUpdatedResp;
    };

    return {
        newPayment
    }
}