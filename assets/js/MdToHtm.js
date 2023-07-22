{
    document.querySelector('#passageTitleCopy').innerHTML = document.querySelector('#passageTitle').innerHTML;
}

{
    let MarkdownIt = window.markdownit({
        html: true,
        linkify: true,
        typographer: true,
    });

    let text = document.querySelector('#raw-markdown-body').textContent,
        markdownTarget = document.querySelector('#raw-markdown-body'),
        result = MarkdownIt.render(text);

    markdownTarget.innerHTML = result;
}

{
    // let Index = 0;
    let titleTag = ['H1', 'H2', 'H3'];
    let titles = [];
    let nodeToBeTraversed = document.querySelector('#markdown-body');

    function nodeTraverse(e, f) {
        // let Layer = 'layer-' + Index;
        f(e);
        if (e.hasChildNodes()) {
            // Index += 1;
            let children = e.childNodes;
            for (let i = 0; i < children.length; i++) {
                nodeTraverse(children[i], f);
            }
            // Index -= 1;
        }
    }

    // function generateIndex(e, layer) {
    function generateIndex(e) {
        // if (titleTag.includes(e.nodeName) && (layer == 'layer-1' || layer == 'layer-2')) {
        if (titleTag.includes(e.nodeName)) {
            // e.setAttribute('layer', layer);
            e.setAttribute('class', 'index');
            let result = e.textContent;
            e.setAttribute('id', result);
            // let eChildOne = e.firstElementChild;
            // for(let p = 0; p < e.childNodes.length; p++) {
            //     result = strSubtract(result, eChildren[p]);
            // }
            // if (eChildOne != null) {
            //     result = strSubtract(result, eChildOne.textContent);
            // }
            // console.log(result);
            titles.push({
                id: result,
                // level: layer.substring(1),
                level: e.nodeName.substring(1),
                title: result,
                // nodeName: e.nodeName,
            });
        }
    }

    nodeTraverse(nodeToBeTraversed, generateIndex);

    // document.querySelector('#category').innerHTML +=
    //     "<li class='index' style='font-size: 30px; padding-left: " + (titles[0].level * 22 - 22) + "px;'>" + 'Category' + '</li>';
    for (let index in titles) {
        document.querySelector('#category').innerHTML +=
            "<li class='index' style='padding-left: " +
            titles[index].level * 22 +
            "px;'>" +
            "<a href='#" +
            titles[index].id +
            "'>" +
            titles[index].title +
            '</a></li>';
    }

    // function strSubtract(str1, str2) {
    //     return str1.substring(0, str1.length - str2.length);
    // }
}

{
    let observer = new IntersectionObserver(highlightCurrentIndex, {
        root: null,
        rootMargin: '0px 0px 999999999px 0px',
        threshold: 0,
    });

    let observerTargets = document.querySelectorAll('.markdown-body .index');
    observerTargets.forEach((observerTarget) => {
        observer.observe(observerTarget);
    });

    let previousHighlightIndex = undefined;
    function highlightCurrentIndex(entries) {
        if (previousHighlightIndex){
            previousHighlightIndex.style.color = '#00000065';
        }
        let entry = entries.reduce((a, b) => {
            return a.IntersectionRatio > b.IntersectionRatio ? a : b;
        });
        let id = entry.target.id;
        previousHighlightIndex = document.querySelector(`a[href="#${id}"]`);
        previousHighlightIndex.style.color = '#000000';
    }
}
