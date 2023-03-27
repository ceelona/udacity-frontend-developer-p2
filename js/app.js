/* eslint quotes: ["error", "double"] */
/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Global variables
*/
const sections = document.querySelectorAll("section");
const nav = document.getElementById("navbar__list");

/**
 * Main functions
*/

// create the list elements of the nav
sections.forEach((section) => {
	const li = document.createElement("li");
	li.setAttribute("class", "menu__link");
	li.innerText = section.getAttribute("data-nav");
	nav.appendChild(li);

    // add listener to scroll in click to the connected section
    li.addEventListener("click", () => {
        window.scrollTo({
            left: 0,
            top: section.offsetTop - nav.offsetHeight, 
            behavior: "smooth"});
    })
});

// add listener to set active states on scroll, when section is visible
document.addEventListener("scroll", () => {
    sections.forEach((section, index)=>{
        const rect = section.getBoundingClientRect()

        // source for active calculation to support all browsers:
        // https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
        const isActive = rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)

        if(isActive){
            section.classList.add("active")
            document.querySelectorAll("li").forEach((l, i) => {
                i === index ? l.classList.add("active") : l.classList.remove("active")
            })
        } else {
            section.classList.remove("active")
        }
    })
});
