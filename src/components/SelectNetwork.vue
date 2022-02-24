<template>
  <section
    class="dropDownMenuWrapper"
    :class="{
      'dropDownMenuWrapper--dark': isDarkMode,
      'dropDownMenuWrapper--noTitle': !network
    }"
  >
    <button
      class="dropDownMenuButton"
      ref="menu"
      @click="openClose"
      :class="{ 'dropDownMenuButton--dark': isDarkMode }"
    >
      {{ network }}
    </button>

    <div class="iconWrapper">
      <Icon name="arrow-down" class="chevron-icon" />
    </div>

    <section
      class="dropdownMenu"
      v-if="isOpen"
      :class="{ 'dropdownMenu--dark': isDarkMode }"
    >
      <slot />
    </section>
  </section>
</template>

<script>
import Icon from '@/components/Icon.vue';
import config from '@/config';

export default {
  components: {
    Icon
  },
  data() {
    return {
      isDarkMode: true,
      isOpen: false,
      network: 'Celo'
    };
  },
  methods: {
    openClose() {
      const closeListerner = e => {
        // Check if user clicks outside of the menu
        // true — close the menu and remove EventListener
        if (this.catchOutsideClick(e, this.$refs.menu)) {
          window.removeEventListener('click', closeListerner),
            (this.isOpen = false);
        }
      };
      // Add event listener to watch clicks outside the menu
      window.addEventListener('click', closeListerner);
      // Close if open and vice versa
      this.isOpen = !this.isOpen;
    },
    catchOutsideClick(event, dropdown) {
      // When user clicks menu — do nothing
      if (dropdown == event.target) return false;
      // When user clicks outside of the menu — close the menu
      if (this.isOpen && dropdown != event.target) return true;
    }
  },
  mounted() {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'light') {
      this.isDarkMode = false;
    } else {
      this.isDarkMode = true;
    }

    if (config.network === 'xdai') {
      this.network = 'Gnosis';
    } else {
      this.network = 'Celo';
    }
  }
};
</script>

<style scoped>
.chevron-icon {
  width: 12px;
  height: 12px;
}
.dropDownMenuWrapper {
  position: relative;
  border-radius: 5px;
  width: 100px;
  height: 42px;
  background: white;
  border: 1px solid #eee;
  box-shadow: 10px 10px 0 0 rgba(0, 0, 0, 0.03);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin-right: 10px;
}
.dropDownMenuWrapper * {
  box-sizing: border-box;
  text-align: left;
}
.dropDownMenuWrapper .dropDownMenuButton {
  border: none;
  font-size: inherit;
  background: transparent;
  outline: none;
  border-radius: 100px;
  display: flex;
  align-items: center;
  padding: 6px 16px;
  margin: 0;
  line-height: 1;
  width: 100%;
  height: 42px;
  z-index: 2;
  cursor: pointer;
}
.dropDownMenuWrapper .dropDownMenuButton--dark {
  color: white;
  background: var(--button-secondary-background);
}
.dropDownMenuWrapper .iconWrapper {
  width: 25px;
  height: 25px;
  position: absolute;
  right: 0px;
  top: 8px;
  z-index: 1;
}
.dropDownMenuWrapper .iconWrapper--noTitle {
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: auto;
  height: auto;
  transform: none;
}
.dropDownMenuWrapper .dropdownMenu {
  position: absolute;
  top: 70%;
  width: 100%;
  min-width: 160px;
  min-height: 10px;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 10px 10px 0 0 rgba(0, 0, 0, 0.03);
  background: white;
  padding: 0px;
  animation: menu 0.3s ease forwards;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.dropDownMenuWrapper .dropdownMenu .menuArrow {
  width: 20px;
  height: 20px;
  position: absolute;
  top: -10px;
  left: 20px;
  border-left: 1px solid #eee;
  border-top: 1px solid #eee;
  background: white;
  transform: rotate(45deg);
  border-radius: 4px 0 0 0;
}
.dropDownMenuWrapper .dropdownMenu .option {
  width: 100%;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
.dropDownMenuWrapper .dropdownMenu .option * {
  text-decoration: none;
  background: none;
  border: 0;
  padding: 0;
  outline: none;
  cursor: pointer;
}
.dropDownMenuWrapper .dropdownMenu .desc {
  opacity: 0.5;
  display: block;
  width: 100%;
  font-size: 14px;
  margin: 3px 0 0 0;
  cursor: default;
}
.dropDownMenuWrapper .dropdownMenu--dark {
  background: var(--dark);
  border: none;
}

@keyframes menu {
  from {
    transform: translate3d(0, 30px, 0);
  }
  to {
    transform: translate3d(0, 20px, 0);
  }
}
.dropDownMenuWrapper--noTitle {
  padding: 0;
  width: 60px;
  height: 60px;
}
.dropDownMenuWrapper--dark {
  background: var(--background-secondary);
  border: none;
}
</style>
