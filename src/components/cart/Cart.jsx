import React from 'react'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import useStyle from './cartStyle'
import CartItem from './CartItem'
import { Link } from 'react-router-dom'

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleResetCart }) => {
    const classes = useStyle()

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your shopping cart, <Link className={classes.link} to="/">start adding some</Link> !
        </Typography>
    )

    const FilledCart = ({ cart }) => {
        return (
            <>
                <Grid container spacing={3}>
                    {cart.line_items.map(item => (
                        <Grid item key={item.id} xs={12} sm={4}>
                            <CartItem
                                item={item}
                                onUpdateQty={handleUpdateCartQty}
                                onRemoveFromCart={handleRemoveFromCart}
                            />
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.cardDetails}>
                    <Typography variant="h4">
                        Subtotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>
                        <Button
                            className={classes.emptyButton}
                            size="large"
                            variant="contained"
                            color="secondary"
                            onClick={handleResetCart}
                        >
                            Empty Cart
                        </Button>
                        <Button
                            className={classes.checkoutButton}
                            size="large"
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/checkout"
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            </>
        )
    }

    if (!cart.line_items) {
        return <Typography variant="h4">Loading ...</Typography>
    }

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Your shopping Cart</Typography>
            { !cart.line_items?.length ? <EmptyCart /> : <FilledCart cart={cart} />}
        </Container>
    )
}

export default Cart
