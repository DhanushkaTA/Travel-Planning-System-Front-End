import {clearLocalStorage, getUser, saveUser} from "../../util/localDb.js";

const oldPasswordBtn=$("#oldPasswordBtn")
const newPasswordBtn=$("#newPasswordBtn")
const conformPasswordBtn=$("#conformPasswordBtn")

const oldPasswordTxt=$("#oldPassword")
const newPasswordTxt=$("#newPassword")
const conformPasswordTxt=$("#conformPassword")

const oldIcon=$("#oldPasswordBtn > i")
const newIcon=$("#newPasswordBtn > i")
const conformIcon=$("#conformPasswordBtn > i")

const usernameTxt=$("#update-username");
const emailTxt=$("#update-email");

let password=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%&?])[A-Za-z\d@#$!%&?]{8,}$/;
let username=/^[a-zA-Z][a-zA-Z0-9_\-@]{2,19}$/;
let email=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export class AccountDetails{

    constructor() {

        $("#my-accountBtn").on("click",() =>{
            this.setDetailsToWindow()
            $(".account-details").css("display","flex")
        })

        $("#closeDetailsBtn").on("click",() =>{
            $(".account-details").css("display","none")
        })

        oldPasswordBtn.on("click",() =>{
            this.handleVisiblePasswordAction(oldPasswordTxt,oldPasswordTxt,oldIcon)
        })

        newPasswordBtn.on("click",() =>{
            this.handleVisiblePasswordAction(newPasswordBtn,newPasswordTxt,newIcon)
        })

        conformPasswordBtn.on("click",() =>{
            this.handleVisiblePasswordAction(conformPasswordBtn,conformPasswordTxt,conformIcon)
        })

        $("#updatePasswordBtn").on("click",() =>{
            this.handleUpdatePasswordBtnAction()
        })

        $("#updateBtn").on("click",() =>{
            this.handleUpdateBtnAction()
        })

        conformPasswordTxt.on("keyup",() =>{
            this.checkPasswordIsEqual()
        })

    }

    setDetailsToWindow(){
        let user = getUser();
        $("#full-name").text(user.userFullName)
        usernameTxt.val(user.username)
        emailTxt.val(user.userEmail)
    }

    handleVisiblePasswordAction(button,textField,icon){

        if(textField.prop("type")==='password'){
            textField.prop("type", "text");
            icon.removeClass("uil-eye")
            icon.addClass("uil-eye-slash")

        }else {
            textField.prop("type", "password");
            icon.removeClass("uil-eye-slash")
            icon.addClass( "uil-eye")
        }
    }

    handleUpdateBtnAction(){



        if (username.test(usernameTxt.val())){
            usernameTxt.css("border","1px solid #aaaaaa");

            if(email.test(emailTxt.val())){
                emailTxt.css("border","1px solid #aaaaaa");



                Swal.fire({
                    title: "Do you want to save the changes?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Update",
                    denyButtonText: `Don't Update`
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {

                        this.updateUser(
                            usernameTxt.val(),
                            emailTxt.val(),
                            getUser().userId
                        );


                    } else if (result.isDenied) {
                        Swal.fire("Changes are not saved", "", "info");
                    }
                });


            }else {
                emailTxt.css("border","2px solid #FF0000FF");
                this.showMessage(this.setMessage("email"))
            }

        }else {
            usernameTxt.css("border","2px solid #FF0000FF");
            this.showMessage(this.setMessage("username"))
        }

    }

    checkPasswordIsEqual(){

        if (newPasswordTxt.val()===conformPasswordTxt.val()){
            newPasswordTxt.css("border","1px solid #aaaaaa");
            conformPasswordTxt.css("border","1px solid #aaaaaa");
            $("#warning").css("display","none");
            return true;
        }else {
            newPasswordTxt.css("border","2px solid #FF0000FF");
            conformPasswordTxt.css("border","2px solid #FF0000FF");
            $("#warning").text("Password not matched!!!");
            $("#warning").css("display","block");
            return  false;
        }
    }

    handleUpdatePasswordBtnAction() {
        if(this.validatePassword() && this.checkPasswordIsEqual()){
            alert("lllllllllll")


            Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Update",
                denyButtonText: `Don't Update`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });

            /**
            *
            *
            *
            *
            *
            *
            * */

        }
    }

    validatePassword(){
        if (!password.test(newPasswordTxt.val())){
            newPasswordTxt.css("border","2px solid #FF0000FF");
            this.showMessage(this.setMessage("password"))
            return false;
        }else {
            newPasswordTxt.css("border","1px solid #aaaaaa");
            return true;
        }
    }

    showMessage(message){
        Swal.fire({
            position: "top-end",
            text: message,
            icon: "error"
        });
    }

    setMessage(type){
        let message =
            (type === "email") ? "Allows only @,_,- , any uppercase letter (A-Z) and  any lowercase letter (a-z) \n " +
                "Eg :- Dhanushka@gmail.com / dhanu_45@yahoo.lk" :
                (type === "username") ? "Username must start with a letter (uppercase or lowercase).\n" +
                    "Username can contain letters (uppercase or lowercase), numbers, underscores, and hyphens and @.\n" +
                        "Username must be between 3 and 20 characters in length." :
                    (type === "password") ? "At least 8 characters long.\n" +
                        "Contains a combination of uppercase letters, lowercase letters, " +
                            "numbers, and special characters (such as !, @, #, $, %, etc.)." : "" ;

        return message;
    }


    updateUser(username,email,id){
        $.ajax({
            url:"http://localhost:8080/api/v1/user/update/"+username+"/"+email+"/"+id,
            method:"PUT",
            processData: false,
            contentType:false,
            // data:formData,
            success:(resp) => {
                if (resp.code===200){
                    console.log(resp.message);
                    // alert("user get");//

                    clearLocalStorage();
                    saveUser(resp.data)

                    Swal.fire("Updated!", "", "success");

                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }

}

new AccountDetails();