import React, { useEffect } from 'react';
import './expenses.css';

function addData(){
    let source = document.getElementById('source-input2').value;
    let amount = document.getElementById('amount-input2').value;

    let Data = localStorage.getItem('expensesData');
    if (Data === null){
        Data = [];
    }
    else{
        Data = JSON.parse(Data);
    }
    
    let newObject = {
        source: source,
        amount: amount};

    Data.push(newObject);
    Data = JSON.stringify(Data);
    localStorage.setItem('expensesData', Data);
    
    location.reload();
}

function addExpenses(){
    let popup = document.getElementById('add-expenses');
    popup.classList.toggle('display');
}

function removeSource(sourceToDelete){
    let Data = localStorage.getItem('expensesData');
    if (Data === null){
        Data = [];
    }
    else{
        Data = JSON.parse(Data);
    }

    let newData = [];
    for (let object of Data){
        if (object.source !== sourceToDelete){
            newData.push(object);
        }
    }
    console.log(newData);
    newData = JSON.stringify(newData);
    localStorage.setItem('expensesData', newData);

    location.reload();
}












function Expenses() {
    useEffect(() => {
        const handleLoad = () => {
            updatePerc2();
        };

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    const updatePerc2 = () => {
        let source = document.getElementsByClassName('exp-source');
        let amounts = document.getElementsByClassName('exp-amount');
        let perc = document.getElementsByClassName('exp-percentage-of-total');

        let total = 0;
        for (let amount of amounts) {
            amount = Number((amount.innerHTML).split('€')[0]);
            total += amount;
        }

        let index = 0;
        for (let amount of amounts) {
            amount = Number((amount.innerHTML).split('€')[0]);
            let percOfTotal = (amount / total) * (100 / 1);
            perc[index].innerHTML = `${percOfTotal.toFixed(1)}%`;
            index++;
        }
        results2();
    };

    const results2 = () => {
        let resultExpenses = document.getElementById('expenses-result');
        let highestExpenses = document.getElementById('highest-expenses-result');
        let expensesAsPercOfIncome = document.getElementById('expenses-of-income-result');

        // Calculate total & get the highest income
        let source = document.getElementsByClassName('exp-source');
        let amounts = document.getElementsByClassName('exp-amount');
        let total = 0;
        let index = 0;
        let highestINC = 0;
        for (let amount of amounts) {
            let amount_number = Number((amount.innerHTML).split('€')[0]);
            total += amount_number;
            if (highestINC < amount_number) {
                highestINC = `${(source[index]).innerHTML} - ${amount.innerHTML}`;
            }
            index += 1;
        }

        let totalINCOME = localStorage.getItem('totalIncome');
        totalINCOME = Number(totalINCOME);
        let ExpAsPercOfIncome = (total / totalINCOME) * 100;

        // Modify the HTML
        resultExpenses.innerHTML = `-${total}€`;
        highestExpenses.innerHTML = highestINC;
        expensesAsPercOfIncome.innerHTML = `${ExpAsPercOfIncome.toFixed(1)}%`;
    };

    // Getting Data
    let Data = localStorage.getItem('expensesData');
    Data = JSON.parse(Data);

    if (Data === null){
        Data = [
            {
                source: 'Example',
                amount: '0'
            }
        ];
    }


    return (
        <>
            <div id='add-expenses'>
                <button id='x-button2' onClick={addExpenses}>X</button>
                <center><h2 id='popup-title2'>Add expenses source</h2></center>
                <p id='source2'>Source name</p>
                <input id='source-input2'></input><br/>
                <p id='amount2'>Amount</p>
                <input id='amount-input2' type='number'></input><br/>
                <center><button id='add-expenses-button' onClick={addData}>Add</button></center>
            </div>

            <div id='big-container2'>
                <div id='Expenses-container'>
                    <h1 id="table2-title">Expenses</h1>
                    <button id='table2-button' onClick={addExpenses}>+</button>
                </div>

                <div id='outside-expenses-table'>
                    <table id='expenses-table'>
                        <tbody>
                            <tr>
                                <th>Source</th>
                                <th>Amount</th>
                                <th>% of total</th>
                            </tr>
                            {Data.map((object, index) => (
                                <tr key={index}>
                                    <td className='exp-source' onClick={() => removeSource(object.source)}>{object.source}</td>
                                    <td className='exp-amount'>{object.amount}€</td>
                                    <td className='exp-percentage-of-total'>-</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div id='expenses-results'>
                <table id='results-table'>
                    <tbody>
                        <tr>
                            <th className='exp-result'>Total Expenses</th>
                            <th className='exp-result'>Highest Expense Source</th>
                            <th className='exp-result'>Expenses as % of Income</th>
                        </tr>
                        <tr>
                            <td className='exp-result' id='expenses-result'>-</td>
                            <td className='exp-result' id='highest-expenses-result'>-</td>
                            <td className='exp-result' id='expenses-of-income-result'>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Expenses;
