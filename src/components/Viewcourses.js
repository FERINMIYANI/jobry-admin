import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Link } from 'react-router-dom';
import '../App.scss';
import { Dropdown } from 'primereact/dropdown';

export default function Student() {
    // const [filters1, setFilters1] = useState(null);
    const toast = useRef(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);
    // const customerService = new CustomerService();
    const [dropdownItem1, setDropdownItem1] = useState(null);
    const [products, setProducts] = useState(null);

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
    const productService = new ProductService();

    const dropdownItems1 = [
        { name: 'Web Desiging', code: 'surat' },
        { name: 'Fullstack devloper', code: 'Option 2' },
        { name: 'Python', code: 'Option 3' },
        { name: 'Tally', code: 'Option 3' },
        { name: 'Game Developer', code: 'Option 3' }

    ];

    const countryBodyTemplate1 = (rowData) => {
        return (
            <React.Fragment>
                <Button label="Delete" icon="pi pi-trash" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }


    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        let _products = products.filter(val => val.id !== product.id);
        setProducts(_products);
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

    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>

            <div>
                <div className='card'>
                    <span className="p-input-icon-right search">
                        <InputText type="text" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search" />
                        <i className="pi pi-search" />
                    </span>
                    <Dropdown className="dropdown" id="state" value={dropdownItem1} onChange={(e) => setDropdownItem1(e.value)} options={dropdownItems1} optionLabel="name" placeholder="Select Courses  "></Dropdown>
                    <Link to="/super-admin/courses"><Button label="Back" icon="pi pi-plus" /></Link>

                </div>
                <div className="card">
                    {/* <DataTable value={products} responsiveLayout="scroll"> */}
                    <DataTable ref={dt} value={products}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive p-datatable-gridlines"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter} emptyMessage="No products found." responsiveLayout="scroll">
                        {/* <Column field="code" header="Image"></Column> */}
                        <Column field="name" header=" Course Name" filter filterPlaceholder="Search by name" style={{ minWidth: '8rem' }} />
                        <Column field="name" header="Course Content" filterMenuStyle={{ width: '10rem' }} style={{ minWidth: '8rem' }}
                            filter filterPlaceholder="Search by name" />
                        <Column field="name" header="Course Fees" filterField="representative" showFilterMatchModes={false} filterMenuStyle={{ width: '10rem' }} style={{ minWidth: '8rem' }}
                        />

                        <Column field="code" header="Course Duration" filterMenuStyle={{ width: '10rem' }} style={{ minWidth: '8rem' }}
                            filter filterPlaceholder="Search by name" />

                        <Column field="quantity" body={countryBodyTemplate1} header="Delete"></Column>

                    </DataTable>
                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete <b>{product.name}</b>?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </>
    );
}
