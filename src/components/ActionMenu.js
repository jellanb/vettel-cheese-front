import {InventorySection} from "./inventory/InventorySection";
import {MainDashboard} from "./orders/MainDashboard";
import {ProductsSection} from "./products/ProductsSection";
import {DispatchesSection} from "./dispatches/DispatchesSection";
import {PaymentsSection} from "./payments/PaymentsSection";
import {DispatchDetailsTable} from "./dispatches/DispatchDetailsTable";
import {useEffect, useState} from "react";
import {PaymentDetails} from "./payments/paymentDetails/PaymentDetails";
import InventoryHooks from "../hooks/inventoryHooks";
import ProductsHooks from "../hooks/productsHooks";
import DispatchHooks from "../hooks/disptachHooks";
import React from 'react';


export function ActionMenu({content, setContent}) {
    const [orderDetails, setOrderDetails] = useState();
    const [loadPage, setLoadPage] = useState(0);

    const { LoadInventoryData, itemGridData } = InventoryHooks();
    const { loadAllProducts, productsGridData } = ProductsHooks();
    const { loadAllDispatch, orderList } = DispatchHooks();


    useEffect(function () {
        async function loadData(){
            await LoadInventoryData();
            await loadAllProducts();
            await loadAllDispatch();
        }
        loadData();
    }, [loadPage])

    switch (content) {
        case 'Inventory':
            return <InventorySection itemGridData={itemGridData} loadPage={loadPage} setLoadPage={setLoadPage} productsGridData={productsGridData}/>
            // eslint-disable-next-line
        break;
        case 'Dashboard':
            return <MainDashboard setContent={setContent}/>
            // eslint-disable-next-line
        break;
        case 'Products':
            return <ProductsSection productsGridData={productsGridData} loadPage={loadPage} setLoadPage={setLoadPage}/>
            // eslint-disable-next-line
            break;
        case 'Dispatches':
            return <DispatchesSection
                setContent={setContent}
                setOrderDetails={setOrderDetails}
                productsGridData={productsGridData}
                loadPage={loadPage}
                setLoadPage={setLoadPage}
                orderList={orderList}
            />
            // eslint-disable-next-line
            break;
        case 'Payments':
            return <PaymentsSection
                setContent={setContent}
                setPaymentDetails={setOrderDetails}
                orderList={orderList}
            />
            // eslint-disable-next-line
            break;
        case 'DispatchDetails':
            return <DispatchDetailsTable
                orderDetails={orderDetails}
                setContent={setContent}
                setOrderDetails={setOrderDetails}
                loadPage={loadPage}
                setLoadPage={setLoadPage}
            />
            // eslint-disable-next-line
            break;
        case 'PaymentDetails':
            return <PaymentDetails
                orderDetails={orderDetails}
                setOrderDetails={setOrderDetails}
                setContent={setContent}
                loadPage={loadPage}
                setLoadPage={setLoadPage}
            />
            // eslint-disable-next-line
            break;
        default:
            return <MainDashboard setContent={setContent}/>
    }
}