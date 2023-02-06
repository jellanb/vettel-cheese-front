import {
    AddInventoryItem,
    LoadInventory,
    EditInventoryItem,
    DeleteInventoryItem
} from "../helpers/fetch/inventory/invetoryFetch";
import {useState} from "react";

export default function InventoryHooks() {
    const [ itemGridData, setItemGridData ] = useState([]);
    const date = new Date().toISOString();
    const AddItemInventory = async (item) => {
        const product = {
            id: item.product.id,
            createdDate: item.product.date,
            updateDate: item.product.updateDate,
            description: item.product.description,
            barcode: item.product.barcode,
            quantity: item.product.quantity,
            saleAmount: item.product.saleAmount
        }
        const newInventoryItem = {
            date: date,
            quantity: parseInt(item.quantity),
            product: product,
            amount: item.product.saleAmount
        }
        const inventoryResult = await AddInventoryItem(newInventoryItem);
        return inventoryResult
    }

    const LoadInventoryData = async () => {
        const inventoryGridData = await LoadInventory()
        setItemGridData(inventoryGridData)
    }

    const UpdateInventoryItem = async (item) => {
        const inventoryUpdatedResult = await EditInventoryItem(item)
        return inventoryUpdatedResult
    }

    const RemoveInventoryItem = async (barcode) => {
        const inventoryItemDeleted = await DeleteInventoryItem(barcode)
        return inventoryItemDeleted
    }

    return {
        AddItemInventory,
        LoadInventoryData,
        itemGridData,
        setItemGridData,
        UpdateInventoryItem,
        RemoveInventoryItem
    }
}
