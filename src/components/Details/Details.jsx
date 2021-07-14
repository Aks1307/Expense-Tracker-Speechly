import React from 'react'
import {Card,CardHeader,CardContent,Typography} from '@material-ui/core'
import { Doughnut } from 'react-chartjs-2';
import useStyle from './styles'
import useTransaction from '../../useTransaction';


const Details = (props) => {
    const styleClass = useStyle();
    const {total,chartData} = useTransaction(props.title);
    console.log(total)
    return (
        <Card className={props.title === 'Income' ? styleClass.income : styleClass.expense}>
            <CardHeader title={props.title}/>
            <CardContent>
                <Typography variant="h5">${total}</Typography>
                <Doughnut data={chartData}/> 
            </CardContent>
        </Card>
    )
}


export default Details
