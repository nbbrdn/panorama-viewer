function openModal() {
    console.log("here");
    document.getElementById('modal-360').style.display = 'block';

    const viewer = new View360("#viewer", {
      initialZoom: 0.5,
      autoplay: {
        delay: 5000,
        delayOnMouseLeave: 1000,
        pauseOnHover: true,
        speed: 0.2,
      },
      projection: new View360.EquirectProjection({
        src: "images/marker1.jpg",
        video: false,
      }),
      
    });
}

function closeModal() {
    document.getElementById('modal-360').style.display = 'none';
}
