<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal-overlay">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-container">
          <div class="modal-header">
            <h2 class="modal-title">{{ name }}</h2>
            <button class="modal-close" @click="close">×</button>
          </div>
          <div class="modal-body">
            <div class="modal-content">
              <input
                v-model="date"
                type="date"
                name="date"
                id="date"
                class="block w-full rounded-md border-black border bg-white mt-2 p-2"
              />
              <textarea
                v-model="comment"
                name="comment"
                id="comment"
                placeholder="Add a comment"
                class="block w-full rounded-md border-black border bg-white mt-2 p-2"
              ></textarea>
              <select
                v-model="rating"
                name="rating"
                id="rating"
                class="block w-full rounded-md border-black border bg-white mt-2 p-2"
                placeholder="Pick a rating"
              >
                <option value="choose-rating">Choose rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <slot />
            <v-alert v-if="alert.show" :type="alert.type" class="mb-4">
              {{ alert.message }}
            </v-alert>
          </div>
          <div class="modal-footer">
            <button
              class="modal-button modal-button-primary"
              @click="submitReview(id)"
            >
              Save
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.modal-container {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.modal-title {
  margin: 0;
  font-size: 1.5rem;
}
.modal-close {
  background-color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}

.modal-body {
  padding: 1rem;
  flex: 1;
}
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-top: 1px solid #ccc;
}
.modal-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
.modal-button-primary {
  background-color: #007bff;
  color: #fff;
}
.modal-animation-enter-active,
.modal-animation-leave-active,
.modal-animation-inner-enter-active,
.modal-animation-inner-leave-active {
  transition: opacity 0.3s ease;
}
.modal-animation-enter,
.modal-animation-leave-to,
.modal-animation-inner-enter,
.modal-animation-inner-leave-to {
  opacity: 0;
}
</style>

<script setup>
import { ref, reactive } from "vue";
import { postReview, getRestaurant } from "@/composables/UseRestaurant";

defineProps({
  modalActive: Boolean,
  id: String,
  name: String,
});
const alert = reactive({
  show: false,
  message: "",
  type: "",
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

const comment = ref("");
const rating = ref("");
const date = ref("");

async function submitReview(id) {
  if (rating.value === null || rating.value === "") {
    alert.show = true;
    alert.type = "error";
    alert.message = "Select a Rating";
    setTimeout(() => {
      this.alert.show = false;
    }, 5000);
    return;
  } else {
    await postReview(comment.value, rating.value, date.value, id);
    close();
  }
}
</script>
