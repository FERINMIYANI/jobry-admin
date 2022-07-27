import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { MultiSelect } from 'primereact/multiselect';


import { Dialog } from 'primereact/dialog';

import '../App.scss';

export const Courses = () => {

    const [selectedCountries, setSelectedCountries] = useState(null);

    const [displayBasic, setDisplayBasic] = useState(false);


    // const [displayResponsive, setDisplayResponsive] = useState(false);
    // const [position, setPosition] = useState('center');

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        // 'displayResponsive': setDisplayResponsive
    }
    const countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];

    const countryTemplate = (option) => {
        return (
            <div className="country-item">
                <img alt={option.name} src="images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} />
                <div>{option.name}</div>
            </div>
        );
    }

    const selectedCountriesTemplate = (option) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <img alt={option.name} src="images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} />
                    <div>{option.name}</div>
                </div>
            );
        }

        return "Select Countries";
    }
    const panelFooterTemplate = () => {
        const selectedItems = selectedCountries;
        const length = selectedItems ? selectedItems.length : 0;
        return (
            <div className="py-2 px-3">
                <b>{length}</b> item{length > 1 ? 's' : ''} selected.
            </div>
        );
    }





    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        // if (position) {
        //     setPosition(position);
        // }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const [products, setProducts] = useState([]);
    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Back" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button label="Submit" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
            </div>
        );
    }
    const columns = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Category' },
    ];
    const countryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Link to='/super-admin/course/viewcourse'><Button label="View" icon='pi pi-eye' /></Link>
            </React.Fragment>
        );
    }
    const countryBodyTemplate1 = (rowData) => {
        return (
            <React.Fragment>

                <Button label="Delete" icon='pi pi-trash' />
            </React.Fragment>
        );
    }




    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const dynamicColumns = columns.map((col, i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    return (
        <>
            <div>
                <div className='top'>

                    <div className='card'>
                        <span className="p-input-icon-right  search12">
                            <InputText type="text" placeholder="Search" />
                            <i className="pi pi-search" />
                        </span>
                        <Button label="Add Courses" icon="pi pi-plus" onClick={() => onClick('displayBasic')} />

                    </div>
                    <Dialog header="Add Courses" visible={displayBasic} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                        <div className='card'>
                            <div className="grid">
                                <div className="col-12 md:col-6">
                                    <div className="card p-fluid">

                                        <div className="field">
                                            <label htmlFor="name1">Courses Name</label>
                                            <InputText id="name1" type="text" placeholder='Course Name' />
                                        </div>
                                        <div className='field'>
                                            <label htmlFor="content">Course Content</label>
                                            <MultiSelect value={selectedCountries} options={countries} onChange={(e) => setSelectedCountries(e.value)} optionLabel="name" placeholder="Course Content" filter className="multiselect-custom"
                                                itemTemplate={countryTemplate} selectedItemTemplate={selectedCountriesTemplate} panelFooterTemplate={panelFooterTemplate} />

                                        </div>
                                        <div className="field">
                                            <label htmlFor="name1">Courses Fees</label>
                                            <InputText id="name1" type="Number" placeholder='Course Fees' />
                                        </div>
                                        <div className="field">
                                            <label htmlFor="name1">Courses Duration</label>
                                            <InputText id="name1" type="text" placeholder='Courses Duration' />
                                        </div>
                                        {/* <div className="field col-12 md:col-8">
                            <label htmlFor="state">Sub Courses</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="field col-12 md:col-8">
                            <label htmlFor="state">Sub Courses1</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </div>
                <div className="card">
                    <DataTable value={products} responsiveLayout="scroll" selectableRows className="datatable-responsive p-datatable-gridlines">
                        {dynamicColumns}
                        <Column header='View' body={countryBodyTemplate} />
                        <Column header='Delete' body={countryBodyTemplate1} />
                    </DataTable>
                </div>
            </div>



        </>
    );
}
