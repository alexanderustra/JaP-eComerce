document.addEventListener('DOMContentLoaded', () => {

    let dataArray = document.querySelectorAll('.profile-data');
    let dataType = ['Nombre: ', 'Correo: ','Teléfono: ']

    function setProfile() {
        let userData = localStorage.getItem('user-data');
        let userDataArray = userData.split(',');

        console.log(userData)

        for(let i = 0; i < dataArray.length ; i++) {
            dataArray[i].textContent = dataType[i] + userDataArray[i];
        }
    }

    function editProfile() {
            
        const mainElement = document.querySelector('main');
        let modal = document.createElement('DIV');
        modal.className = 'modal-input';
        mainElement.appendChild(modal)
        let inputsToModify = [];
            
        for(let i = 0; i < dataArray.length ; i++) {
            let input = document.createElement('INPUT');
            modal.appendChild(input)
            input.placeHolder = dataType[i];
            input.value = dataArray[i].textContent.replace(dataType[i], '');
            inputsToModify.push(input);
        }
        editable = true;

        let saveBtn = document.createElement('BUTTON');
        saveBtn.textContent = 'Guardar';
        modal.appendChild(saveBtn)

        saveBtn.addEventListener('click',()=>{
            modal.style.display = 'none';
            for(let i = 0; i < dataArray.length ; i++) {
                dataArray[i].textContent = dataType[i] + inputsToModify[i].value;
            }
        })
    }

    setProfile()

    document.getElementById('edit-profile-btn').addEventListener('click',editProfile);
});