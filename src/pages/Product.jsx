import React from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
  const params = useParams();
  const {slug } = params;
  return (
    <section>
      <h2>{slug}</h2>
    </section>
  )
}

export default Product