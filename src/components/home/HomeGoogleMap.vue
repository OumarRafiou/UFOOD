<!-- eslint-disable prettier/prettier -->
<template>
  <v-container>
    <v-card class="" elevation="0">
      <v-card-item>
        <div id="map" style="height: 600px"></div>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref, defineProps, watchEffect, toRaw } from "vue";
const props = defineProps({
  restaurants: Object,
});
const router = useRouter();

const goToRestaurantPage = async function (id) {
  await router.push(`/restaurant/${id}`);
  return true;
};

onMounted(async () => {
  const userLocation = ref(null);
  const locations = [];
  const extractInfo = () => {
    const restaurants = toRaw(props.restaurants);
    for (let i = 0; i < restaurants.length; i++) {
      const restos = restaurants[i];
      const names = restos.name;
      const addresses = restos.address;
      const coordinates = restos.location.coordinates;
      const photos = restos.pictures;
      const id = restos.id;
      const rating = restos.rating.toFixed(1);
      const priceRange = restos.price_range;
      const genreList = restos.genres;
      locations.push([
        coordinates,
        names,
        addresses,
        photos,
        id,
        rating,
        priceRange,
        genreList,
      ]);
    }
  };

  watchEffect(() => {
    extractInfo();
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      userLocation.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: userLocation.value,
      });
      const markers = [];
      locations.forEach((location, i) => {
        const marker = new google.maps.Marker({
          position: { lat: location[0][1], lng: location[0][0] },
          title: `${i + 1}. ${location[1]}`,
          map: map,
        });
        markers.push(marker);
        const infoWindow = new google.maps.InfoWindow();
        let isOpen = false;
        marker.addListener("mouseover", () => {
          if (!isOpen) {
            infoWindow.setContent(
              `<div class="infowindow-content" style="min-width : 400px;"><div class="infowindow-img" style="max-width :250px;"><img src=${location[3][0]}></div><div class="infowindow-text"><h2>${location[1]}</h2><p>${location[2]}</p><p><b>Rating : </b> ${location[5]}/5</p><p><b>Price : </b>${location[6]}</p><p><b>Genres : </b>${location[7]}</p><div><button id="button" class="go-to-resto-button">Go to Page</button></div></div></div>`
            );
            infoWindow.open(map, marker);
          }
          infoWindow.addListener("domready", () => {
            const goToRestaurantBtn = document.getElementById("button");
            goToRestaurantBtn.addEventListener("click", () => {
              goToRestaurantPage(location[4]);
            });
          });
        });

        marker.addListener("mouseout", () => {
          if (!isOpen) {
            infoWindow.close();
          }
        });
        marker.addListener("click", () => {
          if (isOpen) {
            infoWindow.close();
            isOpen = false;
          } else {
            infoWindow.open(map, marker);
            isOpen = true;
          }
        });
      });
    });
  }
});
</script>

<style>
.infowindow-content {
  display: flex;
  align-items: center;
  max-width: 300px;
}

.infowindow-img {
  margin-right: 10px;
}

.infowindow-img img {
  max-width: 100%;
  height: auto;
}

.infowindow-text {
  width: 90%;
  flex-grow: 1;
  font-size: 15px;
}

.infowindow-text h2 {
  margin: 0;
  font-weight: bold;
}

.infowindow-text p {
  margin: 0;
  margin-top: 5px;
}

.go-to-resto-button {
  background-color: #f5f5f5;
  color: #424242;
  border-radius: 4px;
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background-color 0.2s ease-out, box-shadow 0.2s ease-out,
    transform 0.2s ease-out;
}
.go-to-resto-button:hover {
  background-color: #eee;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}
.go-to-resto-button:active {
  background-color: #ddd;
  box-shadow: none;
  transform: translateY(1px);
}
</style>
