import './navbar.css';

function navbar(item_menu) {
  const navbar = document.getElementById('navbar');
  navbar.innerHTML = `
<nav class="navbar" aria-label="Menu principal">
  <ul class="navbar__lista">
        ${item_menu
          .filter((menu) => menu.label !== '')
          .map((item) => {
            return `<li>
                            <a href="${item.url}" class="navbar-item navbar-item__icon">
                                <i data-lucide="${item.icon}"></i>
                                ${item.label}
                            </a>
                        </li>`;
          })
          .join('')}
  </ul>
</nav>
`;
}

export { navbar };
