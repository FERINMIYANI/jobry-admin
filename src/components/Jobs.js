import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Axios from 'axios';
import '../App.scss';

export const Jobs = () => {

  const [jobs, setJobs] = useState()

  useEffect(() => {
    Axios.get(`http://localhost:3000/alljobs`).then((Res) => {
      setJobs(Res.data.details);
    }).catch((e) => {
      console.log(e);
    })
  }, [])

  const companyTemplate = (data) => {
    return (
      <>
        <span>{data.by.companyName}</span>
      </>
    )
  }

  const bidsTemplate = (data) => {
    return data.bids.length
  }


  return (

    <div >
      <div className='card'>
        <h2 style={{color: 'black'}} className='mb-3'>Jobs</h2>
        <div className='data'>
          <DataTable value={jobs} dataKey="id" className="datatable-responsive p-datatable-gridlines datatable" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            emptyMessage="No products found." responsiveLayout="scroll" >

            <Column field="title" header="Title"></Column>
            <Column body={companyTemplate} header="Comapny"></Column>
            <Column body={bidsTemplate} header="Total Bids" />
            <Column field="salary" header="Salary"></Column>

          </DataTable>
        </div>
      </div>

    </div>
  )
}
