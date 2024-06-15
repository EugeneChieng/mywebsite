// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getDatabase, set, ref, get, child, onValue, update,remove } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7lINH31--OI16ZGCSR_00yqNQzL3bV94",
  authDomain: "juniorprefectorialboard.firebaseapp.com",
  databaseURL: "https://juniorprefectorialboard-default-rtdb.firebaseio.com",
  projectId: "juniorprefectorialboard",
  storageBucket: "juniorprefectorialboard.appspot.com",
  messagingSenderId: "671528022551",
  appId: "1:671528022551:web:09441ea415b6484f706252",
  measurementId: "G-YNQ48FDP91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app)


const databaseRef = ref(database)

const admin__publish__article = document.querySelector('.admin__publish')
admin__publish__article.onclick = uploadData

const image__article = document.querySelector('.image__article')
image__article.addEventListener('input', e => {
    
    image__article.style.backgroundImage = `url(${image__article.value})`
    
})


function uploadData(){

    // Get article basic data
    const current__date = new Date().getTime()

    const title__article = document.querySelector('.title__article').innerText
    const author__article = document.querySelector('#author__article').innerText
    const date__info__article = document.querySelector('.date__info__article').innerText
    const minute__info__article = document.querySelector('.minute__info__article').innerText
    const day__info__article = document.querySelector('.day__info__article').innerText
    const content__article = document.querySelector('#content__article').innerText.replace(/(?:\r\n|\r|\n)/g, '\n')
	const image__article = document.querySelector('.image__article').value
    
    set(ref(database,"article/"+current__date),{
        id: current__date,
        title: title__article,
        author: author__article,
        content: content__article,
        date: date__info__article,
        day: day__info__article,
        length: minute__info__article,
        imageURL: image__article
    })

    alert('Success')

}

function formatDate(millis) {
    const day = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
    const month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

    const currentMonth = month[new Date(millis).getMonth()]
    const currentDay = day[new Date(millis).getDay()]
    const currentDateDay = new Date(millis).getDate()
    const currentYear = new Date(millis).getFullYear()
    
    const currentDate = `${currentDateDay} ${currentMonth} ${currentYear}`

    document.querySelector('.date__info__article').innerText = currentDate
    document.querySelector('.day__info__article').innerText = currentDay
}

formatDate(new Date().getTime())