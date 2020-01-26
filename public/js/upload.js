let upload = async (data) => {
    try {
        let url = 'http://localhost:4200/updateTour'
        let res = await axios({
            method: 'PATCH',
            url, data
        })
        // console.log('vayo  ni bro')
       alert('updated successfully')
    } catch (err) {
        console.log('vaena ni bro', err)
    }
}

if (document.querySelector('.form-user-data')) {
    document.querySelector('.form-user-data').addEventListener('submit', e => {
        e.preventDefault()
        let form = new FormData()
        form.append('photos', document.querySelector('#photos').files[0])
        console.log(form)
        upload(form)
    })
}

if(document.querySelector('.form.form-user-data7')) {
document.querySelector('.form.form-user-data7').addEventListener('submit', e => {
    e.preventDefault()
    let form = new FormData()
    form.append('about3', document.querySelector('#hello').value)
    // if(!form === null || undefined)
    upload(form)
    // document.querySelector('.text-muted.card-text').textContent = document.querySelector('#hello').value
})
}


if (document.querySelector('.form-user-data2')) {
    document.querySelector('.form-user-data2').addEventListener('submit', e => {
        e.preventDefault()
        let form2 = new FormData()
        form2.append('abcd', document.querySelector('#ram').files[0])
        upload(form2)
    })
}

if (document.querySelector('.form-user-data3')) {
    document.querySelector('.form-user-data3').addEventListener('submit', e => {
        e.preventDefault()
        let form3 = new FormData()
        form3.append('photos3', document.querySelector('#hero').files[0])
        upload(form3)
    })
}