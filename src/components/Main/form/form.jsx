import React,{useEffect,useState,useContext} from 'react'
import {TextField,Typography,Grid,Button,FormControl,InputLabel,Select,MenuItem} from '@material-ui/core';
import useStyle from './formStyle'
import {v4 as uuidv4} from 'uuid';
import {ExpenseTrackerContext} from '../../../Context/context'
import {incomeCategories,expenseCategories} from '../../../constants/categories'

import {formatDate} from '../../../utils/formatDate'
import {useSpeechContext} from '@speechly/react-client'


const initialState = {
    amount : '',
    category : '' ,
    type : '',
    date : formatDate(new Date())
}



const Form = () => {
    const formStyle = useStyle();
    const  [formData, setFormData] = useState(initialState)
    const {addTransaction} = useContext(ExpenseTrackerContext);
    const {segment} = useSpeechContext();


    const createTransaction = () =>{
            if(Number.isNaN(Number(formData.amount) || !formData.date.includes('-'))) return;
            const transaction = {...formData,amount : Number(formData.amount),id : uuidv4()}
            addTransaction(transaction);
            setFormData(initialState);
    }
     //
     //console.log(formData.date)

     useEffect(()=>{
         if(segment){
             if(segment.intent.intent === 'add_expense'){
                 setFormData({...formData,type:'Expense'})
             }else if(segment.intent.intent==='add_income'){
                 setFormData({...formData,type:'Income'})
             }else if(segment.isFinal  && segment.intent.intent==='create_transaction'){
                 return createTransaction();
             }else if(segment.isFinal && segment.intent.intent==='cancel_transaction'){
                 return setFormData(initialState)
             }

             segment.entities.forEach((e)=>{
                 const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`;
                 console.log(category)
                 switch(e.type){
                    case 'amount' :
                        setFormData({...formData,amount:e.value}) 
                        break;
                    case 'category':
                        setFormData({...formData,category})
                        break;
                    case 'date' :
                        setFormData({...formData,date : e.value});
                        break;        
                    default:
                        break;  
                 }
             })
             if(segment.isFinal && formData.amount && formData.category && formData.date && formData.type){
                 createTransaction();
             }
         }
     },[segment])
    const selectedCategories = formData.type=== 'Income' ? incomeCategories : expenseCategories;
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle1" gutterBottom>
                    {segment && (segment.words.map((w)=>w.value).join(" "))}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                   <FormControl fullWidth>
                       <InputLabel>Type</InputLabel>
                       <Select value={formData.type} onChange={(e)=>setFormData({...formData,type:e.target.value})}>
                           <MenuItem value="Income">Income</MenuItem>
                           <MenuItem value="Expense">Expense</MenuItem>
                       </Select>
                    </FormControl> 
            </Grid>
            <Grid item xs={6}>
                   <FormControl fullWidth>
                       <InputLabel>Category</InputLabel>
                       <Select value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})}>
                       {selectedCategories.map((c)=> <MenuItem key={c.type} value={c.type} >{c.type}</MenuItem>)}
                       </Select>
                    </FormControl> 
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e)=>setFormData({...formData,amount:e.target.value})}/>
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="Date" fullWidth value={formData.date} onChange={(e)=>setFormData({...formData,date:formatDate(e.target.value)})}/>
            </Grid>
            <Button className={formStyle.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}

export default Form
