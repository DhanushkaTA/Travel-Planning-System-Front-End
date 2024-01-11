import {getUser} from "../../util/localDb.js";

// const exploreLink=$("#packageLink")

export class SiteController{
    constructor() {
        this.handleFindLoginDetails();

        // exploreLink.on("click",() =>{
        //
        // })
    }

    handleFindLoginDetails(){
        const user=getUser()
        if(user==null){

            // exploreLink.attr("half","#")

            $("#dropdown").css("display","none");
            $("#logOpenBtn-container").css("display","inline-block");
        }else {

            $("#dropdown").css("display","flex");
            $("#logOpenBtn-container").css("display","none");

            // exploreLink.attr("half","pages/TravelPackage.html")

            this.setDetailsToWindow();
        }
    }

    setDetailsToWindow(){
        let user = getUser();
        $("#full-name").text(user.userFullName)
        usernameTxt.val(user.username)
        emailTxt.val(user.userEmail)
    }
}
new SiteController();