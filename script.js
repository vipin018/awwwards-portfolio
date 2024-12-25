document.querySelectorAll('.reveal')
    .forEach(function (elem) {
        var spanParent = document.createElement('span');
        var spanChild = document.createElement('span');

        spanParent.classList.add('parent');
        spanChild.classList.add('child');

        spanChild.textContent = elem.textContent;
        spanParent.appendChild(spanChild);

        elem.innerHTML = '';
        elem.appendChild(spanParent);
    });