const homeBtn = document.querySelector('.home-button')
homeBtn.addEventListener("click", () => {
  app.innerHTML = ""
    renderFalcon()
}) 

function renderFalcon() {
    const falcon = document.createElement('img')
    falcon.id = 'falcon'
    falcon.src = 'https://c4.wallpaperflare.com/wallpaper/592/970/573/star-wars-millennium-falcon-wallpaper-preview.jpg'
    falcon.alt = 'FALCON'
    app.appendChild(falcon)

    falcon.addEventListener('click', () => {
        alert('Hit it Chewy!')
    })
}