document.addEventListener('DOMContentLoaded', function() {
    let form = document.querySelector('#invite-form');
    let subBtn = document.getElementById('submit');
    let inviteBtn = document.getElementById('add-inviter');
    let emailList = document.getElementById('email-list');
    let inviterEmail = document.getElementById('email1');
    let inviteMails = [];
    let localMemory = JSON.parse(localStorage.getItem('localMemory')) || [];

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    function validateEmail(email) {
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        return true;
    }

    function validatePhone(phone) {
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return false;
        }
        return true;
    }

    if (subBtn) {
        subBtn.addEventListener('click', function(event) {
            event.preventDefault();

            let userEmail = document.getElementById('email').value;
            let userPhone = document.getElementById('number').value;

            if (!validateEmail(userEmail)) return;
            if (!validatePhone(userPhone)) return;

            if (inviterEmail.value !== "" && validateEmail(inviterEmail.value)) {
                inviteMails.push(inviterEmail.value);
            }

            let userName = document.getElementById('name').value;
            let userPass = document.getElementById('password').value;
            let userAge = document.getElementById('age').value;
            let genderType = document.querySelector('input[name="gender"]:checked')?.value;
            let userDob = document.getElementById('dob').value;
            let country = document.getElementById('country').value;
            let phoneNumber = document.getElementById('number').value;

            let invite = inviteMails.join(",");

            let userData = {
                userName: userName,
                userMail: userEmail,
                userPass: userPass,
                userAge: userAge,
                genderType: genderType,
                userDob: userDob,
                country: country,
                phoneNumber: phoneNumber,
                inviterEmail: invite
            };

            localMemory.push(userData);
            console.log(userData);
            
            localStorage.setItem('localMemory', JSON.stringify(localMemory));
            
            
            inviteMails = [];
            emailList.innerHTML = ''; 
            form.reset();

            alert('User data has been added to the array and saved to local storage');
            // userData();
        });
    }

    if (inviteBtn) {
        inviteBtn.addEventListener('click', function(event) {
            event.preventDefault();

            let email = inviterEmail.value;

            if (email !== '') {
                if (!validateEmail(email)) return;

                if (inviteMails.find(existingEmail => existingEmail === email)) {
                    alert('This email has already been invited.');
                    return;
                }

                let li = document.createElement('li');
                li.className = 'list';
                li.textContent = email;

                let remove = document.createElement('i');
                remove.className = 'fa-solid fa-trash remove-icon';
                li.appendChild(remove);
                emailList.appendChild(li);

                inviteMails.push(email);

                inviterEmail.value = '';  

                remove.addEventListener('click', () => {
                    li.remove();
                    inviteMails = inviteMails.filter(invite => invite !== email); 
                });
            } else {
                alert('Please enter a valid email.');
            }
        });
    }

    function userData() {
        let tableBody = document.getElementById('table-body');
        if (!tableBody) {
            return;
        }

        tableBody.innerHTML = '';  

        localMemory.forEach((user, index) => {
            let row = document.createElement('tr');

            let userName = document.createElement('td');
            userName.textContent = user.userName;
            row.appendChild(userName);

            let email = document.createElement('td');
            email.textContent = user.userMail;
            row.appendChild(email);

            let country = document.createElement('td');
            country.textContent = user.country;
            row.appendChild(country);

            let phone = document.createElement('td');
            phone.textContent = user.phoneNumber;
            row.appendChild(phone);

            let inviters = document.createElement('td');
            inviters.textContent = user.inviterEmail;
            row.appendChild(inviters);

            let deleteBtn = document.createElement('td');
            let icon = document.createElement('i');
            icon.className = 'fa-solid fa-trash remove-icon'; 
            icon.addEventListener('click', () => {
                row.remove();
                localMemory.splice(index, 1);
                localStorage.setItem('localMemory', JSON.stringify(localMemory));  
            });

            deleteBtn.appendChild(icon); 
            row.appendChild(deleteBtn);

            tableBody.appendChild(row);
        });
    }

    userData();
});
