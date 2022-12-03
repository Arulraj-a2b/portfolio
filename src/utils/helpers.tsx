export const useTheme = () => {
  if (window.localStorage.getItem('theme') === 'dark') {
    window.localStorage.setItem('theme', 'light');
    document.body.setAttribute('theme', 'light');
  } else {
    window.localStorage.setItem('theme', 'dark');
    document.body.setAttribute('theme', 'dark');
  }
};
