import {useContext} from 'react';
import {ExpenseTrackerContext} from './Context/context'
import {incomeCategories,expenseCategories,resetCategories} from './constants/categories'


const useTransaction = (title) =>{
    resetCategories();
    const {transactions} = useContext(ExpenseTrackerContext);
    const transactionsPerType = transactions.filter((t)=> t.type===title)
    const total = transactionsPerType.reduce((acc,cv) => acc+=cv.amount,0);

    const categories = title === 'Income' ? incomeCategories : expenseCategories;
    
    //console.log({transactionsPerType,total,categories})
    transactionsPerType.forEach((t)=>{
        const category = categories.find((c)=> c.type===t.category)
        if(category) category.amount+=t.amount;
    })
    const filteredCategories = categories.filter((c)=>c.amount>0)
    //console.log(filteredCategories)
    const chartData = {
        datasets : [{
            data : filteredCategories.map((c)=>c.amount),
            backgroundColor : filteredCategories.map((c)=>c.color),
        }],
        labels : filteredCategories.map((c)=>c.type)
    }
    console.log(total,chartData)
    return {total,chartData}
}

export default useTransaction;