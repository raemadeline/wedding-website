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
    }

    if (copy) {
        document.getElementById('countdown').innerHTML = copy;
    }

    /********************** Add to Calendar **********************/
    // var myCalendar = createCalendar({
    //     options: {
    //         class: '',
    //         // You can pass an ID. If you don't, one will be generated for you
    //         id: ''
    //     },
    //     data: {
    //         // Event title
    //         title: "Ram and Antara's Wedding",

    //         // Event start date
    //         start: new Date('Nov 27, 2017 10:00'),

    //         // Event duration (IN MINUTES)
    //         // duration: 120,

    //         // You can also choose to set an end time
    //         // If an end time is set, this will take precedence over duration
    //         end: new Date('Nov 29, 2017 00:00'),

    //         // Event Address
    //         address: 'ITC Fortune Park Hotel, Kolkata',

    //         // Event Description
    //         description: "We can't wait to see you on our big day. For any queries or issues, please contact Mr. Amit Roy at +91 9876543210."
    //     }
    // });

    // $('#add-to-cal').html(myCalendar);


    /********************** RSVP **********************/
    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();

        $('#alert-wrapper').html(alert_markup('info', '<strong>Just a sec!</strong> We are saving your details.'));

        if (MD5($('#invite_code').val()) !== 'b0e53b10c1f55ede516b240036b88f40'
            && MD5($('#invite_code').val()) !== '2ac7f43695eb0479d5846bb38eec59cc') {
            $('#alert-wrapper').html(alert_markup('danger', '<strong>Sorry!</strong> Your invite code is incorrect.'));
        } else {
            $.post('https://script.google.com/macros/s/AKfycbzUqz44wOat0DiGjRV1gUnRf4HRqlRARWggjvHKWvqniP7eVDG-/exec', data)
                .done(function (data) {
                    console.log(data);
                    if (data.result === "error") {
                        $('#alert-wrapper').html(alert_markup('danger', data.message));
                    } else {
                        $('#alert-wrapper').html('');
                        $('#rsvp-modal').modal('show');
                    }
                })
                .fail(function (data) {
                    console.log(data);
                    $('#alert-wrapper').html(alert_markup('danger', '<strong>Sorry!</strong> There is some issue with the server. '));
                });
        }
    });

});

let fullWidthMap;
let focusedMap;
let correctMapId = '1e81e7338c2717c';
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    correctMapId = 'ed8f84e3fc7b05da';
}

function initMaps() {
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
    gestureHandling: 'cooperative'
  });

  focusedMap = new google.maps.Map(document.getElementById("focused-map"), {
    center: { lat: 40.688692, lng: -73.984075 },
    zoom: 16,
    mapId: correctMapId,
    disableDoubleClickZoom: true,
    disableDefaultUI: true,
    fullscreenControl: false,
    mapTypeControl: false,
    zoomControl: false,
    scaleControl: false,
    gestureHandling: 'cooperative'
  });

  markers.forEach(({name, position, type}) => {
    new google.maps.Marker({
        position,
        map: focusedMap,
        title: name
      });
  });
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    correctMapId = e.matches ? "ed8f84e3fc7b05da" : "1e81e7338c2717c";
    initMaps();
});

const markers = [
    {
        name: 'Ace Hotel Brookyln',
        position: { lat: 40.687837, lng: -73.983725 },
        type: 'Hotel'
    },
    {
        name: 'Hilton Brookyln',
        position: { lat: 40.689587, lng: -73.987997 },
        type: 'Hotel'
    },
    {
        name: 'Holiday Inn Brooklyn Downtown',
        position: { lat: 40.687496, lng: -73.982682 },
        type: 'Hotel'
    },
    {
        name: 'Circa Brewing Co.',
        position: { lat: 40.69168, lng: -73.986182 },
        type: 'Bar'
    },
    {
        name: 'Sunken Harbor Club',
        position: { lat: 40.691455273392506, lng: -73.98789318893117 },
        type: 'Bar'
    },
    {
        name: 'Coffee Project',
        position: { lat: 40.68843043640514, lng: -73.97934886309937 },
        type: 'Coffee'
    },
    {
        name: 'Devoción',
        position: { lat: 40.688557, lng: -73.983459 },
        type: 'Coffee'
    },
    {
        name: 'Rucola',
        position: { lat: 40.685611, lng: -73.985892 },
        type: 'Restaurant'
    },
    {
        name: 'Grand Army',
        position: { lat: 40.68824, lng: -73.986538},
        type: 'Restaurant'
    },
    {
        name: 'Bacchus',
        position: { lat: 40.687124059833096, lng: -73.98424738707784 },
        type: 'Restaurant'
    },
    {
        name: 'BAM',
        position: { lat: 40.68615201318827, lng: -73.97780054475035 },
        type: 'Entertainment'
    },
    {
        name: 'Alamo Drafthouse',
        position: { lat: 40.69134307854795, lng: -73.98321997543977 },
        type: 'Entertainment'
    },
    {
        name: 'New York Transit Museum',
        position: { lat: 40.690568558800145, lng: -73.98985656595644 },
        type: 'Entertainment'
    }
];