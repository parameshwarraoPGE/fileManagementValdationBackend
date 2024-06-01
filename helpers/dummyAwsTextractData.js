const dummyAWSData = [
    {
        pageNumber: 1,
        dataExtracted: [
            {
                feildName: "Account Number",
                feildKey: "accountNumber",
                inputType: "inputBox",
                feildValue: "5166324978536",
                inputOptions: []
            },
            {
                feildName: "Customer Id",
                feildKey: "customerId",
                inputType: "inputBox",
                feildValue: "236599743126",
                inputOptions: []
            },
            {
                feildName: "Premium Membership Program",
                feildKey: "premiumMembershipProgram",
                inputType: "checkbox",
                feildValue: "yes",
                inputOptions: [
                    {
                        feildName: "Yes, I am premium member!",
                        feildValue: "yes"
                    }, {
                        feildName: "No, I am not premium member!",
                        feildValue: "no"
                    }]
            },
            {
                feildName: "Location",
                feildKey: "location",
                inputType: "inputBox",
                feildValue: "chennai",
                inputOptions: []
            },
            {
                feildName: "Existing Connections",
                feildKey: "existingConnections",
                inputType: "checkboxMultiple",
                feildValue: "gasConnect",
                inputOptions: [
                    {
                        feildName: "Gas Bundle(Landfill gas, CNG gas, BioCNG)",
                        feildValue: "gasConnect"
                    },
                    {
                        feildName: "Electricity Bundle(Domestic or Industrial)",
                        feildValue: "electricityConnect"
                    },
                    {
                        feildName: "Bio Diesel for farms",
                        feildValue: "bioDiesel"
                    },
                    {
                        feildName: "Private Gasoline Reseller",
                        feildValue: "gasoline"
                    }
                ]
            }
        ]
    },
    {
        pageNumber: 2,
        dataExtracted: [
            {
                feildName: "is facta Compliant",
                feildKey: "factaCompliant",
                inputType: "checkbox",
                feildValue: "yes",
                inputOptions: [
                    {
                        feildName: "Yes, My facta is submitted to IRS and Validated!",
                        feildValue: "yes"
                    }, {
                        feildName: "No, I have not submitted my facta to IRS!",
                        feildValue: "no"
                    }
                ]
            },
            {
                feildName: "Citizenship Status",
                feildKey: "citizenStatus",
                inputType: "checkbox",
                feildValue: "resident",
                inputOptions: [
                    {
                        feildName: "Resident",
                        feildValue: "resident"
                    }, 
                    {
                        feildName: "Green Card Holder",
                        feildValue: "greencard"
                    },
                    {
                        feildName: "H1B",
                        feildValue: "h1b"
                    },
                    {
                        feildName: "L1B",
                        feildValue: "l1b"
                    },
                    {
                        feildName: "Holding parole card as file case is pending with USCIS",
                        feildValue: "paroleCard"
                    },
                    {
                        feildName: "others",
                        feildValue: "others"
                    }
                ]
            },
            {
                feildName: "have you previous subscribed for medical baseline program or currently in one?",
                feildKey: "medicalBaseLineProgramStatus",
                inputType: "checkbox",
                feildValue: "notSubscribedNordoneinPast",
                inputOptions: [
                    {
                        feildName: "Yes, I have an active medical baseline program!",
                        feildValue: "activeMedicalBaseline"
                    }, {
                        feildName: "No, I don't have an active medical baseline program nor have previously subscribed for!",
                        feildValue: "notSubscribedNordoneinPast"
                    },
                    {
                        feildName: "No, I don't have an active medical baseline program but have previously subscribed in past",
                        feildValue: "notCurrentlySubscribed"
                    }
                ]
            },
            {
                feildName: "Phone Number",
                feildKey: "phone",
                inputType: "inputBox",
                feildValue: "+1 480-561-9636",
                inputOptions: []
            },
            {
                feildName: "Place Of Sign",
                feildKey: "placeOfSign",
                inputType: "inputBox",
                feildValue: "park Rd ,San Jose",                
            }
        ]
    }
];

module.exports = {
    dummyAWSData
};