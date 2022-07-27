import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { CustomerService } from '../service/CustomerService';

export const Studentadmin = () => {
    const [globalFilter, setGlobalFilter] = useState(null);
    const [customers1, setCustomers1] = useState(null);
    // const [customers2, setCustomers2] = useState([]);
    // const [customers3, setCustomers3] = useState([]);
    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);


    const representatives = [
        { name: "Amy Elsner", image: 'amyelsner.png' },
        { name: "Anna Fali", image: 'annafali.png' },
        { name: "Asiya Javayant", image: 'asiyajavayant.png' },
        { name: "Bernardo Dominic", image: 'bernardodominic.png' },
        { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
        { name: "Ioni Bowcher", image: 'ionibowcher.png' },
        { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
        { name: "Onyama Limba", image: 'onyamalimba.png' },
        { name: "Stephen Shaw", image: 'stephenshaw.png' },
        { name: "XuXue Feng", image: 'xuxuefeng.png' }
    ];

    // const statuses = [
    //     'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
    // ];

    const customerService = new CustomerService();
    // const productService = new ProductService();

    useEffect(() => {
        setLoading2(true);

        customerService.getCustomersLarge().then(data => { setCustomers1(getCustomers(data)); setLoading1(false) });
        // customerService.getCustomersLarge().then(data => { setCustomers2(getCustomers(data)); setLoading2(false); });
        // customerService.getCustomersMedium().then(data => setCustomers3(data));
        // productService.getProductsWithOrdersSmall().then(data => setProducts(data));

        initFilters1();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const getCustomers = (data) => {
        return [...data || []].map(d => {
            d.date = new Date(d.date);
            return d;
        });
    }
    const countryBodyTemplate2 = (rowData) => {
        return (
            <React.Fragment>
                <Link to="/admin/studentadmin/facultyaction"><Button label="View" icon="pi pi-eye" /></Link>
            </React.Fragment>
        );
    }

    const formatTime = (value) => {
        return value.toLocaleTimeString({
            Hours: '2-digit',
            minute: '2-digit',
        });
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'representative': { value: null, matchMode: FilterMatchMode.IN },
            'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },

        });
    }


    const countryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt="flag" src="assets/demo/images/flags/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} width={100} />

            </React.Fragment>
        );
    }

    const representativeFilterTemplate = (options) => {
        return (<>
            <div className="mb-3 text-bold">Agent Picker</div>
            <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />
        </>
        )
    }

    const representativesItemTemplate = (option) => {
        return (
            <div className="p-multiselect-representative-option">
                <img alt={option.name} src={`assets/demo/images/avatar/${option.image}`} width={32} style={{ verticalAlign: 'middle' }} />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }} className="image-text">{option.name}</span>
            </div>
        );
    }

    const dateBodyTemplate = (rowData) => {
        return formatTime(rowData.date);
    }

    const dateFilterTemplate = (options) => {
        return <time value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }

    const balanceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.balance);
    }


    return (
        <div className="grid table-demo">
            <div className='col-12'>


                <div className='card'>
                    <h4>Student Records</h4>


                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <div className='content'>
                        <span className="p-input-icon-right">
                            <InputText type="text" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search" />                         <i className="pi pi-search" />
                        </span>
                    </div>



                    <DataTable value={customers1} paginator className="p-datatable-gridlines" showGridlines rows={10}
                        dataKey="id" filters={filters1} globalFilter={globalFilter} emptyMessage="No products found." filterDisplay="menu" loading={loading1} responsiveLayout="scroll">
                        <Column header="Image" body={countryBodyTemplate} style={{ minWidth: '8rem' }} />
                        <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="name" header="Course Name" filterField="representative" showFilterMatchModes={false} filterMenuStyle={{ width: '12rem' }} style={{ minWidth: '14rem' }}
                            filter filterElement={representativeFilterTemplate} />
                        <Column header="Running Topic" filterField="date" dataType="date" style={{ minWidth: '8rem' }} body={dateBodyTemplate}
                            filter filterElement={dateFilterTemplate} />
                        <Column header="Mobile No." dataType="numeric" style={{ minWidth: '10rem' }} body={balanceBodyTemplate} />
                        <Column body={countryBodyTemplate2} header="View Work" style={{ minWidth: '6rem' }}></Column>

                    </DataTable>
                </div>
            </div>
        </div>

    );
}

