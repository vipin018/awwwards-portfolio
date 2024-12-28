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

function valueSetter() {
    // Set initial properties for navigation links and home elements
    gsap.set("#nav a", {
        y: "-100%", // Move links off-screen vertically
        opacity: 0 // Set initial opacity to 0
    });
    gsap.set("#home .parent .child", {
        y: "100%", // Move child elements down off-screen
    });
    gsap.set("#home #row img", {
        opacity: 0, // Set initial opacity of images to 0
    });

    // Set stroke properties for SVG elements
    document.querySelectorAll("#Visual>g").forEach(function (elem) {
        elem.childNodes[1].childNodes[1].style.strokeDasharray = elem.childNodes[1].childNodes[1].getTotalLength() + "px"; // Set stroke dasharray
        elem.childNodes[1].childNodes[1].style.strokeDashoffset = elem.childNodes[1].childNodes[1].getTotalLength() + "px"; // Set stroke dashoffset
    });
}

function loaderAnimation() {
    var tl = gsap.timeline(); // Create a timeline instance for animations

    tl
        .from("#loader .child span ", {
            x: 100, // Start position for the animation
            ease: "power3.out", // Easing function for the animation
            duration: 1, // Duration of the animation
            delay: 1, // Delay before starting the animation
            stagger: 0.15, // Stagger the animation for child elements
            opacity: 0 // Start with opacity 0
        })
        .to("#loader .parent .child", {
            y: "-100%", // Move the child up off-screen
            ease: Circ.easeInOut, // Easing function for the animation
            duration: 0.5, // Duration of the animation
        })
        .to("#loader", {
            height: 0, // Animate height to 0
            duration: 0.5, // Duration of the animation
            ease: Circ.easeInOut, // Easing function for the animation
        })
        .to("#green", {
            height: "100%", // Animate height to 100%
            top: 0, // Set top position to 0
            delay: -0.8, // Delay before starting this animation
            duration: 0.4, // Duration of the animation
            ease: Circ.easeInOut, // Easing function for the animation
        })
        .to("#green", {
            height: "0%", // Animate height back to 0%
            top: 0, // Keep top position at 0
            duration: 0.5, // Duration of the animation
            delay: -0.5, // Delay before starting this animation
            ease: Circ.easeInOut, // Easing function for the animation
            onComplete: function () {
                homepageAnimation(); // Call homepageAnimation when this animation completes
            }
        });
}

function homepageAnimation() {
    var tl = gsap.timeline(); // Create a timeline instance for homepage animations

    tl
        .to("#nav a", {
            y: "0%", // Move links into view
            opacity: 1, // Set opacity to 1
            duration: 1, // Duration of the animation
            stagger: 0.1, // Stagger the animation for nav links
            ease: Expo.easeInOut, // Easing function for the animation
        })
        .to("#home .parent .child", {
            y: "0%", // Move child elements into view
            duration: 1, // Duration of the animation
            ease: Expo.easeInOut, // Easing function for the animation
            stagger: 0.1, // Stagger the animation for child elements
        })
        .to("#home #row img", {
            opacity: 1, // Set opacity of images to 1
            duration: 1, // Duration of the animation
            ease: Expo.easeInOut, // Easing function for the animation
            stagger: 0.1, // Stagger the animation for images
            onComplete: function () {
                animateSvg(); // Call animateSvg when this animation completes
            }
        });
}

function animateSvg() {
    // Animate SVG paths and polylines to reveal them
    gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
        strokeDashoffset: 0, // Animate strokeDashoffset to 0 to reveal the SVG
        duration: 2, // Duration of the animation
        ease: Expo.easeInOut, // Easing function for the animation
    });
}

function locoInit() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });
}

// Initial function calls to start animations
revealToSpan(); // Call the function to run it 
valueSetter(); // Call the function to run it
loaderAnimation(); // Start the loader animation
locoInit(); // Initialize Locomotive Scroll


