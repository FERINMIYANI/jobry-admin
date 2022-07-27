import React, { useEffect, useState } from 'react';
import { Galleria } from 'primereact/galleria';
import { Link } from 'react-router-dom';
import { PhotoService } from '../service/PhotoService';

export function Workimage() {
  const [images, setImages] = useState([]);
  // const [products, setProducts] = useState([]);

  const galleriaResponsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "960px",
      numVisible: 4,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];


  useEffect(() => {

    const photoService = new PhotoService();
    photoService.getImages().then((images) => setImages(images));
  }, []);
  const galleriaItemTemplate = (item) => <img src={`assets/${item.itemImageSrc}`} alt={item.alt} style={{ width: '100%', display: 'block' }} />
  const galleriaThumbnailTemplate = (item) => <img src={`assets/${item.thumbnailImageSrc}`} alt={item.alt} style={{ width: '100%', display: 'block' }} />

  return (
    <div>
      <div className='card'>
        <span><Link to="/super-admin/student/viewwork">View Work</Link> / Work Images</span>



      </div>

      <div className="">
        <div className="card">
          <h5>Work Images</h5>
          <Galleria value={images} responsiveOptions={galleriaResponsiveOptions} numVisible={7} circular style={{ maxWidth: '800px', margin: 'auto' }}
            item={galleriaItemTemplate} thumbnail={galleriaThumbnailTemplate}></Galleria>
        </div>
      </div>
    </div>);
}
