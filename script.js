var tl = gsap.timeline();

tl.to("#fs", {
    height: 0,
    duration: 2,
    ease: Expo.easeInOut
})
    .to("#elem", {
        height: "100%",
        duration: 2,
        ease: Expo.easeInOut,
        delay: -2
    })
    .to("#white", {
        height: "100%",
        duration: 2,
        ease: Expo.easeInOut,
        delay: -1.5
    });