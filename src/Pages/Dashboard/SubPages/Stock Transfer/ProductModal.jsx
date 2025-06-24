import React, { useEffect, useState } from 'react'
import { apiCall } from '../../../../utils/apiCall';

const ProductModal = ({ show, setModal, editProductData, setEditProductData, formData, setFormData }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);

    const [modalFormData, setModalFormData] = useState({
        product: '',
        quantity: 1,
        unitAmount: 0,
        totalAmount: 0,
    });

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await apiCall({
                method: "get",
                url: "/admin/product/productList/getProducts",
            });

            if (res.status == 200) {
                setProducts(res?.data?.result);
            } else {
                throw new Error("Failed to fetch products");
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    useEffect(() => {
        if (modalFormData.product) {
            const product = products.find(product => product?._id === modalFormData.product)

            const productPrice = product?.defaultSellingPrice?.excTax;

            setModalFormData(prev => ({
                ...prev,
                unitAmount: productPrice,
                totalAmount: productPrice * modalFormData.quantity
            }))
        }
    }, [modalFormData.product, modalFormData.quantity])


    const handleSave = () => {
        const {
            product,
            quantity,
            unitAmount,
            totalAmount } = modalFormData;

        if (!product ||
            !quantity ||
            !unitAmount ||
            !totalAmount) {
            alert('Please fill all fields')
            return;
        }

        const productData = formData.products;
        let isProductExist = false;
        productData?.forEach(element => {
            if (element.product === product) {
                isProductExist = true;
            }
        });

        if (isProductExist) {
            alert("This product already exist")
            return;
        }

        productData.push({
            product,
            quantity,
            totalAmount
        })

        setFormData(prev => ({
            ...prev,
            products: productData
        }));

        setModalFormData({
            product: '',
            quantity: 1,
            unitAmount: 0,
            totalAmount: 0,
        })
    }

    const textStyle = { color: 'black' };
    if (!show) return null;

    return (
        <div className="modal-overlay" style={textStyle}>
            <div className="modal-content">
                <header className="modal-header">
                    <h2>Add Product</h2>
                    <button className="modal-close" onClick={() => setModal(false)}>×</button>
                </header>


                <div>

                    <div className="">
                        <div className="form-group" style={{ width: "100%" }}>
                            <label htmlFor="productId">Product:</label>
                            <select
                                className="form-control select2"
                                required=""
                                id="productId"
                                name="product"
                                value={modalFormData.product}
                                onChange={handleChange}
                            >
                                <option value="">Please Select</option>
                                {
                                    products.map(product => (
                                        <option key={product?._id} value={product?._id}>{product?.productName}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="">
                        <div className="form-group">
                            <label htmlFor="paid_on_0">Quantity:</label>
                            <div className="input-group" style={{ width: "100%" }}>
                                <input
                                    className="form-control paid_on"
                                    readOnly=""
                                    required=""
                                    name="quantity"
                                    type="number"
                                    value={modalFormData.quantity}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>


                </div>

                <div style={{ fontWeight: 800 }}>
                    <p>Unit Amount: {modalFormData.unitAmount || 0}</p>
                    <p>Total Amount: {modalFormData.totalAmount || 0}</p>
                </div>

                <div className="modal-footer">
                    <button type="submit" className="btn-save" disabled={loading} onClick={handleSave}>
                        {loading ? 'Processing...' : 'Save'}
                    </button>
                    <button type="button" className="btn-cancel" onClick={() => setModal(false)} disabled={loading}>
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ProductModal