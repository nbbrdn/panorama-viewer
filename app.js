var viewer360 = new View360("#viewer", {
  initialZoom: 0.5,
  autoplay: {
    delay: 5000,
    delayOnMouseLeave: 1000,
    pauseOnHover: true,
    speed: 0.2,
  },
  projection: new View360.EquirectProjection({
    src: 'images/marker1.jpg',
    video: false,

  }),
});

function openModal() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "data.json", false);
  xhr.send();

  if (xhr.status == 200) {
    let data = JSON.parse(xhr.responseText);

    let imgMapContainer = document.getElementById("imgMap");
    imgMapContainer.src = data.plane;

    imgMapContainer.onload = function() {
      const miniMapContainer = document.getElementById("miniMap");
      const miniMapWidth = miniMapContainer.offsetWidth;
      const miniMapHeight = miniMapContainer.offsetHeight;

      data.markers.forEach(marker => add_marker(marker.x, marker.y, marker.src, miniMapWidth, miniMapHeight));
    };
  }

  document.getElementById('modal-360').style.display = 'block';
}

function closeModal() {
  document.getElementById('modal-360').style.display = 'none';
}


function add_marker(x, y, src, width, height) {
  let markerElement = document.createElement("div");
  markerElement.className = "marker";


  var markerXPercent = (x / width) * 100;
  var markerYPercent = (y / height) * 100;

	markerElement.style.left = markerXPercent + "%";
	markerElement.style.top = markerYPercent + "%";

  markerElement.onclick = function() {
    renewProjection(this, src);
  }

  const markersContainer = document.getElementById("markers");
	markersContainer.append(markerElement);
}

function renewProjection(el, src) {
  document.querySelectorAll(".marker").forEach((element) => {
    element.classList.remove("marker-active");
  });

  el.classList.add("marker-active");

  viewer360.projection = new View360.EquirectProjection({
    src: src,
    video: false
  });
}