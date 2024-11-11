const purchaseBtn=document.getElementById("purchase-btn");
const cash=document.getElementById("cash");
const displayChangeDue=document.getElementById("change-due")
const cashDrawDisplay=document.getElementById("cash-drawer-display")

let price=3.26;
let cid=[
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

// document.getElementById("price").innerHTML = `<b>Price:</b> ${price}`;

const cashRegister=()=>{
    let cashInput=parseFloat(cash.value);
    let change=Number((cashInput-price).toFixed(2));
    let totalCid=Number(cid.reduce((total,sum)=>total+sum[1],0).toFixed(2))

    //displayChangeDue.innerHTML+=`<p>Change: ${change}</p>`
    // document.getElementById("change").innerHTML = `<b>Change:</b> ${change}`;

    if(cashInput<price){
        alert("Customer does not have enough money to purchase the item");
        return;
    }
    else if(cashInput===price){
       displayChangeDue.innerHTML="No change due - customer paid with exact cash";
       return;
    }
    else if(cashInput===""){
        return;
    }

    if(change>totalCid){
        displayChangeDue.innerHTML="Status: INSUFFICIENT_FUNDS";
        return;
    }

const denomination=[0.01,0.05 ,0.1 ,0.25 ,1 ,5 ,10	,20	,100 ];
const denominationNames=["Penny", "Nickel", "Dime", "Quarter", "Five", "Ten", "Twenty", "Hundred"]
const changeArr=[];
const changeCid=[...cid];

for(let i=0;i<denomination.length;i++){
let totalDenomination=0;

while(change>denomination[i] && changeCid[changeCid.length-1-i][1]>0){
    changeCid[changeCid.length-1-i][1]=Number((changeCid[changeCid.length-1-i][1]-denomination[i]).toFixed(2));
change=Number((change-denomination[i]).toFixed(2));
totalDenomination+=denomination[i];
}

if(totalDenomination>0){
    changeArr.push([denominationNames[i], totalDenomination]);
}

}

if(change>0){
    displayChangeDue.innerHTML="Status: INSUFFICIENT_FUNDS";
    return;
}

let remainingCid=changeCid.reduce((total,sum)=>total+sum[1],0);
if(remainingCid>0){
    displayChangeDue.innerHTML="STATUS CLOSED: " + changeArr.map(cash=>`${cash[0]} : $${cash[1].toFixed(2)}`).join("");
    cid=cid.map(denomination=>denomination[0],0).toFixed();
}
else{
displayChangeDue.innerHTML="STATUS CLOSED: " + changeArr.map(cash=>  `${cash[0]} : $${cash[1].toFixed(2)}`).join("");
}

displayCashInDrawer();

};

const displayCashInDrawer=()=>{
cashDrawDisplay.innerHTML="<h4>Cash in Drawer:</h4>" + cid.map(cash => `${cash[0]}: $${cash[1].toFixed(2)} <br>`).reverse().join("");
}

window.onload=displayCashInDrawer;

purchaseBtn.addEventListener("click",cashRegister);

cash.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      cashRegister();
    }
  });
