import React from 'react'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import useStyle from './cartStyle'
import CartItem from './CartItem'


const EmptyCart = () => (
    <Typography variant="subtitle1">
        You have no items in your shopping cart, start adding some !
    </Typography>
)

const FilledCart = ({ cart }) => {
    const classes = useStyle()
    return (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map(item => (
                    <Grid item key={item.id} xs={12} sm={4}>
                        <CartItem item={item} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" variant="contained" color="secondary">Empty Cart</Button>
                    <Button className={classes.checkoutButton} size="large" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    )
}

const Cart = ({ cart }) => {
    const classes = useStyle()

    if (!cart.line_items) {
        return <Typography variant="h4">Loading ...</Typography>
    }

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>Your shopping Cart</Typography>
      { !cart.line_items?.length ? <EmptyCart /> : <FilledCart cart={cart} /> }
    </Container>
  )
}

export default Cart
