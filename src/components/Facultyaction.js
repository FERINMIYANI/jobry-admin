import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Link } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';

import '../App.scss';

export const Facultyaction = () => {
    const [products, setProducts] = useState([]);
    const [checkboxValue, setCheckboxValue] = useState([]);
    const [dropdownItem1, setDropdownItem1] = useState(null);
    // const [dropdownItem, setDropdownItem] = useState(null);
    // const dropdownItems = [
    //     { name: 'Option 1', code: 'Option 1' },
    //     { name: 'Option 2', code: 'Option 2' },
    //     { name: 'Option 3', code: 'Option 3' }
    // ];
    // const [displayBasic, setDisplayBasic] = useState(false);
    // const [displayResponsive, setDisplayResponsive] = useState(false);/
    // const [position, setPosition] = useState('center');
    // const dialogFuncMap = {
    //     'displayBasic': setDisplayBasic,
    //     'displayResponsive': setDisplayResponsive
    // }
    const dropdownItems1 = [
        { name: 'Web Desiging', code: 'surat' },
        { name: 'Fullstack devloper', code: 'Option 2' },
        { name: 'Python', code: 'Option 3' },
        { name: 'Tally', code: 'Option 3' },
        { name: 'Game Developer', code: 'Option 3' }

    ];


    const onCheckboxChange = (e) => {
        let selectedValue = [...checkboxValue];
        if (e.checked)
            selectedValue.push(e.value);
        else
            selectedValue.splice(selectedValue.indexOf(e.value), 1);

        setCheckboxValue(selectedValue);
    };

    const columns = [
        { field: 'code', header: 'CourseName' },

    ];
    const countryBodyTemplate2 = (rowData) => {
        return (
            <React.Fragment>

                <Checkbox name="option" value="Chicago" checked={checkboxValue.indexOf('Chicago') !== -1} onChange={onCheckboxChange} />

            </React.Fragment>
        );
    }
    const countryBodyTemplate3 = (rowData) => {
        return (
            <React.Fragment>
                <Checkbox name="option" value="Chicago" checked={checkboxValue.indexOf('Chicago') !== -1} onChange={onCheckboxChange} />

            </React.Fragment>
        );
    }
    const countryBodyTemplate4 = (rowData) => {
        return (
            <React.Fragment>

                <Link to='/admin/student/work-image'><Button label="View Work Images" icon='pi pi-eye' /></Link>
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
                    <span className='search1'><Link to="/admin/studentadmin">Back</Link> / Faculty Action</span>
                    <Dropdown id="state" value={dropdownItem1} onChange={(e) => setDropdownItem1(e.value)} options={dropdownItems1} optionLabel="name" placeholder="Select Courses  "></Dropdown>
                </div>

                <div className="card">

                    <DataTable value={products} responsiveLayout="scroll" selectableRows >
                        {dynamicColumns}
                        <Column header='Student' body={countryBodyTemplate2} />
                        <Column header='Faculty' body={countryBodyTemplate3} />
                        <Column header='Student Work' body={countryBodyTemplate4} />
                    </DataTable>
                </div>
            </div>
        </>
    );
}