const BlogBooks = {
    posts() {
        fetch("https://blogbooks-fetcher-1.haru070.repl.co/posts")
            .then(response => response.json())
            .then(query => {
                var $content;
                query.forEach(data => {
                    if (data.excerpt.protected == "true") {} else {
                        $content += `<div class="post" data-postID="${data.id}"><div class="title">${data.title.rendered}</div><div class="description">${data.excerpt.rendered}</div></div>`;
                    }
                });
                document.querySelector("#posts").innerHTML = $content;
            })
            .catch(e => {
                document.querySelector("main").innerHTML = e;
                console.error(e);
            })
    },
    page(id = "") {
        fetch("https://blogbooks-fetcher-1.haru070.repl.co/page", {
            method: "POST",
            body: JSON.stringify({
                "id": id,
            })
        })
            .then(response => response.json())
            .then(query => {
                $content = `<h1>${query.title}</h1><div class="date">date</div><div class="content">${query.content.rendered}</div>`;
                document.querySelector("#posts").innerHTML = $content;
            })
            .catch(e => {
                document.querySelector("main").innerHTML = e;
                console.error(e);
            })
    }
}

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Start Line
if (location.pathname.startsWith("/Blog")) {
    var target = location.pathname.substr(5);
    if (target == null || "" || undefined) {
        BlogBooks.posts();
    } else {
        target = location.pathname.substr(6);
        BlogBooks.page(target);
    }
}