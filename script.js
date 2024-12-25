function revealToSpan() {
    document.querySelectorAll('.reveal') // Select all elements with the class 'reveal'
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
    gsap.set("#nav a", {
        y: "-100%",
        opacity: 0
    })
    gsap.set("#home .parent .child", {
        y: "100%",
    })
    gsap.set("#home #row img", {
        opacity: 0,
    })

    document.querySelectorAll("#Visual>g").forEach(function (elem) {
        elem.childNodes[1].childNodes[1].style.strokeDasharray = elem.childNodes[1].childNodes[1].getTotalLength() + "px";
        elem.childNodes[1].childNodes[1].style.strokeDashoffset = elem.childNodes[1].childNodes[1].getTotalLength() + "px";
    });
}

function loaderAnimation() {
    var tl = gsap.timeline(); // Create a timeline instance

    tl
        .from("#loader .child span ", {
            x: 100,
            ease: "power3.out",
            duration: 1,
            delay: 1,
            stagger: 0.15,
            opacity: 0

        })
        .to("#loader .parent .child", {
            y: "-100%",
            ease: Circ.easeInOut,
            duration: 0.5,
        })
        .to("#loader", {
            height: 0,
            duration: 0.5,
            ease: Circ.easeInOut,
        })
        .to("#green", {
            height: "100%",
            top: 0,
            delay: -0.8,
            duration: 0.4,
            ease: Circ.easeInOut,
        })
        .to("#green", {
            height: "0%",
            top: 0,
            duration: 0.5,
            delay: -0.5,
            ease: Circ.easeInOut,
            onComplete: function () {
                homepageAnimation();
            }
        })
}

function homepageAnimation() {

    var tl = gsap.timeline();

    tl
        .to("#nav a", {
            y: "0%",
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: Expo.easeInOut,
        })
        .to("#home .parent .child", {
            y: "0%",
            duration: 1,
            ease: Expo.easeInOut,
            stagger: 0.1,
        })
        .to("#home #row img", {
            opacity: 1,
            duration: 1,
            ease: Expo.easeInOut,
            stagger: 0.1,
            onComplete: function () {
                animateSvg();
            }
        })
}

function animateSvg() {


    gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
        strokeDashoffset: 0,
        duration: 2,
        ease: Expo.easeInOut,
    })

}



revealToSpan(); // Call the function to run it 
valueSetter(); // Call the function to run it
loaderAnimation();


