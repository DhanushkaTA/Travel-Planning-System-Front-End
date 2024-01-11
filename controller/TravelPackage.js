import {PackageDTO} from "../dto/PackageDTO.js";
import {RoomCountDTO} from "../dto/RoomCountDTO.js";

let packageCategory=null;
let vehicleCategory=null
let hotelCategory="5 Star"
// let hotelCategory=null
let travelArea=null;

let hotelArray=[];
let vehicleArray=[];
let guideArray=[];

let selectedHotelId=null;
let selectedHotelObject=null;

let selectedVehicleId=null;
let selectedVehicleObject=null;

let selectedGuideId="-";
let selectedGuideObject=null;

let isFuel=false;
let isTransmission=false;
let isPetrol=false;
let isDiesel=false;
let isAuto=true;
let isManual=false;
let direction="asc";

let needGuide="No";
let withPet="No";
let withGuide="No";

let daysCount=0;

let finalTotal=0;

let packageId=null;

export class TravelPackage{
    constructor() {

        // $("#slipImage").on("click",function () {
        //     console.log("ppppp")
        //     // isNicTwo=true;
        //     // $("#profilePicChooser").trigger("click");
        // });


        $("#s_LuxuryCrd").on("click",() => {
            this.resetCard()
            $("#s_LuxuryCrd > .check").css("display","flex");
            $("#s_LuxuryCrd > .check > div").css("transform","rotate(360deg)");
            this.setPackageCategory("S-Luxury","S-Luxury","5 Star")
            this.printC()
        })

        $("#luxuryCrd").on("click",() => {
            this.resetCard()
            $("#luxuryCrd > .check").css("display","flex");
            this.setPackageCategory("Luxury","Luxury","4 Star")
            this.printC()
        })

        $("#midLevelCrd").on("click",() => {
            this.resetCard()
            $("#midLevelCrd > .check").css("display","flex");
            this.setPackageCategory("Mid-Level","Mid-Range","3 Star")
            this.printC()
        })

        $("#regularCrd").on("click",() => {
            this.resetCard()
            $("#regularCrd > .check").css("display","flex");
            this.setPackageCategory("Regular","Economy","2 Star")
            this.printC()
        })

        $("#card1").on("click",() => {
            travelArea="Kandy";
            console.log(travelArea)
        })

        $("#card2").on("click",() => {
            travelArea="Colombo";
            console.log(travelArea)
        })

        $("#card3").on("click",() => {
            travelArea="Down South";
        })

        $("#card4").on("click",() => {
            travelArea="Ella";
            console.log(travelArea)
        })

        $("#card5").on("click",() => {
            travelArea="Sigiriya";
            console.log(travelArea)
        })

        $("#card6").on("click",() => {
            travelArea="Anuradhapura";
            console.log(travelArea)
        })

        $("#card7").on("click",() => {
            travelArea="Polonnaruwa";
            console.log(travelArea)
        })

        $("#card8").on("click",() => {
            travelArea="Matale";
            console.log(travelArea)
        })

        //----------------------------------------

        $("#travelBtn").on("click",() => {

            if(packageCategory===null){
                alert("Please Select Package Category")
            }else {

                this.getAllVehicleFromDb();
                $('#travelArea').css("display","flex")
                $('#selectPackage').css("display","none")
            }

        })

        // $("#hotelBtn").on("click",() => {
        //     if(travelArea===null){
        //         alert("Please Select Travel Area")
        //     }else {
        //         $('#travelArea').css("display","none")
        //         $('#selectHotel').css("display","flex")
        //     }
        // })

        $("#detailBtn").on("click",() => {
            if(travelArea===null){
                alert("Please Select Travel Area")
            }else {
                $('#travelArea').css("display","none")
                $('#details').css("display","flex")
            }
        })

        $("#backTpckgBtn").on("click",() => {
            $('#travelArea').css("display","none")
            $('#selectPackage').css("display","flex")

        })

        $("#hotelBtn").on("click",() => {

            if($("#endDate").val().length<1 || $("#startDate").val().length<1 || $("#withPetCmb").val()===null  ){
                alert("Pleas select Date")
            }else {

                var date1 = new Date($("#startDate").val());
                var date2 = new Date($("#endDate").val());

                var timeDifference = Math.abs(date2 - date1);

                var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

                daysCount=days;
                console.log(days);

                withPet=$("#withPetCmb").val();

                this.getAllDataFromDb("hotel")

                $('#details').css("display","none")
                $('#selectHotel').css("display","flex")
            }
        })

        $("#vehicleBtn").on("click",() => {
            if(selectedHotelId===null){
                alert("Pleas select Hotel")
            }else {

                this.setHotelDetails()

                $('#selectHotel').css("display","none")
                $('#selectVehicle').css("display","flex")
            }
        })

        $("#backAreaBtn").on("click",() => {
            $('#details').css("display","none")
            $('#travelArea').css("display","flex")

        })

        $("#backDetailBtn").on("click",() => {
            $('#selectHotel').css("display","none")
            $('#details').css("display","flex")
        })

        // $("#backAreaBtn").on("click",() => {
        //     $('#selectHotel').css("display","none")
        //     $('#travelArea').css("display","flex")
        //
        // })

        $("#guideBtn").on("click",() => {

            if(selectedVehicleObject===null){
                alert("Please select vehicle")
            }else {

                this.setVehicleDetails()
                $('#selectVehicle').css("display","none")
                $('#selectGuide').css("display","flex")
            }

        })

        $("#backHotelBtn").on("click",() => {
            $('#selectVehicle').css("display","none")
            $('#selectHotel').css("display","flex")
        })

        // getAllDataFromDb(path)

        $("#doneBtn").on("click",() => {

            console.log("kkk")

            if(needGuide==="No"){
                alert("Guide Not select")

                this.setGuideDetails()

                $('#selectGuide').css("display","none")
                $('#placePackage').css("display","flex")
            }else {

                this.setGuideDetails()

                $('#selectGuide').css("display","none")
                $('#placePackage').css("display","flex")
            }


        })

        $("#backVehicleBtn").on("click",() => {
            $('#selectGuide').css("display","none")
            $('#selectVehicle').css("display","flex")

        })

        $("#backGuideBtn").on("click",() => {
            $('#placePackage').css("display","none")
            $('#selectGuide').css("display","flex")

        })


        $("#placeBtn").on("click",() => {
            // $('#selectVehicle').css("display","none")
            // $('#selectHotel').css("display","flex")

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonCol: '#d33',
                confirmButtonTextor: '#3085d6',
                cancelButtonColor: 'Yes, Place it'
            }).then((result) => {
                if (result.isConfirmed) {

                    this.getNextTravelPackageId();
                }
            })



        })

        // ---------------------------------------

        $("#allBtn").on("click",() => {
            $("#allBtn").addClass("color")
            this.changeOptBtnsVisibility('hidden')
            $("#fuelBtn").removeClass("color");
            $("#transmiBtn").removeClass("color");
            $("#petrolBtn").removeClass("color");
            $("#dieselBtn").removeClass("color");
            $("#autoBtn").removeClass("color");
            $("#manualBtn").removeClass("color");
            isFuel=false;
            isTransmission=false;
            isManual=false;
            isAuto=false;
            isDiesel=false;
            isPetrol=false;
            this.getAllVehicleFromDb();
        });

        $("#fuelBtn").on("click",() => {
            $('#opt_3').css('visibility','visible');
            $("#allBtn").removeClass("color");
            $("#fuelBtn").addClass("color");
            isFuel=true;

        });

        $("#transmiBtn").on("click",() => {
            $('#opt_2').css('visibility','visible');
            $("#allBtn").removeClass("color");
            $("#transmiBtn").addClass("color");
            isTransmission=true;
        })

        $("#petrolBtn").on("click",() => {
            $("#dieselBtn").removeClass("color");
            $("#petrolBtn").addClass("color");
            isPetrol=true;
            isDiesel=false;
            this.decideURLPattern();
        })

        $("#dieselBtn").on("click",() => {
            $("#petrolBtn").removeClass("color");
            $("#dieselBtn").addClass("color");
            isDiesel=true;
            isPetrol=false;
            this.decideURLPattern();
        })

        $("#autoBtn").on("click",() => {
            $("#manualBtn").removeClass("color");
            $("#autoBtn").addClass("color");
            isAuto=true;
            isManual=false;
            this.decideURLPattern();
        })

        $("#manualBtn").on("click",() => {
            $("#autoBtn").removeClass("color");
            $("#manualBtn").addClass("color");
            isAuto=false;
            isManual=true;
            this.decideURLPattern();
        })

        $("#ascBtn").on("click",() => {
            $("#descBtn").removeClass("color");
            $("#ascBtn").addClass("color");
            direction="asc";
            this.decideURLPattern();
        })

        $("#descBtn").on("click",() => {
            $("#ascBtn").removeClass("color");
            $("#descBtn").addClass("color");
            direction="desc";
            this.decideURLPattern();
        })

        //-------------------------------------

        $("#yesBtn").on("click",() => {
            $("#noBtn").removeClass("color");
            $("#yesBtn").addClass("color");
            needGuide="Yes"
            this.getAllDataFromDb("guide")
            $("#guideList").css("display","flex")
        })

        $("#noBtn").on("click",() => {
            $("#yesBtn").removeClass("color");
            $("#noBtn").addClass("color");
            $("#guideList").css("display","none")
            selectedGuideObject=null;
            selectedGuideId="-";
            needGuide="No"
        })

        $("#paideTotal").on("keyup", (event) =>{
            this.setPaidDetails()
        });

        $("#hotelRoom_Opt_1").val("0")
        $("#hotelRoom_Opt_2").val("0")
        $("#hotelRoom_Opt_3").val("0")
        $("#hotelRoom_Opt_4").val("0")


        $("#guideList").css("display","none")
        this.handleHotelSelectBtnClickEvent();
        this.handleVehicleSelectBtnClickEvent();
        this.handleGuideSelectBtnClickEvent();

        $("#profilePicChooser").on("change", () =>{
            this.setFile()
        });

        // this.changeOptBtnsVisibility('hidden');
        // this.getAllDataFromDb("hotel"); //To get hotel List
        // this.getAllVehicleFromDb(); //To get vehicle List
    }

    setFile(){
        console.log("ppppppp")
    }

    ///////////////////////////////////////////////////////////////

    placeBtnAction(id){

        let adualt=parseInt($("#travelPackage_No_Adult").val())
        let chiled=parseInt($("#travelPackage_No_Child").val())

        let count=adualt+chiled;

        console.log("lace : "+id)

        let packge=new PackageDTO(
            id,
            packageCategory,
            travelArea,
            selectedGuideId,
            selectedVehicleId,
            selectedHotelId,
            "99007711620",//user ID
            finalTotal,
            parseInt($("#paideTotal").val()),
            needGuide,
            withPet,
            count,
            chiled,
            adualt,
            this.getRoomObject(),
            $("#startDate").val(),
            $("#endDate").val(),
            $("#placeDate").val()
        )

        this.sendDataToDb(JSON.stringify(packge))
    }

    getRoomObject(){
        return new RoomCountDTO(
            parseInt($("#hotelRoom_Opt_1").val()),
            parseInt($("#hotelRoom_Opt_2").val()),
            parseInt($("#hotelRoom_Opt_3").val()),
            parseInt($("#hotelRoom_Opt_4").val())
        )
    }

    sendDataToDb(tPackage){
        $.ajax({
            url:"http://localhost:8080/api/v1/travelPackage/save",
            method:"POST",
            // processData: false,
            contentType:"application/json",
            data:tPackage,
            success:(resp) => {
                if (resp.code==="200"){
                    console.log(resp.message);

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Package Saved',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    alert("Package saved");

                    location.reload(true);



                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }


    setPaidDetails(){
        let rest=parseInt($("#packageTotal").val()) - parseInt($("#paideTotal").val());
        $("#restTotal").val(rest)
    }

    setGuideDetails(){
        if(needGuide==="Yes"){

            let total=daysCount * parseInt(selectedGuideObject.guideManDay_value);

            $("#guideTotal").val(total);

            $("#guide_Id").val(selectedGuideObject.guideId);

            //-------------------------------
            let hotelTotal=parseInt($("#hotelTotal").val())
            let vehicleTotal=parseInt($("#vehicleTotal").val())

            let packageTotal=total+hotelTotal+vehicleTotal;
            finalTotal=packageTotal;

            console.log(packageTotal)

            $("#packageTotal").val(packageTotal);

        }else {

            let hotelTotal=parseInt($("#hotelTotal").val())
            let vehicleTotal=parseInt($("#vehicleTotal").val())

            let packageTotal=hotelTotal+vehicleTotal;
            finalTotal=packageTotal;

            $("#packageTotal").val(packageTotal);

            $("#guide_Id").val("-")
            $("#guideTotal").val("00")
        }
    }

    setVehicleDetails(){
        $("#vehicle_Id").val(selectedVehicleId);
        $("#vehicle_Brand").val(selectedVehicleObject.vehicleBrand);

        // let destination=parseInt($("#km").val())
        // let kmForDay=100;
        // let restKm=destination%kmForDay;
        // console.log(km)

        let total=daysCount * selectedVehicleObject.vehicleFee_for_Day;

        $("#vehicleTotal").val(total);
    }

    setHotelDetails(){

        let room1=parseInt($("#hotelRoom_Opt_1").val())
        let room2=parseInt($("#hotelRoom_Opt_2").val())
        let room3=parseInt($("#hotelRoom_Opt_3").val())
        let room4=parseInt($("#hotelRoom_Opt_4").val())

        let room1Total=(selectedHotelObject.hotelRoomOpt.hotelRoom_Opt_1 * room1);
        let room2Total=(selectedHotelObject.hotelRoomOpt.hotelRoom_Opt_2 * room2)
        let room3Total=(selectedHotelObject.hotelRoomOpt.hotelRoom_Opt_3 * room3)
        let room4Total=(selectedHotelObject.hotelRoomOpt.hotelRoom_Opt_4 * room4)

        $("#hotel_Id").val(selectedHotelObject.hotelId);

        $("#opt1").val(room1Total);
        $("#opt2").val(room2Total);
        $("#opt3").val(room3Total);
        $("#opt4").val(room4Total);

        let total=room1Total+room2Total+room3Total+room4Total;
        let finalHotelTotal= total * daysCount;

        $("#hotelTotal").val(finalHotelTotal);

    }

    /////////////////////////// Package ///////////////////////////
    printC(){
        console.log(packageCategory+" "+vehicleCategory+" "+hotelCategory)
    }

    setPackageCategory(tPackage,vehicle,hotel){
        packageCategory=tPackage;
        vehicleCategory=vehicle;
        hotelCategory=hotel;
    }

    resetCard(){
        $(".check").css("display","none");
    }

    /////////////////////////////////////////  Hotel //////////////////////////////////////////

    handleHotelSelectBtnClickEvent(){

        $('#hotelList').on('click', 'li > .option-btn', (event) => {

            let hotelId=$(event.target).closest('li').find('strong+label').eq(0).text()

            $('#hotelList > li > .option-btn').css("background","black");
            $(event.target).closest('li').find('.option-btn').eq(0).css("background"," #1abe01");

            selectedHotelId=hotelId;

            let hotel=this.getHotelObject(hotelId);
            selectedHotelObject=hotel;
            this.setRoomValues(hotel);
        });
    }

    setRoomValues(hotel){
        $("#roomOpt_1").text(hotel.hotelRoomOpt.hotelRoom_Opt_1)
        $("#roomOpt_2").text(hotel.hotelRoomOpt.hotelRoom_Opt_2)
        $("#roomOpt_3").text(hotel.hotelRoomOpt.hotelRoom_Opt_3)
        $("#roomOpt_4").text(hotel.hotelRoomOpt.hotelRoom_Opt_4)
    }

    getHotelObject(hotelId){
        let hotel=null;
        hotelArray.map(value => {
            console.log(value.hotelId)
            if (value.hotelId===hotelId){
                hotel=value;
            }
        })

        return hotel;
    }

    loadDataToHotelTable(){
        $('#hotelList > li').remove();

        hotelArray.map(value => {

            if(hotelCategory===value.hotelCategory){

                let clz= value.hotelPetAllow==="Yes" ?  "allow": "not-allow";

                let card="<li class=\"hotel-card\">\n" +
                    "                                    <img src=\"../assets/image/image_2.jpg\">\n" +
                    "                                    <strong>"+value.hotelName+"</strong>\n" +
                    "                                    <label>"+value.hotelId+"</label>\n" +
                    "                                    <span class=\"star\">\n" +
                    "                                    </span>\n" +
                    "                                    <div>\n" +
                    "                                        <i class=\"fa-solid fa-shield-dog\"></i>\n" +
                    "                                        <label>"+value.hotelLocation+"</label>\n" +
                    "                                    </div>\n" +
                    "                                    <div class=\"option-btn\">\n" +
                    "                                        <div>SELECT</div>\n" +
                    "                                    </div>\n" +
                    "                                </li>";

                $('#hotelList').append(card);

                let star=(value.hotelCategory==="5 Star") ? 5 :
                    (value.hotelCategory==="4 Star") ? 4 :
                        (value.hotelCategory==="3 Star") ? 3 : 2;

                for (let i=0;i<star;i++){
                    $("#hotelList > li:last-child > span").append("<i class=\"fa-solid fa-star \"></i>");
                }

                $("#hotelList > li:last-child > img").attr('src',`data:image/jpg;base64,${value.hotelImage}`);

                $("#hotelList > li:last-child > span+div > i").addClass(clz);


            }

        })
    }

    //////////////////////// Guide /////////////////////////////////////////

    loadDataToGuideTable(){

        console.log("gggggggg")

        $('#guideList > li').remove();

        guideArray.map(value => {

            if(value.guideStatus==="Eligible"){

            }

            let card="<li class=\"guide-card\">\n" +
                "                                <img >\n" +
                "                                <strong>"+value.guideId+"</strong>\n" +
                "                                <label>"+value.guideName+"</label>\n" +
                "                                <span ></span>\n" +
                "                                <div class=\"data\">\n" +
                "                                    <label>Man Day Fee</label>\n" +
                "                                    <label>"+value.guideManDay_value+"</label>\n" +
                "                                </div>\n" +
                "                                <div class=\"data\">\n" +
                "                                    <label>"+value.guideEmail+"</label>\n" +
                "                                </div>\n" +
                "                                <div class=\"data\">\n" +
                "                                    <label>phone no</label>\n" +
                "                                    <label>"+value.guideContact+"</label>\n" +
                "                                </div>\n" +
                "                                <div class=\"option-btn\">\n" +
                "                                    <div>SELECT</div>\n" +
                "                                </div>\n" +
                "                            </li>";

            $('#guideList').append(card);

            $("#guideList > li:last-child > img").attr('src',`data:image/jpg;base64,${value.guideImage}`);
        })
    }


    handleGuideSelectBtnClickEvent(){

        $('#guideList').on('click', 'li > .option-btn', (event) => {

            let guideId=$(event.target).closest('li').find('strong').eq(0).text()

            $('#guideList > li > .option-btn').css("background","black");
            $(event.target).closest('li').find('.option-btn').eq(0).css("background"," #1abe01");

            selectedGuideId=guideId;

            let guide=this.getGuideObject(guideId);
            selectedGuideObject=guide;

            console.log(guide)
            console.log(guideId)
        });
    }

    getGuideObject(guideId){
        let guide=null;
        guideArray.map(value => {
            // console.log(value.guideId)
            if (value.guideId===guideId){
                guide=value;
            }
        })

        return guide;
    }



    //////////////////////// Vehicle ///////////////////////////////////////

    loadDataToVehicleTable(){
        $('#vehicleList > li').remove();

        console.log("lllllll")

        vehicleArray.map(value => {

            // vehicleCategory===value.vehicleCategory && value.vehicleStatus==="Eligible"

            if(vehicleCategory===value.vehicleCategory && value.vehicleStatus==="Eligible" ){

                let status= value.vehicleHybridOrNot==="Yes" ? "Hybrid" : "NotHybrid";

                let card="<li class=\"vehicle-card\">\n" +
                    "                                <img >\n" +
                    "                                <strong>"+value.vehicleId+"</strong>\n" +
                    "                                <label>"+value.vehicleBrand+"</label>\n" +
                    "                                <span>"+value.vehicleCategory+"</span>\n" +
                    "                                <div class=\"data\">\n" +
                    "                                    <label>Fee for 1km</label>\n" +
                    "                                    <label>"+value.vehicleFee_for_1km+"</label>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"data\">\n" +
                    "                                    <label>Fee for Day</label>\n" +
                    "                                    <label>"+value.vehicleFee_for_Day+"</label>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"data\">\n" +
                    "                                    <label class=\"feul\">"+value.vehicleFuelType+"</label>\n" +
                    "                                    <label>"+value.vehicleFuelUsage+"Km"+"</label>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"data\">\n" +
                    "                                    <label class=\"auto\">"+value.vehicleTransmissionType+"</label>\n" +
                    "                                    <label class=\"hybrid\">"+status+"</label>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"data\">\n" +
                    "                                    <label>Seat Capacity</label>\n" +
                    "                                    <label>"+value.vehicleSeatCapacity+"</label>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"option-btn\">\n" +
                    "                                    <div>SELECT</div>\n" +
                    "                                </div>\n" +
                    "                            </li>"

                $('#vehicleList').append(card);


                $("#vehicleList > li:last-child > img").attr('src',`data:image/jpg;base64,${value.frontImage}`);

                if(value.vehicleCategory==="S-Luxury"){
                    $("#vehicleList > li:last-child > span").addClass("super-luxury")
                }else if (value.vehicleCategory==="Luxury"){
                    $("#vehicleList > li:last-child > span").addClass("luxury")
                }else if(value.vehicleCategory==="Economy"){
                    $("#vehicleList > li:last-child > span").addClass("economy")
                }else {
                    $("#vehicleList > li:last-child > span").addClass("mid-range")
                }

            }


        })
    }

    handleVehicleSelectBtnClickEvent(){

        $('#vehicleList').on('click', 'li > .option-btn', (event) => {

            let vehicleId=$(event.target).closest('li').find('strong').eq(0).text()

            $('#vehicleList > li > .option-btn').css("background","black");
            $(event.target).closest('li').find('.option-btn').eq(0).css("background"," #1abe01");

            selectedVehicleId=vehicleId;

            let vehicle=this.getVehicleObject(vehicleId);
            selectedVehicleObject=vehicle;

            console.log(vehicleId)
            console.log(vehicle)
        });
    }

    getVehicleObject(vehicleId){
        let vehicle=null;
        vehicleArray.map(value => {
            // console.log(value.vehicleId)
            if (value.vehicleId===vehicleId){
                vehicle=value;
            }
        })

        return vehicle;
    }

    changeOptBtnsVisibility(value){
        $('#opt_2').css('visibility',value);
        $('#opt_3').css('visibility',value);
    }

    decideURLPattern(){
        let urlPath=
            (isFuel && isTransmission) ? this.creatURL() :
                isPetrol ? "sort/filter/"+direction+"/fuel/Petrol" :
                    isDiesel ? "sort/filter/"+direction+"/fuel/Diesel" :
                        isAuto ? "sort/filter/"+direction+"/Transmission/Auto" :
                            isManual ? "sort/filter/"+direction+"/Transmission/Manual" :
                                "find/all/"+direction;
        console.log(urlPath);
        this.getFilteredDataFromDb(urlPath);
    }

    creatURL(){
        let path=
            (isAuto && isPetrol) ? "sort/filter/searchType/"+direction+"/P-A" :
                (isAuto && isDiesel) ? "sort/filter/searchType/"+direction+"/D-A" :
                    (isManual && isPetrol) ? "sort/filter/searchType/"+direction+"/P-M" :
                        (isManual && isDiesel) ? "sort/filter/searchType/"+direction+"/D-M" :
                            "find/all/"+direction;
        return path;
    }

    ////////////////////////////// AjAX /////////////////////////////////

    getFilteredDataFromDb(path){
        $.ajax({
            url:"http://localhost:9191/api/v1/vehicle/"+path+"/0",
            method:"GET",
            processData: false,
            contentType:false,
            // data:formData,
            success:(resp) => {
                if (resp.code===200){
                    console.log(resp.message);
                    // alert("user get");
                    if(resp.data.length>0){
                        vehicleArray=resp.data;
                        this.loadDataToVehicleTable(resp.data);
                    }else {
                        $("#vehicleTable > tbody >tr >td").remove();
                    }

                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }


    getAllDataFromDb(path){
        $.ajax({
            url:"http://localhost:9191/api/v1/"+path+"/find/all",
            method:"GET",
            processData: false,
            contentType:false,
            success:(resp) => {
                if (resp.code===200){
                    console.log(resp.message);

                    if(resp.data.length>0){

                        if(path==="hotel"){
                            console.log(resp.data)
                            hotelArray=resp.data;
                            this.loadDataToHotelTable();

                        }else if (path==="guide"){
                            guideArray=resp.data
                            this.loadDataToGuideTable()

                        }


                    }

                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }

    getAllVehicleFromDb(){
        $.ajax({
            url:"http://localhost:9191/api/v1/vehicle/find/all",
            // url:"http://localhost:9191/api/v1/vehicle/find/all/"+direction,
            method:"GET",
            processData: false,
            contentType:false,
            // data:formData,
            success:(resp) => {
                if (resp.code===200){
                    console.log(resp.message);
                    // alert("user get");
                    if(resp.data.length>0){

                        vehicleArray=resp.data;
                        this.loadDataToVehicleTable();

                    }
                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }

    getNextTravelPackageId(){
        $.ajax({
            url:"http://localhost:8080/api/v1/travelPackage/get/id",
            method:"GET",
            processData: false,
            contentType:false,
            // data:formData,
            success:(resp) => {
                if (resp.code===200){
                    console.log(resp.message);
                    // alert("user get");
                    if(resp.data===null){
                        // console.log("not found");

                    }else {
                        console.log(resp.data)
                        // packageId=resp.data;

                        this.placeBtnAction(resp.data);

                    }
                }
            },
            error:(ob)=>{
                console.log(ob);
                alert(ob.responseJSON.message);
            }
        })
    }

    ////////////////////////////////////////////////////////////////
}
new TravelPackage();