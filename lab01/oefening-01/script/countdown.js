const createCountDown = function () {
    let size = 10;
    let counter = "";
    for (let i = size; i > 0; i--) {
        let span = document.createElement("span");
        span.style.fontSize = i.toString() + "em";
        span.className = getCSSClass(i);
        span.innerHTML = i.toString() + setSpaces(i);
        counter += span.outerHTML;

        //of
        // `<span class="${getCSSClass(i)}" style="font-size="${i}em"">${i}${setSpaces(i)}</span>`
    }
    return counter;
};
const getCSSClass = function (num) {
    return num % 2 === 0 ? "u-even" : "u-odd";
};
const setSpaces = function (num) {
    return "&nbsp;".repeat(num);
};
const init = function () {
    let el = document.querySelector(".js-holder");
    el.innerHTML = createCountDown();
};
init();
