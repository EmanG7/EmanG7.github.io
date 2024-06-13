const username = 'EmanG7';
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
fetch(`https://api.github.com/users/${username}/repos`)
    .then(Response => Response.json())
    .then(data => {
        const container = document.getElementById('github_repo_ctr');
	container.innerHTML = `<h2 class="archive__subtitle">github</h2>`;
        data.forEach(repo => {
            if(repo.name !== username) {
                const repoElement = document.createElement('div');
		repoElement.className = "list__item"
                let dateMade = new Date(repo.created_at);
                repoElement.innerHTML = `<article class="archive__item" itemscope="" itemtype="https://schema.org/CreativeWork">
    		<h2 class="archive__item-title" itemprop="headline">
        	<a href="${repo.html_url}" rel="permalink">${repo.name}</a>
    		</h2><p class="archive__item-excerpt" itemprop="description">Created on ${dateMade.getDate()} ${months[dateMade.getMonth()]} ${dateMade.getFullYear()}</p></article>`;
                container.appendChild(repoElement);
            }
        });
    });
