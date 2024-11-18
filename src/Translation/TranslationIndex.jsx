/*

Description: 
Here is the three language constants i.e. English, Hindi, Marathi
And inside these constants, there is the objects according to the screens

##################################################################################
# ⚠️ NOTE :                                                                     #
#                                                                               #
#     🔴 Dictionary word starts from capital letter is the exact word with      #
#     removed space and adding 'Text' word in last                              #
#     👉 Eg.: Over Speed => OverSpeedText                                       #
#                                                                               #
#     🔴 Dictionary word starts from small letter is new created key name.      #
#     👉 Eg.: projectName, logoutHeading, logoutSubHeading, etc.                #
#                                                                               #
#    ⚡Kindly follow these methods to create dictionary word⚡                  #
#                                                                                #
##################################################################################

*/

export const englishDictionary = {

    // 📗 Basic Words Dictionary
    basicWord: {
        projectName: "Vahan Shakti",
        YesText: "Yes",
        NoText: "No",
        BackText: "Back",
        SearchText: "Search",
        FromDateText:"From Date",
        UptoDateText:"Upto Date",
        ActionText: "Action"
    },

    // 📗 Dashboard Dictionary
    mainDashboard: {
        EmergencyAlertOnText: "Emergency Alert On",
        SOSTamperText: "SOS Tamper",
        LowBatteryText: "Low Battery",
        HarshCornerText: "Harsh Corner",
        MoreInfoText: "More Info",
        QuickTagsText: "Quick Tags",
        OverSpeedingAlertText: 'Over Speeding Alert',
        DeviceTamperedText: "Device Tampered",
        OTAUpdateAlertText: "OTA Update Alert",
        GeofenceExitAlertText: "Geofence Exit Alert",
        GeofenceEntryAlertText: "Geofence Entry Alert",
        IgnitionOnText: "Ignition On",
        IgnitionOffText: "Ignition Off",
        HarshBreakingText: "Harsh Breaking",
        RashTurningText: "Rash Turning",
        HarshAccelerationText: "Harsh Acceleration",
        EmergencyStateOnText: "Emergency State On",
        EmergencyStateOffText: "Emergency State Off",
        DisconnectMainBatteryText: "Disconnect Main Battery",
        ConnecttoMainBatteryText: "Connect to Main Battery",
        SOSWireTemperText: "SOS Wire Temper",
        DeviceNotSendingText:"Device is Not Sending Data",
        
    },

    // 📗 Navigation Dictionary
    navigation: {
        DashboardText: "Dashboard",
        DeviceInventoryText: "Device Inventory",
        AssignToRFCText: "Assign To RFC",
        ApprovedDeviceText: "Approved Device",
        UserManagementText: "User Management",
        VLTDActivationText: "VLTD Activation",
        ActivatedVLTDListText: "Activated VLTD List",
        DevicesText: "Devices",
        DeviceText: "Device",
        DistributorsText: "Distributors",
        MNFProfileText: "MNF Profie",
        RTOsText: "RTOs",
        PoliceText: "Police",
        ManufacturersText: "Manufacturers",
        DeviceTypesText: "Device Types",
        ConfigurationText: "Configuration",
        GeofenceText: "Geofence",
        TrailsText: "Trails",
        AlarmsText: "Alarms",
        MastersText: "Masters",
        ReportsText: "Reports",
        InventoryApprovalText: "Inventory Approval",
        DeviceTestingText: "Device Testing",
        DeviceConfigurationText: "Device Configuration",
        LogoutText: "Logout",
        logoutHeading: "Are you sure ?",
        logoutSubHeading: "You will be logged out.",
    },
    deviceList:{
        DeviceInventoryListText:"Device Inventory List",
        ManufacturerNameText:"Manufacturer Name",
        DistributorNameText:"Distributor Name",
        DeviceSerialNoText:"Device Serial No",
        ImeiNoText:"IMEI Number",
        EsimProviderText:"ESIM Provider",
        IccidNumberText:"ICCID Number",
        ChassisNoText:"Chasis Number",
        EngineNumberText:"Engine Number",
        VehicleRegistrationDateText:"Vehicle Registration Date",
        ManufacturerVendorNamText:"Manufacturer Vendor Name",
        VltdModelCodeText:"VLTD Model Code",
        OwnerNameText:"Permit Holder Name",
        VehicleRegistrationNumberText:"Vehicle Registration Number",
        OwnerPhoneNumberText:"Permit Holder Number",
        OwnerAddresText:"Permit Holder Address",
        RtoText:"RTO Name",
        RtoCodeText:"RTO COde",
        VehicleCategoryText:"Vehicle Category",
        FuelTypeText:"Fuel Type",
        FeesStatusText:"Fee Status",
        FeesAmountText:" Amount",
        DeviceuploadedbyText:"Device Uploaded By",
        DeviceuploadedonText:"Device Uploaded On",
        AssignDateText:"Assign Date",
        AssignByText:"Assign By",
        CtStatusText:"CT Status",
        CtApprovebyText:"Ct Approved By",
        RfcIdText:"Rfc Id",
        ReciptNoText:"Receipt No",
        OwnemailText:"Owner Email",
        IntuchEntityIdText:"In Touch Id",
        SpeedText:"Speed",
        LastTimeText:"Last Time",
        ValidUptoText:"Valid Upto",
        LastLocationText:"Last Location",
        HealthCheckText:"Health Check",
        OtaText:"OTA",
        PrimaryMsisdnText:"Primary Msisdn",
        TacNoText:"TAC No",
        VltdActivationStatusText:"VLTD Activation Status",
        TimeStamp: "Time Stamp",
        AlertTypeText: "Alert Type",
        LatitudeText: "Latitude",
        LongitudeText: "Longitude",
    },
    list:{
        RtoListText:"RTO List",
        PoliceListText:"Police List",
        ManufactureListText:"Manufacturer LIST",
        EntityNameText:"Entity Name",
        EntityCodeText:"Entity Code",
        AddressText:"Address",
        DistrictText:"District",
        PincodeText:"Pin Code",
        DocumentText:"Document",
        ActionText:"Action",
        StateText:"State",
        LocationText:"Location",
        GSTText:"GST/PAN",
        FullNameText:"Full name",
        DesignationText:"Designation",
        UserNameText:"User Name",
        StatusText: "Status"

    }
}

export const hindiDictionary = {

    // 📗 Basic Words Dictionary
    basicWord: {
        projectName: "वाहन शक्ति",
        YesText: "हाँ",
        NoText: "नहीं",
        BackText: "पीछे",
        SearchText: "खोज",
        FromDateText:"तिथि से",
        UptoDateText:"तिथि तक",
        ActionText: "कार्रवाई"
    },

    // 📗 Dashboard Dictionary
    mainDashboard: {
        EmergencyAlertOnText: "आपातकालीन अलर्ट चालू",
        SOSTamperText: "एसओएस छेड़छाड़",
        LowBatteryText: "लो बैटरी",
        HarshCornerText: "कठोर कोना",
        MoreInfoText: "और जानकारी",
        QuickTagsText: "त्वरित टैग",
        OverSpeedingAlertText: 'ओवर स्पीडिंग अलर्ट',
        DeviceTamperedText: "डिवाइस से छेड़छाड़ की गई",
        OTAUpdateAlertText: "ओटीए अपडेट अलर्ट",
        GeofenceExitAlertText: "जियोफ़ेंस निकास चेतावनी",
        GeofenceEntryAlertText: "जियोफ़ेंस प्रवेश चेतावनी",
        IgnitionOnText: "ज्वलन चालू",
        IgnitionOffText: "इग्निशन बंद",
        HarshBreakingText: "कठोर ब्रेक लगाना",
        RashTurningText: "दाने का मुड़ना",
        HarshAccelerationText: "कठोर त्वरण",
        EmergencyStateOnText: "आपातकालीन स्थिति चालू",
        EmergencyStateOffText: "आपातकालीन स्थिति बंद",
        DisconnectMainBatteryText: "मुख्य बैटरी को डिस्कनेक्ट करें",
        ConnecttoMainBatteryText: "मुख्य बैटरी से कनेक्ट करें",
        SOSWireTemperText: "एसओएस वायर टेम्पर",
        DeviceNotSendingText:"डिवाइस डेटा नहीं भेज रहा है"
    },

    // 📗 Navigation Dictionary
    navigation: {
        DashboardText: "डैशबोर्ड",
        DeviceInventoryText: "डिवाइस इन्वेंटरी",
        AssignToRFCText: "आरएफसी को सौंपे",
        ApprovedDeviceText: "स्वीकृत डिवाइस",
        UserManagementText: "प्रयोक्ता प्रबंधन",
        VLTDActivationText: "वीएलटीडी सक्रियण",
        ActivatedVLTDListText: "सक्रिय वीएलटीडी सूची",
        DevicesText: "उपकरण",
        DeviceText: "उपकरण",
        DistributorsText: "वितरक",
        MNFProfileText: "एमएनएफ प्रोफ़ाइल",
        RTOsText: "आरटीओ",
        PoliceText: "पुलिस",
        ManufacturersText: "निर्माताओं",
        DeviceTypesText: "डिवाइस के प्रकार",
        ConfigurationText: "विन्यास",
        GeofenceText: "जियोफेंस",
        TrailsText: "पगडंडियाँ",
        AlarmsText: "एलार्म",
        MastersText: "मास्टर्स",
        ReportsText: "रिपोर्टों",
        InventoryApprovalText: "इन्वेंटरी अनुमोदन",
        DeviceTestingText: "डिवाइस परीक्षण",
        DeviceConfigurationText: "उपकरण का प्रारूप",
        LogoutText: "लॉग आउट",
        logoutHeading: "क्या आपको यकीन है ?",
        logoutSubHeading: "आपको लॉग आउट कर दिया जाएगा |",
    },
    deviceList:{
        DeviceInventoryListText:"डिवाइस इन्वेंटरी सूची",
        ManufacturerNameText:"निर्माता नाम",
        DistributorNameText:"वितरक का नाम",
        DeviceSerialNoText:"डिवाइस क्रमांक",
        ImeiNoText:"आईएमईआई नं",
        EsimProviderText:"ईसिम प्रदाता",
        IccidNumberText:"आईसीसीआईडी ​​नंबर",
        ChassisNoText:"चेसिस नंबर",
        EngineNumberText:"इंजन संख्या",
        VehicleRegistrationDateText:"वाहन पंजीकरण तिथि",
        ManufacturerVendorNamText:"निर्माता विक्रेता का नाम",
        VltdModelCodeText:"वीएलटीडी मॉडल कोड",
        OwnerNameText:"परमिट धारक का नाम",
        VehicleRegistrationNumberText:"वाहन पंजीकरण संख्या",
        OwnerPhoneNumberText:"परमिट धारक का फ़ोन नंबर",
        OwnerAddresText:"परमिट धारक का पता",
        RtoText:"आरटीओ",
        RtoCodeText:"आरटीओ कोड",
        VehicleCategoryText:"वाहन श्रेणी",
        FuelTypeText:"ईंधन प्रकार",
        FeesStatusText:"शुल्क स्थिति",
        FeesAmountText:"मात्रा",
        DeviceuploadedbyText:"डिवाइस द्वारा अपलोड किया गया",
        DeviceuploadedonText:"डिवाइस पर अपलोड किया गया",
        AssignDateText:"दिनांक निर्दिष्ट",
        AssignByText:"द्वारा असाइन",
        CtStatusText:"सीटी स्थिति",
        CtApprovebyText:"सीटी द्वारा अनुमोदित",
        RfcIdText:"आरएफसी आईडी",
        ReciptNoText:"रसीद संख्या",
        OwnemailText:"मालिक का ईमेल",
        IntuchEntityIdText:"इन टच आईडी",
        SpeedText:"गति",
        LastTimeText: "अंतिम समय",
        ValidUptoText:"तक वैध है",
        LastLocationText:"पिछला स्थान",
        HealthCheckText:"स्वास्थ्य जांच",
        OtaText:"ओटीए",
        PrimaryMsisdnText:"प्राइमरी एमएसआईएसडीएन",
        TacNoText:"टीएसी नं",
        VltdActivationStatusText:"वीएलटीडी सक्रियण स्थिति",
        TimeStamp: "समय मोहर",
        AlertTypeText: "चेतावनी विवरण",
        LatitudeText: "अक्षांश",
        LongitudeText: "देशान्तर",
        
    },
    list:{
        RtoListText:"आरटीओ सूची",
        PoliceListText:"पुलिस सूची",
        ManufactureListText:"निर्माता सूची",
        EntityNameText:"इकाई नाम",
        EntityCodeText:"इकाई कोड",
        AddressText:"पता",
        DistrictText:"ज़िला",
        PincodeText:"पिन कोड",
        DocumentText:"दस्तावेज़",
        ActionText:"कार्रवाई",
        StateText:"राज्य",
        LocationText:"जगह",
        GSTText:"जीएसटी/पैन",
        FullNameText:"पूरा नाम",
        DesignationText:"पद का नाम",
        UserNameText:"उपयोगकर्ता नाम",
        StatusText: "स्थिती"
    }

}

export const marathiDictionary = {

    // 📗 Basic Words Dictionary
    basicWord: {
        projectName: "वाहन शक्ति",
        YesText: "होय",
        NoText: "नाही",
        BackText: "मागे",
        SearchText: "शोधा",
        FromDateText:"या तारखेपासून",
        UptoDateText:"अद्ययावत",
        ActionText: "कृती"
    },

    // 📗 Dashboard Dictionary 
    mainDashboard: {
        EmergencyAlertOnText: "आणीबाणीची सूचना सुरू",
        SOSTamperText: "एसओएस छेडछाड",
        LowBatteryText: "बॅटरी कमी",
        HarshCornerText: "कठोर कोपरा",
        MoreInfoText: "अधिक माहिती",
        QuickTagsText: "द्रुत टॅग्ज",
        OverSpeedingAlertText: "ओव्हर स्पीडिंग अलर्ट",
        DeviceTamperedText: "डिव्हाइस छेडछाड",
        OTAUpdateAlertText: "ओटीए अद्यतन सूचना",
        GeofenceExitAlertText: "जिओफेन्स एक्झिट अलर्ट",
        GeofenceEntryAlertText: "जिओफेन्स एंट्री अलर्ट",
        IgnitionOnText: "इग्निशन चालू",
        IgnitionOffText: "प्रज्वलन बंद",
        HarshBreakingText: "कठोर ब्रेकिंग",
        RashTurningText: "रॅश टर्निंग",
        HarshAccelerationText: "कठोर प्रवेग",
        EmergencyStateOnText: "आणीबाणी स्थिती चालू",
        EmergencyStateOffText: "आणीबाणी स्थिती बंद",
        DisconnectMainBatteryText: "मुख्य बॅटरी डिस्कनेक्ट करा",
        ConnecttoMainBatteryText: "मुख्य बॅटरीशी कनेक्ट करा",
        SOSWireTemperText: "एसओएस वायर टेंपर",
        DeviceNotSendingText:"डिव्हाइस डेटा पाठवत नाही"
    },

    // 📗 Navigation Dictionary
    navigation: {
        DashboardText: "डॅशबोर्ड",
        DeviceInventoryText: "डिव्हाइस इन्व्हेंटरी",
        AssignToRFCText: "आरएफसी ला द्या",
        ApprovedDeviceText: "मंजूर केलेले डिव्हाइस",
        UserManagementText: "वापरकर्ता व्यवस्थापन",
        VLTDActivationText: "VLTD सक्रियकरण",
        ActivatedVLTDListText: "सक्रिय VLTD यादी",
        DevicesText: "उपकरणे",
        DeviceText: "डिव्हाइस",
        DistributorsText: "वितरक",
        MNFProfileText: "MNF प्रोफाइल",
        RTOsText: "आरटीओ",
        PoliceText: "पोलीस",
        ManufacturersText: "उत्पादक",
        DeviceTypesText: "डिव्हाइसचे प्रकार",
        ConfigurationText: "कॉन्फिगरेशन",
        GeofenceText: "जिओफेन्स",
        TrailsText: "खुणा",
        AlarmsText: "गजर",
        MastersText: "मास्टर्स",
        ReportsText: "अहवाल",
        InventoryApprovalText: "इन्व्हेंटरी मंजूरी",
        DeviceTestingText: "डिव्हाइस चाचणी",
        DeviceConfigurationText: "डिव्हाइस कॉन्फिगरेशन",
        LogoutText: "बाहेर पडणे",
        logoutHeading: "तुला खात्री आहे ?",
        logoutSubHeading: "तुम्हाला लॉग आउट केले जाईल |",
        YesText: "होय",
        NoText: "नाही"
    },
    deviceList:{
        DeviceInventoryListText:"डिव्हाइस इन्व्हेंटरी सूची",
        ManufacturerNameText:"निर्मात्याचे नाव",
        DistributorNameText:"वितरकाचे नाव",
        DeviceSerialNoText:"डिव्हाइस क्रमांक",
        ImeiNoText:"IMEI क्रमांक",
        EsimProviderText:"ESIM प्रदाता",
        IccidNumberText:"ICCID क्रमांक",
        ChassisNoText:"चेसिस क्रमांक",
        EngineNumberText:"इंजिन क्रमांक",
        VehicleRegistrationDateText:"वाहन नोंदणी तारीख",
        ManufacturerVendorNamText:"उत्पादक विक्रेत्याचे नाव",
        VltdModelCodeText:"VLTD मॉडेल कोड",
        OwnerNameText:"परमिट धारकाचे नाव",
        VehicleRegistrationNumberText:"वाहन नोंदणी क्रमांक",
        OwnerPhoneNumberText:"परमिट धारकाचे फोन नंबर",
        OwnerAddresText:"परमिट धारकाचे पत्ता",
        RtoText:"आरटीओ",
        RtoCodeText:"आरटीओ कोड",
        VehicleCategoryText:"वाहन श्रेणी",
        FuelTypeText:"ईंधन प्रकार",
        FeesStatusText:"फी स्थिती",
        FeesAmountText:"रक्कम",
        DeviceuploadedbyText:"डिव्हाइसद्वारे अपलोड केले",
        DeviceuploadedonText:"डिव्हाइसवर अपलोड केले",
        AssignDateText:"तारीख निर्दिष्ट",
        AssignByText:"द्वारे नियुक्त केले",
        CtStatusText:"शिट्टीची स्थिती",
        CtApprovebyText:"सीटी मंजूर",
        RfcIdText:"RFC आयडी",
        ReciptNoText:"पावती क्रमांक",
        OwnemailText:"मालकाचा ईमेल",
        IntuchEntityIdText:"टच आयडी",
        SpeedText:"गती",
        LastTimeText:"गेल्या वेळी",
        ValidUptoText:"पर्यंत वैध आहे",
        LastLocationText:"शेवटचे स्थान",
        HealthCheckText:"आरोग्य तपासणी",
        OtaText:"ओटीए",
        PrimaryMsisdnText:"प्राथमिक MSISDN",
        TacNoText:"TAC क्रमांक",
        VltdActivationStatusText:"VLTD सक्रियकरण स्थिती",
        TimeStamp: "समय मोहर",
        AlertTypeText: "अलर्टचे वर्णन",
        LatitudeText: "अक्षांश",
        LongitudeText: "रेखांश",
        
    },
    list:{
        RtoListText:"आरटीओ यादी",
        PoliceListText:"पोलिसांची यादी",
        ManufactureListText:"निर्माता यादी",
        EntityNameText:"घटकाचे नाव",
        EntityCodeText:"घटकाचे कोड",
        AddressText:"पत्ता",
        DistrictText:"जिल्हा",
        PincodeText:"पिन कोड",
        DocumentText:"दस्तऐवज",
        ActionText:"क्रिया",
        StateText:"राज्य",
        LocationText:"ठिकाण",
        GSTText:"GST/PAN",
        FullNameText:"पूर्ण नाव",
        DesignationText:"पद",
        UserNameText:"वापरकर्ता नाव",
        StatusText: "स्थिती"
    }

}

// Export in TranslationProvider.jsx