/**
 * Converts elements with class 'reveal' into a nested span structure
 * Used for text reveal animations where text slides into view
 */
function revealToSpan() {
    // Select all elements with the class 'reveal'
    document.querySelectorAll('.reveal')
        .forEach(function (elem) { // Iterate over each selected element
            var parent = document.createElement('span'); // Create a parent span element
            var child = document.createElement('span'); // Create a child span element

            parent.classList.add('parent'); // Add 'parent' class to the parent span
            child.classList.add('child'); // Add 'child' class to the child span

            child.innerHTML = elem.innerHTML; // Set the child span's text to the element's text
            parent.appendChild(child); // Append the child span to the parent span

            elem.innerHTML = ''; // Clear the original element's content
            elem.appendChild(parent); // Append the parent span (with child) to the original element
        });
}

/**
 * Sets initial properties for various elements before animations begin
 * This includes navigation links, home elements, and SVG elements
 */
function valueSetter() {
    // Set initial properties for navigation links and home elements
    gsap.set("#nav a", {
        y: "-100%", // Move links off-screen vertically (up)
        opacity: 0 // Hide links initially
    });
    gsap.set("#home .parent .child", {
        y: "100%", // Move child elements down off-screen
    });
    gsap.set("#home #row img", {
        opacity: 0, // Hide images initially
    });

    // Configure SVG stroke animations by setting up dasharray and dashoffset
    document.querySelectorAll("#Visual>g").forEach(function (elem) {
        // Get total length of SVG path for stroke animation
        var pathLength = elem.childNodes[1].childNodes[1].getTotalLength();
        elem.childNodes[1].childNodes[1].style.strokeDasharray = pathLength + "px";
        elem.childNodes[1].childNodes[1].style.strokeDashoffset = pathLength + "px";
    });
}

/**
 * Handles the initial loading animation sequence
 * Creates a timeline of animations for the loader and transition effects
 */
function loaderAnimation() {
    var tl = gsap.timeline(); // Create a timeline for sequential animations

    tl
        // Animate loader text sliding in
        .from("#loader .child span ", {
            x: 100, // Start from right
            ease: "power3.out",
            duration: 1,
            delay: 1,
            stagger: 0.15, // Stagger each letter's animation
            opacity: 0
        })
        // Slide loader text up and out
        .to("#loader .parent .child", {
            y: "-100%",
            ease: Circ.easeInOut,
            duration: 0.5,
        })
        // Collapse loader height
        .to("#loader", {
            height: 0,
            duration: 0.5,
            ease: Circ.easeInOut,
        })
        // Green screen transition effect (sliding up)
        .to("#green", {
            height: "100%",
            top: 0,
            delay: -0.8,
            duration: 0.4,
            ease: Circ.easeInOut,
        })
        // Green screen transition effect (sliding out)
        .to("#green", {
            height: "0%",
            top: 0,
            duration: 0.5,
            delay: -0.5,
            ease: Circ.easeInOut,
            onComplete: function () {
                homepageAnimation(); // Start homepage animations after loader
            }
        });
}

/**
 * Handles the main homepage animation sequence
 * Animates navigation links, text elements, and images
 */
function homepageAnimation() {
    var tl = gsap.timeline();

    tl
        // Animate navigation links sliding down into view
        .to("#nav a", {
            y: "0%",
            opacity: 1,
            duration: 1,
            stagger: 0.1, // Stagger each link's animation
            ease: Expo.easeInOut,
        })
        // Animate text elements sliding up into view
        .to("#home .parent .child", {
            y: "0%",
            duration: 1,
            ease: Expo.easeInOut,
            stagger: 0.1,
        })
        // Fade in images
        .to("#home #row img", {
            opacity: 1,
            duration: 1,
            ease: Expo.easeInOut,
            stagger: 0.1,
            onComplete: function () {
                animateSvg(); // Start SVG animations after images are loaded
            }
        });
}

/**
 * Animates SVG elements by revealing their strokes
 */
function animateSvg() {
    gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
        strokeDashoffset: 0, // Animate stroke to reveal SVG
        duration: 2,
        ease: Expo.easeInOut,
    });
}

/**
 * Initializes Locomotive Scroll for smooth scrolling
 */
function locoInit() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#home'),
        smooth: true
    });
}

/**
 * Handles hover effects for cards/images
 * Shows a cursor image and applies grayscale effect on hover
 */
function cardHoverEffect() {
    document.querySelectorAll(".cont")
        .forEach(function (cont) {
            var showImg;
            // Handle mouse movement over cards
            cont.addEventListener("mousemove", function (dets) {
                // Show cursor image corresponding to the hovered card
                document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
                showImg = dets.target;
                // Move cursor image to mouse position
                document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = 
                    `translate(${dets.clientX}px,${dets.clientY}px)`;
                // Apply grayscale effect to hovered card
                showImg.style.filter = "grayscale(1)";
                showImg.style.transition = "all 0.3s";
                showImg.style.transitionTimingFunction = "ease-in-out";
                showImg.style.transitionDelay = "0s";
            })
            // Handle mouse leaving cards
            cont.addEventListener("mouseleave", function (dets) {
                // Hide cursor image
                document.querySelector("#cursor").children[showImg.dataset.index].style.opacity = 0;
                // Remove grayscale effect
                showImg.style.filter = "grayscale(0)";
                showImg.style.transition = "all 0.3s";
                showImg.style.transitionTimingFunction = "ease-in-out";
            })
        })
}

// Initialize all animations and effects
revealToSpan(); // Set up text reveal elements
valueSetter(); // Set initial states
loaderAnimation(); // Start loading sequence
locoInit(); // Initialize smooth scrolling
cardHoverEffect(); // Set up card hover effects


