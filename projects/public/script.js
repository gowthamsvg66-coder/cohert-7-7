// ==============================
// Water Drinking Reminder
// script.js
// ==============================

const API = "http://localhost:3000/api";

const totalWater = document.getElementById("totalWater");
const goal = document.getElementById("goal");
const percentage = document.getElementById("percentage");
const progressBar = document.getElementById("progressBar");

const waterAmount = document.getElementById("waterAmount");
const addBtn = document.getElementById("addBtn");

const historyTable = document.getElementById("historyTable");

const interval = document.getElementById("interval");
const goalInput = document.getElementById("goalInput");
const saveSettings = document.getElementById("saveSettings");

const currentReminder = document.getElementById("currentReminder");

let reminderTimer;

// ===============================
// Load Data
// ===============================

window.onload = () => {

    loadSettings();

    loadHistory();

};


// ===============================
// Load Water History
// ===============================

async function loadHistory(){

    const response = await fetch(`${API}/intake`);

    const data = await response.json();

    historyTable.innerHTML = "";

    let total = 0;

    data.forEach(item=>{

        total += item.amount;

        historyTable.innerHTML += `

        <tr>

            <td>${item.id}</td>

            <td>${item.amount} ml</td>

            <td>${item.created_at}</td>

        </tr>

        `;

    });

    totalWater.innerHTML = total + " ml";

    updateProgress(total);

}



// ===============================
// Add Water
// ===============================

addBtn.addEventListener("click", async ()=>{

    const amount = Number(waterAmount.value);

    if(amount<=0){

        alert("Enter valid amount");

        return;

    }

    await fetch(`${API}/intake`,{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            amount:amount

        })

    });

    waterAmount.value="";

    loadHistory();

});



// ===============================
// Progress Bar
// ===============================

function updateProgress(total){

    const goalValue = Number(goal.innerHTML.replace(" ml",""));

    let percent = (total/goalValue)*100;

    if(percent>100){

        percent=100;

    }

    progressBar.style.width = percent + "%";

    percentage.innerHTML = percent.toFixed(0)+"%";

}



// ===============================
// Load Settings
// ===============================

async function loadSettings(){

    const response = await fetch(`${API}/settings`);

    const data = await response.json();

    goal.innerHTML = data.daily_goal + " ml";

    goalInput.value = data.daily_goal;

    interval.value = data.reminder_interval;

    currentReminder.innerHTML = data.reminder_interval+" min";

    startReminder(data.reminder_interval);

}



// ===============================
// Save Settings
// ===============================

saveSettings.addEventListener("click", async ()=>{

    const reminder = Number(interval.value);

    const dailyGoal = Number(goalInput.value);

    await fetch(`${API}/settings`,{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            interval:reminder,

            goal:dailyGoal

        })

    });

    alert("Settings Saved");

    loadSettings();

});



// ===============================
// Browser Notification
// ===============================

function showNotification(){

    if(Notification.permission==="granted"){

        new Notification(

            "💧 Water Reminder",

            {

                body:"Time to Drink Water!"

            }

        );

    }

}



// ===============================
// Reminder Timer
// ===============================

function startReminder(minutes){

    clearInterval(reminderTimer);

    if(Notification.permission!=="granted"){

        Notification.requestPermission();

    }

    reminderTimer = setInterval(()=>{

        showNotification();

        popup();

    },minutes*60*1000);

}



// ===============================
// Popup Message
// ===============================

function popup(){

    const notification = document.getElementById("notification");

    notification.style.display="block";

    setTimeout(()=>{

        notification.style.display="none";

    },4000);

}