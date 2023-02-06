import {
    CreateNewProduct,
    DeleteProductByBarcode,
    EditProductByBarcode,
    LoadAllProducts
} from "../helpers/fetch/products/productsFetch";
import {useState} from "react";


export default function ProductsHooks(){
    const [productsGridData, setProductsGridData] = useState([])

    const generateNewProduct = async (item) => {
        const productCreatedResult = await CreateNewProduct(item);
        return productCreatedResult;
    }

    const loadAllProducts = async () => {
        const allProductsLoader = await LoadAllProducts();
        setProductsGridData(allProductsLoader);
        return allProductsLoader
    }

    const updateProductByBarcode = async (item) => {
        const productUpdated = await EditProductByBarcode(item)
        return productUpdated
    }

    const removeProductByBarcode = async (barcode) => {
        const productRemoved = await DeleteProductByBarcode(barcode);
        return productRemoved;
    }

    return {
        generateNewProduct,
        loadAllProducts,
        updateProductByBarcode,
        removeProductByBarcode,
        productsGridData
    }
}