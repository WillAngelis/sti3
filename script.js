let tabs = document.querySelectorAll('.tabs_toggle'),
  content = document.querySelectorAll('.tabs_content');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    content.forEach((content) => {
      content.classList.remove('is_active');
    });
    tabs.forEach((tab) => {
      tab.classList.remove('is_active');
    });

    content[index].classList.add('is_active');
    tabs[index].classList.add('is_active');
  });
});
