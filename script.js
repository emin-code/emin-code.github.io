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
        const addressGroup = document.getElementById('addressGroup');
        const priceInfo = document.getElementById('priceInfo');
        
        if(this.value === 'evet') {
            addressGroup.style.display = 'block';
            priceInfo.style.display = 'block';
            
            const price = selectedService === 'hatim' ? '350' : '75';
            document.getElementById('certificatePrice').textContent = price;
        } else {
            addressGroup.style.display = 'none';
            priceInfo.style.display = 'none';
        }
    });

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
        
        // Form verilerini al
        const service = serviceSelect.value;
        const certificate = certificateSelect.value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const forName = document.getElementById('forName').value;
        const motherName = document.getElementById('motherName').value;
        const fatherName = document.getElementById('fatherName').value;
        const birthDate = document.getElementById('birthDate').value;
        const deathDate = document.getElementById('deathDate').value;
        
        // WhatsApp mesajını oluştur
        let whatsappMessage = 
            `*Yeni Hatim/Yasin Talebi*\n\n` +
            `Talep Eden: ${name}\n` +
            `Telefon: ${phone}\n` +
            `Hizmet: ${service === 'hatim' ? 'Hatm-i Şerif' : 'Yasin-i Şerif'}\n` +
            `Okunacak Kişi: ${forName}\n` +
            `Ölen Kişinin Anne Adı: ${motherName}\n` +
            `Ölen Kişinin Baba Adı: ${fatherName}\n` +
            `Doğum Tarihi: ${birthDate}\n` +
            `Vefat Tarihi: ${deathDate}\n`;

        if (certificate === 'evet') {
            const price = service === 'hatim' ? '350' : '75';
            const address = document.getElementById('address').value;
            whatsappMessage += 
                `\nSertifika: Evet\n` +
                `Sertifika Ücreti: ${price} TL\n` +
                `Teslimat Adresi: ${address}`;
        } else {
            whatsappMessage += `\nSertifika: Hayır`;
        }

        // Kullanıcıya başarılı mesajını göster
        alert('Form başarıyla gönderildi. WhatsApp\'a yönlendiriliyorsunuz.');
        
        // WhatsApp'a yönlendir
        const phoneNumber = '905384342356'; // Buraya kendi telefon numaranızı yazın (başında 90 olacak)
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl);
        
        // Formu kapat ve temizle
        modal.style.display = 'none';
        this.reset();
    });
}); 
