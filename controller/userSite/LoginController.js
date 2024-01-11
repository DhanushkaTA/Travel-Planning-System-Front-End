import {clearLocalStorage, saveUser} from "../../util/localDb.js";

const usernameTxt=$("#usernameTxt")
const passwordTxt=$("#passwordTxt2")

// const exploreLink=$("#packageLink")

let user=null;

export class LoginController{

    constructor() {
        $("#logOpenBtn").on("click", () =>{
            usernameTxt.val("")
            passwordTxt.val("")
            $(".login").css("display","flex")
        })

        $("#passwordBtn").on("click", () =>{
            this.handlePasswordBtnAction();
        })

        $("#closeBtn").on("click", () =>{
            this.handleCloseBtnAction();
        })

        $("#loginBtn").on("click", () =>{
            this.handleLoginBtnAction();
        })

        $("#logOutBtn").on("click", () =>{
            this.handleLogOutBtnAction();
        })
    }

    handlePasswordBtnAction(){

        const passwordTxt=$("#passwordTxt2")
        const icon=$("#passwordBtn > i")

        if(passwordTxt.prop("type")==='password'){
            passwordTxt.prop("type", "text");
            icon.removeClass("uil-eye")
            icon.addClass("uil-eye-slash")

        }else {
            passwordTxt.prop("type", "password");
            icon.removeClass("uil-eye-slash")
            icon.addClass( "uil-eye")
        }
    }

    handleCloseBtnAction() {
        $(".login").css("display","none")
    }

    handleLoginBtnAction() {
        this.getDataFromDb(usernameTxt.val())
    }

    handleLogInAction(){
        if(user!=null){

            this.displayDetails(true,usernameTxt,"");

            if(user.userPassword===passwordTxt.val()){

                this.displayDetails(true,passwordTxt,"");

                $(".login").css("display","none");
                $("#dropdown").css("display","flex");
                $("#logOpenBtn-container").css("display","none");

                saveUser(user);
                // exploreLink.attr("half","pages/TravelPackage.html")

                this.showAlert("Login in successfully","success")

            }else {
                this.displayDetails(false,passwordTxt,"Password Invalid!!!");
            }


        }else {

            this.displayDetails(false,usernameTxt,"User not found!!!");

        }
    }

    displayDetails(status,textField,message){

        if (status){
            textField.css("border","1px solid #aaaaaa");
        }else {
            textField.css("border","2px solid #FF0000FF");
            this.showAlert(message,"error")

        }
    }

    handleLogOutBtnAction() {

        // $(".login").css("display","flex");


        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!"
        }).then((result) => {
            if (result.isConfirmed) {

                clearLocalStorage();

                $("#dropdown").css("display","none");
                $("#logOpenBtn-container").css("display","inline-block");


                this.showAlert("Logout in successfully","success")



            }
        });

    }

    showAlert(message,status){
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: status,
            title: message
        });
    }


    getDataFromDb(username){
        $.ajax({
            url:"http://localhost:8080/api/v1/user/find/username/"+username,
            method:"GET",
            processData: false,
            contentType:false,
            // data:formData,
            success:(resp) => {

                if (resp.code===200){

                    console.log(resp.data)

                    user=resp.data;
                    this.handleLogInAction()

                }

            },
            error:(ob)=>{
                user=null;
                console.log(ob);
                alert(ob.responseJSON.message);
                this.handleLogInAction()
            }
        })
    }
}

new LoginController();