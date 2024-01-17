const username = 'EmanG7';
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
fetch(`https://api.github.com/users/${username}/repos`)
    .then(Response => Response.json())
    .then(data => {
        const container = document.getElementById('git_container');
        data.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
        repo = data[0];
        repoDate = new Date(repo.created_at);
        container.innerHTML = `<a href="${repo.html_url}" style="text-decoration: none;" target="_blank">
                                <div class="block"  style="text-align:center;">
                                <h3>Newest Github Repo</h3> 
                                <img src="/assets/images/GithubLogo.png" width="auto" height="100px">
                                <p style="text-decoration: underline;">${repo.name}</p>
                                <p>Created on ${repoDate.getDate()} ${months[repoDate.getMonth()]} ${repoDate.getFullYear()}</p>
                                </div></a>`
        container.style.textDecoration = 'none';
    });