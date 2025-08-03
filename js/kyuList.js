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
    const number_of_solved_kyus = document.getElementsByClassName('number-of-solved');

    while (index < data.length) {
        try {
            let response = await fetch(`https://www.codewars.com/api/v1/code-challenges/${data[index].id}`);
            let kyu_data = await response.json();
    
            if (kyu_data.rank && typeof kyu_data.rank.id === 'number') {
                kyus[Math.abs(kyu_data.rank.id) - 1]++;
            }

            // Update frontend for the current index
            kyus.forEach((item, i) => {
                const element = number_of_solved_kyus.item(7 - i);
                if (element) element.textContent = `${item} katas solved`;
            });
        } catch (err) {
            console.warn(`Failed to fetch challenge at index ${index}:`, err);
        } finally {
            index++;
        }    
    }
    let title = document.getElementById('user-title')
    title.textContent = `${user} History`
    document.getElementById('display-number-of-kyus').className = ''
    document.getElementById('loading-section').className = 'hide-element'
}

main()
