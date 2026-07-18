// =========================
// HEADER SCROLL
// =========================

const header = document.querySelector("header")

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        header.style.background = "rgba(255,255,255,.95)"
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)"

    }

    else {

        header.style.background = "rgba(255,255,255,.75)"
        header.style.boxShadow = "none"

    }

})



// =========================
// SMOOTH BUTTONS
// =========================

const heroButtons = document.querySelectorAll(".primary-btn, .header-btn")

heroButtons.forEach(function(button){

    button.addEventListener("click", function(){

        document.querySelector("#contacts").scrollIntoView({

            behavior:"smooth"

        })

    })

})



const secondaryBtn = document.querySelector(".secondary-btn")

secondaryBtn.addEventListener("click", function(){

    document.querySelector("#catalog").scrollIntoView({

        behavior:"smooth"

    })

})



// =========================
// CONTACT FORM
// =========================

const form = document.querySelector(".contact-form")
const submitBtn = form.querySelector('button[type="submit"]')
const formMessage = form.querySelector(".form-message")

form.addEventListener("submit", async function (e) {

    e.preventDefault()

    const name = form.querySelector('input[name="name"]').value.trim()
    const phone = form.querySelector('input[name="phone"]').value.trim()
    const message = form.querySelector('textarea[name="message"]').value.trim()

    if (!name || !phone || !message) {

        alert("Будь ласка, заповніть усі поля.")
        return

    }

    try {

    formMessage.textContent = ""
    formMessage.className = "form-message"

    submitBtn.disabled = true
    submitBtn.textContent = "Надсилання..."

    const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            phone,
            message
        })
    })

    const data = await response.json()

    if (data.success) {

        formMessage.textContent =
            "✅ Дякуємо! Ми отримали вашу заявку та зв'яжемося з вами найближчим часом."

        formMessage.classList.add("success")

        submitBtn.textContent = "✓ Надіслано"

        form.reset()

        setTimeout(function () {

            submitBtn.disabled = false
            submitBtn.textContent = "Надіслати"

            formMessage.textContent = ""
            formMessage.className = "form-message"

        }, 3000)

    } else {

        formMessage.textContent =
            "❌ Не вдалося надіслати заявку."

        formMessage.classList.add("error")

        submitBtn.disabled = false
        submitBtn.textContent = "Надіслати"

    }

} catch (error) {

    submitBtn.disabled = false
    submitBtn.textContent = "Надіслати"

    alert("Не вдалося з'єднатися із сервером. Спробуйте пізніше.")

    console.error(error)

}

})



// =========================
// ORDER BUTTONS
// =========================

const orderButtons = document.querySelectorAll(".order-btn")


orderButtons.forEach(function(button){

    button.addEventListener("click", function(){

        const product = button.dataset.product

        const textarea = document.querySelector(".contact-form textarea")


        textarea.value =
        `Мене цікавлять ${product}. Прошу зв'язатися зі мною.`


        document.querySelector("#contacts").scrollIntoView({

            behavior:"smooth"

        })


        setTimeout(function(){

            document.querySelector('.contact-form input[name="name"]').focus()

        },500)


    })

})



// =========================
// FADE IN ANIMATION
// =========================

const sections = document.querySelectorAll("section")

const observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.style.opacity = "1"

            entry.target.style.transform = "translateY(0)"

        }

    })

}, {

    threshold:0.2

})

sections.forEach(function(section){

    section.style.opacity = "0"

    section.style.transform = "translateY(60px)"
    section.style.transition = ".8s"

    observer.observe(section)

})



// =========================
// CARD HOVER EFFECT
// =========================

const cards = document.querySelectorAll(".card")

cards.forEach(function(card){

    card.addEventListener("mousemove", function(){

        card.style.transform = "translateY(-15px) scale(1.02)"

    })

    card.addEventListener("mouseleave", function(){

        card.style.transform = ""

    })

})



// =========================
// HERO TEXT ANIMATION
// =========================

window.addEventListener("load", function(){

    const heroText = document.querySelector(".hero-text")

    heroText.style.opacity = "0"
    heroText.style.transform = "translateX(-60px)"
    heroText.style.transition = "1s"

    setTimeout(function(){

        heroText.style.opacity = "1"
        heroText.style.transform = "translateX(0)"

    },200)

})



// =========================
// HERO IMAGE ANIMATION
// =========================

window.addEventListener("load", function(){

    const heroImage = document.querySelector(".hero-image")

    heroImage.style.opacity = "0"
    heroImage.style.transform = "translateX(60px)"
    heroImage.style.transition = "1s"

    setTimeout(function(){

        heroImage.style.opacity = "1"
        heroImage.style.transform = "translateX(0)"

    },400)

})


// =========================
// MODAL WINDOW
// =========================

const modalOverlay = document.querySelector(".modal-overlay")
const modalTitle = document.querySelector(".modal-title")
const modalOrder = document.querySelector(".modal-order")
const closeModal = document.querySelector(".modal-close")

const detailsButtons = document.querySelectorAll(".details-btn")


const products = {

    "Кухні": {

        images: [
            "kitchen1.jpg",
            "kitchen2.jpg",
            "kitchen3.jpg",
            "kitchen4.jpg"
        ],

        text: "Виготовлення сучасних кухонь під індивідуальні розміри. Якісні матеріали та надійна фурнітура."

    },


    "Шафи-купе": {

        images: [
            "wardrobe1.jpg",
            "wardrobe2.jpg",
            "wardrobe3.jpg",
            "wardrobe4.jpg"
        ],

        text: "Практичні шафи-купе, створені під ваш простір. Великий вибір дизайнів та матеріалів."

    },


    "Спальні": {

        images: [
            "bedroom1.jpg",
            "bedroom2.jpg",
            "bedroom3.jpg",
            "bedroom4.jpg"
        ],

        text: "Комфортні спальні меблі з урахуванням ваших побажань та стилю інтер'єру."

    }

}


Object.values(products).forEach(function(product) {

    product.images.forEach(function(src) {

        const img = new Image()
        img.src = src

    })

})



let selectedProduct = ""

let currentSlide = 0


// Відкрити модальне вікно



    


detailsButtons.forEach(function(button){

    button.addEventListener("click", function(){


        selectedProduct = button.dataset.product


        let images = []


        modalTitle.textContent = selectedProduct


        currentSlide = 0


        document.querySelector(".modal-text").textContent =
        products[selectedProduct].text

        updateDots()

        modalOverlay.classList.add("active")


        document.body.style.overflow = "hidden"


        track.innerHTML = ""

products[selectedProduct].images.forEach(function(src){

    const img = document.createElement("img")

    img.src = src

    track.appendChild(img)


    currentSlide = 0
updateSlider()

})



images = track.querySelectorAll("img")


})

})



// Закрити вікно

function closeModalWindow(){


    modalOverlay.classList.remove("active")


    document.body.style.overflow = ""


}



// кнопка X

closeModal.addEventListener("click", closeModalWindow)



// клік по затемненню

modalOverlay.addEventListener("click", function(e){


    if(e.target === modalOverlay){

        closeModalWindow()

    }


})



// клавіша ESC

document.addEventListener("keydown", function(e){


    if(e.key === "Escape"){

        closeModalWindow()

    }


})



// кнопка Замовити всередині модального вікна

modalOrder.addEventListener("click", function(){


    const textarea = document.querySelector(".contact-form textarea")


    textarea.value =
    `Мене цікавлять ${selectedProduct}. Прошу зв'язатися зі мною.`



    closeModalWindow()



    document.querySelector("#contacts").scrollIntoView({

        behavior:"smooth"

    })



    setTimeout(function(){


        document.querySelector('.contact-form input[name="name"]').focus()


    },500)


})


// =========================
// IMAGE SLIDER
// =========================


const track = document.querySelector(".slider-track")

const prevBtn = document.querySelector(".prev")
const nextBtn = document.querySelector(".next")



function updateSlider(){

    track.style.transform =
        `translateX(-${currentSlide * 100}%)`

}


nextBtn.addEventListener("click",function(){

    currentSlide++

    if(currentSlide >= products[selectedProduct].images.length){

        currentSlide = 0

    }

    updateSlider()
    updateDots()
})


prevBtn.addEventListener("click",function(){

    currentSlide--

    if(currentSlide < 0){

    currentSlide = products[selectedProduct].images.length - 1

}

   updateSlider()
   updateDots()

})



// Точки


function updateDots(){

    const dotsContainer = document.querySelector(".gallery-dots")

    dotsContainer.innerHTML = ""


    products[selectedProduct].images.forEach(function(image, index){


        const dot = document.createElement("span")


        if(index === currentSlide){

            dot.classList.add("active")

        }


        dot.addEventListener("click", function(){

            currentSlide = index

            updateSlider()

            updateDots()

        })


        dotsContainer.appendChild(dot)


    })

}



