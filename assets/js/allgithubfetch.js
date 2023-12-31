const username = 'EmanG7'
fetch(`https://api.github.com/users/${username}/repos`)
    .then(Response => Response.json())
    .then(data => {
        const container = document.getElementById('git_container');
        data.forEach(repo => {
            if(repo.name !== username) {
                const repoElement = document.createElement('div');
                repoElement.innerHTML = `<a href="${repo.html_url}" style="text-decoration: none;" target="_blank">
                                            <div class="block"  style="text-align:center;">
                                            <h3 style="text-decoration: underline;">${repo.name}</h3>
                                            <p>${repo.description}</p>
                                            </div></a>`;
                container.appendChild(repoElement);
            }
        });
    });
