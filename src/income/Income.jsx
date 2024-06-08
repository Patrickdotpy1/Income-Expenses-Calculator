import React, { useEffect } from 'react';
import './income.css';

function addData(){
    let source = document.getElementById('source-input').value;
    let amount = document.getElementById('amount-input').value;

    let Data = localStorage.getItem('incomeData');
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
    localStorage.setItem('incomeData', Data);
    
    location.reload();
}

function addIncome(){
    let popup = document.getElementById('add-income');
    popup.classList.toggle('display');
}

function removeSource(sourceToDelete){
    let Data = localStorage.getItem('incomeData');
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
    localStorage.setItem('incomeData', newData);

    location.reload();
}







function Income() {
    // Making table calculations after the page loads
    useEffect(() => {
        const handleLoad = () => {
            updatePerc();
        };

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    const updatePerc = () => {
        let source = document.getElementsByClassName('inc-source');
        let amounts = document.getElementsByClassName('inc-amount');
        let perc = document.getElementsByClassName('inc-percentage-of-total');

        let total = 0;
        for (let amount of amounts) {
            amount = Number((amount.innerHTML).split('€')[0]);
            total += amount;
        }

        for (let amount of amounts) {
            let index = (Array.from(amounts)).indexOf(amount);
            amount = Number((amount.innerHTML).split('€')[0]);
            let percOfTotal = (amount / total) * (100 / 1);
            perc[index].innerHTML = `${percOfTotal.toFixed(1)}%`;
        }
        results();
    };

    const results = () => {
        let resultIncome = document.getElementById('income-result');
        let highestIncome = document.getElementById('highest-income-result');

        // Calculate total & get the highest income
        let source = document.getElementsByClassName('inc-source');
        let amounts = document.getElementsByClassName('inc-amount');
        let total = 0;
        let index = 0;
        let highestINC = 0;
        let highestINC_complete;
        for (let amount of amounts) {
            let amount_number = Number((amount.innerHTML).split('€')[0]);
            total += amount_number;
            if (highestINC < amount_number) {
                highestINC = amount_number;
                highestINC_complete = `${(source[index]).innerHTML} - ${amount.innerHTML}`;
            }
            index += 1;
        }
        localStorage.setItem('totalIncome', total);
        // Modify the HTML
        resultIncome.innerHTML = `+${total}€`;
        highestIncome.innerHTML = highestINC_complete;
    };



    // Getting Data
    let Data = localStorage.getItem('incomeData');
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
            <div id='add-income'>
                <button id='x-button' onClick={addIncome}>X</button>
                <center><h2 id='popup-title'>Add income source</h2></center>
                <p id='source'>Source name</p>
                <input id='source-input'></input><br/>
                <p id='amount'>Amount</p>
                <input id='amount-input' type='number'></input><br/>
                <center><button id='add-income-button' onClick={addData}>Add</button></center>
            </div>

            <div id='big-container1'>
                <div id='Income-container'>
                    <h1 id="table1-title">Income</h1>
                    <button id='table1-button' onClick={addIncome}>+</button>
                </div>

                <div id='outside-income-table'>
                    <table id='income-table'>
                        <tbody>
                            <tr>
                                <th>Source</th>
                                <th>Amount</th>
                                <th>% of total</th>
                            </tr>
                            {Data.map((object, index) => (
                                <tr key={index}>
                                    <td className='inc-source' onClick={() => removeSource(object.source)}>{object.source}</td>
                                    <td className='inc-amount'>{object.amount}€</td>
                                    <td className='inc-percentage-of-total'>-</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>

            <div id='income-results'>
                <table id='results-table'>
                    <tbody>
                        <tr>
                            <th className='inc-result'>Total Income</th>
                            <th className='inc-result'>Highest Income Source</th>
                        </tr>
                        <tr>
                            <td className='inc-result' id='income-result'>-</td>
                            <td className='inc-result' id='highest-income-result'>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Income;
