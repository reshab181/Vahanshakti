export const alarmsMap = [
    {id:22, key:0, label:"overSpeeding", uiLabel:"Over Speeding"},
    {id:26, key:1, label:"geofenceExit", uiLabel:"Geofence Exit"},
    {id:26, key:0, label:"geofenceEntry", uiLabel:"Geofence Entry"},
    {id:127, key:1, label:"harshAcceleration", uiLabel:"Harsh Acceleration"},
    {id:127, key:2, label:"harshBreaking", uiLabel:"Harsh Breaking"},
    {id:127, key:3, label:"harshCorner", uiLabel:"Harsh Corner"},
    {id:21, key:0, label:"ignitionOff", uiLabel:"Ignition Off"},
    {id:21, key:1, label:"ignitionON", uiLabel:"Ignition ON"},
    {id:23, key:0, label:"mainbatteryDisconnect", uiLabel:"Power Off"},
    {id:145, key:0, label:"mainBatteryReconnected", uiLabel:"Power On"},
    {id:129, key:0, label:"lowBattery", uiLabel:"Low Internal Battery"},
    {id:129, key:1, label:"lowBatteryRemoved", uiLabel:"Internal Battery Ok"},
    {id:369, key:1, label:"deviceOpen", uiLabel:"Device Open"},
    {id:1122, key:1, label:"sosTamper", uiLabel:"SOS Tamper"},
    {id:1124, key:1, label:"otaAlert", uiLabel:"OTA Update Alert"},
    {id:24, key:1, label:"emergencyAlertON", uiLabel:"Emergency Alert"},
    {id:24, key:0, label:"emergencyAlertOFF", uiLabel:"SOS Alert Removed"},
    {id:147, key:0, label:"routeDeviation", uiLabel:"Route Deviation"},
    {id:134, key:0, label:"outOfHourWorking", uiLabel:"Driving out of work hour"},
]; 



// 3 unplugged - 23   Unplugged   ok
// 6 Connect Back to main Battery - 145 Power Restore   ok
// 4 Alert Low battery - 129 0 Vehicle Battery	 ok
// 5 Alert Low battery removed - 129 1 Vehicle Battery   ok	
// 7 Ignition On 21 1 Ignition     ok
// 8 Ignition Off 21 0 Ignition    ok 
// 9 Device Tamper 369 Back Cover Opened   ok 
// 10 Emergency On 24 1 Panic   ok
// 11 Emergency Off 24 0 Panic  ok 
// 12 Alert OTA Update 1124   
// 13 Harsh Breaking 127 2 Green Driving     ok
// 14 Harsh Acceleration 127 1 Green Driving     ok
// 15 Rash Cornering 127 3 Green Driving      ok
// 16 SOS Tamper 1122 SOS Tamper     ok
// 17 Over Speed 22 Over Speed        ok 
// 18 Geofence Entry 26 0 Geofence    ok
// 19 Geofence Exit 26 1 Geofence     ok

