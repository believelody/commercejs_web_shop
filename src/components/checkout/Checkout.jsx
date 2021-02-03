import React, { useState } from 'react'
import { Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import useStyle from "./checkoutStyle"
import AddressForm from './form/AddressForm'
import PaymentForm from './form/PaymentForm'
import Confirmation from './Confirmation'

const steps = ['Shipping address', 'Payment details']

const Checkout = () => {
    const classes = useStyle()
    const [activeStep, setActiveStep] = useState(0)
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
            {activeStep === 0 && <AddressForm />}
            {activeStep === 1 && <PaymentForm />}
            {activeStep === steps.length && <Confirmation />}
          </Paper>
      </main>
    </>
  )
}

export default Checkout
