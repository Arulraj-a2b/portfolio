export const useTheme = () => {
  const currentTheme = window.localStorage.getItem('theme');
  if (currentTheme === 'light') {
    window.localStorage.setItem('theme', 'dark');
    document.body.removeAttribute('theme');
  } else {
    window.localStorage.setItem('theme', 'light');
    document.body.setAttribute('theme', 'light');
  }
};

export const initTheme = () => {
  const theme = window.localStorage.getItem('theme');
  if (theme === 'light') {
    document.body.setAttribute('theme', 'light');
  } else {
    // Dark is default (no attribute needed)
    window.localStorage.setItem('theme', 'dark');
    document.body.removeAttribute('theme');
  }
};
