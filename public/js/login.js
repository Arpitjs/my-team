let login = async (email, password) => {
    try {
        let res = await axios({
            method: 'POST',
            url: 'http://localhost:4200/login',
            data: { email, password }
        })
        console.log(res)
        if(res.data.status === 'success') { window.setTimeout(() => location.assign('/'), 1000) 
    }
    }
    catch (err) { 
        alert('invalid username or password!')
    } }

    if (document.querySelector('#myform')) {
    console.log('here we ares')
    document.querySelector('#myform').addEventListener('submit', async e => {
        e.preventDefault()
        document.querySelector('.arpits').textContent = 'Logging in...'
        let email = document.querySelector('#email').value
        let password = document.querySelector('#password').value
        await login(email, password)
        document.querySelector('.arpits').textContent = 'Login'
        
    })
    }

    let logout = async () => {
        try {
            await axios({
                method: 'GET',
                url: 'http://localhost:4200/logout',
            })
        } catch (e) {
            console.log(e)
        }
    }
    
let logoutBtn = document.querySelector('.class_is')
if(logoutBtn) logoutBtn.addEventListener('click', logout)
