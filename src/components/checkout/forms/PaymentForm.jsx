import React from 'react'
import { Box, Button, Divider, Typography } from '@material-ui/core'
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from '../Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({ shippingData, checkoutToken, backStep, onCaptureCheckout, nextStep }) => {
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault()
    if (stripe && elements) {
      const cardElement = elements.getElement(CardElement)

      const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card: cardElement })
      if (error) {
        console.log(error);
      } else {
        const orderData = {
          line_items: checkoutToken.live.line_items,
          customer: {
            firstname: shippingData.firstName,
            lastname: shippingData.lastname,
            email: shippingData.email,
          },
          shipping: {
            name: "Primary",
            street: shippingData.address1,
            town_city: shippingData.city,
            county_state: shippingData.shippingSubdivision,
            postal_zip_code: shippingData.zip,
            country: shippingData.shippingCountry,
          },
          fulfillment: {
            shipping_method: shippingData.shippingOption,
          },
          payment: {
            gateway: "stripe",
            stripe: {
              payment_method_id: paymentMethod.id,
            }
          }
        }

        onCaptureCheckout(checkoutToken.id, orderData)
        nextStep()
      }
    }
  }
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({elements, stripe}) => {
            
            return (
              <form onSubmit={e => handleSubmit(e, elements, stripe)}>
                <CardElement />
                <br />
                <br />
                <Box display="flex" justifyContent="space-between">
                  <Button variant="outlined" onClick={backStep}>Back</Button>
                  <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                  </Button>
                </Box>
              </form>
            )
          }}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm
