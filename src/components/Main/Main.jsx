import React from 'react'
import {Card,CardHeader,CardContent,Typography,Grid,Divider} from '@material-ui/core'
import Form from './form/form'
import List from './List/List'
import useStyle from './mainStyle'

const Main = () => {
    const styleClass = useStyle();
    return (
        <Card >
            <CardHeader title="Expense Tracker" subheader="khata"/>
            <CardContent>
                <Typography align="center" variant="h5">Total Balance $100</Typography>
                <Typography variant="subtitle1" style={{lineHeight : '1.5em',marginTop:'20px'}}>
                    {/* <InfoCard/> */}
                </Typography>
                <Divider/>
                <Form/>

            </CardContent>
            <CardContent className={styleClass.cartContent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <List/>
                        </Grid>
                    </Grid>
            </CardContent>
        </Card>
    )
}

export default Main
