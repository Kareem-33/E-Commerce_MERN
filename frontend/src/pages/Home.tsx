import ProductCard from '@/components/ProductCard'
import type { IProduct } from '@/types/product.type'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    try{
      const fetchData = async () => {
        const res = await fetch("http://localhost:3500/api/products");
        const data = await res.json();
        setProducts(data);
      }
      fetchData();
    } catch(error) {
      setError(true);
    }
  }, [])
  return (
    <Container sx={{mt:4, mb:4}}>
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid size={{md:4}}>
            <ProductCard {...p}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home