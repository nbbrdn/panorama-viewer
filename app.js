fetch("markers.json")
        .then(response => response.json())
        .then(markers => {
            var miniMap = document.getElementById("miniMap");
            miniMap.src = "plane.png";

            var miniMapContainer = document.getElementById("miniMapContainer");
            var miniMapWidth = miniMapContainer.offsetWidth;
            var miniMapHeight = miniMapContainer.offsetHeight;

            // Load first view
            if (markers.length > 0) {
                var firstMarker = markers[0];
                pannellum.viewer('panorama', {
                    "type": "equirectangular",
                    "panorama": firstMarker.file,
                    "autoLoad": true,
                    "showControls": false,
                    "autoRotate": -2,
                    "compass": false,
                });
            }

            markers.forEach(marker => {
                var markerElement = document.createElement("div");
                markerElement.id = marker.id;
                markerElement.className = "marker";

                // Calculate marker coordinates
                var markerXPercent = (marker.x / miniMapWidth) * 100;
                var markerYPercent = (marker.y / miniMapHeight) * 100;

                markerElement.style.top = markerYPercent + "%";
                markerElement.style.left = markerXPercent + "%";

                miniMapContainer.appendChild(markerElement);

                // Add event listener
                markerElement.addEventListener("click", function() {
                    pannellum.viewer('panorama', {
                        "type": "equirectangular",
                        "panorama": marker.file,
                        "autoLoad": true,
                        "showControls": false,
                        "autoRotate": -2,
                        "compass": false,
                    });    
                });
            });
        })
        .catch(error => console.error("Error loading markers:", error))