// start for control coding
let registerForm = document.querySelector("#register-form");
let allInput = registerForm.querySelectorAll("input");
let addBtn = document.querySelector("#add-btn");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-icon")


addBtn.onclick = function(){
    modal.classList.add("active");
}
closeBtn.addEventListener("click",() => {
    modal.classList.remove("active");

    let i;
    for (i=0; i<allInput.length; i++){
        allInput[i].value ="";
    }

})

// start all global variable

let userData = [];
let idEl = document.getElementById("id");
let nameEl = document.getElementById("name");
let l_nameEl = document.getElementById("l-name");
let emaliEl = document.getElementById("email");
let officeEl = document.getElementById("office-code");
let jobTitleEl = document.getElementById("job-title");
let registerBtn = document.querySelector("#register-btn");
let updateBtn = document.querySelector("#update-btn");
let imgUrl;

let profile_pic = document.querySelector("#profile-pic");
let uploadPic = document.querySelector("#upload-field");

// end all global variable

// satrt register code

registerBtn.onclick = function(e){
    e.preventDefault();
    registrationData();
    getDataFromLocal();
    registerForm.reset('');
    closeBtn.click();
}

if(localStorage.getItem("userData") != null){
    userData = JSON.parse(localStorage.getItem("userData"));
}


function registrationData(){
    userData.push({
        id : idEl.value,
        name : nameEl.value,
        l_nameEl : l_nameEl.value,
        emaliEl : emaliEl.value,
        officeEl : officeEl.value,
        jobTitleEl : jobTitleEl.value,
        profilePic: !imgUrl ? "img/employee.jpeg" : imgUrl
    });

    let userString = JSON.stringify(userData);
    localStorage.setItem("userData",userString);
     //  code from sweet alert
    swal("Good job!", "Registration Success!", "success");
}


// returning data on page from localstorage

let tableData = document.querySelector("#table-data");

const getDataFromLocal = () => {
    tableData.innerHTML = "";
    userData.forEach((data, index) => {
        tableData.innerHTML += `
        <tr index='${index}'>
            <td>${index + 1}</td>
            <td><img src="${data.profilePic}" width="40" height="40"></td>
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.l_nameEl}</td>
            <td>${data.emaliEl}</td>
            <td>${data.officeEl}</td>
            <td>${data.jobTitleEl}</td>
            <td>
                <button class="edit-btn"><i class="fa fa-edit"></i></button>
                <button class="del-btn"><i class="fa fa-trash"></i></button>
            </td>
        </tr>`;
    });

    //  delete employee code

    let i;
    let allDelBtn = document.querySelectorAll(".del-btn")
    for(i=0 ; i < allDelBtn.length; i++ ){
        allDelBtn[i].onclick = function(){
            let tr = this.parentElement.parentElement;
            let id = tr.getAttribute("index");

            //  code from sweet alert

            swal({
                title: "Are you sure?",
                text: "Are you sure you want to delete this user? This action cannot be undone.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {

                    userData.splice(id,1);
                    localStorage.setItem("userData",JSON.stringify(userData));
                    tr.remove();

                  swal("Poof! Your user has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Your user is safe!");
                }
            });
        }
    }

    // update employee code


    let allEdit = document.querySelectorAll(".edit-btn")
    for (i = 0; i < allEdit.length; i++){
        allEdit[i].onclick = function(){
            let tr = this.parentElement.parentElement;
            let td = tr.querySelectorAll("td");
            let index = tr.getAttribute("index");
            let imgTag = td[1].getElementsByTagName("img");
            let profilePic = imgTag[0].src;
            
            let id = td[2].innerHTML;
            let name = td[3].innerHTML;
            let l_name = td[4].innerHTML;
            let email = td[5].innerHTML;
            let officeCode = td[6].innerHTML;
            let jobTitle = td[7].innerHTML
            
            addBtn.click();
            registerBtn.disabled = true;
            updateBtn.disabled = false;

            idEl.value = id;
            nameEl.value = name;
            l_nameEl.value =l_name;
            emaliEl.value = email;
            officeEl.value = officeCode;
            jobTitleEl.value = jobTitle;
            profile_pic.src = profilePic;

            updateBtn.onclick = function(e){
                userData[index] ={
                    id : idEl.value,
                    name : nameEl.value,
                    l_nameEl : l_nameEl.value,
                    emaliEl : emaliEl.value,
                    officeEl : officeEl.value,
                    jobTitleEl : jobTitleEl.value,
                    profilePic: !uploadPic.value ? profile_pic.src : imgUrl

                }

                localStorage.setItem("userData", JSON.stringify(userData));

            }
        }
    }
}

getDataFromLocal();


// image processing

uploadPic.onchange = function(){
    if(uploadPic.files[0].size < 1000000){

        let fReader = new FileReader();
        fReader.onload = function(e){
            imgUrl = e.target.result;
            profile_pic.src = imgUrl;
            console.log(imgUrl)
        }
        fReader.readAsDataURL(uploadPic.files[0]);
    }else{
        alert("file size is too long");
    }
}

// search bar code

let searchEl = document.querySelector("#empId");
searchEl.oninput = function(){
    searchFuc();
}

function searchFuc(){
    let tr = tableData.querySelectorAll("tr");
    let filter = searchEl.value.toLowerCase();
    let i;
    for(i=0; i<tr.length; i++){
        let id = tr[i].getElementsByTagName("td")[2].innerHTML;
        let namee = tr[i].getElementsByTagName("td")[3].innerHTML;
        if(id.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display="";
        }
        else if(namee.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display="";
        }
        else{
            tr[i].style.display= "none";
        }

    }

}


//clear all data

let delAllBtn = document.querySelector("#del-all-btn");
let delAllBox = document.querySelector("#del-all-box");
delAllBtn.addEventListener('click',()=>{
    if(delAllBox.checked == true){
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete all users? This action cannot be undone.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                localStorage.removeItem("userData");
                window.location = location.href;

              swal("Poof! Your users have been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your users are safe!");
            }
        });
    }else{
        swal("Check The Box!", "Please check the box to delete all data!", "warning");
    }
})


