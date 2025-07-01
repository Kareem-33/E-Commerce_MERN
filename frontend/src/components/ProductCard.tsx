import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import type { IProduct } from '@/types/product.type';

export default function ProductCard({_id, title, image, price}: IProduct) {
  return (
    <Card key={_id} sx={{border:"black solid 1px"}}>
      <CardMedia
        sx={{ height: 200 }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration:"bold"}}>
          {price + " EGP"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' startIcon={<AddShoppingCartIcon />}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}
