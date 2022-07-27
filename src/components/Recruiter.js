import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Link } from 'react-router-dom';
import Axios from 'axios';
// import { FilterMatchMode, FilterOperator } from 'primereact/api';
import '../App.scss';
// import { CustomerService } from '../service/CustomerService';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';



export const Recruiter = () => {
    const toast = useRef(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);
    const [dropdownItem1, setDropdownItem1] = useState(null);
    const [recruiter, setRecruiter] = useState()

    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };
    const [product, setProduct] = useState(emptyProduct);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);

    const dropdownItems1 = [
        { name: 'Web Desiging', code: 'surat' },
        { name: 'Fullstack devloper', code: 'Option 2' },
        { name: 'Python', code: 'Option 3' },
        { name: 'Tally', code: 'Option 3' },
        { name: 'Game Developer', code: 'Option 3' }

    ];
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );

    const jobPostTemplate = (data) => {
        return (data.jobPosted.length)
    }

    useEffect(() => {
        Axios.get(`http://localhost:3000/allrecruiter`).then((Res) => {
            setRecruiter(Res.data.details);
        }).catch((e) => {
            console.log(e);
        })
    }, []);

    return (
        <>

            <div>

                <div className="card">
                    {/* <DataTable value={products} responsiveLayout="scroll"> */}
                    <h2 className='mb-3' style={{ color: 'black' }}>Recruiter</h2>
                    <div className='data'>
                        <DataTable ref={dt} value={recruiter} dataKey="id" style={{ bacgroundColor: 'white', color: 'black' }} className="datatable-responsive p-datatable-gridlines datatable bg-white" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            globalFilter={globalFilter} emptyMessage="No products found." responsiveLayout="scroll" >
                            <Column field="companyName" header="Company Name"></Column>
                            <Column field="name" header="Name"></Column>
                            <Column field="companyEmail" header="Email"></Column>
                            <Column field="specialism" header="specialism"></Column>
                            <Column field="phone" header="mobile"></Column>
                            <Column body={jobPostTemplate} header="Job Posted"></Column>
                            <Column field="state" header="State"></Column>
                            <Column field="city" header="City"></Column>

                        </DataTable>
                    </div>
                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span> Are you sure you want to delete <b>{product.name}</b>?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </>
    );
}
