let count = 0;


function plus(btn){
    let countSpan = btn.parentElement.querySelector(".count");
    let count = parseInt(countSpan.innerText) || 0;

    count++;
    countSpan.innerText = count;
}

function minus(btn){
    let countSpan = btn.parentElement.querySelector(".count");
    let count = parseInt(countSpan.innerText) || 0;

    if(count > 0){
        count--;
    }

    countSpan.innerText = count;
}

