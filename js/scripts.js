$.fn.isInViewport = function() {
	var elementTop = $(this).offset().top;
	var elementBottom = elementTop + $(this).outerHeight();

	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + $(window).height();

	return elementBottom > viewportTop && elementTop < viewportBottom;
};

function isDarkMode() {
	return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

$(document).ready(function () {
	// countdown
	const wedding = new Date('10/23/2022');
	const today = new Date();
	const days = Math.ceil((wedding - today) / 86400000);
	let copy;
	if (days > 1) {
		copy = `${days} days to go!`;
	} else if (days === 1) {
		copy = 'Tomorrow is the big day!';
	} else if (days === 0) {
		copy = 'Today is the big day!';

		const liveStreamLink = document.getElementById('livestream-link')
		liveStreamLink.innerHTML = 'Watch Ceremony Live'
		liveStreamLink.style.display = 'block'
	}

	if (copy) {
		document.getElementById('countdown').innerHTML = copy;
		document.getElementById('date').innerHTML = 'October 23, 2022';
	}

	let originalNavBottom = $('nav').offset().top + $('nav').height();

	$(window).resize(() => {
		originalNavBottom = $('nav').offset().top + $('nav').height();
	});

	const $navigationLinks = $('nav > ol > li > a');
	const $sections = $($("section").get().reverse());
	
	let sectionIdTonavigationLink = {};
	$sections.each( function(){
		sectionIdTonavigationLink[ $(this).attr('id') ] = $('nav > ol > li > a[href=\\#' + $(this).attr('id') + ']');
	});

	$(window).scroll(() => {
		const viewportTop = $(window).scrollTop();
		const isMobile = $('nav button.mobile').is(':visible')
		if (viewportTop >= originalNavBottom && !isMobile) {
			$('nav').addClass('sticky')
		} else {
			$('nav').removeClass('sticky')
		}

		if (!isMobile) {
			$sections.each(function() {
				const currentSection = $(this);
				const sectionTop = currentSection.offset().top;
		
				if (viewportTop >= sectionTop - 150) {
					const $navigationLink = sectionIdTonavigationLink[currentSection.attr('id')];
					if (!$navigationLink.hasClass('active')) {
						$navigationLinks.removeClass('active');
						$navigationLink.addClass('active');
					}
					return false;
				}
			});
		}
	});

	$('nav button.mobile').on('click', function(e) {
	   $('nav').toggleClass('expanded');
	   e.stopPropagation();
	});

	$(window).on('click', function() {
		$('nav').removeClass('expanded');
	});
});

let fullWidthMap;
let afterPartyMap;
let focusedMap;
let haveLoadedMarkers = false;
let correctMapId = '1e81e7338c2717c';
if (isDarkMode()) {
	correctMapId = 'ed8f84e3fc7b05da';
}

function initMaps() {
	try {
		fullWidthMap = new google.maps.Map(document.getElementById("full-width-map"), {
			center: { lat: 40.662502, lng: -73.96976 },
			zoom: 14,
			mapId: correctMapId,
			disableDoubleClickZoom: true,
			disableDefaultUI: true,
			fullscreenControl: false,
			mapTypeControl: false,
			zoomControl: false,
			scaleControl: false,
			gestureHandling: 'cooperative',
			isFractionalZoomEnabled: true
		});

		afterPartyMap = new google.maps.Map(document.getElementById("afterparty-map"), {
			center: { lat: 40.662502, lng: -73.96976 },
			zoom: 14,
			mapId: correctMapId,
			disableDoubleClickZoom: true,
			disableDefaultUI: true,
			fullscreenControl: false,
			mapTypeControl: false,
			zoomControl: false,
			scaleControl: false,
			gestureHandling: 'cooperative',
			isFractionalZoomEnabled: true
		});
	
	
		focusedMap = new google.maps.Map(document.getElementById("focused-map"), {
			center: { lat: 40.6877024549926, lng: -73.98270929622757 },
			zoom: 15.5,
			mapId: correctMapId,
			disableDoubleClickZoom: true,
			disableDefaultUI: true,
			fullscreenControl: false,
			mapTypeControl: false,
			zoomControl: false,
			scaleControl: false,
			gestureHandling: 'cooperative',
			isFractionalZoomEnabled: true
		});  
		
		initMarkers();
	} catch (error) {
		console.log(error);
		$('#focused-map').remove();
		$('#full-width-map').remove();
	}
}

function initMarkers() {
	const fillColor = isDarkMode() ? '#bfd9d9' : '#6c4040';
  	markers.forEach(({name, position: { lat, lng }, type}, index) => {
		const marker = new mapIcons.Marker({
			map: focusedMap,
			title: name,
			position: new google.maps.LatLng(lat, lng),
			icon: {
				path: mapIcons.shapes.MAP_PIN,
				fillColor: fillColor,
				fillOpacity: 1,
				strokeColor: '#000000',
				strokeWeight: 0
			},
			map_icon_label: `<span class="map-icon map-icon-${type}"></span>`
		});

		const infoWindow = new google.maps.InfoWindow({
			content: name,
			disableAutoPan: true
		});

		const lineElem = $(`#things-to-do a:contains(${name})`);
		lineElem.on('mouseover', () => {
			infoWindow.open({map: focusedMap, anchor: marker, shouldFocus: false});
		});
		lineElem.on('mouseout', function() {
			infoWindow.close();
		});

		marker.addListener('mouseover', () => {
			lineElem.addClass('marker-highlight');
			infoWindow.open({map: focusedMap, anchor: marker, shouldFocus: false});
		})
		marker.addListener('mouseout', () => {
			lineElem.removeClass('marker-highlight');
			infoWindow.close()
		})
	});

	haveLoadedMarkers = true;
}

$('#back-to-top').on('click', () => {
	$(window).scrollTop(0);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
	correctMapId = e.matches ? "ed8f84e3fc7b05da" : "1e81e7338c2717c";
	initMaps();
	initMarkers();
});

const markers = [
	{
		name: 'Sunken Harbor Club',
		position: { lat: 40.691455273392506, lng: -73.98789318893117 },
		type: 'night-club'
	},
	{
		name: 'Circa Brewing Co.',
		position: { lat: 40.69168, lng: -73.986182 },
		type: 'bar'
	},
	{
		name: 'Alamo Drafthouse',
		position: { lat: 40.69134307854795, lng: -73.98321997543977 },
		type: 'movie-theater'
	},
	{
		name: 'Fort Greene Park',
		position: { lat: 40.691696103920556, lng: -73.97532678072841 },
		type: 'bicycling'
	},
	{
		name: 'New York Transit Museum',
		position: { lat: 40.690568558800145, lng: -73.98985656595644 },
		type: 'train-station'
	},
	{
		name: 'Hilton Brookyln',
		position: { lat: 40.689587, lng: -73.987997 },
		type: 'lodging'
	},
	{
		name: 'Coffee Project',
		position: { lat: 40.68843043640514, lng: -73.97934886309937 },
		type: 'cafe'
	},
	{
		name: 'Grand Army',
		position: { lat: 40.68824, lng: -73.986538},
		type: 'restaurant'
	},
	{
		name: 'Ace Hotel Brookyln',
		position: { lat: 40.687837, lng: -73.983725 },
		type: 'lodging'
	},
	{
		name: 'Holiday Inn Brooklyn Downtown',
		position: { lat: 40.687496, lng: -73.982682 },
		type: 'lodging'
	},
	{
		name: 'Blue Bottle Coffee',
		position: { lat: 40.687557477065134, lng: -73.98975447662929},
		type: 'cafe'
	},
	{
		name: 'BAM',
		position: { lat: 40.68615201318827, lng: -73.97780054475035 },
		type: 'museum'
	},
	{
		name: 'Rucola',
		position: { lat: 40.685611, lng: -73.985892 },
		type: 'restaurant'
	},
	{
		name: 'Leyenda',
		position: { lat: 40.68452465535506, lng: -73.99183620294977 },
		type: 'restaurant'
	},
	{
		name: 'Barely Disfigured',
		position: { lat: 40.683174371691926, lng: -73.9928010738658},
		type: 'night-club'
	},
	{
		name: 'Walter\'s',
		position: {lat: 40.689946647766426, lng: -73.97322191992978},
		type: 'restaurant'
	},
	{
		name: 'Barclay\'s Center',
		position: {lat: 40.68283644963635, lng: -73.97577394272429},
		type: 'stadium'
	}
];