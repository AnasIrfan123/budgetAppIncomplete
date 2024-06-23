'use strict';

const errorMesgEl = document.querySelector('.error_message');
const budgeInputEl = document.querySelector('.budget_input');
const expenseDescEl = document.querySelector('.expenses_input')
const expenseAmountEl = document.querySelector('.expenses_amount')
const tblRecordEl = document.querySelector('.tbl_data')
const cardsContainer = document.querySelector('.cards')

// cards content
const budgetCardEl = document.querySelector('.budget_card');
const expensesCardEl = document.querySelector('.expenses_card');
const balanceCardEl = document.querySelector('.balance_card');

let itemList = [];
let itemId = 0;

// ================ Button Events  =======================

function btnEvents() {
    const btnBudgetCal = document.querySelector('#btn_budget')
    const btnExpensesCal = document.querySelector('#btn_expenses')

//    // ============Budget Event
    btnBudgetCal.addEventListener('click', (e)=> {
        e.preventDefault()  // calculate button k click par ( bydefault event par value set ki ) or val log krwae  
        console.log('Budget');
        budgetFun()  // call the funct budgetFunct
    });

//   // ============Budget Event
    btnExpensesCal.addEventListener('click', (e)=> {
        e.preventDefault()     // addExpen button k click par ( bydefault event par value set ki ) or val log krwae  
        console.log('Expenses');
         expensesFun()  // call the expense funct
    });
}

// // ==================Calling Btns Event=====================
document.addEventListener('DOMContentLoaded', btnEvents);   // btnEvents funct pr load ho jye



// ================= Expenses Function=====================
function expensesFun() {
    let expensesDescValue = expenseDescEl.value;  //expensesDescValue variable to store the value 
    let expenseAmountValue = expenseAmountEl.value;   //expenseAmountValue variable to store the value 
    console.log(expensesDescValue, expenseAmountValue);  // & log the value
    // console.log(typeof expenseAmountValue, 'type');

    if (expensesDescValue == '' || expenseAmountValue == '' || budgeInputEl < 0) {  
        errorMessage('Please enter Descrip or Expense or Budget Amount!') //errMss the funct last me ha 
    } else {
        let amount = parseInt(expenseAmountValue); // expenseAmountValue ko integer mein parse karna aur amount variable mein store karna
        expenseAmountEl.value = '' // after inputfield is empty
        expenseDescEl.value = ''

//         // store the value inside the object
        let expenses = {
            id: itemId,
            title: expensesDescValue,  // Object mein title aur amount ke naam se values store karna
            amount: amount
        };
        itemId++; // Item ID ko increment karna 
        itemList.push(expenses)  // itemList array mein expenses object ko push karna
        console.log('itemList ', itemList);

//         //  add expenses inside the HTML page
        addExpenses(expenses)  // call the expenses function // add expenses funct me expenses obj aya
        showBalance()   // call the showBalance funct 
    }
}
// ===================== Add Expenses =======================

function addExpenses(expensesPara) {
    const html = `
    <ul class="tbl_tr_content">
        <li data-id=${expensesPara.id}>${expensesPara.id}</li>
        <li>${expensesPara.title}</li>
        <li><span>$</span>${expensesPara.amount}</li>
      <li>
         <button type="button" class="btn_edit">Edit</button>
         <button type="button" class="btn_delete">Delete</button>
      </li>
    </ul>`

    tblRecordEl.insertAdjacentHTML("beforeend", html); // DOM manipula ka html content tblRecordEl variab me inser adjachtml tblRecordEl ke andar add hoti hai, lekin sabhi existing content ke baad.

//      ================== Edit ===================== edit or del button k varible or etc

  const btnEdit = document.querySelectorAll('.btn_edit')  
  const btnDel = document.querySelectorAll('.btn_delete') 
  const content_id = document.querySelectorAll('.tbl_tr_content') 

  //     Btn Edit Event

  btnEdit.forEach((btnedit) => {
    btnedit.addEventListener('click', (el) => {
        let id;

        content_id.forEach((ids) => {
            // console.log(ids.firstElementChild.dataset.id);
            id = ids.firstElementChild.dataset.id;
        });

        let element = el.target.parentElement.parentElement;
        // console.log(element);
        element.remove();

        let expenses = itemList.filter(function(item){
            return item.id == id; //ye id item id sy match ho to filter kardenaa expense ko

        })
        // console.log(expenses);
        expenseDescEl.value = expenses[0].title;
        expenseAmountEl.value = expenses[0].amount

        let temp_list = itemList.filter(function (item){
            return item.id != id;
        })
        itemList = temp_list
    })
  })

  // =============== Btn Del ===================
      
  btnDel.forEach((btnDel) => {
    btnDel.addEventListener('click', (el) => {         // delte or edit button ki calculation sahi nh ho rahi ha pta nh kyun issue ha
    let id;                                      //for loop chalega loop sy delete krwao 
    
    content_id.forEach((ids) => {
        id = ids.firstElementChild.dataset.id;
    })
    let element = el.target.parentElement.parentElement;
    element.remove();
    
    let temp_list = itemList.filter(function (item) {
        return item.id != id;
    });
    itemList = temp_list;
    showBalance()
    })
  })
}

// =====================Budget Function=======================

function budgetFun() {
    const budgetValue = budgeInputEl.value; // => inptVal
    console.log('val ', budgetValue); // inpt val to consol 

    if (budgetValue == '' || budgetValue < 0) { //condit => 
       errorMessage('Please Enter Budget value.. "Value is must more than 0')
     } else {
        budgetCardEl.textContent = budgetValue; //budgtInput val to add the budgt column 
        budgeInputEl.value = ''; // after empty inpt val to the add the budgt column

        showBalance(); // call the funct to show the balanc
    }
}
// ============ Show Balance Function ========== 
function showBalance() { // disply the baln val 
    const expenses = totalExpenses();  // call the expenses functin
//     console.log('Expens ', expenses);  
    const total = parseInt(budgetCardEl.textContent) - expenses; //totl val to parseInt Integr me convrt or - krta ha expense ko
    balanceCardEl.textContent = total; // or balan totl ko display krta ha total ko
}

// ============ Total Expenses Function ==========
function totalExpenses() { // calcul the total expense
    let total = 0;

    if (itemList.length > 0){
        total = itemList.reduce(function(acc,curr){  // reduce ka kam ha total krna amounts ka 
            // console.log(acc += curr.expenseAmountEl);
             acc += curr.amount;
             return acc;
        }, 0)
    }   
    console.log('total ', total);
    expensesCardEl.textContent = total;
    return total; // total value to retun or call and retn the val
} 

// ============ Error Message Function ========== // err msg funct outside the funct & excess to the if condit
function errorMessage(message) {   
    errorMesgEl.innerHTML = `<p>${message}</p>`; //show the condi errMessg to user
    errorMesgEl.classList.add('error');                               // err Msg to add with the help of javascript
    setTimeout(()=> { // after few sec to remove the error msg automatic 
    errorMesgEl.classList.remove('error');
    }, 2500);
}