import React, { useEffect, useState } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography, CircularProgress, Box } from "@material-ui/core"
import { FormProvider, useForm } from 'react-hook-form'
import CustomTextField from '../../inputs/CustomTextField'
import { commerce } from "../../../lib/commerce"
import { Link } from 'react-router-dom'

const AddressForm = ({ checkoutToken, next }) => {
  const methods = useForm()
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState('')
  const [loadingSubdivisions, setLoadingSubdivisions] = useState(false)
  const [loadingOptions, setLoadingOptions] = useState(false)

  const fetchShippingCountries = async (checkoutTokenId) => {
    try {
      const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)

      setShippingCountries(countries)
      setShippingCountry(Object.keys(countries)[0])
    } catch (error) {
      console.log(error)
    }
  }

  const fetchShippingSubdivisions = async (countryCode) => {
    try {
      const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)

      setShippingSubdivisions(subdivisions)
      setShippingSubdivision(Object.keys(subdivisions)[0])
      setLoadingSubdivisions(false)
    } catch (error) {
      console.log(error)
      setLoadingSubdivisions(false)
    }
  }

  const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
    try {
      const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })

      setShippingOptions(options)
      setShippingOption(options[0].id)
      setLoadingOptions(false)
    } catch (error) {
      console.log(error)
      setLoadingOptions(false)
    }
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
  }, [checkoutToken])

  useEffect(() => {
    if (shippingCountry) {
      setLoadingSubdivisions(true)
      fetchShippingSubdivisions(shippingCountry)
    }
  }, [shippingCountry])

  useEffect(() => {
    if (shippingSubdivision) {
      setLoadingOptions(true)
      fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }
  }, [shippingSubdivision, checkoutToken, shippingCountry])

  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
          <Grid container spacing={3}>
            <CustomTextField
              name='firstName'
              label='First name'
              required
            />
            <CustomTextField
              name='lastName'
              label='Last name'
              required
            />
            <CustomTextField
              name='address1'
              label='Address'
              required
            />
            <CustomTextField
              name='email'
              label='Email'
              required
            />
            <CustomTextField
              name='city'
              label='City'
              required
            />
            <CustomTextField
              name='zip'
              label='ZIP / Postal code'
              required
            />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} onChange={e => setShippingCountry(e.target.value)} fullWidth>
                {
                  Object.entries(shippingCountries).map(([code, name]) => (
                    <MenuItem key={code} value={code}>{name}</MenuItem>
                  ))
                }
              </Select>
            </Grid>
            {shippingCountry && (
              <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Subdivision</InputLabel>
                {loadingSubdivisions ?
                  <Box display="flex" alignItems="flex-end">
                    <CircularProgress size={24} thickness={2.6} />
                    <span style={{ marginLeft: 8 }}>Loading subdivisions ...</span>
                  </Box> :
                  <Select value={shippingSubdivision} onChange={e => setShippingSubdivision(e.target.value)} fullWidth>
                    {
                      Object.entries(shippingSubdivisions).map(([code, name]) => (
                        <MenuItem key={code} value={code}>{name}</MenuItem>
                      ))
                    }
                  </Select>}
              </Grid>)}
            {shippingSubdivision && (
              <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Option</InputLabel>
                {loadingOptions ?
                  <Box display="flex" alignItems="flex-end">
                    <CircularProgress size={24} thickness={2.6} />
                    <span style={{ marginLeft: 8 }}>Loading options ...</span>
                  </Box> :
                  <Select value={shippingOption} onChange={e => setShippingOption(e.target.value)} fullWidth>
                    {
                      shippingOptions
                        .map(option => ({
                          id: option.id,
                          label: `${option.description} - ${option.price.formatted_with_symbol}`
                        }))
                        .map(({ id, label }) => (
                          <MenuItem key={id} value={id}>{label}</MenuItem>
                        ))
                    }
                  </Select>}
              </Grid>)}
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
            <Button disabled={loadingSubdivisions || loadingOptions} type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
