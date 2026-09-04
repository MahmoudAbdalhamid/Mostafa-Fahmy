
const PHONE_NUMBER = "201065600556"; 


// Multi-language Content

const translations = {
    ar: {
        heroTitle: "مصطفى فهمي — مهندس تشطيبات داخلية فاخرة",
        heroSubtitle: "تحويل المساحات إلى منازل أحلام — جودة، دقة، وذوق رفيع منذ 2018.",
        aboutTitle: "عن المهندس مصطفى فهمي",
        aboutBio: "الاسم: مصطفى فهمي | العمر: 34 سنة | مهندس تشطيبات على أعلى مستوى من الكفاءة والخبرة منذ عام 2018.",
        aboutMarketing: "مهندس تشطيبات متخصص بخبرة واسعة في تنفيذ أرقى المشاريع السكنية في القاهرة الكبرى. نفذ العشرات من مشاريع الفلل والشقق الفاخرة في أرقى المناطق: التجمع الخامس، الشيخ زايد، 6 أكتوبر، والمهندسين. يتميز بالدقة في التنفيذ، الالتزام بالمواعيد، واستخدام أجود الخامات. كل مشروع يتم تنفيذه بمعايير عالمية تضمن رضا العميل التام ونتائج تفوق التوقعات. خبرة متكاملة في: الديكورات الداخلية، الدهانات الحديثة، الأرضيات، الأسقف المعلقة، والإضاءة المعمارية.",
        galleryTitle: "معرض أعمالنا الكامل",
        galleryDesc: "شاهد جميع المشاريع المنفذة بأعلى جودة",
        galleryButton: "عرض جميع الأعمال على Google Drive",
        videoTitle: "شاهد فيديو أعمالنا",
        btnWhatsApp: "تواصل عبر واتساب",
        btnGallery: "معرض الأعمال الكامل",
        btnVideo: "مشاهدة الفيديو",
        whatsappMessage: "السلام عليكم يا بشمهندس مصطفي، أنا مهتم بخدمات التشطيب – أريد التواصل لتحديد موعد ومعاينة.",
        videoError: "الفيديو غير متوفر حالياً",
        langButton: "EN"
    },
    en: {
        heroTitle: "Mustafa Fahmy — Professional Finishing Engineer",
        heroSubtitle: "Turning spaces into dream homes — quality, precision, and refined taste since 2018.",
        aboutTitle: "About Engineer Mustafa Fahmy",
        aboutBio: "Name: Mustafa Fahmy | Age: 34 | Professional finishing engineer with the highest level of competence and experience since 2018.",
        aboutMarketing: "Specialized finishing engineer with extensive experience in executing the finest residential projects in Greater Cairo. Completed dozens of luxury villa and apartment projects in the most prestigious areas: Fifth Settlement, Sheikh Zayed, 6th of October, and Mohandessin. Distinguished by precision in execution, commitment to deadlines, and use of the finest materials. Every project is executed with international standards ensuring complete client satisfaction and results that exceed expectations. Comprehensive expertise in: interior decoration, modern painting, flooring, suspended ceilings, and architectural lighting.",
        galleryTitle: "Our Complete Portfolio",
        galleryDesc: "View all of projects executed with the highest quality",
        galleryButton: "View All Works on Google Drive",
        videoTitle: "Watch Our Work Video",
        btnWhatsApp: "Contact via WhatsApp",
        btnGallery: "Complete Portfolio",
        btnVideo: "Watch Video",
        whatsappMessage: "Hello Engineer Mostafa, I am interested in finishing services – I would like to get in touch to schedule an appointment and inspection..",
        videoError: "Video not available currently",
        langButton: "AR"
    }
};


// State Management

let currentLang = 'ar';
let lastScrollY = 0;
let isScrolling;
let isTyping = false; // منع تكرار الـ typewriter
let heroTextVisible = true;
let typewriterIntervals = []; // تخزين كل الـ intervals


// DOM Elements

const elements = {
    html: document.documentElement,
    langToggle: document.getElementById('langToggle'),
    langText: document.getElementById('langText'),
    heroText: document.getElementById('heroText'),
    hero: document.getElementById('hero'),
    whatsappFloat: document.getElementById('whatsappFloat'),
    btnWhatsApp: document.getElementById('btnWhatsApp'),
    btnGallery: document.getElementById('btnGallery'),
    btnVideo: document.getElementById('btnVideo'),
    videoPlayBtn: document.getElementById('videoPlayBtn'),
    projectVideo: document.getElementById('projectVideo'),
    videoControls: document.getElementById('videoControls'),
    vcPlayPause: document.getElementById('vcPlayPause'),
    vcSeek: document.getElementById('vcSeek'),
    vcCurrent: document.getElementById('vcCurrent'),
    vcDuration: document.getElementById('vcDuration'),
    vcMute: document.getElementById('vcMute')
};


// Language Toggle Function

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    const t = translations[currentLang];

    // تغيير الاتجاه
    elements.html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    elements.html.setAttribute('lang', currentLang);

    // إيقاف أي typewriter قيد التشغيل
    isTyping = false;
    clearAllIntervals();

    // تحديث النصوص
    document.getElementById('heroTitle').textContent = t.heroTitle;
    document.getElementById('heroSubtitle').textContent = t.heroSubtitle;
    document.getElementById('aboutTitle').textContent = t.aboutTitle;
    document.getElementById('aboutBio').textContent = t.aboutBio;
    document.getElementById('aboutMarketing').textContent = t.aboutMarketing;
    document.getElementById('galleryTitle').textContent = t.galleryTitle;
    document.getElementById('galleryDesc').textContent = t.galleryDesc;
    document.getElementById('galleryButton').textContent = t.galleryButton;
    document.getElementById('videoTitle').textContent = t.videoTitle;
    document.getElementById('btnWhatsAppText').textContent = t.btnWhatsApp;
    document.getElementById('btnGalleryText').textContent = t.btnGallery;
    document.getElementById('btnVideoText').textContent = t.btnVideo;
    document.getElementById('videoErrorText').textContent = t.videoError;
    elements.langText.textContent = t.langButton;

    // تحديث رابط الواتساب
    updateWhatsAppLink();
}


// WhatsApp Link Handler

function updateWhatsAppLink() {
    const message = encodeURIComponent(translations[currentLang].whatsappMessage);
    const url = `https://wa.me/${PHONE_NUMBER}?text=${message}`;
    elements.whatsappFloat.href = url;
}

function openWhatsApp() {
    const message = encodeURIComponent(translations[currentLang].whatsappMessage);
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${message}`, '_blank');
}


// Scroll Behavior - Hero Text Animation

function handleScroll() {
    const currentScrollY = window.scrollY;
    const heroHeight = elements.hero.offsetHeight;

    // إذا كان المستخدم في منطقة الهيرو
    if (currentScrollY < heroHeight) {
        // Scroll down - إخفاء النص
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            if (heroTextVisible) {
                clearAllIntervals(); // إلغاء أي typewriter
                isTyping = false;
                elements.heroText.classList.add('hide');
                elements.heroText.classList.remove('typewriter');
                heroTextVisible = false;
            }
        }
        // Scroll up - إظهار النص بـ typewriter (مرة واحدة فقط)
        else if (currentScrollY < lastScrollY && currentScrollY < 30) {
            if (!heroTextVisible && !isTyping) {
                elements.heroText.classList.remove('hide');
                elements.heroText.classList.add('typewriter');
                typewriterEffect();
                heroTextVisible = true;
            }
        }
    }

    lastScrollY = currentScrollY;
}

// Typewriter Effect
function typewriterEffect() {
    // منع التكرار بشكل صارم
    if (isTyping) {
        console.log('Typewriter already running, skipping...');
        return;
    }

    isTyping = true;
    clearAllIntervals(); // إلغاء أي intervals سابقة

    const title = document.getElementById('heroTitle');
    const subtitle = document.getElementById('heroSubtitle');

    if (!title || !subtitle) {
        isTyping = false;
        return;
    }

    const titleText = translations[currentLang].heroTitle;
    const subtitleText = translations[currentLang].heroSubtitle;

    let titleIndex = 0;
    let subtitleIndex = 0;

    title.textContent = '';
    subtitle.textContent = '';

    const titleInterval = setInterval(() => {
        if (titleIndex < titleText.length) {
            title.textContent += titleText.charAt(titleIndex);
            titleIndex++;
        } else {
            clearInterval(titleInterval);
            removeFromIntervals(titleInterval);

            // بدء الـ subtitle بعد انتهاء الـ title
            const subtitleInterval = setInterval(() => {
                if (subtitleIndex < subtitleText.length) {
                    subtitle.textContent += subtitleText.charAt(subtitleIndex);
                    subtitleIndex++;
                } else {
                    clearInterval(subtitleInterval);
                    removeFromIntervals(subtitleInterval);
                    isTyping = false; // السماح بالتشغيل مرة أخرى
                }
            }, 30);

            typewriterIntervals.push(subtitleInterval);
        }
    }, 50);

    typewriterIntervals.push(titleInterval);
}

// دالة لإلغاء كل الـ intervals
function clearAllIntervals() {
    typewriterIntervals.forEach(interval => clearInterval(interval));
    typewriterIntervals = [];
}

// دالة لإزالة interval من المصفوفة
function removeFromIntervals(interval) {
    const index = typewriterIntervals.indexOf(interval);
    if (index > -1) {
        typewriterIntervals.splice(index, 1);
    }
}

// Debounce للأداء الأفضل
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(handleScroll, 10);

// Video Player

function playVideo() {
    const video = elements.projectVideo;
    const wrapper = video.closest('.video-wrapper');

    if (video.paused) {
        video.play();
        wrapper.classList.add('playing');

        // محاولة تشغيل autoplay بعد التفاعل
        video.muted = false;
    } else {
        video.pause();
        wrapper.classList.remove('playing');
    }
}

// ── شريط التقديم/التأخير + الوقت + كتم الصوت ──
let isSeeking = false;

function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) seconds = 0;
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
}

function updateSeekBar() {
    const v = elements.projectVideo;
    const pct = v.duration ? (v.currentTime / v.duration) * 100 : 0;
    if (!isSeeking) {
        elements.vcSeek.value = pct;
    }
    elements.vcSeek.style.setProperty('--seek-progress', pct + '%');
    elements.vcCurrent.textContent = formatTime(v.currentTime);
}

function updateMuteUI() {
    const v = elements.projectVideo;
    elements.videoControls.classList.toggle('muted', v.muted || v.volume === 0);
}

function initVideoControls() {
    const v = elements.projectVideo;

    // زر تشغيل/إيقاف داخل الشريط
    elements.vcPlayPause.addEventListener('click', (e) => {
        e.stopPropagation();
        playVideo();
    });

    // زر كتم/تشغيل الصوت
    elements.vcMute.addEventListener('click', (e) => {
        e.stopPropagation();
        v.muted = !v.muted;
        updateMuteUI();
    });

    // شريط التقديم/التأخير
    elements.vcSeek.addEventListener('input', () => {
        isSeeking = true;
        const t = (elements.vcSeek.value / 100) * (v.duration || 0);
        v.currentTime = t;
        elements.vcSeek.style.setProperty('--seek-progress', elements.vcSeek.value + '%');
        elements.vcCurrent.textContent = formatTime(t);
    });
    elements.vcSeek.addEventListener('change', () => { isSeeking = false; });

    // مزامنة الشريط مع حالة الفيديو
    v.addEventListener('timeupdate', updateSeekBar);
    v.addEventListener('loadedmetadata', () => {
        elements.vcDuration.textContent = formatTime(v.duration);
        updateSeekBar();
    });
    v.addEventListener('play', () => v.closest('.video-wrapper').classList.add('playing'));
    v.addEventListener('pause', () => v.closest('.video-wrapper').classList.remove('playing'));
    v.addEventListener('volumechange', updateMuteUI);

    // في حال كانت بيانات الفيديو محمّلة قبل تفعيل المستمعات
    if (v.readyState >= 1) {
        elements.vcDuration.textContent = formatTime(v.duration);
        updateSeekBar();
    }
    updateMuteUI();
}

function scrollToGallery() {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

function scrollToVideo() {
    document.getElementById('videoSection').scrollIntoView({ behavior: 'smooth' });
}


// Event Listeners

function initEventListeners() {
    // Language toggle
    elements.langToggle.addEventListener('click', toggleLanguage);

    // Scroll handler
    window.addEventListener('scroll', debouncedScroll, { passive: true });

    // WhatsApp buttons
    elements.btnWhatsApp.addEventListener('click', openWhatsApp);
    elements.whatsappFloat.addEventListener('click', (e) => {
        e.preventDefault();
        openWhatsApp();
    });

    // Navigation buttons
    elements.btnGallery.addEventListener('click', scrollToGallery);
    elements.btnVideo.addEventListener('click', scrollToVideo);

    // Video controls
    elements.videoPlayBtn.addEventListener('click', playVideo);
    elements.projectVideo.addEventListener('click', playVideo);

    // Video ended
    elements.projectVideo.addEventListener('ended', () => {
        elements.projectVideo.closest('.video-wrapper').classList.remove('playing');
    });

    // شريط التقديم/التأخير
    initVideoControls();

    // ملاحظة: تم إلغاء التشغيل التلقائي — الفيديو يعمل فقط عند الضغط على الزر
}


// Initialization

function init() {
    // تحديث رابط الواتساب الأولي
    updateWhatsAppLink();

    // تفعيل Event Listeners
    initEventListeners();

    // حفظ قيمة Scroll الأولية
    lastScrollY = window.scrollY;
}

// تشغيل عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
