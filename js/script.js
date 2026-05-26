// =========================
// FORMULARIO
// =========================

const form = document.getElementById("contact-form");

if(form){

const messageBox = document.getElementById("form-message");

// VALIDACIÓN EN TIEMPO REAL
document.getElementById("email").addEventListener("input", function(){
    if(!this.value.includes("@")){
        this.style.border = "2px solid red";
    } else {
        this.style.border = "2px solid green";
    }
});

// VALIDACIÓN
function validateForm(name, email, message){

    if(name === "" || email === "" || message === ""){
        return "Todos los campos son obligatorios.";
    }

    if(!email.includes("@")){
        return "El correo electrónico no es válido.";
    }

    return "ok";
}

// SUBMIT
form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const result = validateForm(name, email, message);

    if(result !== "ok"){
        messageBox.textContent = result;
        messageBox.style.color = "red";
    } else {
        messageBox.textContent = "Mensaje enviado correctamente.";
        messageBox.style.color = "green";
        form.reset();
    }

});
}



// =========================
// SLIDER PRO
// =========================

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;
let interval;

// Mostrar slide
function showSlide(i){
slides.forEach(slide => slide.classList.remove("active"));
dots.forEach(dot => dot.classList.remove("active"));

slides[i].classList.add("active");
dots[i].classList.add("active");

index = i;
}

// Siguiente
function nextSlide(){
let i = (index + 1) % slides.length;
showSlide(i);
}

// Anterior
function prevSlide(){
let i = (index - 1 + slides.length) % slides.length;
showSlide(i);
}

// Auto play
function startSlider(){
interval = setInterval(nextSlide, 4000);
}

function stopSlider(){
clearInterval(interval);
}

// Eventos botones
if(nextBtn){
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
}

// Eventos dots
dots.forEach((dot, i)=>{
dot.addEventListener("click", ()=> showSlide(i));
});

// Pausa al pasar mouse
const hero = document.querySelector(".hero");

if(hero){
hero.addEventListener("mouseover", stopSlider);
hero.addEventListener("mouseout", startSlider);
}

// Accesibilidad teclado
document.addEventListener("keydown", (e)=>{
if(e.key === "ArrowRight") nextSlide();
if(e.key === "ArrowLeft") prevSlide();
});

// Inicializar
if(slides.length > 0){
startSlider();
}

// =========================
// MENSAJE DINÁMICO
// =========================

const message = document.getElementById("welcome-message");

function getMessage(lang){

const hour = new Date().getHours();
let greeting = "";

if(hour < 12){
    greeting = (lang === "EN") ? "Good morning" : "Buenos días";
}else if(hour < 18){
    greeting = (lang === "EN") ? "Good afternoon" : "Buenas tardes";
}else{
    greeting = (lang === "EN") ? "Good evening" : "Buenas noches";
}

return greeting;
}

const langButtons = document.querySelectorAll(".language button");

langButtons.forEach(btn => {
btn.addEventListener("click", () => {

    langButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
    });

    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");

    const lang = btn.textContent;
    message.textContent = getMessage(lang) + ", bienvenido a Matsuri World 🎎";

});
});

// mensaje inicial
if(message){
message.textContent = getMessage("ES") + ", bienvenido a Matsuri World 🎎";
}