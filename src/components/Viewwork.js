import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
// import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';


import '../App.scss';

export const Viewwork = () => {

    const [checkboxValue, setCheckboxValue] = useState([]);
    const dialogFuncMap = {
        // 'displayBasic': setDisplayBasic,
        // 'displayResponsive': setDisplayResponsive
    }



    const onCheckboxChange = (e) => {
        let selectedValue = [...checkboxValue];
        if (e.checked)
            selectedValue.push(e.value);
        else
            selectedValue.splice(selectedValue.indexOf(e.value), 1);

        setCheckboxValue(selectedValue);
    };
    // const toast = useRef(null);

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        // if (position) {
        //     setPosition(position);
        // }
    }


    const [products, setProducts] = useState([]);

    const columns = [
        { field: 'code', header: 'CourseName' },

    ];
    const countryBodyTemplate1 = (rowData) => {
        return (
            <React.Fragment>

                <Button label="Delete" icon='pi pi-trash' />
            </React.Fragment>
        );
    }
    const countryBodyTemplate2 = (rowData) => {
        return (
            <React.Fragment>

                <Checkbox inputId="checkOption1" name="option" value="Chicago" checked={checkboxValue.indexOf('Chicago') !== -1} onChange={onCheckboxChange} />

            </React.Fragment>
        );
    }
    const countryBodyTemplate3 = (rowData) => {
        return (
            <React.Fragment>

                <Checkbox inputId="checkOption1" name="option" value="Chicago" checked={checkboxValue.indexOf('Chicago') !== -1} onChange={onCheckboxChange} />

            </React.Fragment>
        );
    }
    const countryBodyTemplate4 = (rowData) => {
        return (
            <React.Fragment>

                <Link to='/super-admin/student/work-image'><Button label="View Work Images" icon='pi pi-eye' /></Link>
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
                <div className='card'>
                    <span className="p-input-icon-right search1">
                        <InputText type="text" placeholder="Search" />
                        <i className="pi pi-search" />
                    </span>
                    <Link to="/super-admin/students"><Button label="Back" icon="pi pi-angle-left" onClick={() => onClick('displayBasic')} /></Link>

                </div>

                <div className="card">
                    <h1>Courses Name</h1>
                    <DataTable value={products} responsiveLayout="scroll" selectableRows >
                        {dynamicColumns}

                        <Column header='Student' body={countryBodyTemplate2} />
                        <Column header='Faculty' body={countryBodyTemplate3} />



                        <Column header='Student Work' body={countryBodyTemplate4} />

                        {/* <Column header='View' body={countryBodyTemplate} /> */}

                        <Column header='Delete' body={countryBodyTemplate1} />

                    </DataTable>
                </div>
            </div>



        </>
    );
}