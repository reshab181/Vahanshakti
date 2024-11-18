export const ResponsibilityMap  = {
    
  add_device: {
        code: "add_device",
        mandatoryRequired: ["esim_provider_detail", "view_list_of_devices", "device_detail"],
        userTypes : {
                        MNF:{tag:"deviceInventory", label:"Device Management"}
                    }
      },

      
    map_device_to_vehicle: {
        code: "map_device_to_vehicle",
        mandatoryRequired: ["view_list_of_devices", "device_detail", "update_device_detail"],
        userTypes : {
                        RFC:{tag:"deviceInventory", label:"Device Management"}
                    }
      },
    
    view_list_of_devices: {
        code: "view_list_of_devices",
        mandatoryRequired: [],
        userTypes : {
                        SUA:{tag:"deviceInventory", label:"Device Management"}, 
                        SBU:{tag:"deviceInventory", label:"Device Management"}, 
                        RTO:{tag:"deviceInventory", label:"Device Management"}, 
                        POLICE:{tag:"deviceInventory", label:"Device Management"}, 
                        MNF:{tag:"deviceInventory", label:"Device Management"}, 
                        DST:{tag:"deviceInventory", label:"Device Management"},
                        RFC:{tag:"deviceInventory", label:"Device Management"}
                    }
      },

      device_detail: {
        code: "device_detail",
        mandatoryRequired: ["view_list_of_devices"],
        userTypes : {
                        SUA:{tag:"deviceInventory", label:"Device Management"}, 
                        SBU:{tag:"deviceInventory", label:"Device Management"}, 
                        RTO:{tag:"deviceInventory", label:"Device Management"}, 
                        POLICE:{tag:"deviceInventory", label:"Device Management"}, 
                        MNF:{tag:"deviceInventory", label:"Device Management"}, 
                        DST:{tag:"deviceInventory", label:"Device Management"},
                        RFC:{tag:"deviceInventory", label:"Device Management"}
                    }
      },


      update_device_detail: {
        code: "update_device_detail",
        mandatoryRequired: ["view_list_of_devices", "device_detail"],
        userTypes : {
                        SUA:{tag:"deviceInventory", label:"Device Management"},
                        SBU:{tag:"deviceInventory", label:"Device Management"}, 
                        MNF:{tag:"deviceInventory", label:"Device Management"}, 
                        DST:{tag:"deviceInventory", label:"Device Management"},
                        RFC:{tag:"deviceInventory", label:"Device Management"}
                    }
      },


      add_rto: {
        code: "add_rto",
        mandatoryRequired: ["rto_user_management"],
        userTypes : {
                        SBU:{tag:"rtos", label:"RTO Management"},
                        SUA:{tag:"rtos", label:"RTO Management"}
                    }
      },


      update_rto: {
        code: "update_rto",
        mandatoryRequired: ["rto_details"],
        userTypes : {
                        SBU:{tag:"rtos", label:"RTO Management"},
                        SUA:{tag:"rtos", label:"RTO Management"}
                    }
      },


      rto_user_management: {
        code: "rto_user_management",
        mandatoryRequired: [],
        userTypes : {
                        SBU:{tag:"rtos", label:"RTO Management"},
                        SUA:{tag:"rtos", label:"RTO Management"}, 
                        RTO:{tag:"userManagement", label:"User Management"}
                    }
      },


      rto_details: {
        code: "rto_details",
        mandatoryRequired: [],
        userTypes : {
                        SUA:{tag:"rtos", label:"RTO Management"}, 
                        SBU:{tag:"rtos", label:"RTO Management"}, 
                        RTO:{tag:"rtos", label:"RTO Management"}, 
                        POLICE:{tag:"rtos", label:"RTO Management"}, 
                        MNF:{tag:"rtos", label:"RTO Management"}, 
                        DST:{tag:"rtos", label:"RTO Management"},
                        RFC:{tag:"rtos", label:"RTO Management"}
                    }
      },


      add_esim_provider: {
        code: "add_esim_provider",
        mandatoryRequired: ["esim_provider_detail"],
        userTypes : {
                        SBU:{tag:"masters", label:"ESIM Provider Management"},
                        SUA:{tag:"masters", label:"ESIM Provider Management"}
                    }
      },


      update_esim_provider: {
        code: "update_esim_provider",
        mandatoryRequired: ["esim_provider_detail"],
        userTypes : {
                        SBU:{tag:"masters", label:"ESIM Provider Management"},
                        SUA:{tag:"masters", label:"ESIM Provider Management"}
                    }
      },


      esim_provider_detail: {
        code: "esim_provider_detail",
        mandatoryRequired: [],
        userTypes : {
                        SUA:{tag:"masters", label:"ESIM Provider Detail"}, 
                        SBU:{tag:"masters", label:"ESIM Provider Detail"}, 
                        RTO:{tag:"masters", label:"ESIM Provider Detail"}, 
                        POLICE:{tag:"masters", label:"ESIM Provider Detail"}, 
                        MNF:{tag:"masters", label:"ESIM Provider Detail"}, 
                        DST:{tag:"masters", label:"ESIM Provider Detail"}, 
                        RFC:{tag:"masters", label:"ESIM Provider Detail"}, 
                        AUTH:{tag:"masters", label:"ESIM Provider Detail"}
                    }
      },


      add_manufacturer: {
        code: "add_manufacturer",
        mandatoryRequired: ["manufacturer_details", "manufacturer_user_management"],
        userTypes : {
                        SBU:{tag:"manufacturers", label:"Manufacturer Management"},
                        SUA:{tag:"manufacturers", label:"Manufacturer Management"}
                    }
      },


      update_manufacturer: {
        code: "update_manufacturer",
        mandatoryRequired: ["manufacturer_details"],
        userTypes : {
                        SBU:{tag:"manufacturers", label:"Manufacturer Management"},
                        SUA:{tag:"manufacturers", label:"Manufacturer Management"}
                    }
      },


      manufacturer_user_management: {
        code: "manufacturer_user_management",
        mandatoryRequired: ["manufacturer_details"],
        userTypes : {
                        SBU:{tag:"manufacturers", label:"Manufacturer Management"}, 
                        SUA:{tag:"manufacturers", label:"Manufacturer Management"},
                        MNF:{tag:"userManagement", label:"User Management"}
                    }
      },


      manufacturer_details: {
        code: "manufacturer_details",
        mandatoryRequired: [],
        userTypes : {
                        SUA:{tag:"manufacturers", label:"Manufacturer Management"}, 
                        SBU:{tag:"manufacturers", label:"Manufacturer Management"}, 
                        RTO:{tag:"manufacturers", label:"Manufacturer Management"}, 
                        POLICE:{tag:"manufacturers", label:"Manufacturer Management"}, 
                        MNF:{tag:"manufacturers", label:"Manufacturer Management"}, 
                        DST:{tag:"manufacturers", label:"Manufacturer Management"}, 
                        RFC:{tag:"manufacturers", label:"Manufacturer Management"}, 
                        AUTH:{tag:"manufacturers", label:"Manufacturer Management"}
                    }
      },


      add_distributor: {
        code: "add_distributor",
        mandatoryRequired: ["distributor_user_management", "distributor_details"],
        userTypes : {
                        SUA:{tag:"distributors", label:"Distributor Management"},
                        SBU:{tag:"distributors", label:"Distributor Management"}
                    }
      },


      update_distributor: {        
        code: "update_distributor",
        mandatoryRequired: ["distributor_details"],
        userTypes : {
                        SUA:{tag:"distributors", label:"Distributor Management"},
                        SBU:{tag:"distributors", label:"Distributor Management"}
                    }
      },


      distributor_user_management: {
        code: "distributor_user_management",
        mandatoryRequired: ["distributor_details"],
        userTypes : {
                        DST:{tag:"userManagement", label:"User Management"}
                    }
      },

      

      distributor_details: {
        code: "distributor_details",
        mandatoryRequired: ["distributor_details"],
        userTypes : {
                        SUA:{tag:"distributors", label:"Distributor Management"}, 
                        SBU:{tag:"distributors", label:"Distributor Management"}, 
                        RTO:{tag:"distributors", label:"Distributor Management"}, 
                        POLICE:{tag:"distributors", label:"Distributor Management"}, 
                        MNF:{tag:"distributors", label:"Distributor Management"}, 
                        DST:{tag:"distributors", label:"Distributor Management"}, 
                        RFC:{tag:"distributors", label:"Distributor Management"}, 
                        AUTH:{tag:"distributors", label:"Distributor Management"}
                    }
      },


      rfc_user_management: {
        code: "rfc_user_management",
        mandatoryRequired: ["rfc_details"],
        userTypes : {
                        RFC:{tag:"userManagement", label:"User Management"}
                    }
      },


      rfc_details: {
        code: "rfc_details",
        mandatoryRequired: ["rfc_details"],
        userTypes : {
                        SUA:{tag:"rfcs", label:"RFC Management"}, 
                        SBU:{tag:"rfcs", label:"RFC Management"}, 
                        RTO:{tag:"rfcs", label:"RFC Management"}, 
                        POLICE:{tag:"rfcs", label:"RFC Management"}, 
                        MNF:{tag:"rfcs", label:"RFC Management"}, 
                        DST:{tag:"rfcs", label:"RFC Management"}, 
                        RFC:{tag:"rfcs", label:"RFC Management"}, 
                        AUTH:{tag:"rfcs", label:"RFC Management"}
                    }
      },

      add_rfc: {
        code: "add_rfc",
        mandatoryRequired: ["rfc_user_management", "rfc_details"],
        userTypes : {
                        SUA:{tag:"rfcs", label:"RFC Management"},
                        SBU:{tag:"rfcs", label:"RFC Management"}
                    }
      },


      update_rfc: {        
        code: "update_rfc",
        mandatoryRequired: ["rfc_details"],
        userTypes : {
                        SUA:{tag:"rfcs", label:"RFC Management"},
                        SBU:{tag:"rfcs", label:"RFC Management"}
                    }
      },




      add_device_type: {
        code: "add_device_type",
        mandatoryRequired: [],
        userTypes : {
                      MNF:{tag:"deviceApproval", label:"Device Onboarding"}
                    }
      },


      update_device_type: {
        code: "update_device_type",
        mandatoryRequired: [],
        userTypes : {
                        SBU:{tag:"deviceApproval", label:"Device Onboarding"},
                        SUA:{tag:"deviceApproval", label:"Device Onboarding"}, 
                        MNF:{tag:"deviceApproval", label:"Device Onboarding"}, 
                        AUTH:{tag:"deviceApproval", label:"Device Onboarding"}
                    }
      },


      device_approval: {
        code: "device_approval",
        mandatoryRequired: [],
        userTypes : {
                        SBU:{tag:"deviceApproval", label:"Device Onboarding"}, 
                        SUA:{tag:"deviceApproval", label:"Device Onboarding"}, 
                        AUTH:{tag:"deviceApproval", label:"Device Onboarding"}
                    }
      },


      approved_device_details: {
        code: "approved_device_details",
        mandatoryRequired: [],
        userTypes : {
                        SUA:{tag:"deviceApproval", label:"Device Onboarding"}, 
                        SBU:{tag:"deviceApproval", label:"Device Onboarding"}, 
                        RTO:{tag:"deviceApproval", label:"Device Onboarding"}, 
                        POLICE:{tag:"deviceApproval", label:"Device Onboarding"}, 
                        MNF:{tag:"deviceApproval", label:"Device Onboarding"}, 
                        DST:{tag:"deviceApproval", label:"Device Onboarding"}, 
                        RFC:{tag:"deviceApproval", label:"Device Onboarding"}, 
                        AUTH:{tag:"deviceApproval", label:"Device Onboarding"}
                    }
      },


      police_user_management: {
        code: "police_user_management",
        mandatoryRequired: [],
        userTypes : {
                        SBU:{tag:"Police", label:"Police Accounts Management"}, 
                        SUA:{tag:"Police", label:"Police Accounts Management"}, 
                        POLICE:{tag:"userManagement", label:"User Management"}
                    }
      },


      police_account_details: {
        code: "police_account_details",
        mandatoryRequired: [],
        userTypes : {
                        SUA:{tag:"Police", label:"Police Accounts Management"}, 
                        SBU:{tag:"Police", label:"Police Accounts Management"}, 
                        POLICE:{tag:"Police", label:"Police Accounts Management"}
                      }
      },
      
      
      geofence: {
        code: "geofence",
        mandatoryRequired: [],
        userTypes : {
                        SUA:{tag:"configuration", label:"Alert Configuration"}, 
                        SBU:{tag:"configuration", label:"Alert Configuration"}, 
                        POLICE:{tag:"configuration", label:"Alert Configuration"}, 
                        RTO:{tag:"configuration", label:"Alert Configuration"}
                      }
      },
      
      
      alarms: {
        code: "alarms",
        mandatoryRequired: [],
        userTypes : {
                        SUA:{tag:"configuration", label:"Alert Configuration"}, 
                        SBU:{tag:"configuration", label:"Alert Configuration"}, 
                        POLICE:{tag:"configuration", label:"Alert Configuration"}, 
                        RTO:{tag:"configuration", label:"Alert Configuration"}
                    }
      },
      
      
      trails: {
        code: "trails",
        mandatoryRequired: [],
        userTypes : {
                        SUA:{tag:"configuration", label:"Alert Configuration"}, 
                        SBU:{tag:"configuration", label:"Alert Configuration"}, 
                        POLICE:{tag:"configuration", label:"Alert Configuration"}, 
                        RTO:{tag:"configuration", label:"Alert Configuration"}
                    }
      },
      
      
      device_testing: {
        code: "device_testing",
        mandatoryRequired: [],
        userTypes : {
                        SUA:{tag:"deviceApproval", label:"Device Approval"}, 
                        SBU:{tag:"deviceApproval", label:"Device Approval"}, 
                        MNF:{tag:"deviceApproval", label:"Device Approval"}
                      }
      },
      
      
      device_testing_approval: {
        code: "device_testing_approval",
        mandatoryRequired: [],
        userTypes : {
                      SUA:{tag:"deviceApproval", label:"Device Approval"},
                      SBU:{tag:"deviceApproval", label:"Device Approval"}
                    }
      },
      
      
      inventry_approval: {
        code: "inventry_approval",
        mandatoryRequired: ["view_list_of_devices", "device_detail"],
        userTypes : {
                      SBU:{tag:"deviceInventory", label:"Inventory Approval"},
                      SUA:{tag:"deviceInventory", label:"Inventory Approval"}
                    }
      },


      add_police: {
        code: "add_police",
        mandatoryRequired: ["police_user_management"],
        userTypes : {
                      SBU:{tag:"Police", label:"Police Accounts Management"},
                      SUA:{tag:"Police", label:"Police Accounts Management"}
                    }
      },

      upd_police: {
        code: "upd_police",
        mandatoryRequired: ["police_user_management"],
        userTypes : {
                      SBU:{tag:"Police", label:"Police Accounts Management"},
                      SUA:{tag:"Police", label:"Police Accounts Management"}
                    }
      },
      
      
      add_autority:{
        code: "add_autority",
        mandatoryRequired: ["autority_details","autority_user_management"],
        userTypes : {
                        SBU:{tag:"masters", label:"Authority Accounts"},
                        SUA:{tag:"masters", label:"Authority Accounts"}
                    }
      },


      update_autority: {
        code: "update_autority",
        mandatoryRequired: ["autority_details"],
        userTypes : {
                        SBU:{tag:"masters", label:"Authority Accounts"},
                        SUA:{tag:"masters", label:"Authority Accounts"}
                    }
      },


      autority_user_management: {
        code: "autority_user_management",
        mandatoryRequired: ["autority_details"],
        userTypes : {
                        SUA:{tag:"masters", label:"Authority Accounts"}, 
                        SBU:{tag:"masters", label:"Authority Accounts"}, 
                        AUTH:{tag:"userManagement", label:"User Management"}
                    }
      },
      
      
      autority_details: {
        code: "autority_details",
        mandatoryRequired: [],
        userTypes : {
                        SUA:{tag:"deviceApproval", label:"Device Approval"}, 
                        SBU:{tag:"deviceApproval", label:"Device Approval"}, 
                        RTO:{tag:"deviceApproval", label:"Device Approval"}, 
                        POLICE:{tag:"deviceApproval", label:"Device Approval"}, 
                        MNF:{tag:"deviceApproval", label:"Device Approval"}, 
                        DST:{tag:"deviceApproval", label:"Device Approval"}, 
                        RFC:{tag:"deviceApproval", label:"Device Approval"}, 
                        AUTH:{tag:"deviceApproval", label:"Device Approval"}
                      }
      },


      add_responsibility: {
        code: "add_responsibility",
        mandatoryRequired: [],
        userTypes : {
                        SUA:{tag:"userManagement", label:"User Management"}, 
                        SBU:{tag:"userManagement", label:"User Management"}, 
                        RTO:{tag:"userManagement", label:"User Management"}, 
                        POLICE:{tag:"userManagement", label:"User Management"}, 
                        MNF:{tag:"userManagement", label:"User Management"}, 
                        DST:{tag:"userManagement", label:"User Management"}, 
                        RFC:{tag:"userManagement", label:"User Management"}, 
                        AUTH:{tag:"userManagement", label:"User Management"}
                      }
      },


      approve_inv_uploadedby_mnf: {
        code: "approve_inv_uploadedby_mnf",
        mandatoryRequired: ["view_list_of_devices", "device_detail"],
        userTypes : {
                        SBU:{tag:"deviceInventory", label:"Device Management"},
                        SUA:{tag:"deviceInventory", label:"Device Management"}
                    }      
      },


      assign_inv_to_dist: {
        code: "assign_inv_to_dist",
        mandatoryRequired: ["view_list_of_devices", "device_detail", "update_device_detail"],
        userTypes : {
                        MNF:{tag:"deviceInventory", label:"Device Management"}
                    }      
      },

      assign_inv_to_rfc: {
        code: "assign_inv_to_rfc",
        mandatoryRequired: ["view_list_of_devices", "device_detail", "update_device_detail"],
        userTypes : {
                        DST:{tag:"deviceInventory", label:"Device Management"}
                    }      
      },

      
}
  

