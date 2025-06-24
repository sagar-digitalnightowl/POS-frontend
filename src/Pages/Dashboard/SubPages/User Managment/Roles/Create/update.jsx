import React from 'react'
import { useState,useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate,useLocation, useParams } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";

import Header from '../../../../../../Components/Header'
import Sidebar from '../../../../../../Components/Sidebar'
import Footer from '../../../../../../Components/Footer'

const Update = ({routes}) => {
    const [error, setError] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();
    console.log(id);
    const [permissions,setPermissions] = useState({})
    const fetchRoleDetails = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/userManagement/role/getRole/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // You may need to add authentication headers, like Bearer token, if required
              // 'Authorization': `Bearer ${yourToken}`
            },
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
    
          const result = await response.json();
          // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
          if (result) {
            setPermissions(result.result);
          } else {
            throw new Error('Failed to fetch data');
          }  
        } catch (error) {
          setError(error.message);
        }
    };

    const updateRole = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/userManagement/role/updateRole/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              // You may need to add authentication headers, like Bearer token, if required
              // 'Authorization': `Bearer ${yourToken}`
            },
            credential:"include", 
            body:JSON.stringify(permissions)
          });
    
          if (!response.ok) {
            toast.error("Unable to update role. Please try again later.")
            throw new Error('Failed to fetch users');
          }
    
          const result = await response.json();
          // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
          if (result) {
            toast.success("Role Updated Successfully")
            setTimeout(() => {
                navigate("/roles");
            }, 1000);
            
          } else {
            throw new Error('Failed to fetch data');
          }  
        } catch (error) {
          setError(error.message);
        }
    };

    const handleSave=(e) => {
        e.preventDefault();
        updateRole();
        console.log(permissions);
    }
          useEffect(() => {
              fetchRoleDetails();
          }, []);
          const handleInputChange = (e) => {
            console.log(e.target.value);
            setPermissions({
              ...permissions,
              [e.target.name]: e.target.value,
            })
          };
        
          const togglePermission = (permission) => {
            setPermissions((prev) => ({
              ...prev,
              [permission]: !prev[permission],
            }));
          };
        
          const toggleAllPermissions = (category, isChecked) => {
            const updatedPermissions = { ...permissions };
        
            category.forEach((perm) => {
              updatedPermissions[perm] = isChecked;
            });
        
            setPermissions(updatedPermissions);
          };
        
          const handleRadioChange = (group, value) => {
            setPermissions((prev) => ({
              ...prev,
              [group]: value,
            }));
          };
    return(
        <div>
  <div className="wrapper thetop">
    <Header/>
    <Sidebar/>
    <div className=" content-wrapper ">
      <section className="content-header">
        <h1>Update Role : {permissions.roleName}</h1>
      </section>
      <section className="content">
        <div className="box box-primary">
          <div className="box-body">
            <form onSubmit={(e) => handleSave(e)}>
              <input name="_token" type="hidden" defaultValue="DDakYpdZQCxl2a5nsklmM5YbFdDl5L2TjPCCwRbj" />
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="name">Role Name:*</label>
                    <input className="form-control" required="" placeholder="Role Name" name="roleName" type="text"id="name" value={permissions.roleName} onChange={handleInputChange}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <label>Permissions:</label>
                </div>
              </div>
              <hr />
              <div className="row check_group">
                <div className="col-md-1">
                  <h4>User</h4>
                </div>
                <div className="col-md-2">
                  <div className="checkbox">
                    <label>
                      <input 
                      type="checkbox"  
                      className="check_all input-icheck" checked={
                      permissions.viewUser &&
                      permissions.addUser &&
                      permissions.editUser &&                                                                     
                      permissions.deleteUser
                      }                                                                      
                      onChange={(e) =>
                        toggleAllPermissions(
                          ["viewUser", "addUser", "editUser", "deleteUser"],
                          e.target.checked
                        )
                      } />
                      Select all
                    </label>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" checked={permissions.viewUser} type="checkbox" onClick={()=>togglePermission("viewUser")}/>
                        View user
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" checked={permissions.addUser} type="checkbox" onClick={()=>togglePermission("addUser")} />
                        Add user
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" checked={permissions.editUser} type="checkbox" onClick={()=>togglePermission("editUser")} />
                        Edit user
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" checked={permissions.deleteUser} type="checkbox" onClick={()=>togglePermission("deleteUser")}/>
                        Delete user
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row check_group">
                <div className="col-md-1">
                  <h4>Roles</h4>
                </div>
                <div className="col-md-2">
                  <div className="checkbox">
                    <label>
                      <input 
                      type="checkbox" 
                      className="check_all input-icheck"
                      checked={
                        permissions.viewRole &&
                        permissions.addRole &&
                        permissions.editRole &&
                        permissions.deleteRole
                      }
                      onChange={(e) =>
                        toggleAllPermissions(["viewRole", "addRole", "editRole", "deleteRole"], e.target.checked)
                      }/>
                      Select all
                    </label>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" checked={permissions.viewRole} onChange={() => togglePermission("viewRole")} type="checkbox" />
                        View role
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.addRole} onChange={() => togglePermission("addRole")}/>
                        Add Role
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.editRole} onChange={() => togglePermission("editRole")}/>
                        Edit Role
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.deleteRole} onChange={() => togglePermission("deleteRole")}/>
                        Delete role
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row check_group">
                <div className="col-md-1">
                  <h4>Supplier</h4>
                </div>
                <div className="col-md-2">
                  <div className="checkbox">
                    <label>
                      <input 
                      type="checkbox" 
                      className="check_all input-icheck"  
                      checked={
                        permissions.viewSupplier &&
                        permissions.viewOwnSupplier &&
                        permissions.addSupplier &&
                        permissions.editSupplier &&
                        permissions.deleteSupplier
                      }
                      onChange={(e) =>
                        toggleAllPermissions([
                          "viewSupplier",
                          "viewOwnSupplier",
                          "addSupplier",
                          "editSupplier",
                          "deleteSupplier",
                        ], e.target.checked)
                      }/>
                      Select all
                    </label>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="radio-group">
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input className="input-icheck" name="supplierView" checked={permissions.viewAllSupplier} onChange={() => handleRadioChange("viewAllSupplier", true)} type="radio"/>
                          View all supplier
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input className="input-icheck" name="supplierView" type="radio" checked={permissions.viewOwnSupplier} onChange={() => handleRadioChange("viewOwnSupplier", true)}/>
                          View own supplier
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox"  checked={permissions.addSupplier}onChange={() => togglePermission("addSupplier")}/>
                        Add supplier
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.editSupplier} onChange={() => togglePermission("editSupplier")}/>
                  
                        Edit supplier
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.deleteSupplier} onChange={() => togglePermission("deleteSupplier")}/>
                        Delete supplier
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row check_group">
                <div className="col-md-1">
                  <h4> Customer
                    <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body"data-toggle="popover"
                      data-placement="auto bottom" data-content="To view all customers with no sell from a specific time 
                      <b>View all customer</b> permission is required otherwise it will filter with only cusromers created by the logged in user"
                      data-html="true"data-trigger="hover"
                    />
                  </h4>
                </div>
                <div className="col-md-2">
                  <div className="checkbox">
                    <label>
                      <input 
                      type="checkbox" 
                      className="check_all input-icheck" 
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setPermissions((prev) => ({
                          ...prev,
                          viewAllCustomer: checked,
                          viewOwnCustomer: checked,
                          addCustomer: checked,
                          editCustomer: checked,
                          deleteCustomer: checked,
                        }));
                      }}
                      checked={
                        permissions.viewAllCustomer &&
                        permissions.viewOwnCustomer &&
                        permissions.addCustomer &&
                        permissions.editCustomer &&
                        permissions.deleteCustomer
                      }/>
                      Select all
                    </label>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" name="customerView" type="radio" checked={permissions.viewAllCustomer} onChange={() => handleRadioChange("viewAllCustomer", true)}/>
            
                        View all customer
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" name="customerView" type="radio" checked={permissions.viewOwnCustomer} onChange={() => handleRadioChange("viewOwnCustomer", true)}/>
            
                        View own customer
                      </label>
                    </div>
                    <hr />
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" name="customerViewBySell" type="radio" checked={permissions.viewCustomersWithNoSellFromOneMonthOnly} onChange={() => handleRadioChange("viewCustomersWithNoSellFromOneMonthOnly", true)}/>
                        View customers with no sell from one month only
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" name="customerViewBySell" type="radio"checked={permissions.viewCustomersWithNoSellFromThreeMonthsOnly} onChange={() => handleRadioChange("viewCustomersWithNoSellFromThreeMonthsOnly", true)}/>
                        View customers with no sell from three months only
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" name="customerViewBySell" type="radio" checked={permissions.viewCustomersWithNoSellFromSixMonthsOnly} onChange={() => handleRadioChange("viewCustomersWithNoSellFromSixMonthsOnly", true)} />
                        View customers with no sell from six months only
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" name="customerViewBySell" type="radio" checked={permissions.viewCustomersWithNoSellFromOneYearOnly} onChange={() => handleRadioChange("viewCustomersWithNoSellFromOneYearOnly", true)}/>
                        View customers with no sell from one year only
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" name="customerViewBySell" type="radio" checked={permissions.viewCustomersIrrespectiveOfTheirSell} onChange={() => handleRadioChange("viewCustomersIrrespectiveOfTheirSell", true)}/>
                        View customers irrespective of their sell
                      </label>
                    </div>
                    <hr />
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.addCustomer} onChange={() => togglePermission("addCustomer")}/>
                        Add customer
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox"checked={permissions.editCustomer} onChange={() => togglePermission("editCustomer")} />
                        Edit customer
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.deleteCustomer} onChange={() => togglePermission("deleteCustomer")}/>
                        Delete customer
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row check_group">
                <div className="col-md-1">
                  <h4>Product</h4>
                </div>
                <div className="col-md-2">
                  <div className="checkbox">
                    <label>
                      <input 
                      type="checkbox"
                      className="check_all input-icheck"
                      checked={
                        permissions.viewProduct &&
                        permissions.addProduct &&
                        permissions.editProduct &&
                        permissions.deleteProduct &&
                        permissions.addOpeningStock &&
                        permissions.viewPurchasePrice
                      }
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setPermissions((prev) => ({
                          ...prev,
                          viewProduct: checked,
                          addProduct: checked,
                          editProduct: checked,
                          deleteProduct: checked,
                          addOpeningStock: checked,
                          viewPurchasePrice: checked,
                        }));
                      }}/>
                      Select all
                    </label>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.viewProduct} onChange={() => togglePermission("viewProduct")}/>
                        View product
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck"  type="checkbox" checked={permissions.addProduct} onChange={() => togglePermission("addProduct")}/>
                        Add product
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.editProduct} onChange={() => togglePermission("editProduct")}/>
                        Edit product
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.deleteProduct} onChange={() => togglePermission("deleteProduct")}/>
                        Delete product
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.addOpeningStock} onChange={() => togglePermission("addOpeningStock")}/>
                        Add Opening Stock
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.viewPurchasePrice} onChange={() => togglePermission("viewPurchasePrice")}/>
                        View Purchase Price
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row check_group">
                <div className="col-md-1">
                  <h4>Purchase &amp; Stock Adjustment</h4>
                </div>
                <div className="col-md-2">
                  <div className="checkbox">
                    <label>
                    <input 
                      type="checkbox" 
                      className="check_all input-icheck"
                      checked={
                        permissions.addPurchaseAndStockAdjustment &&
                        permissions.editPurchaseAndStockAdjustment &&
                        permissions.deletePurchaseAndStockAdjustment &&
                        permissions.addPurchasePayment &&
                        permissions.editPurchasePayment &&
                        permissions.deletePurchasePayment &&
                        permissions.updateStatus
                      }
                      onChange={(e) => {
                        const checked = e.target.checked;
                      
                        setPermissions((prev) => ({
                          ...prev,
                          addPurchaseAndStockAdjustment: checked,
                          editPurchaseAndStockAdjustment: checked,
                          deletePurchaseAndStockAdjustment: checked,
                          addPurchasePayment: checked,
                          editPurchasePayment: checked,
                          deletePurchasePayment: checked,
                          updateStatus: checked,
                        }));
                      }}
                    />
                    
                      Select all
                    </label>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" name="purchaseView" checked={permissions.viewallPurchaseAndStockAdjustment} onChange={() => handleRadioChange("viewallPurchaseAndStockAdjustment", true)} type="radio"/>
                        View all Purchase &amp; Stock Adjustment
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck"  name="purchaseView"
                        checked={permissions.viewOwnPurchaseAndStockAdjustment}
                         onChange={() => handleRadioChange("viewOwnPurchaseAndStockAdjustment")} type="radio" />
                        View own Purchase &amp; Stock Adjustment
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" checked={permissions.addPurchaseAndStockAdjustment}
                        onChange={() => togglePermission("addPurchaseAndStockAdjustment")} 
                        type="checkbox"/>
                        Add purchase &amp; Stock Adjustment
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" checked={permissions.editPurchaseAndStockAdjustment}onChange={() => togglePermission("editPurchaseAndStockAdjustment")} type="checkbox"  />
                
                        Edit purchase &amp; Stock Adjustment
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck"  type="checkbox" checked={permissions.deletePurchasePayment}
                onChange={() => togglePermission("deletePurchasePayment")}/>
                        Delete purchase &amp; Stock Adjustment
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox"checked={permissions.addPurchasePayment}
                onChange={() => togglePermission("addPurchasePayment")}/>
                        Add purchase payment
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.editPurchasePayment}
                onChange={() => togglePermission("editPurchasePayment")}/>
                        Edit purchase payment
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.deletePurchasePayment}
                onChange={() => togglePermission("deletePurchasePayment")}/>
                        Delete purchase payment
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox"checked={permissions.updateStatus}
                onChange={() => togglePermission("updateStatus")}/>
                        Update Status
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row check_group">
                <div className="col-md-1">
                  <h4>POS</h4>
                </div>
                <div className="col-md-2">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox"
                      className="check_all input-icheck"
                      checked={
                        permissions.viewPosSell &&
                        permissions.addPosSell &&
                        permissions.editPosSell &&
                        permissions.deletePosSell &&
                        permissions.editProductPriceFromPosScreen &&
                        permissions.editProductDiscountFromPosScreen &&
                        permissions.addOrEditPayment &&
                        permissions.printInvoice &&
                        permissions.disableMultiplePay &&
                        permissions.disableDraft &&
                        permissions.disableExpressCheckout &&
                        permissions.disableDiscount &&
                        permissions.disableSuspendSale &&
                        permissions.disableCreditSaleButton &&
                        permissions.disableQuotation &&
                        permissions.disableCard
                      }
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setPermissions((prev) => ({
                          ...prev,
                          viewPosSell: checked,
                          addPosSell: checked,
                          editPosSell: checked,
                          deletePosSell: checked,
                          editProductPriceFromPosScreen: checked,
                          editProductDiscountFromPosScreen: checked,
                          addOrEditPayment: checked,
                          printInvoice: checked,
                          disableMultiplePay: checked,
                          disableDraft: checked,
                          disableExpressCheckout: checked,
                          disableDiscount: checked,
                          disableSuspendSale: checked,
                          disableCreditSaleButton: checked,
                          disableQuotation: checked,
                          disableCard: checked,
                        }))
                      }}/>
                      Select all
                    </label>
                  </div>
                </div>
                <div className="col-md-9">
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input
                        className="input-icheck"
                        checked={permissions.viewPosSell}
                        onChange={() => togglePermission("viewPosSell")}
                        type="checkbox"
                      />
                      View POS sell
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input
                        className="input-icheck"
                        checked={permissions.addPosSell}
                        onChange={() => togglePermission("addPosSell")}
                        type="checkbox"
                      />
                      Add POS sell
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input
                        className="input-icheck"
                        checked={permissions.editPosSell}
                        onChange={() => togglePermission("editPosSell")}
                        type="checkbox"
                      />
                      Edit POS sell
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input
                        className="input-icheck"
                        checked={permissions.deletePosSell}
                        onChange={() => togglePermission("deletePosSell")}
                        type="checkbox"
                      />
                      Delete POS sell
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input
                        className="input-icheck"
                        checked={permissions.editProductPriceFromPosScreen}
                        onChange={() => togglePermission("editProductPriceFromPosScreen")}
                        type="checkbox"
                      />
                      Edit product price from POS screen
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input
                        className="input-icheck"
                        checked={permissions.editProductDiscountFromPosScreen}
                        onChange={() => togglePermission("editProductDiscountFromPosScreen")}
                        type="checkbox"
                      />
                      Edit product discount from POS screen
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input
                        className="input-icheck"
                        checked={permissions.addOrEditPayment}
                        onChange={() => togglePermission("addOrEditPayment")}
                        type="checkbox"
                      />
                      Add/Edit Payment
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input
                        className="input-icheck"
                        checked={permissions.printInvoice}
                        onChange={() => togglePermission("printInvoice")}
                        type="checkbox"
                      />
                      Print Invoice
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input
                        className="input-icheck"
                        checked={permissions.disableMultiplePay}
                        onChange={() => togglePermission("disableMultiplePay")}
                        type="checkbox"
                      />
                      Disable Multiple Pay
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input
                        className="input-icheck"
                        checked={permissions.disableDraft}
                        onChange={() => togglePermission("disableDraft")}
                        type="checkbox"
                      />
                      Disable Draft
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input
                        className="input-icheck"
                        checked={permissions.disableExpressCheckout}
                        onChange={() => togglePermission("disableExpressCheckout")}
                        type="checkbox"
                      />
                      Disable Express Checkout
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input
                        className="input-icheck"
                        checked={permissions.disableDiscount}
                        onChange={() => togglePermission("disableDiscount")}
                        type="checkbox"
                      />
                      Disable Discount
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input
                        className="input-icheck"
                        checked={permissions.disableSuspendSale}
                        onChange={() => togglePermission("disableSuspendSale")}
                        type="checkbox"
                      />
                      Disable Suspend Sale
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input
                        className="input-icheck"
                        checked={permissions.disableCreditSaleButton}
                        onChange={() => togglePermission("disableCreditSaleButton")}
                        type="checkbox"
                      />
                      Disable Credit Sale Button
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input
                        className="input-icheck"
                        checked={permissions.disableQuotation}
                        onChange={() => togglePermission("disableQuotation")}
                        type="checkbox"
                      />
                      Disable Quotation
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input
                        className="input-icheck"
                        checked={permissions.disableCard}
                        onChange={() => togglePermission("disableCard")}
                        type="checkbox"
                      />
                      Disable Card
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <hr />
              <div className="row check_group">
                <div className="col-md-1">
                  <h4>Shipments</h4>
                </div>
                <div className="col-md-2">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" 
                      className="check_all input-icheck"
                      checked={
                        permissions.accessAllShipments &&
                        permissions.accessOwnShipments &&
                        permissions.accessPendingShipmentsOnly &&
                        permissions.commissionAgentCanAccessTheirOwnShipments
                      }
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setPermissions((prev) => ({
                          ...prev,
                          accessAllShipments: checked,
                          accessOwnShipments: checked,
                          accessPendingShipmentsOnly: checked,
                          commissionAgentCanAccessTheirOwnShipments: checked,
                        }));
                      }}/>

                      Select all
                    </label>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="radio"  name='viewShipments' checked={permissions.accessAllShipments} onChange={() => handleRadioChange("accessAllShipments")}/>
  
                        Access all shipments
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="radio"  name='viewShipments' checked={permissions.accessOwnShipments} onChange={() => handleRadioChange("accessOwnShipments")}/>
  
                        Access own shipments
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.accessPendingShipmentsOnly} onChange={() => togglePermission("accessPendingShipmentsOnly")}/>
  
                        Access pending shipments only
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.commissionAgentCanAccessTheirOwnShipments} onChange={() => togglePermission("commissionAgentCanAccessTheirOwnShipments")} />
  
                        Commission agent can access their own shipments
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row check_group">
                <div className="col-md-1">
                  <h4>Cash Register</h4>
                </div>
                <div className="col-md-2">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" 
                      className="check_all input-icheck"
                      checked={permissions.viewCashRegister && permissions.closeCashRegister}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setPermissions((prev)=>({
                          ...prev,
                          viewCashRegister: checked,
                          closeCashRegister: checked,

                        }))
                      }}/>
                      Select all
                    </label>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" checked={permissions.viewCashRegister} onChange={() => togglePermission(["viewCashRegister"])} type="checkbox"/>
  
                        View cash register
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.closeCashRegister} onChange={() => togglePermission(["closeCashRegister"])}/>
  
                        Close cash register
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row check_group">
                <div className="col-md-1">
                  <h4>Brand</h4>
                </div>
                <div className="col-md-2">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" 
                      className="check_all input-icheck"
                      checked={
                        permissions.viewBrand &&
                        permissions.addBrand &&
                        permissions.editBrand &&
                        permissions.deleteBrand
                      }
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setPermissions((prev) => ({
                          ...prev,
                          viewBrand: checked,
                          addBrand: checked,
                          editBrand: checked,
                          deleteBrand: checked,
                        }));
                      }}/>
                      Select all
                    </label>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.viewBrand} onChange={() => togglePermission("viewBrand")}/>
            
                        View brand
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox"  checked={permissions.addBrand} onChange={() => togglePermission("addBrand")}/>
            
                        Add brand
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.editBrand} onChange={() => togglePermission("editBrand")}/>
            
                        Edit brand
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.deleteBrand} onChange={() => togglePermission("deleteBrand")}/>
            
                        Delete brand
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row check_group">
                <div className="col-md-1">
                  <h4>Tax Rate</h4>
                </div>
                <div className="col-md-2">
                  <div className="checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        className="check_all input-icheck"
                        checked={
                          permissions.viewTaxRate &&
                          permissions.addTaxRate &&
                          permissions.editTaxRate &&
                          permissions.deleteTaxRate
                        }
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setPermissions((prev) => ({
                            ...prev,
                            viewTaxRate: checked,
                            addTaxRate: checked,
                            editTaxRate: checked,
                            deleteTaxRate: checked,
                          }));
                        }}
                      />
                      Select all
                    </label>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input 
                          className="input-icheck" 
                          type="checkbox" 
                          checked={permissions.viewTaxRate} 
                          onChange={() => togglePermission("viewTaxRate")}
                        />
                        View tax rate
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input 
                          className="input-icheck" 
                          type="checkbox" 
                          checked={permissions.addTaxRate} 
                          onChange={() => togglePermission("addTaxRate")}
                        />
                        Add tax rate
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input 
                          className="input-icheck" 
                          type="checkbox" 
                          checked={permissions.editTaxRate} 
                          onChange={() => togglePermission("editTaxRate")}
                        />
                        Edit tax rate
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input 
                          className="input-icheck" 
                          type="checkbox" 
                          checked={permissions.deleteTaxRate} 
                          onChange={() => togglePermission("deleteTaxRate")}
                        />
                        Delete tax rate
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row check_group">
              <div className="col-md-1">
                <h4>Unit</h4>
              </div>
              <div className="col-md-2">
                <div className="checkbox">
                  <label>
                    <input 
                      type="checkbox" 
                      className="check_all input-icheck"
                      checked={
                        permissions.viewUnit &&
                        permissions.addUnit &&
                        permissions.editUnit &&
                        permissions.deleteUnit
                      }
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setPermissions((prev) => ({
                          ...prev,
                          viewUnit: checked,
                          addUnit: checked,
                          editUnit: checked,
                          deleteUnit: checked,
                        }));
                      }}
                    />
                    Select all
                  </label>
                </div>
              </div>
              <div className="col-md-9">
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input 
                        className="input-icheck" 
                        type="checkbox" 
                        checked={permissions.viewUnit} 
                        onChange={() => togglePermission("viewUnit")}
                      />
                      View unit
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input 
                        className="input-icheck" 
                        type="checkbox" 
                        checked={permissions.addUnit} 
                        onChange={() => togglePermission("addUnit")}
                      />
                      Add unit
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input 
                        className="input-icheck" 
                        type="checkbox" 
                        checked={permissions.editUnit} 
                        onChange={() => togglePermission("editUnit")}
                      />
                      Edit unit
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input 
                        className="input-icheck" 
                        type="checkbox" 
                        checked={permissions.deleteUnit} 
                        onChange={() => togglePermission("deleteUnit")}
                      />
                      Delete unit
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <hr />
              <div className="row check_group">
              <div className="col-md-1">
                <h4>Category</h4>
              </div>
              <div className="col-md-2">
                <div className="checkbox">
                  <label>
                    <input 
                      type="checkbox" 
                      className="check_all input-icheck"
                      checked={
                        permissions.viewCategory &&
                        permissions.addCategory &&
                        permissions.editCategory &&
                        permissions.deleteCategory
                      }
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setPermissions((prev) => ({
                          ...prev,
                          viewCategory: checked,
                          addCategory: checked,
                          editCategory: checked,
                          deleteCategory: checked,
                        }));
                      }}
                    />
                    Select all
                  </label>
                </div>
              </div>
              <div className="col-md-9">
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input 
                        className="input-icheck" 
                        type="checkbox" 
                        checked={permissions.viewCategory} 
                        onChange={() => togglePermission("viewCategory")}
                      />
                      View category
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input 
                        className="input-icheck" 
                        type="checkbox" 
                        checked={permissions.addCategory} 
                        onChange={() => togglePermission("addCategory")}
                      />
                      Add category
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input 
                        className="input-icheck" 
                        type="checkbox" 
                        checked={permissions.editCategory} 
                        onChange={() => togglePermission("editCategory")}
                      />
                      Edit category
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkbox">
                    <label>
                      <input 
                        className="input-icheck" 
                        type="checkbox" 
                        checked={permissions.deleteCategory} 
                        onChange={() => togglePermission("deleteCategory")}
                      />
                      Delete category
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row check_group">
            <div className="col-md-1">
              <h4>Report</h4>
            </div>
            <div className="col-md-2">
              <div className="checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    className="check_all input-icheck"
                    checked={
                      permissions.viewPurchaseSellReport &&
                      permissions.viewTaxReport &&
                      permissions.viewContactsReport &&
                      permissions.viewExpenseReport &&
                      permissions.viewProfitLossReport &&
                      permissions.viewStockReport &&
                      permissions.viewTrendingProductReport &&
                      permissions.viewRegisterReport &&
                      permissions.viewSalesRepresentativeReport &&
                      permissions.viewProductStockValue
                    }
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setPermissions((prev) => ({
                        ...prev,
                        viewPurchaseSellReport: checked,
                        viewTaxReport: checked,
                        viewContactsReport: checked,
                        viewExpenseReport: checked,
                        viewProfitLossReport: checked,
                        viewStockReport: checked,
                        viewTrendingProductReport: checked,
                        viewRegisterReport: checked,
                        viewSalesRepresentativeReport: checked,
                        viewProductStockValue: checked,
                      }));
                    }}
                  />
                  Select all
                </label>
              </div>
            </div>
            <div className="col-md-9">
              <div className="col-md-12">
                <div className="checkbox">
                  <label>
                    <input 
                      className="input-icheck" 
                      type="checkbox" 
                      checked={permissions.viewPurchaseSellReport} 
                      onChange={() => togglePermission("viewPurchaseSellReport")}
                    />
                    View purchase & sell report
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="checkbox">
                  <label>
                    <input 
                      className="input-icheck" 
                      type="checkbox" 
                      checked={permissions.viewTaxReport} 
                      onChange={() => togglePermission("viewTaxReport")}
                    />
                    View Tax report
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="checkbox">
                  <label>
                    <input 
                      className="input-icheck" 
                      type="checkbox" 
                      checked={permissions.viewContactsReport} 
                      onChange={() => togglePermission("viewContactsReport")}
                    />
                    View Supplier & Customer report
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="checkbox">
                  <label>
                    <input 
                      className="input-icheck" 
                      type="checkbox" 
                      checked={permissions.viewExpenseReport} 
                      onChange={() => togglePermission("viewExpenseReport")}
                    />
                    View expense report
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="checkbox">
                  <label>
                    <input 
                      className="input-icheck" 
                      type="checkbox" 
                      checked={permissions.viewProfitLossReport} 
                      onChange={() => togglePermission("viewProfitLossReport")}
                    />
                    View profit/loss report
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="checkbox">
                  <label>
                    <input 
                      className="input-icheck" 
                      type="checkbox" 
                      checked={permissions.viewStockReport} 
                      onChange={() => togglePermission("viewStockReport")}
                    />
                    View stock report, stock adjustment report & stock expiry report
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="checkbox">
                  <label>
                    <input 
                      className="input-icheck" 
                      type="checkbox" 
                      checked={permissions.viewTrendingProductReport} 
                      onChange={() => togglePermission("viewTrendingProductReport")}
                    />
                    View trending product report
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="checkbox">
                  <label>
                    <input 
                      className="input-icheck" 
                      type="checkbox" 
                      checked={permissions.viewRegisterReport} 
                      onChange={() => togglePermission("viewRegisterReport")}
                    />
                    View register report
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="checkbox">
                  <label>
                    <input 
                      className="input-icheck" 
                      type="checkbox" 
                      checked={permissions.viewSalesRepresentativeReport} 
                      onChange={() => togglePermission("viewSalesRepresentativeReport")}
                    />
                    View sales representative report
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="checkbox">
                  <label>
                    <input 
                      className="input-icheck" 
                      type="checkbox" 
                      checked={permissions.viewProductStockValue} 
                      onChange={() => togglePermission("viewProductStockValue")}
                    />
                    View product stock value
                  </label>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row check_group">
          <div className="col-md-1">
            <h4>Settings</h4>
          </div>
          <div className="col-md-2">
            <div className="checkbox">
              <label>
                <input 
                  type="checkbox" 
                  className="check_all input-icheck"
                  checked={
                    permissions.accessBusinessSettings &&
                    permissions.accessBarcodeSettings &&
                    permissions.accessInvoiceSettings &&
                    permissions.accessPrinters
                  }
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setPermissions((prev) => ({
                      ...prev,
                      accessBusinessSettings: checked,
                      accessBarcodeSettings: checked,
                      accessInvoiceSettings: checked,
                      accessPrinters: checked,
                    }));
                  }}
                />
                Select all
              </label>
            </div>
          </div>
          <div className="col-md-9">
            <div className="col-md-12">
              <div className="checkbox">
                <label>
                  <input 
                    className="input-icheck" 
                    type="checkbox" 
                    checked={permissions.accessBusinessSettings} 
                    onChange={() => togglePermission("accessBusinessSettings")}
                  />
                  Access business settings
                </label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="checkbox">
                <label>
                  <input 
                    className="input-icheck" 
                    type="checkbox" 
                    checked={permissions.accessBarcodeSettings} 
                    onChange={() => togglePermission("accessBarcodeSettings")}
                  />
                  Access barcode settings
                </label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="checkbox">
                <label>
                  <input 
                    className="input-icheck" 
                    type="checkbox" 
                    checked={permissions.accessInvoiceSettings} 
                    onChange={() => togglePermission("accessInvoiceSettings")}
                  />
                  Access invoice settings
                </label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="checkbox">
                <label>
                  <input 
                    className="input-icheck" 
                    type="checkbox" 
                    checked={permissions.accessPrinters} 
                    onChange={() => togglePermission("accessPrinters")}
                  />
                  Access printers
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr />
          <div className="row check_group">
          <div className="col-md-1">
            <h4>Expense</h4>
          </div>
          <div className="col-md-2">
            <div className="checkbox">
              <label>
                <input 
                  type="checkbox" 
                  className="check_all input-icheck"
                  checked={permissions.expenseAdd && permissions.expenseEdit && permissions.expenseDelete}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setPermissions((prev) => ({
                      ...prev,
                      expenseAdd: checked,
                      expenseEdit: checked,
                      expenseDelete: checked,
                    }));
                  }}
                />
                Select all
              </label>
            </div>
          </div>
          <div className="col-md-9">
            {/* Radio Options for Expense View */}
            <div className="col-md-12">
              <div className="checkbox">
                <label>
                  <input 
                    className="input-icheck" 
                    name="expenseView" 
                    type="radio" 
                    checked={permissions.accessAllExpenses}
                    onChange={() => handleRadioChange("accessAllExpenses", true)}
                  />
                  Access all expenses
                </label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="checkbox">
                <label>
                  <input 
                    className="input-icheck" 
                    name="expenseView" 
                    type="radio" 
                    checked={permissions.viewOwnExpenseOnly}
                    onChange={() => handleRadioChange("viewOwnExpenseOnly", true)}
                  />
                  View own expense only
                </label>
              </div>
            </div>

            {/* Expense Checkboxes */}
            <div className="col-md-12">
              <div className="checkbox">
                <label>
                  <input 
                    className="input-icheck" 
                    type="checkbox" 
                    checked={permissions.expenseAdd} 
                    onChange={() => togglePermission("expenseAdd")}
                  />
                  Add Expense
                </label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="checkbox">
                <label>
                  <input 
                    className="input-icheck" 
                    type="checkbox" 
                    checked={permissions.expenseEdit} 
                    onChange={() => togglePermission("expenseEdit")}
                  />
                  Edit Expense
                </label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="checkbox">
                <label>
                  <input 
                    className="input-icheck" 
                    type="checkbox" 
                    checked={permissions.expenseDelete} 
                    onChange={() => togglePermission("expenseDelete")}
                  />
                  Delete Expense
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr />
              <div className="row check_group">
                <div className="col-md-3">
                  <h4>
                    Home{" "}
                  </h4>
                </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" checked={permissions.viewHomeData} onChange={()=> togglePermission("viewHomeData")} type="checkbox" />
                        View Home data
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row check_group">
                <div className="col-md-1">
                  <h4>Account</h4>
                </div>
                <div className="col-md-2 ">
                  <div className="checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        className="check_all input-icheck"
                        checked={permissions.accessAccounts && permissions.editAccountTransaction && permissions.deleteAccountTransaction}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setPermissions((prev) => ({
                            ...prev,
                            accessAccounts: checked,
                            editAccountTransaction: checked,
                            deleteAccountTransaction: checked,
                          }));
                        }}
                      />
                      Select all
                      </label>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.accessAccounts} onChange={()=>togglePermission("accessAccounts")}/>
                        Access Accounts
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox"  checked={permissions.editAccountTransaction} onChange={()=>togglePermission("editAccountTransaction")}/>
                        Edit account transaction
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.deleteAccountTransaction} onChange={()=>togglePermission("deleteAccountTransaction")} />
                        Delete account transaction
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-3">
                  <h4>Access selling price groups</h4>
                </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" type="checkbox" checked={permissions.defaultSellingPrice} onChange={()=>togglePermission("defaultSellingPrice")}/>
                        Default Selling Price
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row check_group">
                <div className="col-md-1 ">
                  <h4>Accounting</h4>
                </div>
                <div className="col-md-2">
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        className="check_all input-icheck"
                        checked={
                          permissions.accessAccountingModule &&
                          permissions.manageAccounts &&
                          permissions.viewJournal &&
                          permissions.addJournal &&
                          permissions.editJournal &&
                          permissions.deleteJournal &&
                          permissions.mapTransactions &&
                          permissions.viewTransfer &&
                          permissions.addTransfer &&
                          permissions.editTransfer &&
                          permissions.deleteTransfer &&
                          permissions.manageBudget &&
                          permissions.viewReports}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setPermissions((prev) => ({
                            ...prev,
                            accessAccountingModule: checked,
                            manageAccounts: checked,
                            viewJournal: checked,
                            addJournal: checked,
                            editJournal: checked,
                            deleteJournal: checked,
                            mapTransactions: checked,
                            viewTransfer: checked,
                            addTransfer: checked,
                            editTransfer: checked,
                            deleteTransfer: checked,
                            manageBudget: checked,
                            viewReports: checked,
                          }));
                        }}
                      />
                      Select All
                    </label>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.accessAccountingModule}
                          onChange={() => togglePermission("accessAccountingModule")}

                        />
                        Access Accounting Module
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.manageAccounts}
                          onChange={() => togglePermission("manageAccounts")}
                        />{" "}
                        Manage Accounts
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.viewJournal}
                          onChange={() => togglePermission("viewJournal")}
                        />{" "}
                        View Journal
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.addJournal}
                          onChange={() => togglePermission("addJournal")}
                        />{" "}
                        Add Journal
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.editJournal}
                          onChange={() => togglePermission("editJournal")}
                        />{" "}
                        Edit Journal
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.deleteJournal}
                          onChange={() => togglePermission("deleteJournal")}
                        />{" "}
                        Delete Journal
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.mapTransactions}
                          onChange={() => togglePermission("mapTransactions")}
                        />{" "}
                        Map Transactions
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.viewTransfer}
                          onChange={() => togglePermission("viewTransfer")}
                        />{" "}
                        View Transfer
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.addTransfer}
                          onChange={() => togglePermission("addTransfer")}
                        />{" "}
                        Add Transfer
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.editTransfer}
                          onChange={() => togglePermission("editTransfer")}
                        />{" "}
                        Edit Transfer
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.deleteTransfer}
                          onChange={() => togglePermission("deleteTransfer")}
                        />{" "}
                        Delete Transfer
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.manageBudget}
                          onChange={() => togglePermission("manageBudget")}
                        />{" "}
                        Manage Budget
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.viewReports}
                          onChange={() => togglePermission("viewReports")}
                        />{" "}
                        View Reports
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row check_group">
                <div className="col-md-1">
                  <h4>Crm</h4>
                </div>
                <div className="col-md-2">
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        className="check_all input-icheck"
                        checked={
                          permissions.AccessContactLogin &&
                          permissions.accessSources &&
                          permissions.accessLifeStage &&
                          permissions.accessProposal
                        }
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setPermissions((prev) => ({
                            ...prev,
                            AccessContactLogin: checked,
                            accessSources: checked,
                            accessLifeStage: checked,
                            accessProposal: checked
                          }));
                        }}
                      />
                      Select All
                    </label>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name='accessFollowUp'
                          type="radio"
                          checked={permissions.accessAllFollowUp}
                          onChange={() => handleRadioChange("accessAllFollowUp", true)}
                        />
                        Access all follow up
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name='accessFollowUp'
                          type="radio"
                          checked={permissions.accessOwnFollowUp}
                          onChange={() => handleRadioChange("accessOwnFollowUp", true)}
                        />{" "}
                        Access own follow up
                      </label>
                    </div>
                    <hr />
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name='accessLeads'
                          type="radio"
                          checked={permissions.accessAllLeads}
                          onChange={() => handleRadioChange("accessAllLeads", true)}
                        />{" "}
                        Access all leads
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name='accessLeads'
                          type="radio"
                          checked={permissions.accessOwnLeads}
                          onChange={() => handleRadioChange("accessOwnLeads", true)}

                        />{" "}
                        Access own leads
                      </label>
                    </div>
                    <hr />
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name='accessCampaign'
                          type="radio"
                          checked={permissions.accessAllCampaigns}
                          onChange={() => handleRadioChange("accessAllCampaigns", true)}
                        />{" "}
                        Access all campaigns
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name='accessCampaign'
                          type="radio"
                          checked={permissions.accessOwnCampaigns}
                          onChange={() => handleRadioChange("accessOwnCampaigns", true)}
                        />{" "}
                        Access own campaigns
                      </label>
                    </div>
                    <hr />
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.AccessContactLogin}
                          onChange={()=>togglePermission("AccessContactLogin")}
                        />{" "}
                        Access contact login
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.accessSources}
                          onChange={()=>togglePermission("AccessSources")}
                        />{" "}
                        Access sources
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.accessLifeStage}
                          onChange={()=>togglePermission("accessLifeStage")}
                        />{" "}
                        Access life stage
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          type="checkbox"
                          checked={permissions.accessProposal}
                          onChange={()=>togglePermission("accessProposal")}
                        />{" "}
                        Access proposal
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
                <div className="row check_group">
                  <div className="col-md-1">
                    <h4>Essentials</h4>
                  </div>
                  <div className="col-md-2">
                    <div className="checkbox">
                      <label>
                        <input 
                          type="checkbox" 
                          className="check_all input-icheck"
                          checked={
                            permissions.AddOrEditOrViewOrDeleteLeaveType &&
                            permissions.approveLeave &&
                            permissions.allowUsersToEnterTheirOwnAttendanceFromWeb &&
                            permissions.allowUsersToEnterTheirOwnAttendanceFromApi &&
                            permissions.viewPayComponent &&
                            permissions.addPayComponent &&
                            permissions.addOrEditOrViewOrDeleteDepartment &&
                            permissions.addOrEditOrViewOrDeleteDesignation &&
                            permissions.viewAllPayroll&&
                            permissions.addPayroll&&
                            permissions.editPayroll&&
                            permissions.deletePayroll&&
                            permissions.assignToDosToOthers&&
                            permissions.addToDos&&
                            permissions.editToDos&&
                            permissions.deleteToDos&&
                            permissions.createMessage&&
                            permissions.viewMessage&&
                            permissions.accessSalesTargets
                          }
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setPermissions((prev) => ({
                              ...prev,
                              AddOrEditOrViewOrDeleteLeaveType: checked,
                              approveLeave: checked,
                              allowUsersToEnterTheirOwnAttendanceFromWeb: checked,
                              allowUsersToEnterTheirOwnAttendanceFromApi: checked,
                              viewPayComponent: checked,
                              addPayComponent: checked,
                              addOrEditOrViewOrDeleteDepartment: checked,
                              addOrEditOrViewOrDeleteDesignation: checked,
                              viewAllPayroll: checked,
                              addPayroll: checked,
                              editPayroll: checked,
                              deletePayroll: checked,
                              assignToDosToOthers: checked,
                              addToDos: checked,
                              editToDos: checked,
                              deleteToDos: checked,
                              createMessage: checked,
                              viewMessage: checked,
                              accessSalesTargets: checked,
                            
                            }));
                          }}
                        />
                        Select all
                      </label>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            type="checkbox"
                            checked={permissions.AddOrEditOrViewOrDeleteLeaveType}
                            onChange={()=>togglePermission("AddOrEditOrViewOrDeleteLeaveType")}
                          />{" "}
                          Add/Edit/View/Delete leave type
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="leave"
                            type="radio"
                            checked={permissions.AddOrEditOrViewOrDeleteAllLeave}
                            onChange={()=>handleRadioChange("AddOrEditOrViewOrDeleteAllLeave",true)}
                          />{" "}
                          Add/Edit/View/Delete all leave
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="leave"
                            type="radio"
                            checked={permissions.addOrViewOwnLeave}
                            onChange={()=>handleRadioChange("addOrViewOwnLeave",true)}
                          />{" "}
                          Add/View own leave
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.approveLeave}
                            onChange={()=>togglePermission("approveLeave")}
                          />{" "}
                          Approve Leave
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="attendence"
                            type="radio"
                            checked={permissions.addOrEditOrViewOrDeleteAllAttendance}
                            onChange={()=>handleRadioChange("addOrEditOrViewOrDeleteAllAttendance",true)}
                          />{" "}
                          Add/Edit/View/Delete all attendance
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="attendence"
                            type="radio"
                            checked={permissions.viewOwnAttendance}
                            onChange={()=>handleRadioChange("viewOwnAttendance",true)}
                          />{" "}
                          View own attendance
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.allowUsersToEnterTheirOwnAttendanceFromWeb}
                            onChange={()=>togglePermission("allowUsersToEnterTheirOwnAttendanceFromWeb")}
                          />{" "}
                          Allow users to enter their own attendance from web
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.allowUsersToEnterTheirOwnAttendanceFromApi}
                            onChange={()=>togglePermission("allowUsersToEnterTheirOwnAttendanceFromApi")}
                          />{" "}
                          Allow users to enter their own attendance from api
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.viewPayComponent}
                            onChange={()=>togglePermission("viewPayComponent")}
                          />{" "}
                          View Pay Component
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.addPayComponent}
                            onChange={()=>togglePermission("addPayComponent")}
                          />{" "}
                          Add Pay Component
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.addOrEditOrViewOrDeleteDepartment}
                            onChange={()=>togglePermission("addOrEditOrViewOrDeleteDepartment")}
                          />{" "}
                          Add/Edit/View/Delete department
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.addOrEditOrViewOrDeleteDesignation}
                            onChange={()=>togglePermission("addOrEditOrViewOrDeleteDesignation")}
                          />{" "}
                          Add/Edit/View/Delete designation
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.viewAllPayroll}
                            onChange={()=>togglePermission("viewAllPayroll")}
                          />{" "}
                          View all Payroll
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.addPayroll}
                            onChange={()=>togglePermission("addPayroll")}
                          />{" "}
                          Add Payroll
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.editPayroll}
                            onChange={()=>togglePermission("editPayroll")}
                          />{" "}
                          Edit Payroll
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.deletePayroll}
                            onChange={()=>togglePermission("deletePayroll")}
                          />{" "}
                          Delete Payroll
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.assignToDosToOthers}
                            onChange={()=>togglePermission("assignToDosToOthers")}
                          />{" "}
                          Assign To Do's to others
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.addToDos}
                            onChange={()=>togglePermission("addToDos")}
                          />{" "}
                          Add To Do's
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.editToDos}
                            onChange={()=>togglePermission("editToDos")}
                          />{" "}
                          Edit To Do's
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.deleteToDos}
                            onChange={()=>togglePermission("deleteToDos")}
                          />{" "}
                          Delete To Do's
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.createMessage}
                            onChange={()=>togglePermission("createMessage")}
                          />{" "}
                          Create Message
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.viewMessage}
                            onChange={()=>togglePermission("viewMessage")}
                          />{" "}
                          View Message
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="permissions[]"
                            type="checkbox"
                            checked={permissions.accessSalesTargets}
                            onChange={()=>togglePermission("accessSalesTargets")}
                          />{" "}
                          Access Sales Targets
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              <div className="row check_group">
                <div className="col-md-1">
                  <h4>Repair</h4>
                </div>
                <div className="col-md-2">
                    <div className="checkbox">
                      <label>
                        <input 
                          type="checkbox" 
                          className="check_all input-icheck"
                          checked={
                            permissions.addInvoice &&
                            permissions.editInvoice&&
                            permissions.deleteInvoice &&
                            permissions.changeInvoiceStatus &&
                            permissions.addOrEditOrDeleteJobSheetStatus &&
                            permissions.addJobSheet &&
                            permissions.editJobSheet &&
                            permissions.deleteJobSheet
                          }
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setPermissions((prev) => ({
                              ...prev,
                              addInvoice: checked,
                              editInvoice: checked,
                              deleteInvoice: checked,
                              addOrEditOrDeleteJobSheetStatus: checked,
                              addJobSheet: checked,
                              editJobSheet: checked,
                              deleteJobSheet: checked,
                              changeInvoiceStatus: checked,
                            
                            }));
                          }}
                        />
                        Select all
                      </label>
                    </div>
                  </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name="permissions[]"
                          type="checkbox"
                          checked={permissions.addInvoice}
                          onChange={()=>togglePermission("addInvoice")}
                        />{" "}
                        Add Invoice
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name="permissions[]"
                          type="checkbox"
                          checked={permissions.editInvoice}
                          onChange={()=>togglePermission("editInvoice")}
                        />{" "}
                        Edit Invoice
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name="invoice"
                          type="radio"
                          checked={permissions.viewAllInvoice}
                          onChange={()=>handleRadioChange("viewAllInvoice",true)}
                        />{" "}
                        View all invoice
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name="invoice"
                          type="radio"
                          checked={permissions.viewOwnInvoice}
                          onChange={()=>handleRadioChange("viewOwnInvoice",true)}
                        />{" "}
                        View own invoice
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name="permissions[]"
                          type="checkbox"
                          checked={permissions.deleteInvoice}
                          onChange={()=>togglePermission("deleteInvoice")}
                        />{" "}
                        Delete Invoice
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name="permissions[]"
                          type="checkbox"
                          checked={permissions.changeInvoiceStatus}
                          onChange={()=>togglePermission("changeInvoiceStatus")}
                        />{" "}
                        Change Invoice Status
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name="permissions[]"
                          type="checkbox"
                          checked={permissions.addOrEditOrDeleteJobSheetStatus}
                          onChange={()=>togglePermission("addOrEditOrDeleteJobSheetStatus")}
                        />{" "}
                        Add/Edit/Delete Job Sheet Status
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name="permissions[]"
                          type="checkbox"
                          checked={permissions.addJobSheet}
                          onChange={()=>togglePermission("addJobSheet")}
                        />{" "}
                        Add job sheet
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name="permissions[]"
                          type="checkbox"
                          checked={permissions.editJobSheet}
                          onChange={()=>togglePermission("editJobSheet")}
                        />{" "}
                        Edit Job Sheet
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name="permissions[]"
                          type="checkbox"
                          checked={permissions.deleteJobSheet}
                          onChange={()=>togglePermission("deleteJobSheet")}
                        />{" "}
                        Delete Job Sheet
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input
                          className="input-icheck"
                          name="jobsheets"
                          type="radio"
                          checked={permissions.viewOnlyAssignedJobSheet}
                          onChange={()=>handleRadioChange("viewOnlyAssignedJobSheet",true)}
                        />{" "}
                        View Only Assigned Job Sheet
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" 
                        name="jobsheets" 
                        type="radio" 
                        checked={permissions.viewAllJobSheets} 
                        onChange={()=>handleRadioChange("viewAllJobSheets",true)}
                        />{" "}
                        View All Job Sheets
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row check_group">
                <div className="col-md-3">
                  <h4>Superadmin</h4>
                </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck" 
                        name="permissions[]" 
                        type="checkbox"
                        checked={permissions.accessPackageSubscriptions}
                        onChange={()=>togglePermission("accessPackageSubscriptions")}
                        />{" "}
                        Access package subscriptions
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-center">
                  <button type="submit" className="btn btn-primary btn-big">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className="scrolltop no-print">
        <div className="scroll icon">
          <i className="fas fa-angle-up" />
        </div>
      </div>
    </div>
<Footer/>
  </div>
  <div
    className="modal fade view_modal"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="gridSystemModalLabel"
  />
<ToastContainer position="top-right" autoClose={3000} />
</div>
    )
}

export default Update;