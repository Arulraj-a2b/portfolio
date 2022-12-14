export const useTheme = () => {
  if (window.localStorage.getItem('theme') === 'dark') {
    window.localStorage.setItem('theme', 'light');
    document.body.setAttribute('theme', 'light');
  } else if (window.localStorage.getItem('theme') === 'light') {
    window.localStorage.setItem('theme', 'dark');
    document.body.setAttribute('theme', 'dark');
  } else{
    window.localStorage.setItem('theme', 'light');
    document.body.setAttribute('theme', 'light');
  }
};
