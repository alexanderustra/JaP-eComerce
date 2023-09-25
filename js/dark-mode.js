document.getElementById('dark-mode').addEventListener('click',()=>{
    document.body.style.backgroundColor = 'grey'
    var paragraphs = document.getElementsByTagName('label');
    var h4 = document.getElementsByTagName('h4');
    var p = document.getElementsByTagName('p');
    let categoryList = document.querySelectorAll('.list-group-item');

    for (var i = 0; i < categoryList.length; i++) {
        categoryList[i].style.backgroundColor = 'brown';
        categoryList[i].style.borderColor = 'white'
    }
    for (var i = 0; i < p.length; i++) {
        p[i].style.color = 'white'
    }
    for (var i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.color = 'white'
    }

    for (var i = 0; i < h4.length; i++) {
        paragraphs[i].style.color = 'white'
        h4[i].style.color = 'white'
    }
})