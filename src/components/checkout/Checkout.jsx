import React, { useEffect, useState } from 'react'
import { Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import useStyle from "./checkoutStyle"
import AddressForm from './forms/AddressForm'
import PaymentForm from './forms/PaymentForm'
import Confirmation from './Confirmation'
import { commerce } from '../../lib/commerce'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart }) => {
  const classes = useStyle()
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})

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
        console.log(token);
        setCheckoutToken(token);
      } catch (error) {
        console.log(error);
      }
    }

    generateToken()
  }, [cart])
  return (
    <>
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
          {activeStep === 1 && <PaymentForm shippingData={shippingData} />}
          {activeStep === steps.length && <Confirmation />}
        </Paper>
      </main>
    </>
  )
}

export default Checkout
