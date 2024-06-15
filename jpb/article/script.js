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

function retrieveData(){

    let url_string = window.location.href 
    let url = new URL(url_string)
    let id = url.searchParams.get("id")

    let title__article = document.querySelector('.title__article')
    let author__article = document.querySelector('#author__article')
    let date__info__article = document.querySelector('.date__info__article')
    let minute__info__article = document.querySelector('.minute__info__article')
    let day__info__article = document.querySelector('.day__info__article')
    let content__article = document.querySelector('#content__article')
    let image__article = document.querySelector('.image__article')
    let title__info__author__article = document.querySelector('.title__info__author__article')
    let name__info__author__article = document.querySelector('.name__info__author__article')
						
    const articleRef = ref(database, `article/${id}`)
    onValue(articleRef, snapshot => {
        let { author, content, date, day, id, length, title, imageURL } = snapshot.val()
        title__article.innerText = title
        author__article.innerText = author
        minute__info__article.innerText = length
        content__article.innerText = content.replace('\\n', '\n')
        image__article.src = imageURL
        title__info__author__article.innerText = title.toUpperCase()
        name__info__author__article.innerText = author
        date__info__article.innerText = date
        day__info__article.innerText = day
    })

}

retrieveData()

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