import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, CircularProgress, Divider, Typography } from '@material-ui/core'

const Confirmation = ({ order, classes }) => {
  const [displayData, setDisplayData] = useState(null)

  useEffect(() => {
    if (order) {
      setDisplayData(order)
    }
  }, [order])

  return (
    displayData ?
      <>
        <div>
          <Typography variant="h5">Thank you for your purchase, {displayData.customer.firstname} {displayData.customer.lastname}</Typography>
          <Divider />
          <Typography variant="subtitle2">Order ref: {displayData.customer_reference}</Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined">Back to Home</Button>
      </>
      :
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
  )
}

export default Confirmation
