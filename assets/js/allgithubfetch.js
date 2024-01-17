const username = 'EmanG7';
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
fetch(`https://api.github.com/users/${username}/repos`)
    .then(Response => Response.json())
    .then(data => {
        const container = document.getElementById('git_container');
        data.forEach(repo => {
            if(repo.name !== username) {
                const repoElement = document.createElement('div');
                const dateMade = new Date(repo.created_at);
                repoElement.innerHTML = `<a href="${repo.html_url}" style="text-decoration: none;" target="_blank">
                                            <div class="block"  style="text-align:center;">
                                            <h3 style="text-decoration: underline;">${repo.name}</h3>
                                            <p>Created on ${dateMade.getDate()} ${months[dateMade.getMonth()]} ${dateMade.getFullYear()}</p>
                                            <p>${repo.description}</p>
                                            </div></a>`;
                container.appendChild(repoElement);
            }
        });
    });
