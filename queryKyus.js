const app_title = document.getElementById("title");
const title = "Query Number of Solved Kyus on Codewars";

(async () => {
  //animation to write the letters of title one by one
  for (let item of title) {
    const old_title = app_title.children.item(0).textContent;
    app_title.children.item(0).textContent =
      old_title.slice(0, old_title.length - 1) + item + "|";
    console.log(app_title.children.item(0).textContent);
    await new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        clearInterval(interval);
        resolve();
      }, 40);
    });
  }
  //remove selector from title
  const tmp_title = app_title.children.item(0).textContent;
  console.log(tmp_title.slice(0, -1));
  app_title.children.item(0).textContent = tmp_title.slice(0, -1);
  //event listener to click enter when typing in search bar
  const search_bar = document.getElementById('search')
  search_bar.addEventListener('keydown',(event) => {
    if(event.key === 'Enter') {
        fetch(`https://www.codewars.com/api/v1/users/${event.target.value}`)
        .then((res) => res.json())
        .then(data => {
            if(!data.success && data.success !== undefined) {
                alert('Enter valid username')
                event.target.value = ''
                return;
            }
            const navbar = document.getElementById('navbar')
            navbar.className = 'hide-element'
            let link = document.URL
            console.log(' '+link)
            window.location.href = `kyuList.html?user=${event.target.value}`
        })
    }
  })
})();
