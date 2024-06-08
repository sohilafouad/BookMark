var bookmarkName=document.getElementById("bookmarkName");
var bookmarkUrl=document.getElementById("bookmarkUrl");
var btnSubmit=document.getElementById("btnSubmit");
var tableData=document.getElementById("tableData");
var linkAlert =document.getElementById("url-alert");
var nameAlert =document.getElementById("name-alert");
var exist =document.getElementById("exist");

var allBookMarks=[];
var action="submit";

if(localStorage.getItem("allBookMarks") !==null){
    allBookMarks =JSON.parse( localStorage.getItem("allBookMarks"))
    display()
}

btnSubmit.addEventListener("click", function(){
    if(action === "submit"){
        if(linkValidation() === true & nameValidation() === true){
            var book = {
                name:bookmarkName.value,
                url:bookmarkUrl.value
            }
        
          allBookMarks.push(book);
        }
       
    }
display();
setStorage();
clearInputs();
console.log(allBookMarks);
})

// FOR DISPALY DATA
function display(){
    var cartona=""
    for(var i=0; i<allBookMarks.length ;i++){
cartona+=`
<tr>
<td>${i+1}</td>
<td>${allBookMarks[i].name}</td>
<td><a target="_blank" href="${allBookMarks[i].url}"> <i class="fa-regular fa-eye"></i> Visit</a></td>
<td> <a class="delete" onclick="deleteInput(${i})"> <i class="fa-solid fa-trash"></i> Delete</a></td>
</tr>
`
    }
    tableData.innerHTML = cartona;
}
//FOR CLEAR INPUT
function clearInputs(){
    bookmarkName.value=null;
    bookmarkUrl.value=null;
}
//FOR SAVING DATA
function setStorage(){
    localStorage.setItem("allBookMarks",JSON.stringify(allBookMarks))
}

//FOR DELETE DATA
function deleteInput(index){
//console.log(index);
allBookMarks.splice(index,1);
//console.log(allBookMarks);
display();
setStorage();
}
//FOR VALIDATION


function linkValidation(){
    if(bookmarkUrl.value === ""){
    linkAlert.classList.remove("d-none")
        return false;
    }else{
        linkAlert.classList.add("d-none")

        return true;
    }
}

// name validation



function nameValidation(){
    if(bookmarkName.value === ""){
    nameAlert.classList.remove("d-none")
    exist.classList.add("d-none");

        return false;
    }else{
        // exist name
        var isExist = true;
        for(var i =0; i<allBookMarks.length ; i++){
            if(allBookMarks[i].name ===bookmarkName.value ){
                isExist = false;
                break;
            }
        }

        if(isExist === false){
            exist.classList.remove("d-none");
            return false
        }else{
            exist.classList.add("d-none");

        }




        nameAlert.classList.add("d-none")
        exist.classList.add("d-none");
        return true;
    }
}