const $ = id => document.getElementById(id);
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => fn.apply(this, args), delay); };
};
const storage = {
  get: (k, f) => { try { return JSON.parse(localStorage.getItem(k)) || f; } catch { return f; } },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
  remove: k => localStorage.removeItem(k)
};

const initialAnimes = [
  { title: "Naruto",            genre: "shonen", emoji: "🍃", color: "#E67E22", tag: "Shōnen", ep: "720 éps.",    img: "https://cdn.myanimelist.net/images/anime/13/17405.jpg", synopsis: "Naruto Uzumaki, un jeune ninja orphelin, cherche la reconnaissance de ses pairs et rêve de devenir Hokage.", year: 2002, malUrl: "https://myanimelist.net/anime/20/Naruto" },
  { title: "Demon Slayer",      genre: "shonen", emoji: "🗡️", color: "#C0392B", tag: "Shōnen", ep: "44 éps.",     img: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg", synopsis: "Le voyage de Tanjiro Kamado pour venger sa famille et sauver sa sœur Nezuko, transformée en démon.", year: 2019, malUrl: "https://myanimelist.net/anime/38000/Kimetsu_no_Yaiba" },
  { title: "Attack on Titan",   genre: "shonen", emoji: "⚡",  color: "#7F8C8D", tag: "Shōnen", ep: "87 éps.",     img: "https://cdn.myanimelist.net/images/anime/10/47347.jpg", synopsis: "L'humanité lutte pour sa survie contre des géants mystérieux derrière d'immenses murs.", year: 2013, malUrl: "https://myanimelist.net/anime/16498/Shingeki_no_Kyojin" },
  { title: "My Hero Academia",  genre: "shonen", emoji: "💥", color: "#E74C3C", tag: "Shōnen", ep: "138 éps.",    img: "https://cdn.myanimelist.net/images/anime/10/78745.jpg", synopsis: "Dans un monde de super-héros, un garçon sans pouvoirs hérite du plus grand d'entre eux.", year: 2016, malUrl: "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia" },
  { title: "One Piece",         genre: "shonen", emoji: "🏴‍☠️", color: "#F39C12", tag: "Shōnen", ep: "1000+ éps.", img: "https://cdn.myanimelist.net/images/anime/6/73245.jpg", synopsis: "Luffy et son équipage naviguent à la recherche du trésor légendaire laissé par Gold Roger.", year: 1999, malUrl: "https://myanimelist.net/anime/21/One_Piece" },
  { title: "Sailor Moon",       genre: "shojo",  emoji: "🌙", color: "#9B59B6", tag: "Shōjo",  ep: "200 éps.",    img: "https://cdn.myanimelist.net/images/anime/5/54381.jpg", synopsis: "Usagi Tsukino découvre son destin de protectrice de la Terre sous les traits de Sailor Moon.", year: 1992, malUrl: "https://myanimelist.net/anime/529/Bishoujo_Senshi_Sailor_Moon" },
  { title: "Card Captor Sakura",genre: "shojo",  emoji: "🃏", color: "#E91E63", tag: "Shōjo",  ep: "70 éps.",     img: "https://cdn.myanimelist.net/images/anime/1/11794.jpg", synopsis: "Sakura doit capturer les cartes magiques de Clow avant qu'elles ne causent le chaos.", year: 1998, malUrl: "https://myanimelist.net/anime/232/Cardcaptor_Sakura" },
  { title: "Fruits Basket",     genre: "shojo",  emoji: "🍊", color: "#E67E22", tag: "Shōjo",  ep: "63 éps.",     img: "https://cdn.myanimelist.net/images/anime/1447/99827.jpg", synopsis: "Tohru Honda découvre que la famille Sohma est victime d'une malédiction liée au zodiaque.", year: 2019, malUrl: "https://myanimelist.net/anime/38680/Fruits_Basket_1st_Season" },
  { title: "Sword Art Online",  genre: "isekai", emoji: "⚔️", color: "#2980B9", tag: "Isekai", ep: "96 éps.",     img: "https://cdn.myanimelist.net/images/anime/11/39717.jpg", synopsis: "Piégés dans un jeu vidéo, les joueurs doivent finir le jeu pour s'échapper, sous peine de mort réelle.", year: 2012, malUrl: "https://myanimelist.net/anime/11757/Sword_Art_Online" },
  { title: "Re:Zero",           genre: "isekai", emoji: "🌸", color: "#3498DB", tag: "Isekai", ep: "50 éps.",     img: "https://cdn.myanimelist.net/images/anime/1522/128039.jpg", synopsis: "Subaru Natsuki peut remonter le temps par sa propre mort dans un monde fantastique impitoyable.", year: 2016, malUrl: "https://myanimelist.net/anime/31240/Re_Zero_kara_Hajimeru_Isekai_Seikatsu" },
  { title: "Slime Isekai",      genre: "isekai", emoji: "🫧", color: "#1ABC9C", tag: "Isekai", ep: "48 éps.",     img: "https://cdn.myanimelist.net/images/anime/1490/93398.jpg", synopsis: "Réincarné en slime, Rimuru Tempest fonde une nation pour tous les monstres.", year: 2018, malUrl: "https://myanimelist.net/anime/37430/Tensei_shitara_Slime_Datta_Ken" },
  { title: "Evangelion",        genre: "mecha",  emoji: "🤖", color: "#27AE60", tag: "Mecha",  ep: "26 éps.",     img: "https://cdn.myanimelist.net/images/anime/1314/108941.jpg", synopsis: "Shinji Ikari doit piloter l'EVA-01 pour défendre Tokyo-3 contre les Anges.", year: 1995, malUrl: "https://myanimelist.net/anime/30/Neon_Genesis_Evangelion" },
  { title: "Gundam",            genre: "mecha",  emoji: "🦾", color: "#16A085", tag: "Mecha",  ep: "43 éps.",     img: "https://cdn.myanimelist.net/images/anime/4/9979.jpg", synopsis: "La guerre entre la Fédération Terrestre et le Duché de Zeon à l'aide de robots géants.", year: 1979, malUrl: "https://myanimelist.net/anime/80/Mobile_Suit_Gundam" },
  { title: "Code Geass",        genre: "mecha",  emoji: "♟️", color: "#8E44AD", tag: "Mecha",  ep: "50 éps.",     img: "https://cdn.myanimelist.net/images/anime/5/50331.jpg", synopsis: "Lelouch utilise son Geass pour renverser l'empire tyrannique de Britannia.", year: 2006, malUrl: "https://myanimelist.net/anime/1575/Code_Geass__Hangyaku_no_Lelouch" },
  { title: "Spy x Family",      genre: "shonen", emoji: "🕵️", color: "#45B39D", tag: "Shōnen", ep: "25 éps.",     img: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg", synopsis: "Un espion doit fonder une famille factice pour remplir une mission, sans savoir que sa femme est une tueuse et sa fille une télépathe.", year: 2022, malUrl: "https://myanimelist.net/anime/50265/Spy_x_Family" },
  { title: "Jujutsu Kaisen",    genre: "shonen", emoji: "🧿", color: "#2E4053", tag: "Shōnen", ep: "24 éps.",     img: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg", synopsis: "Yuji Itadori avale un doigt maudit pour sauver ses amis et devient l'hôte du Roi des Fléaux.", year: 2020, malUrl: "https://myanimelist.net/anime/40748/Jujutsu_Kaisen" },
  { title: "Kimi ni Todoke",    genre: "shojo",  emoji: "🌸", color: "#FADBD8", tag: "Shōjo",  ep: "25 éps.",     img: "https://cdn.myanimelist.net/images/anime/12/18765.jpg", synopsis: "Sawako, une lycéenne incomprise à cause de sa ressemblance avec Sadako, s'ouvre aux autres grâce à Kazehaya.", year: 2009, malUrl: "https://myanimelist.net/anime/6045/Kimi_ni_Todoke" },
  { title: "Mushoku Tensei",    genre: "isekai", emoji: "🪄", color: "#D4AC0D", tag: "Isekai", ep: "23 éps.",     img: "https://cdn.myanimelist.net/images/anime/1530/117776.jpg", synopsis: "Un chômeur se réincarne dans un monde fantastique en gardant ses souvenirs, décidé à réussir sa nouvelle vie.", year: 2021, malUrl: "https://myanimelist.net/anime/39535/Mushoku_Tensei__Isekai_Ittara_Honki_Dasu" },
  { title: "Darling in the Franxx", genre: "mecha", emoji: "🥀", color: "#E74C3C", tag: "Mecha",  ep: "24 éps.",  img: "https://cdn.myanimelist.net/images/anime/11/89337.jpg", synopsis: "Dans un futur lointain, des adolescents pilotent des robots géants appelés Franxx pour protéger l'humanité.", year: 2018, malUrl: "https://myanimelist.net/anime/35849/Darling_in_the_Franxx" },
  { title: "Solo Leveling",     genre: "shonen", emoji: "⚔️", color: "#3498DB", tag: "Shōnen", ep: "12 éps.",     img: "https://cdn.myanimelist.net/images/anime/1556/139413.jpg", synopsis: "Dans un monde où des chasseurs combattent des monstres, Sung Jin-woo, le plus faible de tous, obtient un pouvoir mystérieux pour monter de niveau.", isNew: true, year: 2024, malUrl: "https://myanimelist.net/anime/52299/Solo_Leveling" },
  { title: "Frieren",           genre: "isekai", emoji: "🧙‍♀️", color: "#A2D9CE", tag: "Fantasy", ep: "28 éps.",     img: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg", synopsis: "L'elfe Frieren entame un voyage pour comprendre la nature humaine après la mort de ses anciens compagnons.", isNew: true, year: 2023, malUrl: "https://myanimelist.net/anime/52991/Sousou_no_Frieren" },
  { title: "Apothecary Diaries", genre: "shojo",  emoji: "🧪", color: "#45B39D", tag: "Mystère", ep: "24 éps.",     img: "https://cdn.myanimelist.net/images/anime/1708/138033.jpg", synopsis: "Maomao, une herboriste vendue au palais impérial, utilise ses connaissances pour résoudre des mystères à la cour.", isNew: true, year: 2023, malUrl: "https://myanimelist.net/anime/54492/Kusuriya_no_Hitorigoto" },
  { title: "Black Clover",      genre: "shonen", emoji: "🍀", color: "#27ae60", tag: "Shōnen", ep: "170 éps.",    img: "https://cdn.myanimelist.net/images/anime/10/89330.jpg", synopsis: "Dans un monde où la magie est tout, Asta, un garçon né sans aucun pouvoir magique, jure de devenir le Roi-Sorcier.", year: 2017, malUrl: "https://myanimelist.net/anime/34572/Black_Clover" },
  { title: "Hunter x Hunter",   genre: "shonen", emoji: "🎣", color: "#f1c40f", tag: "Shōnen", ep: "148 éps.",    img: "https://cdn.myanimelist.net/images/anime/1337/99013.jpg", synopsis: "Gon Freecss part à l'aventure pour devenir un Hunter et retrouver son père, Ging.", year: 2011, malUrl: "https://myanimelist.net/anime/11061/Hunter_x_Hunter_2011" },
  { title: "Boruto",            genre: "shonen", emoji: "🔩", color: "#e67e22", tag: "Shōnen", ep: "293 éps.",    img: "https://cdn.myanimelist.net/images/anime/4/84144.jpg", synopsis: "Le fils de Naruto Uzumaki suit son propre chemin ninja tout en vivant dans l'ombre de son père.", year: 2017, malUrl: "https://myanimelist.net/anime/34566/Boruto__Naruto_Next_Generations" },
  { title: "Dragon Ball Z",     genre: "shonen", emoji: "🐉", color: "#f39c12", tag: "Shōnen", ep: "291 éps.",    img: "https://cdn.myanimelist.net/images/anime/1607/141721.jpg", synopsis: "Goku, maintenant adulte, défend la Terre contre des menaces intergalactiques aux côtés de son fils Gohan.", year: 1989, malUrl: "https://myanimelist.net/anime/813/Dragon_Ball_Z" },
  { title: "FMA: Brotherhood",  genre: "shonen", emoji: "🦾", color: "#e74c3c", tag: "Shōnen", ep: "64 éps.",     img: "https://cdn.myanimelist.net/images/anime/1208/94745.jpg", synopsis: "Deux frères utilisent l'alchimie pour retrouver leurs corps après une expérience ratée.", year: 2009, malUrl: "https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood" },
  { title: "Bleach",            genre: "shonen", emoji: "⚔️", color: "#3498db", tag: "Shōnen", ep: "366 éps.",    img: "https://cdn.myanimelist.net/images/anime/3/40451.jpg", synopsis: "Ichigo Kurosaki devient un Shinigami remplaçant pour protéger le monde des esprits malveillants.", year: 2004, malUrl: "https://myanimelist.net/anime/269/Bleach" },
  { title: "Death Note",        genre: "shonen", emoji: "📓", color: "#2c3e50", tag: "Mystère", ep: "37 éps.",     img: "https://cdn.myanimelist.net/images/anime/9/9453.jpg", synopsis: "Un lycéen brillant trouve un carnet capable de tuer toute personne dont le nom y est écrit.", year: 2006, malUrl: "https://myanimelist.net/anime/1535/Death_Note" },
  { title: "Blue Lock",         genre: "shonen", emoji: "⚽", color: "#2980b9", tag: "Sport",  ep: "24 éps.",     img: "https://cdn.myanimelist.net/images/anime/1258/126920.jpg", synopsis: "300 attaquants s'affrontent dans un centre de formation ultra-compétitif pour devenir le meilleur buteur du Japon.", year: 2022, malUrl: "https://myanimelist.net/anime/49596/Blue_Lock" },
  { title: "Vinland Saga",      genre: "shonen", emoji: "🪓", color: "#d35400", tag: "Action", ep: "48 éps.",     img: "https://cdn.myanimelist.net/images/anime/1500/103005.jpg", synopsis: "Thorfinn, le fils d'un grand guerrier viking, cherche à venger son père tué par Askeladd, le chef d'un groupe de mercenaires.", year: 2019, isNew: true, malUrl: "https://myanimelist.net/anime/37521/Vinland_Saga" },
  { title: "One Punch Man",     genre: "shonen", emoji: "👊", color: "#f1c40f", tag: "Action", ep: "12 éps.",     img: "https://cdn.myanimelist.net/images/anime/12/76631.jpg", synopsis: "Saitama est un héros qui peut vaincre n'importe quel adversaire d'un seul coup de poing, ce qui le laisse blasé.", year: 2015, malUrl: "https://myanimelist.net/anime/30276/One_Punch_Man" },
  { title: "Cyberpunk: Edgerunners", genre: "shonen", emoji: "🦾", color: "#f1c40f", tag: "Sci-Fi", ep: "10 éps.", img: "https://cdn.myanimelist.net/images/anime/1818/126435.jpg", synopsis: "Dans une dystopie rongée par la corruption, un enfant des rues tente de survivre en devenant un mercenaire.", isNew: true, year: 2022, malUrl: "https://myanimelist.net/anime/42310/Cyberpunk_Edgerunners" },
  { title: "JoJo's Bizarre Adventure", genre: "shonen", emoji: "⭐", color: "#8e44ad", tag: "Aventure", ep: "26 éps.", img: "https://cdn.myanimelist.net/images/anime/3/40407.jpg", synopsis: "La lignée Joestar affronte des forces surnaturelles à travers les époques.", year: 2012, malUrl: "https://myanimelist.net/anime/14719/JoJo_no_Kimyou_na_Bouken_TV" },
  { title: "Cowboy Bebop",       genre: "shonen", emoji: "🚀", color: "#2980b9", tag: "Espace",  ep: "26 éps.",     img: "https://cdn.myanimelist.net/images/anime/4/19644.jpg", synopsis: "En 2071, l'équipage hétéroclite du vaisseau Bebop chasse des primes à travers le système solaire sur fond de jazz.", year: 1998, malUrl: "https://myanimelist.net/anime/1/Cowboy_Bebop" },
  { title: "Samurai Champloo",   genre: "shonen", emoji: "⚔️", color: "#d35400", tag: "Action",  ep: "26 éps.",     img: "https://cdn.myanimelist.net/images/anime/1375/121599.jpg", synopsis: "Fuu, une jeune serveuse, recrute Mugen et Jin, deux samouraïs aux styles opposés, pour retrouver un mystérieux samouraï dans un Japon féodal revisité par le hip-hop.", year: 2004, malUrl: "https://myanimelist.net/anime/205/Samurai_Champloo" }
];

const State = {
  currentGenre: 'all',
  filteredItems: [],
  activeAnimeTitle: '',
  currentQRMode: 'poster',
  uploadedImageBase64: '',
  statsChart: null,
  malSearchResults: [],
  siteQR: null,
  userAnimes: [],
  deletedAnimes: [],
  animes: [],
  favorites: [],
  userProgress: {},
  selectedMalUrl: '',
  appSettings: { animations: true, sounds: true, cardSize: 'medium', accentColor: '#c084fc', itemsPerPage: 12 },
  currentPage: 1,
  itemsPerPage: 12,
  profile: { name: 'Laye Omoi', email: 'laye.omoi@anime2026.com', pic: null }
};

const App = {
  init() {
    this.cacheDOM();
    this.loadState();
    this.initializeTheme();
    this.updateSettingsUI();
    this.populateYears();
    this.applyFilters();
    this.setupHistory();
    this.setupEventListeners();
  },
  cacheDOM() {
    this.dom = {
      gallery: $('gallery'), count: $('count'), search: $('search'), sort: $('sort'),
      yearFilter: $('year-filter'), seasonalSection: $('seasonal-section'), seasonalGallery: $('seasonal-gallery')
    };
  },
  loadState() {
    State.userAnimes = storage.get('user_added_animes', []);
    State.deletedAnimes = storage.get('anime_deleted', []);
    State.favorites = storage.get('anime_favorites', []);
    State.userProgress = storage.get('anime_progress', {});
    State.appSettings = storage.get('anime_settings', State.appSettings);
    State.profile = storage.get('laye_profile', State.profile);
    State.itemsPerPage = State.appSettings.itemsPerPage || 12;
    
    // Mise à jour UI du profil
    $('profile-user-name').textContent = State.profile.name;
    $('profile-user-email').textContent = State.profile.email;
    $('user-profile-img').src = State.profile.pic || this.getInitialsAvatar(State.profile.name);

    this.refreshAnimesList();
  },
  refreshAnimesList() {
    State.animes = [...initialAnimes, ...State.userAnimes]
      .filter(a => !State.deletedAnimes.includes(a.title))
      .map(a => ({
        ...a,
        totalEp: parseInt(a.ep) || 1,
        safeTitle: a.title.replace(/'/g, "\\'")
      }));
  },
  saveState: (k, v) => storage.set(k, v),
  getBaseUrl: () => window.location.href.split('?')[0],
  getDisplayedAnimes() {
    if (State.currentGenre === 'favs') {
      const favs = new Set(State.favorites);
      return State.animes.filter(a => favs.has(a.title));
    }
    return State.currentGenre === 'all'
      ? [...State.animes]
      : State.animes.filter(a => a.genre === State.currentGenre);
  },
  setGenre(genre, element) {
    document.querySelectorAll('.tag').forEach(tag => tag.classList.remove('active'));
    element.classList.add('active');
    State.currentGenre = genre;
    this.applyFilters();
  },
  setupEventListeners() {
    if (this.dom.search) {
      this.dom.search.oninput = null;
      this.dom.search.addEventListener('input', debounce(() => this.applyFilters(), 250));
    }
    const addTitleInput = $('add-title');
    if (addTitleInput) {
      addTitleInput.addEventListener('input', debounce((e) => this.searchMAL(e.target.value), 500));
    }
  },
  applyFilters() {
    const query = this.dom.search.value.toLowerCase().trim();
    const sort = this.dom.sort.value;
    const year = this.dom.yearFilter.value;
    State.currentPage = 1;
    let items = this.getDisplayedAnimes();
    if (query) items = items.filter(a => a.title.toLowerCase().includes(query));
    if (year !== 'all') items = items.filter(a => a.year.toString() === year);
    items.sort((a, b) => sort === 'az'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title));
    State.filteredItems = items;
    this.renderGallery(items);
    if (State.currentGenre === 'all' && !query && year === 'all') {
      this.dom.seasonalSection.style.display = 'block';
      this.renderSeasonal();
    } else {
      this.dom.seasonalSection.style.display = 'none';
    }
  },
  populateYears() {
    const yearSelect = $('year-filter');
    const years = [...new Set(State.animes.map(a => parseInt(a.year)))].sort((a, b) => b - a);
    yearSelect.innerHTML = '<option value="all">ANNÉE</option>';
    years.forEach(year => {
      const opt = document.createElement('option');
      opt.value = year;
      opt.textContent = year;
      yearSelect.appendChild(opt);
    });
  },
  renderSeasonal() {
    const container = this.dom.seasonalGallery;
    const seasonal = State.animes.filter(a => a.isNew);
    if (!seasonal.length) {
      this.dom.seasonalSection.style.display = 'none';
      return;
    }
    container.innerHTML = seasonal.map(a => `
      <div class="seasonal-card" onclick="showDetails('${a.safeTitle}')">
        <span class="badge-new">Nouveau</span>
        <img src="${a.img}" alt="${a.title}">
        <div class="content">
          <h3>${a.title}</h3>
          <p>${a.synopsis}</p>
        </div>
      </div>
    `).join('');
  },
  getTotalEpisodes(episodeText) {
    return parseInt(episodeText) || 0;
  },
  handleImageError(imgElement, placeholderEmoji, isModal = false) {
    const maxRetries = 2; // Nombre de tentatives avant abandon
    const currentRetries = parseInt(imgElement.dataset.retries || '0');
    if (currentRetries < maxRetries) {
      imgElement.dataset.retries = currentRetries + 1;
      setTimeout(() => {
        const originalSrc = imgElement.src;
        imgElement.src = ''; imgElement.src = originalSrc;
      }, 1500);
      return;
    }
    imgElement.classList.remove('img-loading');
    if (isModal) {
      imgElement.onerror = null;
      imgElement.src = 'https://via.placeholder.com/400x600?text=Image+Indisponible';
      this.showToast("L'affiche n'a pas pu être chargée.", false);
    } else {
      imgElement.style.display = 'none';
      const placeholder = imgElement.nextElementSibling;
      if (placeholder && placeholder.classList.contains('card-placeholder')) {
        placeholder.style.display = 'flex';
        if (placeholderEmoji) placeholder.textContent = placeholderEmoji;
      }
    }
  },
  showDetails(title, updateHistory = true) {
    const anime = State.animes.find(a => a.title === title);
    if (!anime) return;
    this.lastFocusedElement = document.activeElement;
    State.activeAnimeTitle = title; State.currentQRMode = 'poster';
    const total = this.getTotalEpisodes(anime.ep);
    const current = State.userProgress[anime.title] || 0;
    const synopsisEl = $('modal-synopsis'), readMoreBtn = $('read-more-btn'), modalImg = $('modal-img');
    modalImg.dataset.retries = '0';
    modalImg.classList.add('img-loading');
    modalImg.onload = () => modalImg.classList.remove('img-loading');
    modalImg.onerror = () => this.handleImageError(modalImg, null, true);
    modalImg.src = anime.img;
    $('modal-title').textContent = anime.title;
    $('modal-meta').textContent = `${anime.tag} • ${anime.ep}`;
    synopsisEl.textContent = anime.synopsis;
    this.generateQR();
    if (anime.synopsis.length > 180) {
      synopsisEl.classList.add('collapsed');
      readMoreBtn.style.display = 'block';
      readMoreBtn.textContent = 'Lire la suite';
    } else {
      synopsisEl.classList.remove('collapsed');
      readMoreBtn.style.display = 'none';
    }
    const progressHTML = `
      <div class="modal-progress-section">
        <div class="modal-progress-header">
          <span>Progression de visionnage</span>
          <span><span class="ep-count" id="modal-ep-val">${current}</span> / ${total} éps.</span>
        </div>
        <input type="range" class="progress-slider" min="0" max="${total}" value="${current}"
          oninput="updateProgress('${anime.title.replace(/'/g, "\\'")}', this.value, ${total})">
      </div>
    `;
    const modalInfo = document.querySelector('.modal-info');
    const existingProgress = modalInfo.querySelector('.modal-progress-section');
    if (existingProgress) existingProgress.remove();
    modalInfo.insertAdjacentHTML('beforeend', progressHTML);
    $('modal').classList.add('active');
    document.body.style.overflow = 'hidden'; $('modal-title').focus();
    if (updateHistory) {
      const url = new URL(window.location);
      url.searchParams.set('anime', title);
      history.pushState({ anime: title }, '', url);
    }
  },
  async shortenUrl(longUrl) {
    try {
      const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`);
      const data = await response.json();
      if (data.shorturl) return data.shorturl;
    } catch (e) { console.error("Shorten error:", e); }
    return longUrl;
  },
  updateProgress(title, value, total) {
    State.userProgress[title] = parseInt(value);
    $('modal-ep-val').textContent = value;
    this.saveState('anime_progress', State.userProgress);
    this.applyFilters();
  },
  async searchMAL(query) {
    const container = $('mal-results');
    if (!query || query.length < 3) {
      container.style.display = 'none';
      return;
    }
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=5`);
      const json = await response.json();
      State.malSearchResults = json.data || [];
      if (State.malSearchResults.length > 0) {
        container.innerHTML = State.malSearchResults.map((anime, index) => `
          <div class="mal-result-item" onclick="selectMALAnimeByIndex(${index})" style="padding: 10px; cursor: pointer; border-bottom: 1px solid var(--border); display: flex; gap: 10px; align-items: center;">
            <img src="${anime.images.jpg.small_image_url}" width="35" height="50" style="object-fit: cover; border-radius: 4px;">
            <div style="flex:1">
              <div style="font-size: 13px; font-weight: 600; color: var(--accent);">${anime.title}</div>
              <div style="font-size: 11px; color: var(--muted);">${anime.year || 'Année inconnue'} • ${anime.episodes || '?'} éps.</div>
            </div>
          </div>
        `).join('');
        container.style.display = 'block';
      } else { container.style.display = 'none'; }
    } catch (err) { container.style.display = 'none'; }
  },
  selectMALAnimeByIndex(index) {
    const anime = State.malSearchResults[index];
    if (!anime) return;
    $('add-title').value = anime.title;
    $('add-year').value = anime.year || '';
    $('add-ep').value = anime.episodes ? `${anime.episodes}` : '';
    $('add-synopsis').value = anime.synopsis || '';
    const preview = $('add-img-preview');
    preview.src = anime.images.jpg.large_image_url;
    preview.style.display = 'block';
    State.uploadedImageBase64 = anime.images.jpg.large_image_url;
    State.selectedMalUrl = anime.url;
    $('mal-results').style.display = 'none';
    this.showToast('Données importées depuis MAL !', true);
  },
  openAddModal: () => $('add-modal').classList.add('active'),
  closeAddModal() {
    $('add-modal').classList.remove('active');
  },
  handleLocalImage(event) {
    const file = event.target.files[0];
    const preview = $('add-img-preview');
    if (!file) {
      preview.style.display = 'none';
      return;
    }
    if (file.size > 1024 * 1024) {
      this.showToast('Image trop lourde (max 1Mo pour la fluidité)', false);
      event.target.value = '';
      preview.style.display = 'none';
      return;
    }
    const reader = new FileReader();
    reader.onload = event => {
      State.uploadedImageBase64 = event.target.result;
      State.selectedMalUrl = ''; // On réinitialise l'URL MAL si on met une image locale
      preview.src = State.uploadedImageBase64;
      preview.style.display = 'block';
    };
    reader.onerror = () => {
      this.showToast('Erreur lors de la lecture du fichier', false);
    };
    reader.readAsDataURL(file);
  },
  saveNewAnime(event) {
    event.preventDefault();
    const title = $('add-title').value.trim();
    
    // 1. Vérification des doublons
    const isDuplicate = State.animes.some(a => a.title.toLowerCase() === title.toLowerCase());
    if (isDuplicate) {
      this.showToast(`"${title}" est déjà dans votre bibliothèque !`, false);
      return;
    }

    // 2. Validation de l'année
    const yearVal = parseInt($('add-year').value);
    const maxYear = new Date().getFullYear() + 5; // On autorise jusqu'à 5 ans dans le futur
    if (isNaN(yearVal) || yearVal < 1917 || yearVal > maxYear) {
      this.showToast(`Veuillez entrer une année valide entre 1917 et ${maxYear}.`, false);
      return;
    }

    // 3. Formatage automatique des épisodes
    let episodes = $('add-ep').value.trim();
    if (!episodes.includes('éps.')) episodes += ' éps.';

    const newAnime = {
      title: title,
      genre: $('add-genre').value,
      tag: $('add-genre').options[$('add-genre').selectedIndex].text,
      year: $('add-year').value,
      ep: episodes,
      emoji: $('add-emoji').value,
      img: State.uploadedImageBase64 || 'https://via.placeholder.com/300x400?text=No+Image',
      synopsis: $('add-synopsis').value,
      color: $('add-color').value,
      malUrl: ''
    };

    State.deletedAnimes = State.deletedAnimes.filter(title => title !== newAnime.title);
    this.saveState('anime_deleted', State.deletedAnimes);

    State.userAnimes.push(newAnime);
    this.saveState('user_added_animes', State.userAnimes);
    this.refreshAnimesList();

    $('add-form').reset();
    $('add-img-preview').style.display = 'none';
    State.uploadedImageBase64 = '';
    this.closeAddModal();
    this.populateYears();
    this.applyFilters();
    this.showToast(`${newAnime.title} ajouté à votre collection !`, true);
  },
  resetLibrary() {
    if (!confirm('Voulez-vous vraiment réinitialiser votre bibliothèque ? Cela supprimera vos ajouts et restaurera les animes supprimés par défaut.')) {
      return;
    }

    State.userAnimes = [];
    State.deletedAnimes = [];
    storage.remove('user_added_animes');
    storage.remove('anime_deleted');
    this.refreshAnimesList();
    this.populateYears();
    this.applyFilters();
    this.closeAddModal();
  },
  toggleSynopsis() {
    const synopsisEl = $('modal-synopsis');
    const btn = $('read-more-btn');
    const isCollapsed = synopsisEl.classList.toggle('collapsed');
    btn.textContent = isCollapsed ? 'Lire la suite' : 'Réduire';
  },
  async downloadPoster() {
    const imgUrl = $('modal-img').src;
    const title = $('modal-title').textContent;

    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/\s+/g, '-').toLowerCase()}-poster.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      this.showToast('Téléchargement lancé !', true);
    } catch (error) {
      window.open(imgUrl, '_blank');
      this.showToast('Ouverture de l\'image...', true);
    }
  },
  copyPosterLink() {
    const imgUrl = $('modal-img').src;
    navigator.clipboard.writeText(imgUrl)
      .then(() => this.showToast('Lien de l\'affiche copié !', true))
      .catch(() => this.showToast('Erreur lors de la copie.', false));
  },
  openMAL() {
    const anime = State.animes.find(a => a.title === $('modal-title').textContent);
    if (anime) {
      const url = anime.malUrl || `https://myanimelist.net/search/all?q=${encodeURIComponent(anime.title)}`;
      window.open(url, '_blank');
    }
  },
  async shareAnime() { // Rendre la fonction asynchrone
    const title = $('modal-title').textContent;
    const anime = State.animes.find(a => a.title === title);
    if (!anime) return;

    let urlToShare = `${this.getBaseUrl()}?anime=${encodeURIComponent(title)}`;
    
    // Tenter de raccourcir l'URL pour un meilleur partage social
    const shortenedUrl = await this.shortenUrl(urlToShare);
    if (shortenedUrl !== urlToShare) {
      this.showToast('Lien raccourci pour le partage !', true);
      urlToShare = shortenedUrl;
    }

    const text = `Je te recommande l'anime "${title}" sur Laye Anime 2026 !`;
    if (navigator.share) {
      navigator.share({ title, text, url: urlToShare }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${urlToShare}`)
        .then(() => this.showToast('Message de partage copié !', true))
        .catch(() => this.showToast('Erreur lors de la copie.', false));
    }
  },
  copyAnimeLink() {
    const title = $('modal-title').textContent;
    const url = `${this.getBaseUrl()}?anime=${encodeURIComponent(title)}`;

    navigator.clipboard.writeText(url)
      .then(() => this.showToast('Lien de l\'anime copié !', true))
      .catch(() => this.showToast('Erreur lors de la copie.', false));
  },
  async generateShareCard() {
    const title = $('modal-title').textContent, anime = State.animes.find(a => a.title === title);
    if (!anime) return;
    this.showToast('Génération de la carte...', true);
    const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
    canvas.width = 800; canvas.height = 1200;
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#12121f'); grad.addColorStop(1, '#0a0a12');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height);
    try {
      const response = await fetch(anime.img, { mode: 'cors' }).catch(() => fetch(anime.img));
      const blob = await response.blob(), blobUrl = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        const margin = 60, targetW = canvas.width - (margin * 2), targetH = targetW / (img.width / img.height);
        ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 40; ctx.drawImage(img, margin, 80, targetW, targetH);
        ctx.shadowBlur = 0; ctx.fillStyle = '#c084fc'; ctx.font = 'bold 48px Raleway'; ctx.textAlign = 'center';
        ctx.fillText(anime.title.toUpperCase(), canvas.width / 2, 80 + targetH + 100);
        ctx.fillStyle = '#7c7a99'; ctx.font = '28px Raleway'; ctx.fillText(`${anime.tag} • ${anime.year} • ${anime.ep}`, canvas.width / 2, 80 + targetH + 160);
        ctx.fillStyle = 'rgba(192,132,252,0.4)'; ctx.font = '22px "Cinzel Decorative"'; ctx.fillText('✦ LAYE ANIME 2026 ✦', canvas.width / 2, canvas.height - 60);
        const link = document.createElement('a'); link.download = `share-${anime.title.toLowerCase()}.png`;
        link.href = canvas.toDataURL('image/png'); if (link.href !== "data:,") link.click();
        URL.revokeObjectURL(blobUrl); this.showToast('Carte sauvegardée !', true);
      };
      img.src = blobUrl;
    } catch (e) { this.showToast('Erreur : Image inaccessible (CORS)', false); }
  },
  async shareCurrentPage() {
    const longUrl = window.location.href; let urlToShare = longUrl;
    const shortenedUrl = await this.shortenUrl(longUrl);
    if (shortenedUrl !== longUrl) {
      this.showToast('Lien de la page raccourci !', true);
      urlToShare = shortenedUrl;
    }
    if (navigator.share) {
      navigator.share({ title: 'Laye Anime 2026', text: 'Découvre ma galerie ! 🎌', url: urlToShare }).catch(() => {});
    } else {
      navigator.clipboard.writeText(urlToShare);
      this.showToast('Lien de la page copié !', true);
    }
  },
  openPinterest: () => window.open(`https://www.pinterest.com/search/pins/?q=${encodeURIComponent($('modal-title').textContent + ' anime fanart')}`, '_blank'),
  async shareToPlatform(platform) {
    const title = $('modal-title').textContent, syn = $('modal-synopsis').textContent;
    let urlToShare = await this.shortenUrl(`${this.getBaseUrl()}?anime=${encodeURIComponent(title)}`);
    const msg = `Regarde cet anime sur Laye Anime 2026 : ${title}`;
    if (platform === 'whatsapp') window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg + ' ' + urlToShare)}`, '_blank');
    else if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`, '_blank');
    else if (platform === 'telegram') window.open(`https://t.me/share/url?url=${encodeURIComponent(urlToShare)}&text=${encodeURIComponent('🎬 ' + title.toUpperCase() + '\n\n📖 ' + syn)}`, '_blank');
    else if (platform === 'instagram') {
      if (navigator.share) navigator.share({ title, text: msg, url: urlToShare }).catch(() => {});
      else navigator.clipboard.writeText(urlToShare).then(() => this.showToast('Lien copié !', true));
    } else if (platform === 'pinterest') {
      const a = State.animes.find(x => x.title === title);
      window.open(`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(urlToShare)}&media=${encodeURIComponent(a?.img || '')}&description=${encodeURIComponent(msg)}`, '_blank');
    }
  },
  toggleQR() {
    State.currentQRMode = State.currentQRMode === 'poster' ? 'mal' : 'poster';
    this.generateQR();
  },
  generateQR() {
    const a = State.animes.find(x => x.title === State.activeAnimeTitle); if (!a) return;
    const qrC = $('qrcode'); qrC.classList.remove('expanded'); qrC.innerHTML = '';
    const text = State.currentQRMode === 'poster' ? a.img : (a.malUrl || `https://myanimelist.net/search/all?q=${encodeURIComponent(a.title)}`);
    new QRCode(qrC, { text, width: 64, height: 64, colorDark: '#000000', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M });
    $('qr-toggle-btn').textContent = State.currentQRMode === 'poster' ? 'Passer au lien MAL' : "Passer à l'affiche";
    $('qr-desc').textContent = State.currentQRMode === 'poster' ? "Ouvrir l'affiche sur mobile." : "Ouvrir MyAnimeList sur mobile.";
  },
  deleteAnime() {
    if (!confirm(`Supprimer "${State.activeAnimeTitle}" ?`)) return;
    const userIndex = State.userAnimes.findIndex(a => a.title === State.activeAnimeTitle);
    if (userIndex > -1) {
      State.userAnimes.splice(userIndex, 1);
      this.saveState('user_added_animes', State.userAnimes);
    } else {
      State.deletedAnimes.push(State.activeAnimeTitle);
      this.saveState('anime_deleted', State.deletedAnimes);
    }
    this.refreshAnimesList(); this.closeModal(); this.applyFilters();
    this.showToast(`${State.activeAnimeTitle} supprimé de la bibliothèque.`, false);
  },
  randomAnime() {
    if (!State.filteredItems.length) return;
    const randomItem = State.filteredItems[Math.floor(Math.random() * State.filteredItems.length)];
    this.showDetails(randomItem.title);
  },
  closeModal(updateHistory = true) {
    $('modal').classList.remove('active'); document.body.style.overflow = '';
    if (this.lastFocusedElement) this.lastFocusedElement.focus();
    if (updateHistory) {
      const url = new URL(window.location);
      url.searchParams.delete('anime');
      history.pushState({}, '', url);
    }
  },
  // --- Gestion du Profil ---
  getInitialsAvatar(name) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Laye')}&background=c084fc&color=fff`;
  },
  saveProfileInfo() {
    State.profile.name = $('profile-user-name').textContent.trim();
    State.profile.email = $('profile-user-email').textContent.trim();
    this.saveState('laye_profile', State.profile);
    // Update avatar if it's the initials one
    if (!State.profile.pic) $('user-profile-img').src = this.getInitialsAvatar(State.profile.name);
  },
  updateProfilePicture(event) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 500000) return this.showToast('Image trop lourde (max 500kb)', false);
      const reader = new FileReader();
      reader.onload = (e) => {
        State.profile.pic = e.target.result;
        $('user-profile-img').src = State.profile.pic;
        this.saveState('laye_profile', State.profile);
        this.showToast('Photo mise à jour !', true);
      };
      reader.readAsDataURL(file);
    }
  },
  removeProfilePicture() {
    if (confirm('Supprimer la photo de profil ?')) {
      State.profile.pic = null;
      $('user-profile-img').src = this.getInitialsAvatar(State.profile.name);
      this.saveState('laye_profile', State.profile);
      this.showToast('Photo supprimée', false);
    }
  },
  logout() {
    if(confirm('Voulez-vous vraiment vous déconnecter ?')) {
      this.showToast('Déconnexion réussie', true);
      this.toggleProfileMenu();
    }
  },
  toggleProfileMenu(event) {
    if (event) event.stopPropagation();
    const dropdown = $('profile-dropdown');
    const isActive = dropdown.classList.toggle('active');
    $('profile-trigger').setAttribute('aria-expanded', isActive);
  },
  toggleFavorite(title, event) {
    event.stopPropagation();
    const index = State.favorites.indexOf(title);
    if (index === -1) State.favorites.push(title);
    else State.favorites.splice(index, 1);
    this.saveState('anime_favorites', State.favorites);
    this.showToast(index === -1 ? `${title} ajouté aux favoris` : `${title} retiré`, index === -1);
    this.applyFilters();
  },
  openSettings: () => { $('settings-modal').classList.add('active'); App.updateSettingsUI(); },
  closeSettings: () => $('settings-modal').classList.remove('active'),
  toggleAppSetting(key, val = null) {
    State.appSettings[key] = val !== null ? val : !State.appSettings[key];
    if (key === 'itemsPerPage') State.itemsPerPage = State.appSettings[key];
    this.saveState('anime_settings', State.appSettings);
    this.updateSettingsUI();
    if (key === 'itemsPerPage') this.applyFilters();
  },
  updateSettingsUI() {
    if ($('sw-anim')) $('sw-anim').classList.toggle('active', State.appSettings.animations);
    if ($('sw-sound')) $('sw-sound').classList.toggle('active', State.appSettings.sounds);
    document.body.classList.toggle('no-animations', !State.appSettings.animations);
    document.documentElement.style.setProperty('--accent', State.appSettings.accentColor || '#c084fc');
    document.body.classList.remove('size-small', 'size-medium', 'size-large');
    document.body.classList.add(`size-${State.appSettings.cardSize || 'medium'}`);
    if ($('size-select')) $('size-select').value = State.appSettings.cardSize || 'medium';
    if ($('items-per-page-select')) $('items-per-page-select').value = State.appSettings.itemsPerPage || 12;
    if ($('accent-select')) $('accent-select').value = State.appSettings.accentColor || '#c084fc';
  },
  playNotificationSound() {
    if (!State.appSettings.sounds) return;

    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(560, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(440, context.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.05, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.1);
    } catch {}
  },
  showToast(message, success) {
    this.playNotificationSound();
    const container = $('toast-container'), toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="ti ti-${success ? 'heart-filled' : 'heart-off'}" style="color: ${success ? '#ff4d4d' : 'var(--muted)'}"></i>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => { toast.classList.add('hide'); setTimeout(() => toast.remove(), 300); }, 3000);
  },
  exportFavorites() {
    if (!State.favorites.length) return alert('Liste vide !');
    const dataStr = JSON.stringify(State.favorites, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' }), url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = `favs-${new Date().toISOString().slice(0, 10)}.json`;
    link.click(); URL.revokeObjectURL(url);
  },
  triggerImport: () => $('import-file').click(),
  importFavorites(event) {
    const file = event.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          State.favorites = [...new Set([...State.favorites, ...imported])];
          this.saveState('anime_favorites', State.favorites); this.applyFilters();
          alert(`${imported.length} favoris synchronisés avec succès !`);
        } else alert('Format invalide.');
      } catch { alert('Erreur de lecture.'); }
      event.target.value = '';
    };
    reader.readAsText(file);
  },
  openShareSiteModal() {
    $('share-site-modal').classList.add('active');
    if (!State.siteQR) State.siteQR = new QRCode($('site-qrcode'), { text: this.getBaseUrl(), width: 128, height: 128 });
  },
  closeShareSiteModal: () => $('share-site-modal').classList.remove('active'),
  async copySiteLink() {
    const url = await this.shortenUrl(this.getBaseUrl());
    navigator.clipboard.writeText(url).then(() => this.showToast('Lien du site copié !', true));
  },
  async shareSiteToPlatform(platform) {
    const url = await this.shortenUrl(this.getBaseUrl()), msg = "Découvrez ma galerie d'animes !";
    if (platform === 'whatsapp') window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg + ' ' + url)}`, '_blank');
    else if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    else if (platform === 'telegram') window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(msg)}`, '_blank');
  },
  shareSite() { this.openShareSiteModal(); },
  shareFavorites(event) {
    if (event) event.preventDefault();
    if (!State.favorites.length) return alert('Liste de favoris vide !');
    const list = State.favorites.map(f => `• ${f}`).join('\n');
    const text = `Voici ma sélection d'animes favoris sur Laye Anime 2026 :\n\n${list}`;
    if (navigator.share) {
      navigator.share({ title: 'Mes Animes Favoris', text, url: window.location.href }).catch(() => {});
    } else {
      window.location.href = `mailto:?subject=Ma Liste d'Animes&body=${encodeURIComponent(text)}`;
    }
  },
  openStats() {
    if (!State.favorites.length) return alert('Ajoutez des favoris pour voir vos stats !');
    $('stats-modal').classList.add('active'); document.body.style.overflow = 'hidden';
    const favData = State.animes.filter(a => State.favorites.includes(a.title));
    const counts = {}, colors = {};
    favData.forEach(a => {
      counts[a.tag] = (counts[a.tag] || 0) + 1;
      colors[a.tag] = a.color;
    });
    const labels = Object.keys(counts), values = Object.values(counts);
    $('stats-legend').innerHTML = labels.map(label => `
      <li class="stats-item">
        <span class="stats-label"><span class="stats-dot" style="background:${colors[label]}"></span> ${label}</span>
        <span style="font-weight: 600">${counts[label]}</span>
      </li>
    `).join('');
    if (State.statsChart) State.statsChart.destroy();
    const ctx = $('genreChart').getContext('2d');
    State.statsChart = new Chart(ctx, {
      type: 'doughnut',
      data: { labels, datasets: [{ data: values, backgroundColor: labels.map(l => colors[l]), borderColor: document.body.classList.contains('light-mode') ? '#f1f5f9' : '#12121f', borderWidth: 4 }] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1a1a2e', padding: 12, displayColors: false } },
        cutout: '70%'
      }
    });
  },
  closeStats() {
    $('stats-modal').classList.remove('active');
    document.body.style.overflow = '';
  },
  toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('anime_theme', isLight ? 'light' : 'dark');
    this.updateThemeIcon();
  },
  updateThemeIcon() {
    const icon = document.querySelector('#theme-toggle i');
    if (!icon) return;
    icon.className = document.body.classList.contains('light-mode') ? 'ti ti-sun' : 'ti ti-moon';
  },
  initializeTheme() {
    if (localStorage.getItem('anime_theme') === 'light') { document.body.classList.add('light-mode'); this.updateThemeIcon(); }
  },
  renderGallery(items) {
    if (!this.dom.gallery) return;
    const len = items.length;
    this.dom.count.textContent = `${len} anime${len > 1 ? 's' : ''} trouvé${len > 1 ? 's' : ''}`;

    const startIndex = (State.currentPage - 1) * State.itemsPerPage;
    const endIndex = startIndex + State.itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);

    if (len === 0) {
      this.dom.gallery.innerHTML = '<div class="empty"><i class="ti ti-mood-sad"></i>Aucun résultat.</div>';
      $('pagination').innerHTML = '';
      return;
    }
    const favSet = new Set(State.favorites);
    this.dom.gallery.innerHTML = paginatedItems.map((anime, index) => {
      const isFav = favSet.has(anime.title);
      const watched = State.userProgress[anime.title] || 0;
      const progressPct = Math.min(100, Math.round((watched / anime.totalEp) * 100));
      const style = State.appSettings.animations ? `animation: fadeUp 0.4s ease both; animation-delay: ${index * 45}ms;` : '';
      return `
        <div class="card" role="article" aria-label="${anime.title}" onclick="showDetails('${anime.safeTitle}')" style="${style}">
          <div class="card-img-wrap">
            <button type="button" class="card-fav ${isFav ? 'active' : ''}" aria-label="${isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}" onclick="toggleFavorite('${anime.safeTitle}', event)">
              <i class="ti ti-heart${isFav ? '-filled' : ''}"></i>
            </button>
            <img class="card-img img-loading" src="${anime.img}" alt="${anime.title}" loading="lazy"
              onload="this.classList.remove('img-loading')"
              onerror="App.handleImageError(this, '${anime.emoji}')">
            <div class="card-placeholder">${anime.emoji}</div>
            <div class="card-overlay"></div>
            <div class="card-shine"></div>
          </div>
          <div class="card-body">
            <div class="card-title">${anime.title}</div>
            <div class="card-meta">${anime.ep}</div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${progressPct}%"></div>
            </div>
            <span class="progress-text">${watched} / ${anime.totalEp} épisodes</span>
            <span class="badge" style="background:${anime.color}25; color:${anime.color}; border: 0.5px solid ${anime.color}40;">${anime.tag}</span>
          </div>
        </div>
      `;
    }).join('');

    this.renderPagination(len);
  },
  renderPagination(totalItems) {
    const container = $('pagination');
    if (!container) return;
    const totalPages = Math.ceil(totalItems / State.itemsPerPage);
    if (totalPages <= 1) { container.innerHTML = ''; return; }

    let html = `<button type="button" class="page-btn" ${State.currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${State.currentPage - 1})"><i class="ti ti-chevron-left"></i></button>`;
    for (let i = 1; i <= totalPages; i++) {
      html += `<button type="button" class="page-btn ${State.currentPage === i ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
    html += `<button type="button" class="page-btn" ${State.currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${State.currentPage + 1})"><i class="ti ti-chevron-right"></i></button>`;
    container.innerHTML = `<div class="pagination">${html}</div>`;
  },
  goToPage(page) {
    State.currentPage = page;
    this.renderGallery(State.filteredItems);
    window.scrollTo({ top: this.dom.gallery.offsetTop - 100, behavior: 'smooth' });
  },
  setupHistory() {
    const deepLinkTitle = new URLSearchParams(window.location.search).get('anime');
    if (deepLinkTitle) {
      history.replaceState({ anime: deepLinkTitle }, '', window.location.href);
      this.showDetails(deepLinkTitle, false);
    } else history.replaceState({}, '', window.location.href);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') ['closeModal', 'closeStats', 'closeSettings', 'closeAddModal', 'closeShareSiteModal'].forEach(m => App[m]());
});
window.addEventListener('popstate', (e) => (e.state && e.state.anime) ? App.showDetails(e.state.anime, false) : App.closeModal(false));
['setGenre', 'applyFilters', 'showDetails', 'openAddModal', 'closeAddModal', 'toggleSynopsis', 'downloadPoster', 'copyPosterLink', 'openMAL', 'openPinterest', 'shareAnime', 'copyAnimeLink', 'generateShareCard', 'deleteAnime', 'shareToPlatform', 'toggleQR', 'toggleFavorite', 'openSettings', 'closeSettings', 'toggleAppSetting', 'toggleTheme', 'exportFavorites', 'triggerImport', 'importFavorites', 'openShareSiteModal', 'closeShareSiteModal', 'copySiteLink', 'shareSiteToPlatform', 'shareSite', 'shareFavorites', 'openStats', 'closeStats', 'randomAnime', 'resetLibrary', 'handleLocalImage', 'saveNewAnime', 'closeModal', 'handleImageError', 'updateProgress', 'selectMALAnimeByIndex', 'shareCurrentPage', 'goToPage', 'saveProfileInfo', 'updateProfilePicture', 'removeProfilePicture', 'logout']
  .forEach(name => window[name] = App[name].bind(App));
