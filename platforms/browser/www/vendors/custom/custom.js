$('.aracekbilgi').hide();
$('.aracyakitbilgi').hide();
$('.flat').on('ifClicked', function (event) {
	if (this.value == '3') {
		$('.aracyakitbilgi').show();
	}else{
		$('.aracyakitbilgi').hide();
	}
});


//Sunucuya Gönder...
function AracSorgula(){
	var plaka = $("#AracPlaka").val();
	var harekettipi = $(".flat:checked").val();
	var yakitmiktar = $("#yakitmiktar").val();
	var kullanici = localStorage.kullanici;

	$.ajax(
	{       
		type: "GET",
		url:  "http://www.giltas.com.tr/gats/test.php",
		data : {
			islem : 'hareketkaydet',
			plaka: plaka, 
			harekettipi : harekettipi, 
			yakitmiktar : yakitmiktar, 
			kullanici : kullanici},
			success: function(sonuc){
				sonuc = JSON.parse(sonuc);
				$('.response-sonuc .alert').addClass(sonuc.code);
				$('.response-sonuc .alert').html(sonuc.message);
				$('.barcodebutton').hide();
				$('.aracekbilgi').hide();
			}
	})
} 

//Barcode Runner
function BarcodeRunner(){ 
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			$.ajax(
			{       
				type: "GET",
				url:  "http://www.giltas.com.tr/gats/test.php",
				data : {
					islem : 'plakasorgula',
					plaka: result.text},
					success: function(sonuc){
						sonuc = JSON.parse(sonuc);
						$('#AracPlaka').val(sonuc.aracid);
						$('.sonhareket').html(sonuc.kullaniciid+' -> '+sonuc.harekettipi)
						$('.aracekbilgi').show(sonuc);
					}
			})
		},
		function (error) {
			alert("Scanning failed: " + error);
		},
		{
			preferFrontCamera : false, // iOS and Android
			showFlipCameraButton : false, // iOS and Android
			showTorchButton : true, // iOS and Android
			torchOn: true, // Android, launch with the torch switched on (if available)
			prompt : "Place a barcode inside the scan area", // Android
			resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
			formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
			orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
			disableAnimations : true // iOS
		}
	);
}         