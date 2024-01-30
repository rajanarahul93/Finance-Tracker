import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GlobalContext } from '../context/GlobalState';

const AddTransaction = () => {
    const { addIncome, addExpense } = useContext(GlobalContext);
    
    // Income
    const [income, setIncome] = useState({
        incomeText: '',
        incomeAmount: 0
    });

    const { incomeText, incomeAmount } = income;

    const onChangeIncome = (e) => {
        setIncome({
            ...income,
            [e.target.name]: e.target.value
        });
        console.log(incomeText);
    };

    const onSubmitIncome = e => {
        e.preventDefault();

        if(incomeText !== "") {
            const newIncomeTransaction = {
                id: uuidv4(),
                incomeText,
                incomeAmount: incomeAmount * 1 
            };
    
            addIncome(newIncomeTransaction);
            setIncome({
                incomeText: "",
                incomeAmount: 0
            });
        }
    };

    // Expense
    const [expense, setExpense] = useState({
        expenseText: '',
        expenseAmount: 0
    });

    const { expenseText, expenseAmount } = expense;

    const onChangeExpense = (e) => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });
        console.log(expenseText);
    };

    const onSubmitExpense = e => {
        e.preventDefault();

        if(expenseText !== "") {
            const newExpenseTransaction = {
                id: uuidv4(),
                // expenseText: expenseText => This is not right according to ES6 syntax.
                expenseText,
                // expenseAmount => This will be read as String, not number. So I need to multiply to set as Number.
                expenseAmount: expenseAmount * 1 // In order to set 'incomeAmount' as Number, not String.
            };
    
            addExpense(newExpenseTransaction);

            // set String and Number values to empty after submitting the input
            setExpense({
                expenseText: "",
                expenseAmount: 0
            });
        }
    };

    return (
        <div className="form-wrapper">
            {/* Income Form */}
            <form onSubmit={onSubmitIncome}>
                <div className="input-group income">
                    <input 
                        name="incomeText"
                        type="text" 
                        placeholder="Add Income..." 
                        autoComplete="off" 
                        value={incomeText}
                        onChange={onChangeIncome}
                    />
                    <input 
                        name="incomeAmount"
                        type="number" 
                        placeholder="Amount" 
                        autoComplete="off" 
                        value={incomeAmount} 
                        onChange={onChangeIncome}
                    />
                    <input 
                        type="submit" 
                        value="Submit"
                    />
                </div>
            </form>
            {/* Expense Form */}
            <form onSubmit={onSubmitExpense}>
                <div className="input-group expense">
                    <input 
                        name="expenseText"
                        type="text" 
                        placeholder="Add Expense..." 
                        autoComplete="off" 
                        value={expenseText}
                        onChange={onChangeExpense}
                    />
                    <input 
                        name="expenseAmount"
                        type="number" 
                        placeholder="Amount" 
                        autoComplete="off" 
                        value={expenseAmount} 
                        onChange={onChangeExpense}
                    />
                    <input 
                        type="submit" 
                        value="Submit"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddTransaction;
