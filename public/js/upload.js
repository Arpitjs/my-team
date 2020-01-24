let upload = async (data) => {
    try {
        let url = 'http://localhost:4200/updateMe' 
        let res = await axios({
            method: 'PATCH',
            url, data
        })
        console.log('vayo  ni bro')
        if (res.data.status === 'success') {
            console.log('doneeeeee')
        }
    } catch (err) {
        console.log('vaena ni bro',err)
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


if (document.querySelector('.form-user-data2')) {
    document.querySelector('.form-user-data2').addEventListener('submit', e => {
        e.preventDefault()
        let form2 = new FormData()
        form2.append('abcd', document.querySelector('#ram').files[0])
        console.log('till here', form2)
        upload(form2)
    })
}

if (document.querySelector('.form-user-data3')) {
    document.querySelector('.form-user-data3').addEventListener('submit', e => {
        e.preventDefault()
        let form3 = new FormData()
        form3.append('photos3', document.querySelector('#hero').files[0])
        console.log('till here', form3)
        upload(form3)
    })
}