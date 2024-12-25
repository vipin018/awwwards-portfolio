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
revealToSpan(); // Call the function to run it 

var tl = gsap.timeline(); // Create a timeline instance

tl.from(".child span ", {
    x: 100,
    ease: "power3.out",
    duration: 1,
    delay: 1,
    stagger: 0.15,
    opacity:0

})
tl.to(".parent .child", {
    y: "-100%",
    ease: Circ.easeInOut,
    duration: 0.5,
})
tl.to("#loader", {
    height:0,
    duration:0.5,
    ease: Circ.easeInOut,
})
tl.to("#green", {
    height:"100%",
    top:0,
    delay:-0.8,
    duration:0.4,
    ease: Circ.easeInOut,
})
tl.to("#green", {
    height:"0%",
    top:0,
    duration:0.5,
    delay:-0.5,
    ease: Circ.easeInOut,
})
