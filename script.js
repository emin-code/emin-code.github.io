// Modal elementlerini seç
var modal = document.getElementById('serviceModal');
var btns = document.getElementsByClassName('btn-order');
var span = document.getElementsByClassName('close-btn')[0];

// Tüm butonlara tıklama olayı ekle
for(var i = 0; i < btns.length; i++) {
    btns[i].onclick = function() {
        modal.style.display = "block";
    }
}

// Çarpıya tıklayınca kapat
span.onclick = function() {
    modal.style.display = "none";
}

// Dışarı tıklayınca kapat
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Sertifika seçimi değişince
document.getElementById('certificate').onchange = function() {
    var details = document.getElementById('certificateDetails');
    var price = document.getElementById('certificatePrice');
    var service = document.getElementById('service').value;
    
    if(this.value === 'evet') {
        details.style.display = 'block';
        price.innerHTML = service === 'hatim' ? '350' : '75';
    } else {
        details.style.display = 'none';
    }
}

// Hizmet türü değişince
document.getElementById('service').onchange = function() {
    var certificate = document.getElementById('certificate').value;
    var price = document.getElementById('certificatePrice');
    
    if(certificate === 'evet') {
        price.innerHTML = this.value === 'hatim' ? '350' : '75';
    }
} 
