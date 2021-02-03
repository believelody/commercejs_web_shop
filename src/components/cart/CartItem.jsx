import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import useStyles from "./cartItemStyle"

const CartItem = ({ item, onUpdateQty, onRemoveFromCart }) => {
    const classes = useStyles()
  return (
    <Card>
      <CardMedia className={classes.media} image={item.media.source} alt={item.name} />
      <CardContent className={classes.cardContent}>
          <Typography variant="h4">{item.name}</Typography>
          <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
          <div className={classes.buttons}>
              <Button size="small" onClick={() => onUpdateQty(item.id, item.quantity - 1)}>-</Button>
              <Typography>{item.quantity}</Typography>
              <Button size="small" onClick={() => onUpdateQty(item.id, item.quantity + 1)}>+</Button>
          </div>
          <Button variant="contained" color="secondary" onClick={() => onRemoveFromCart(item.id)}>remove</Button>
      </CardActions>
    </Card>
  )
}

export default CartItem
