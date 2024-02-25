let viewer360;
let activeMarker;


const showModal = async () => {
  const modal = document.getElementById('modal-360');
  modal.style.display = 'block';

  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch data.json (${response.status} ${response.statusText})`);
    }

    const data = await response.json();

    const viewerContainer = document.getElementById("viewer");
    const isMobile = window.innerWidth < 600;

    //const viewerClass = isMobile ? "is-9by16" : "is-16by9";
    //viewerContainer.classList.add(viewerClass);











    
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
      data.markers.forEach(({ x, y, src }) => {
        const markerElement = addMarker(x, y, src);
        if (src == data.markers[0].src) {
          setActiveMarker(markerElement);
        }
      });
    };


  } catch (error) {
    console.error('Error fetching data.json', error);
  }
}

const closeModal = () => {
  const modal = document.getElementById('modal-360');
  modal.style.display = 'none';
}


const addMarker = (x, y, src) => {
    const markerElement = document.createElement("div");
    markerElement.className = "marker";

    markerElement.style.left = `${x}%`;
	markerElement.style.top = `${y}%`;

  markerElement.onclick = () => {
    renewProjection(markerElement, src);
  }

  const markersContainer = document.getElementById("markers");
	markersContainer.append(markerElement);
  return markerElement;
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

const setActiveMarker = (el) => {
  if (activeMarker) {
    activeMarker.classList.remove("marker-active");
  }

  el.classList.add("marker-active");
  activeMarker = el;
}