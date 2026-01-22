 lucide.createIcons();

        function toggleTheme() {
            const body = document.body;
            const btnUi = document.getElementById('theme-btn-ui');
            if (body.classList.contains('dark')) {
                body.classList.replace('dark', 'light');
                btnUi.innerHTML = '<i data-lucide="moon"></i>';
            } else {
                body.classList.replace('light', 'dark');
                btnUi.innerHTML = '<i data-lucide="sun"></i>';
            }
            lucide.createIcons();
        }

        function openPhoto(url) {
            const modal = document.getElementById('photo-modal');
            const modalImg = document.getElementById('modal-img');
            modalImg.src = url;
            modal.style.display = 'flex';
        }

        async function loadMenu() {
            try {
                const response = await fetch('menu.json');
                const data = await response.json();
                const container = document.getElementById('menu-container');
                const nav = document.getElementById('nav-items');
                
                container.innerHTML = '';
                nav.innerHTML = '';

                data.forEach(cat => {
                    const link = document.createElement('a');
                    link.href = `#${cat.id}`;
                    link.className = "text-[#FDC57E]";
                    link.innerText = cat.categoria;
                    nav.appendChild(link);

                    const section = document.createElement('section');
                    section.id = cat.id;
                    section.className = "scroll-mt-28";
                    
                    section.innerHTML = `
                        <div class="flex items-center gap-4 mb-10">
                            <h2 class="text-3xl font-serif italic" style="color: var(--primary);">${cat.categoria}</h2>
                            <div class="h-[1px] flex-grow bg-[#71502F] opacity-20"></div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            ${cat.items.map(item => `
                                <div class="pb-4 item-border flex gap-4 items-center">
                                    <!-- Foto condicional -->
                                    ${item.foto ? 
                                        `<img src="${item.foto}" class="dish-photo" onclick="openPhoto('${item.foto}')" alt="${item.nombre}">` 
                                        : '' 
                                    }
                                    
                                    <div class="flex-grow">
                                        <div class="flex justify-between items-start mb-1">
                                            <h3 class="text-lg font-bold uppercase tracking-tight leading-tight">${item.nombre}</h3>
                                            <span class="font-serif font-bold text-lg text-[#71502F] dark:text-[#FDC57E]">${item.precio}</span>
                                        </div>
                                        <p class="text-sm italic font-light leading-snug" style="color: var(--text-muted);">
                                            ${item.desc.replace(/\[cite: \d+\]/g, '')}
                                        </p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                    container.appendChild(section);
                });
            } catch (e) { console.error(e); }
        }

const menuScroll = document.querySelector('.sticky-nav > div');

menuScroll.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    menuScroll.scrollLeft += evt.deltaY;
});


// --- LÓGICA DEL BOTÓN IR ARRIBA ---
const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    // Si bajamos más de 300px, mostrar botón
    if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Desplazamiento suave
    });
}

// Actualizar iconos por si acaso
lucide.createIcons();




        document.addEventListener('DOMContentLoaded', loadMenu);