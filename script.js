document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM Content Loaded - Script is running."); // Log 1

  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navUl = document.querySelector('nav ul');

  console.log("Mobile Menu Button:", mobileMenuBtn); // Log 2
  console.log("Nav UL:", navUl); // Log 3

  if (mobileMenuBtn && navUl) {
    console.log("Elements found. Adding event listener."); // Log 4

    mobileMenuBtn.addEventListener('click', () => {
      console.log("Button clicked!"); // Log 5
      navUl.classList.toggle('active');
      console.log("Nav UL has 'active' class:", navUl.classList.contains('active')); // Log 6
    });

    // Optional: Close the menu when a link is clicked
    const navLinks = navUl.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        console.log("Link clicked. Removing 'active' class."); // Log 7
        navUl.classList.remove('active');
      });
    });

  } else {
      console.error("Mobile menu button or nav ul element not found!"); // Log 8
  }
});