const draggables = document.querySelectorAll('.draggable');
draggables.forEach(item => {
    item.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text', event.target.outerHTML);
    });
});
function allowDrop(event) {
    event.preventDefault();
}
function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData('text');
    event.target.insertAdjacentHTML('beforeend', data);
}
var tl=gsap.timeline();
tl.from("#top",{
    y:-60,
    duration:3,
    delay:0.1,
    stagger:1,
    opacity:1
})

tl.from(".draggable",{
    x:-1500,
    duration:3,
    delay:0.1,
    stagger:1,
    opacity:1
})
tl.from("#port",{
    x:-600,
    duration:3,
    delay:0.1,
    stagger:1,
    opacity:1
})
tl.from("#portfolio",{
    x:-1200,
    duration:3,
    delay:0.1,
    stagger:1,
    opacity:1
})
tl.from("#img1",{
    x:-1000,
    scale:0.5,
    duration:3,
    delay:0.1,
    stagger:1,
    opacity:1
})

