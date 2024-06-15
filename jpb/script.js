// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getDatabase, set, ref, get, child, onValue, update,remove, query, startAt, orderByKey, limitToLast } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

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
    appId: "1:671528022551:web:d33999891154fa2e706252",
    measurementId: "G-EEY523JP5J"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app)


const databaseRef = ref(database)

const admin__publish__article = document.querySelector('.admin__publish')

function retrieveData(){

  let articleQueue = []
						
    const articleRef = query(ref(database, `article`), limitToLast(4), orderByKey("id"))
    onValue(articleRef, snapshot => {
        snapshot.forEach(e => {
          articleQueue.unshift(e.val())
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

        articleQueue.forEach(e => {
          populateArticle(e)
        })
    })

}

let tripartition__about = document.querySelector('.tripartition__about')

function populateArticle(article) {

    let { title, content, id, imageURL, date } = article
    let individualArticle = `
    <div class="tripartition__about__content">
      <img src="${imageURL}" alt="">
      <h1>${title}</h1>
      <p class="tripartition__about__paragraph">${content}</p>
      <div class="tripartition__article__controls">
        <button class="tripartition__about__readmore" onclick="window.location.href='./article/?id=${id}'">LEARN MORE</button>
        <span class="tripartition__about__date">
        <span class="material-symbols-outlined">
calendar_month
</span> ${date}
        </span>
      </div>
    </div>
    `
    tripartition__about.innerHTML += individualArticle

    if (document.querySelectorAll('.tripartition__about__content').length == 4) {
      addReadMoreButton()
    }
}

function addReadMoreButton() {
      let readMoreButton = `
      <button class="tripartition__about__loadmore" onclick="window.location.href='./feeds/'">
        <div class="tripartition__about__loadmore__circle">
          <span class="material-symbols-outlined">
              arrow_forward
              </span>
        </div>
          View all
      </button>
      `
      tripartition__about.innerHTML += readMoreButton

}

retrieveData()


// Scroll articles
const tripartition__scroll__right = document.querySelector('.tripartition__scroll.right')
const tripartition__scroll__left = document.querySelector('.tripartition__scroll.left')

tripartition__scroll__left.onclick = () => {
  tripartition__about.scrollBy({ top: 0, left: +500, behavior: 'smooth' })
}

tripartition__scroll__right.onclick = () => {
  tripartition__about.scrollBy({ top: 0, left: -500, behavior: 'smooth' })
}

// Gallery
const container__gallery__entry = document.querySelector('.container__gallery__entry')

function renderGallery() {
  let imageURL = 'https://shsprefectorial2013.files.wordpress.com/2013/06/cropped-dscn65071.jpg'
  let title = 'A super long title for this image'

  let individualGalleryEntry = `
      <div class="gallery__entry">
        <h1 class="gallery__entry__title">${title}</h1>
        <img src="${imageURL}" alt="${title}" class="gallery__entry__thumbnail">
      </div>
  `
  container__gallery__entry.innerHTML += individualGalleryEntry
}

renderGallery()
renderGallery()
renderGallery()
renderGallery()

const gallery__scroll__left = document.querySelector('.gallery__scroll.left')
const gallery__scroll__right = document.querySelector('.gallery__scroll.right')



gallery__scroll__left.onclick = () => {
    container__gallery__entry.scrollBy({ top: 0, left: -500, behavior: 'smooth' })
    if (container__gallery__entry.scrollLeft-window.innerWidth == 0) {
      gallery__scroll__left.style.display = 'none'
    }
}

gallery__scroll__right.onclick = () => {
    container__gallery__entry.scrollBy({ top: 0, left: +500, behavior: 'smooth' })
    if (container__gallery__entry.scrollLeft+window.innerWidth != 0) {
      gallery__scroll__left.style.display = 'block'
    }
}

// function omitScrollButtonBasedOnProgress() {
  
// if (container__gallery__entry.scrollLeft - window.innerWidth == 0) {
//   gallery__scroll__left.style.display = 'none'
// }

// if (container__gallery__entry.scrollLeft != 0) {
//   gallery__scroll__left.style.display = 'block'
// }
// }

  // Duty map
  const class__HYP = [
    {classroom: "", prefect: [""]},
    {classroom: "1A3", prefect: ["Ian Kan", "Danny Tiong Ming Jie"]}, 
    {classroom: "1A2", prefect: ["Ting Zhong Cai", "Leslie Wong Yu Xiong"]}, 
    {classroom: "2A4", prefect: ["Leon Ngaon", "Robin Koh"]}, 

    {classroom: "2A2", prefect: ["Michael Chieng Wei Heng", "Ling Zhi Jie"]},
    {classroom: "1A4", prefect: ["Jerrett Ling Ning Zheng", "Wong Wei Hong"]}, 
    {classroom: " P1", prefect: ["Darence Kiung Eezer", "Austin Lin Shen Han"]}, 
    {classroom: "2A3", prefect: ["Jeremiah Lau Hui Bin", "Sebastian Chong"]}, 

    {classroom: "", prefect: [""]},
    {classroom: "1A5", prefect: ["Nicholas Too Kah Hee", "Clerence Ngang Chuan Hao"]}, 
    {classroom: " P2", prefect: ["Marcellenus", "Desmond Yau Zun Kiet"]}, 
    {classroom: "2A1", prefect: ["Alvin Law Hao Jie", "Ryan Isaac"]} 
]
const class__RLHC = [
    {classroom: "3A7", prefect: ["Wan Muhammad Ashraf", "John Barack Anak Daniel"]}, 
    {classroom: "3A8", prefect: ["Caleb Ang Yi En", "Arrelson Roland Ak Kasim"]}, 
    {classroom: "3A2", prefect: ["Steward Loi Ming Jie", "Brandon Lee Jia Cheng",]}, 
  
    {classroom: "1A1", prefect: ["Joel Law Lik Shi", "Shane Ho Teck Jun"]}, 
    {classroom: "", prefect: [""]}, 
    {classroom: "", prefect: [""]}, 
  
    {classroom: "3A5", prefect: ["Andy Pang Jun Ann", "Christopher Chiew Zhi Heng"]}, 
    {classroom: "3A6", prefect: ["Ethan Yii Yang Wei", "Daniel Lau"]}, 
    {classroom: "2A5", prefect: ["Jeremy Lim Wei Ming", "Elson Yong Xian Enn"]}, 
  
    {classroom: "3A1", prefect: ["Hendry Anak Hellena", "Leon Hu Chao Xiang"]}, 
    {classroom: "3A3", prefect: ["Dexlence Alishter Anak Seba", "Edmond Kon Jia Cheng"]}, 
    {classroom: "3A4", prefect: ["Jonathan Lai Jun Hong", "Ryan Evan Anak Jason"]}
].reverse()

const container__class__HYP = document.querySelectorAll('#HYP > g > text > tspan')
const container__class__RLHC = document.querySelectorAll('#RLHC > g > text > tspan')


for (let i = 0; i < class__HYP.length; i++) {
    let { classroom, prefect } = class__HYP[i]
    container__class__HYP[i].innerHTML = classroom
    container__class__HYP[i].setAttribute('data-class', classroom || "NAN")
    container__class__HYP[i].setAttribute('data-prefect', prefect)
}

for (let i = 0; i < class__RLHC.length; i++) {
    let { classroom, prefect } = class__RLHC[i]
    container__class__RLHC[i].innerHTML = classroom
    container__class__RLHC[i].setAttribute('data-class', classroom || "NAN")
    container__class__RLHC[i].setAttribute('data-prefect', prefect)
}

const container__class__general = document.querySelectorAll('#HYP > g, #RLHC > g')
const class__tooltip = document.querySelector('.tooltip__class')
container__class__general.forEach(c => {
    c.addEventListener('mousemove', e => {
        class__tooltip.style.display = 'block'
        class__tooltip.style.left = `${e.clientX}px`
        class__tooltip.style.top = `${window.scrollY + e.clientY - 60}px`
        let currentClass = c.children[1].children[0].getAttribute('data-class')
        let currentPrefect = c.children[1].children[0].getAttribute('data-prefect').replaceAll(',', '<br>')
        class__tooltip.innerHTML = `
        <h2>${currentClass}</h2>
        <h4>${currentPrefect}</h4>
        `
    })

    c.addEventListener('mouseleave', e => {
        class__tooltip.style.display = 'none'
    })
})
