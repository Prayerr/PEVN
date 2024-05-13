<template>
  <nav class="navbar" aria-label="Site Navigation">
    <ul class="navbar__list">
      <a class="" href="/">IT.NXT_</a>
      <li>
        <router-link
          to="/profile"
          aria-label="My profile"
          class="navbar__list-item"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M38.5 20C38.5 30.2173 30.2173 38.5 20 38.5C9.78273 38.5 1.5 30.2173 1.5 20C1.5 9.78273 9.78273 1.5 20 1.5C30.2173 1.5 38.5 9.78273 38.5 20Z"
              stroke="currentColor"
              stroke-width="3"
            />
            <path
              d="M11 28.3528C18.0261 25.2938 21.9701 25.1386 29 28.3528"
              stroke="currentColor"
              stroke-width="3"
            />
            <path
              d="M24.5 17C24.5 19.4853 22.4853 21.5 20 21.5C17.5147 21.5 15.5 19.4853 15.5 17C15.5 14.5147 17.5147 12.5 20 12.5C22.4853 12.5 24.5 14.5147 24.5 17Z"
              stroke="currentColor"
              stroke-width="3"
            />
          </svg>
        </router-link>
      </li>
      <li>
        <router-link to="/" class="navbar__list-item">
          <svg
            width="38"
            height="43"
            viewBox="0 0 38 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.5 41H8.5C6.84315 41 5.5 39.6569 5.5 38V24.599C5.5 23.5069 4.61471 22.6216 3.52264 22.6216C1.79789 22.6216 0.899885 20.5677 2.07106 19.3016L16.7977 3.38086C17.9852 2.09703 20.0148 2.09703 21.2023 3.38086L35.9289 19.3015C37.1001 20.5677 36.2021 22.6216 34.4774 22.6216C33.3853 22.6216 32.5 23.5069 32.5 24.599V38C32.5 39.6569 31.1569 41 29.5 41Z"
              stroke="currentColor"
              stroke-width="3"
            />
          </svg>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import '../src/styles/global.scss';

.navbar {
  position: fixed;
  display: flex;
  background: $primary-color;
  border-radius: 20px;
  top: 5px;
  left: 5px;
  width: 35%;
}

.navbar__button-img:hover {
  fill: yellow;
}

.navbar__list {
  display: flex;
  padding-left: 0;
  height: 100%;
  align-items: center;
  justify-content: center;
  list-style-type: none;

  .navbar__list-item:hover {
    color: #4e31ff;
    transition: color 0.3s ease-in-out;
  }
}

.navbar__list a {
  color: #ffffff;
  text-decoration: none;
}

.navbar__logo {
  border: none;
  margin-right: 3%;
  background-color: #ffffff;
  cursor: pointer;
}

.navbar__login {
  border: none;
  cursor: pointer;
  background-color: transparent;
}

.navbar__item--profile {
  margin-left: auto;
  margin-right: 1%;
}

@media (max-width: 768px) {
  .navbar {
    height: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .navbar__list {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .navbar__logo {
    margin-bottom: 10px;
  }
}
</style>
