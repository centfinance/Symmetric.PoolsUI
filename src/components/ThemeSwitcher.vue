<template>
  <toggle-button
    @change="switchTheme"
    :value="isDark"
    :width="70"
    :color="{ checked: '#FB6706', unchecked: '#FB6706' }"
    :switch-color="{ checked: '#123123', unchecked: '#535b5c5b' }"
    :labels="{ checked: 'Light', unchecked: 'Dark' }"
  />
</template>

<script>
export default {
  data() {
    return {
      isDark: true
    };
  },
  beforeMount() {
    const storedTheme = localStorage.getItem('themeSwitch');
    if (storedTheme) {
      this.setTheme(storedTheme);
      if (storedTheme === 'light') this.isDark = false;
      else this.isDark = true;
    }
  },
  methods: {
    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
    },
    switchTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');

      if (!currentTheme || currentTheme === 'light') {
        localStorage.setItem('themeSwitch', 'dark');
        this.setTheme('dark');
        this.isDark = true;
      } else {
        localStorage.setItem('themeSwitch', 'light');
        this.setTheme('light');
        this.isDark = false;
      }
    }
  }
};
</script>
