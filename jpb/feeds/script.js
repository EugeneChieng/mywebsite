// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getDatabase, set, ref, get, child, onValue, update,remove, query, orderByKey, endAt, limitToLast, limitToFirst } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

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
let articleQueue = []

function retrieveData(){

    articleQueue = []
                          
      const articleRef = query(ref(database, `article`), orderByKey("id"))
      onValue(articleRef, snapshot => {
          snapshot.forEach(e => {
            articleQueue.push(e.val())
          })
  
          articleQueue.sort((a, b) => {
            if ( a.id > b.id ){
              return -1;
            }
            if ( a.id < b.id ){
              return 1;
            }
            return 0;
          })

          paginateArticle(articleQueue)
      })
    
  }

const list__pagination = document.querySelector('.list__pagination')

function paginateArticle(a) {
  
    let url_string = window.location.href
    let url = new URL(url_string)
    let currentPage = url.searchParams.get("p") ?? "1"

    let partitionedArticleArray = []
    const chunkSize = 10;

    list__pagination.innerHTML = null


    for (let i = 0; i < a.length; i += chunkSize) {

      const chunk = a.slice(i, i + chunkSize)
      partitionedArticleArray.push(chunk)
        list__pagination.innerHTML +=`
        <button class="number__pagination" data-page="${partitionedArticleArray.length}">${partitionedArticleArray.length}</button>
        `
    }
    
    document.querySelectorAll('.list__articles__content').forEach(e => e.remove())
    partitionedArticleArray[currentPage-1].forEach(e => populateArticle(e))

    const number__pagination__span = document.querySelectorAll('.number__pagination')
    number__pagination__span.forEach(numPage => {
      numPage.addEventListener('click', e => {
        window.history.pushState( {} , '', `?p=${numPage.getAttribute('data-page')}`)
        paginateArticle(a)
      })

      // Check if current pagination button is active
      if (numPage.getAttribute('data-page') === currentPage) {
        numPage.classList.add('active');
      } else {
        numPage.classList.remove('active');
      }
    })
  }


  
  let list__articles = document.querySelector('.list__articles')
  
  function populateArticle(article) {
 
      let { title, author, content, id, imageURL, date } = article
      let individualArticle = `
            <div class="list__articles__content">
                <img src="${imageURL}" alt="Article image" class="article__image" onclick="window.location.href='/article/?id=${id}'">
                <h3 class="article__title"><a href="/article/?id=${id}">${title}<a/></h3>
                <h3 class="article__desc">By <span class="article__author">${author}</span></a> | ${date}</h3>
            </div>
      `
      list__articles.innerHTML += individualArticle
  }

  retrieveData()

// Search
const banner__search__bar = document.querySelector('.banner__search__bar')
banner__search__bar.addEventListener('input', e => {
    let currentQuery = banner__search__bar.value

    let articleRequested = []

    document.querySelectorAll('.list__articles__content').forEach(e => e.remove())

    for (let i=0; i<articleQueue.length;i++) {
        let { title, author } = articleQueue[i]
        if (author.toString().toUpperCase().includes(currentQuery.toUpperCase()) ||title.toString().toUpperCase().includes(currentQuery.toUpperCase())) {
            articleRequested.push(articleQueue[i])
        }
    }

    paginateArticle(articleRequested, 1)

})