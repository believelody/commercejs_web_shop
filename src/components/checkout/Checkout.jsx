import React, { useEffect, useState } from 'react'
import { Button, CssBaseline, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import useStyle from "./checkoutStyle"
import AddressForm from './forms/AddressForm'
import PaymentForm from './forms/PaymentForm'
import Confirmation from './Confirmation'
import { commerce } from '../../lib/commerce'
import { Link, Redirect } from 'react-router-dom'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, error, onCaptureCheckout }) => {
  const classes = useStyle()
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)

  const nextStep = () => setActiveStep(prevActiveStep => prevActiveStep + 1)
  const backStep = () => setActiveStep(prevActiveStep => prevActiveStep - 1)

  const next = data => {
    setShippingData(data)
    nextStep()
  }

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
        setCheckoutToken(token);
      } catch (error) {
        console.log(error);
      }
    }

    if (cart?.total_items > 0) {
      generateToken()
    }
  }, [cart])

  return (
    !cart ?
      <Redirect to="/" /> :
      <>
        <CssBaseline />
        <div className={classes.toolbar} />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">Checkout</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(step => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === 0 && checkoutToken && <AddressForm checkoutToken={checkoutToken} next={next} />}
            {activeStep === 1 && <PaymentForm backStep={backStep} nextStep={nextStep} checkoutToken={checkoutToken} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />}
            {activeStep === steps.length && <Confirmation order={order} classes={classes} />}
            {error && (
              <>
                <Typography variant="h5">Error: {error}</Typography>
                <br />
                <Button component={Link} to="/" variant="outlined">Back Home</Button>
              </>
            )}
          </Paper>
        </main>
      </>
  )
}

export default Checkout
