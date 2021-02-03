import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import useStyles from "./cartItemStyle"

const CartItem = ({ item }) => {
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
              <Button size="small">-</Button>
              <Typography>{item.quantity}</Typography>
              <Button size="small">+</Button>
          </div>
          <Button variant="contained" color="secondary">remove</Button>
      </CardActions>
    </Card>
  )
}

export default CartItem
