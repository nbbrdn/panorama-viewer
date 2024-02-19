let viewer360;


const showModal = async () => {
  const modal = document.getElementById('modal-360');
  modal.style.display = 'block';

  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch data.json (${response.status} ${response.statusText})`);
    }

    const data = await response.json();

    viewer360 = new View360("#viewer", {
      initialZoom: 0.5,
      autoplay: {
        delay: 5000,
        delayOnMouseLeave: 1000,
        pauseOnHover: true,
        speed: 0.2,
      },
      projection: new View360.EquirectProjection({
        src: data.markers[0].src,
        video: false,
      }),
    });

    const imgMapContainer = document.getElementById("imgMap");
    imgMapContainer.src = data.plane;

    imgMapContainer.onload = () => {
      const miniMapContainer = document.getElementById("miniMap");
      const miniMapWidth = miniMapContainer.offsetWidth;
      const miniMapHeight = miniMapContainer.offsetHeight;

      data.markers.forEach(({ x, y, src }) => addMarker(x, y, src, miniMapWidth, miniMapHeight));
    };


  } catch (error) {
    console.error('Error fetching data.json', error);
  }
}

const closeModal = () => {
  const modal = document.getElementById('modal-360');
  modal.style.display = 'none';
}


const addMarker = (x, y, src, width, height) => {
  const markerElement = document.createElement("div");
  markerElement.className = "marker";


  const markerXPercent = (x / width) * 100;
  const markerYPercent = (y / height) * 100;

	markerElement.style.left = `${markerXPercent}%`;
	markerElement.style.top = `${markerYPercent}%`;

  markerElement.onclick = () => {
    renewProjection(markerElement, src);
  }

  const markersContainer = document.getElementById("markers");
	markersContainer.append(markerElement);
}

const renewProjection = (el, src) => {
  document.querySelectorAll(".marker").forEach((element) => {
    element.classList.remove("marker-active");
  });

  el.classList.add("marker-active");

  viewer360.projection = new View360.EquirectProjection({
    src: src,
    video: false
  });
}

