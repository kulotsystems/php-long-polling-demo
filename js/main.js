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
        body: form,

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


// run poll onload
window.addEventListener('load', () => {
    poll();
});