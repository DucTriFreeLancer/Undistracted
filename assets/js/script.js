(function addMutationObserver() {
    document.addEventListener('DOMContentLoaded', () => {
      var body = document.querySelector('body');
      if (!body) {
        return;
      }
  
      const assignClass = body => {
        var isHomePage = !!!window.location.pathname.split('/')[1];
        if (body) {
          if (isHomePage) {
            body.classList.add('isHomePage');
          } else {
            body.classList.remove('isHomePage');
          }
        }
      };
  
      assignClass(body);
  
      var title = document.querySelector('title');
      if (title) {
        title.addEventListener('DOMSubtreeModified', () => assignClass(body));
      }
    });
  })();