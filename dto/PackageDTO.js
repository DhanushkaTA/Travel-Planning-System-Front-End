export class PackageDTO{

    constructor(travelPackage_Id,travelPackage_Category,travelPackage_Areas,
                guide_id,vehicle_id,hotel_id,customer_id,travelPackage_Value,travelPackage_PaidValue,
                travelPackage_NeedGuide,travelPackage_WithPet,travelPackage_HeadCount,travelPackage_No_Child,
                travelPackage_No_Adult,roomCount,travelPackage_StartDate,travelPackage_EndDate,travelPackage_PacedDate) {

        this.travelPackage_Id=travelPackage_Id;
        this.travelPackage_Category=travelPackage_Category;
        this.travelPackage_Areas=travelPackage_Areas;
        this.guide_id=guide_id;
        this.vehicle_id=vehicle_id;
        this.hotel_id=hotel_id;
        this.customer_id=customer_id;
        this.travelPackage_Value=travelPackage_Value;
        this.travelPackage_PaidValue=travelPackage_PaidValue;
        this.travelPackage_NeedGuide= travelPackage_NeedGuide;
        this.travelPackage_WithPet=travelPackage_WithPet;
        this.travelPackage_HeadCount=travelPackage_HeadCount;
        this.travelPackage_No_Child=travelPackage_No_Child;
        this.travelPackage_No_Adult=travelPackage_No_Adult;
        this.roomCount=roomCount;
        this.travelPackage_StartDate=travelPackage_StartDate;
        this.travelPackage_EndDate=travelPackage_EndDate;
        this.travelPackage_PacedDate=travelPackage_PacedDate;

    }

}