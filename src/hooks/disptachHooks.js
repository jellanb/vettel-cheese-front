import {addDispatchItem, deleteOrder, editOrder, loadAllDispatches} from "../helpers/fetch/dispatch/dispatchFetch";
import {useState} from "react";


export default function DispatchHooks() {
    const [ orderList, setOrderList ] = useState([]);

    const registerNewDispatch = async (body) => {
        return await addDispatchItem(body);
    };

    const loadAllDispatch = async () => {
        const dispatchGridData = await loadAllDispatches();
        setOrderList(dispatchGridData);
    };

    const modifyOrder = async (order) => {
        const orderUpdatedResp = await editOrder(order)
        return orderUpdatedResp;
    };

    const deleteOrderByDispatch = async (order) => {
        const orderDeleteResp = deleteOrder(order.OrderNumber);
        return orderDeleteResp;
    };

    return {
        registerNewDispatch,
        loadAllDispatch,
        setOrderList,
        orderList,
        modifyOrder,
        deleteOrderByDispatch
    }
};