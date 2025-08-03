let user = window.location.href.split('?')[1].split('=')[1]
let kyus = [0,0,0,0,0,0,0,0]
let loading = true
const button = document.getElementsByTagName('button').item(0)
button.addEventListener('click' ,() => {
    window.location.href = 'index.html'
})
async function main() { 
    let page = 0
    let data = []
    let user_data = await fetch(`https://www.codewars.com/api/v1/users/${user}/code-challenges/completed?page=${page}`)
    user_data = await user_data.json()
    data.push(...user_data.data)
    page++
    while(user_data.data.length === 200) {
        user_data = await fetch(`https://www.codewars.com/api/v1/users/${user}/code-challenges/completed?page=${page}`)
        user_data = await user_data.json()
        page++
        data.push(...user_data.data)
    }
    console.log(data.length)
    let index = 0
    while(1) {
        try {
            let kyu_data = await fetch(`https://www.codewars.com/api/v1/code-challenges/${data[index].id}`)
            kyu_data = await kyu_data.json()
            kyus[Math.abs(kyu_data.rank.id)-1]++
            index++
            if(index === data.length) {
                let number_of_solved_kyus = document.getElementsByClassName('number-of-solved')
                kyus.forEach((item,index) => {
                    number_of_solved_kyus.item(7-index).textContent = item + ' katas solved'
                })
                break
            }
        } catch {}
    }
    let title = document.getElementById('user-title')
    title.textContent = `${user} History`
    document.getElementById('display-number-of-kyus').className = ''
    document.getElementById('loading-section').className = 'hide-element'
}

main()
