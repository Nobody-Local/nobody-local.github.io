/*
 - Copyright
    © 2022 Compass Network JP.
    © 2019-2022 BlogBooks.

 - rule
    none

 - Author(Github Profile Name)
    @harunLog, @localer

 - last updated
    2022/07/30 14:16
*/

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function pageLoad(target, Title) {
    const Element = document.createElement("iframe");
    Element.src = "pages/" + target + ".html";
    Element.addEventListener(("load") ,() => {
        document.title = Title;
    })
    Element.height = "100%";
    Element.width = "100%";
    document.body.appendChild(Element);
}

window.addEventListener(("load"), () => {
    switch (getParam("page")) {
        case ("" || null || undefined) :
            const m_target = "home";
            const Title = "Home - BlogBooks";
            break;
        default:
            break;
    };
    pageLoad(target, Title);
});