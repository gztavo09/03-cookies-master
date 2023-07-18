import { Layout } from '@/components/layout'
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { GetServerSideProps } from 'next'
import axios from 'axios'

interface Props {
  theme: string
}

const ThemeChangerPage:FC<Props> = ({ theme }) => {

  const [currentTheme, setCurrentTheme] = useState('light')

  const onChangeState = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme= event.target.value
    setCurrentTheme(selectedTheme)
    Cookies.set('theme', selectedTheme)
  }

  const onClick = async () => {
    const response = await axios.get('/api/hello')
    console.log(response.data);
    
  }

  useEffect(() => {
    console.log(1, Cookies.get('theme'));
    setCurrentTheme(theme)
  }, [])
  

  return (
    <Layout>
        <Card>
          <CardContent>
            <FormControl>
              <FormLabel>
                Tema
              </FormLabel>
              <RadioGroup
                value={ currentTheme }
                onChange={ onChangeState }
              >
                <FormControlLabel value='light' control={<Radio />} label='Light' />
                <FormControlLabel value='dark' control={<Radio />} label='Dark' />
                <FormControlLabel value='custom' control={<Radio />} label='Custom' />
              </RadioGroup>
            </FormControl>
            <Button
              onClick={onClick}
            >
              Solicitud
            </Button>
          </CardContent>
        </Card>
    </Layout>
  )
}

export const getServerSideProps : GetServerSideProps = async ({ req }) => {

  const { theme = 'light' } = req.cookies

  const validThemes = ['light', 'dark', 'custom']

  return {
    props: {
      theme: validThemes.includes(theme) ? theme : 'light'
    }
  }
}

export default ThemeChangerPage