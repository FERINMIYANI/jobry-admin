import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { Checkbox } from 'primereact/checkbox';
import '../App.scss';

export const For_Student = () => {

    const [checkboxValue, setCheckboxValue] = useState([]);
    const [dropdownItem1, setDropdownItem1] = useState(null);
    const dropdownItems1 = [
        { name: 'Web Desiging', code: 'Option 1' },
        { name: 'Fullstack devloper', code: 'Option 2' },
        { name: 'Python', code: 'Option 3' },
        { name: 'Tally', code: 'Option 4' },
        { name: 'Game Developer', code: 'Option 5' }

    ];


    const onCheckboxChange = (e) => {
        let selectedValue = [...checkboxValue];
        if (e.checked)
            selectedValue.push(e.value);
        else
            selectedValue.splice(selectedValue.indexOf(e.value), 1);

        setCheckboxValue(selectedValue);
    };
    const toast = useRef(null);
    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }
    const [products, setProducts] = useState([]);

    const columns = [
        { field: 'code', header: 'CourseName' },

    ];


    const countryBodyTemplate2 = (rowData) => {
        return (
            <React.Fragment>

                <Checkbox inputId="checkOption1" name="option" value="Chicago" checked={checkboxValue.indexOf('Chicago') !== -1} onChange={onCheckboxChange} />

            </React.Fragment>
        );
    }

    const countryBodyTemplate4 = (rowData) => {
        return (
            <React.Fragment>


                <FileUpload mode="basic" name="demo[]" url="./upload.php" accept="image/*" maxFileSize={1000000} onUpload={onUpload} />


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

                <div className='card '>
                    <span className="p-input-icon-right search13">
                        <h4>Student Activity</h4>
                    </span>

                    <Dropdown id="state" value={dropdownItem1} onChange={(e) => setDropdownItem1(e.value)} options={dropdownItems1} optionLabel="name" placeholder="Select Courses  "></Dropdown>
                </div>



                <div className="card">

                    <DataTable value={products} responsiveLayout="scroll" selectableRows className="datatable-responsive p-datatable-gridlines" >
                        {dynamicColumns}

                        <Column header='Student' body={countryBodyTemplate2} />
                        <Column header='Work upload' body={countryBodyTemplate4} />
                    </DataTable>
                </div>
            </div>



        </>
    );
}