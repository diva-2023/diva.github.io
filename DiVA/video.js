var videos = document.querySelectorAll('video');

var load_videos = new Promise(function (resolve) {
    var loaded = 0;

    videos.forEach(function (v) {
        v.addEventListener('loadedmetadata', function () {
            loaded++;

            if (loaded === videos.length) {
                resolve();
            }
        });
    });
});

load_videos.then(function () {
    videos.forEach(function (v) {
        v.play();
    });
});