import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { Link } from "react-router-dom";
import "../App.scss";

export function Seeker() {
  const [seeker, setSeeker] = useState()
  const [image, setImage] = useState({ preview: "", raw: "" });


  useEffect(() => {
    Axios.get(`http://localhost:3000/allseeker`).then((Res) => {
      setSeeker(Res.data.details);
      console.log(Res.data.details);
    }).catch((e) => {
      console.log(e);
    })
  }, [])


  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };

  // const dropdownItems = [
  //   { name: "Option 1", code: "Option 1" },
  //   { name: "Option 2", code: "Option 2" },
  //   { name: "Option 3", code: "Option 3" },
  // ];
  // const dropdownItems1 = [
  //   { name: "Course 1", code: "surat" },
  //   { name: "Course 2", code: "Option 2" },
  //   { name: "Course 3", code: "Option 3" },
  //   { name: "Course 4", code: "Option 3" },
  //   { name: "Course 5", code: "Option 3" },
  // ];
  // const dropdownItems2 = [
  //   { name: "ABC", code: "surat" },
  //   { name: "DEF", code: "Option 2" },
  //   { name: "GHI", code: "Option 3" },
  //   { name: "JKL", code: "Option 3" },
  //   { name: "MNO", code: "Option 3" },
  // ];

  // const toast = useRef(null);
  // const onUpload = () => {
  //     toast.current.show({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
  // };
  return (
    <div>

      <div className="bg-white p-5">
          <h2 className="mb-3" style={{color: 'black'}}>Seeker</h2>
        <div className="data">
          <DataTable value={seeker} dataKey="id" className="datatable-responsive datatable p-datatable-gridlines bg-white" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            emptyMessage="No products found." responsiveLayout="scroll" >

            <Column field="username" header="Username"></Column>
            <Column field="specialism" header="speacialism"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="mobile" header="Mobile"></Column>
            <Column field="state" header="State"></Column>
            <Column field="city" header="City"></Column>

          </DataTable>
        </div>
      </div>
    </div>
  );
}