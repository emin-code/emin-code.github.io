document.addEventListener('DOMContentLoaded', function() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    const modal = document.getElementById('serviceModal');
    const btns = document.querySelectorAll('.btn-order');
    const closeBtn = document.querySelector('.close-btn');
    const serviceSelect = document.getElementById('service');
    const certificateSelect = document.getElementById('certificate');
    const priceInfo = document.getElementById('priceInfo');
    const addressGroup = document.getElementById('addressGroup');

    btns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            modal.style.display = 'block';
            
            const service = this.parentElement.querySelector('h3').textContent;
            if(service.includes('Hatm')) {
                serviceSelect.value = 'hatim';
            } else if(service.includes('Yasin')) {
                serviceSelect.value = 'yasin';
            }
            
            certificateSelect.value = '';
            priceInfo.style.display = 'none';
            addressGroup.style.display = 'none';
        });
    });

    certificateSelect.addEventListener('change', function() {
        const selectedService = serviceSelect.value;
        
        if(this.value === 'evet') {
            // Adres ve fiyat alanlarını göster
            addressGroup.style.display = 'block';
            priceInfo.style.display = 'block';
            document.getElementById('address').required = true;
            
            // Seçilen hizmete göre fiyatı güncelle
            const price = selectedService === 'hatim' ? '350' : '75';
            document.getElementById('certificatePrice').textContent = price;
        } else {
            // Adres ve fiyat alanlarını gizle
            addressGroup.style.display = 'none';
            priceInfo.style.display = 'none';
            document.getElementById('address').required = false;
        }
    });

    // Hizmet türü değiştiğinde fiyatı güncelle
    serviceSelect.addEventListener('change', function() {
        if(certificateSelect.value === 'evet') {
            const price = this.value === 'hatim' ? '350' : '75';
            document.getElementById('certificatePrice').textContent = price;
        }
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.getElementById('serviceForm').reset();
        priceInfo.style.display = 'none';
        addressGroup.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    document.getElementById('serviceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form normal şekilde submit olacak
        // Form'u kapat
        modal.style.display = 'none';
    });
}); 
