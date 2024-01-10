export class LoginController{

    constructor() {
        $("#logOpenBtn").on("click", () =>{
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

        $(".login").css("display","none");
        $("#dropdown").css("display","flex");
        $("#logOpenBtn-container").css("display","none");

    }

    handleLogOutBtnAction() {

        alert("sssssss")

        // $(".login").css("display","flex");
        $("#dropdown").css("display","none");
        $("#logOpenBtn-container").css("display","inline-block");

        // Swal.fire({
        //     title: "Are you sure?",
        //     text: "You won't be able to revert this!",
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3085d6",
        //     cancelButtonColor: "#d33",
        //     confirmButtonText: "Yes, delete it!"
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         // Swal.fire({
        //         //     title: "Deleted!",
        //         //     text: "Your file has been deleted.",
        //         //     icon: "success"
        //         // });
        //
        //
        //
        //     }
        // });

    }
}

new LoginController();