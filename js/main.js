// initial timestamp
let timestamp = 0;


// initiate long polling
function poll()
{
    // form data
    const form = new FormData();
    form.append('last', timestamp.toString());

    fetch('app/index.php', {
        method: 'post',
        body: form
    })
        .then(res => res.json())
        .then(data => {
            const divScore = document.querySelector('#score');
            divScore.innerHTML = `${data.timestamp} | ${data.home} - ${data.away}`;
            timestamp = data.timestamp;

            // call poll() again
            poll();
        })
        .catch(err => {
            // call poll() on timeout
            poll();
        });
}

// another async request
function asyncRequest(btn, span) {
    // form data
    const form = new FormData();
    form.append('epoch', 1);

    btn.disabled = true;
    fetch('app/index.php', {
        method: 'post',
        body: form
    })
        .then(res => res.json())
        .then(data => {
            span.innerHTML = data.timestamp;
        })
        .catch(err => {
            console.log("Async Request Error: ", err);
        })
        .finally(() => {
            btn.disabled = false;
        });
}

const btnAsync1 = document.querySelector('#btn-async1');
const btnAsync2 = document.querySelector('#btn-async2');
const bAsync1  = document.querySelector('#b-async1');
const bAsync2  = document.querySelector('#b-async2');
btnAsync1.addEventListener('click', () => {
    asyncRequest(btnAsync1, bAsync1);
});
btnAsync2.addEventListener('click', () => {
    asyncRequest(btnAsync2, bAsync2);
});


// run poll onload
window.addEventListener('load', () => {
    poll();
});