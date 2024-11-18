/* eslint-disable react/prop-types */
// import { mappls } from "mappls-web-maps";
// import { useEffect, useRef, useState } from "react";
// import { Grid } from "react-loader-spinner";

// const mapplsClassObject = new mappls();

// const PolylineComponent = ({ map, coord, htmlData = '' }) => {

// 	const [geoLocations, setGeoLocations] = useState([])

// 	useEffect(() => {
// 		setGeoLocations(() => {
// 			return coord?.map((elem) => {
// 				return {
// 					"type": "Feature",
// 					"properties":
// 					{
// 						"htmlPopup": htmlData || ''
// 					},
// 					"geometry":
// 					{
// 						"type": "Point",
// 						"coordinates": Object.values(elem)

// 					}
// 				}
// 			})
// 		})
// 	}, [coord])

// 	var geoData =
// 	{
// 		"type": "FeatureCollection",
// 		"properties": {
// 			"color": "red"
// 		},
// 		"features": geoLocations
// 	};

// 	const polylineRef = useRef(null);

// 	useEffect(() => {
// 		if (polylineRef.current) {
// 			mapplsClassObject.removeLayer({ map: map, layer: polylineRef.current });
// 		}
// 		polylineRef.current = mapplsClassObject.addGeoJson({
// 			map: map,
// 			data: geoData,
// 			strokeColor: "red",
// 			strokeOpacity: 1.0,
// 			strokeWeight: 10,
// 			fitbounds: true,
// 			cType: 0,
			
// 			animate: {
// 				speed: 5,
// 				icon_width: 50, // or as “25”
// 				icon_height: 100, // or as “50”,
// 				icon_url:
// 					"http://www.mapmyindia.com/api/advanced-maps/doc/sample/map_sdk/car.png", //Place your icon url
// 				repeat: false, //false,
// 			},
// 		});
// 	});
// };

// const MAPLayout = ({ data, htmlData,heights }) => {

// 	const map = useRef(null);
// 	const [isMapLoaded, setIsMapLoaded] = useState(false);

// 	// Map Style
// 	const styleMap = { width: '99%', height: heights || '73vh', display: 'inline-block', border: '1px solid #f6f9ff' }

// 	useEffect(() => {
// 		mapplsClassObject.initialize("8d4096e4ba1c3cfabb2feb542bd4782c", { map: true }, () => {
// 			if (map.current) {
// 				map.current.remove();
// 			}
// 			map.current = mapplsClassObject.Map({
// 				id: "map",
// 				properties: {
// 					center: [19.7515, 75.7139],
// 					zoom: 7,
// 					traffic:true,
// 					satelliteView:true
// 				},
// 			});
// 			map.current.on("load", () => {
// 				setIsMapLoaded(true);
// 			});
// 		});
// 	}, []);

// 	return (
// 		<div
// 			id="map"
// 			style={styleMap}
// 		>
// 			{!isMapLoaded &&
// 				<div className="" style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center', height: '69vh' }}>
// 					<Grid
// 						visible={true}
// 						height="80"
// 						width="80"
// 						color="#000af"
// 						ariaLabel="grid-loading"
// 						radius="12.5"
// 						wrapperClass="grid-wrapper"
// 					/>
// 					<div style={{ fontWeight: '500', fontSize: '14px' }}>Loading Map...</div>
// 				</div>
// 			}
// 			{isMapLoaded && data && <PolylineComponent map={map.current} coord={data} htmlData={htmlData ?? ''} />}
// 		</div>
// 	);
// };
// export default MAPLayout;

import { mappls } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
import { Grid } from "react-loader-spinner";


const mapplsClassObject = new mappls();
const PolylineComponent = ({ map, coord, htmlData = '' }) => {
    const [geoLocations, setGeoLocations] = useState([])
    console.log("elemDataPassedGeoLocation", coord, htmlData);
    useEffect(() => {
        setGeoLocations(() => {
            return coord?.map((elem, index) => {
                
                return {
                    "type": "Feature",
                    "properties":
                    {
                        "htmlPopup": htmlData[index] || ''
                    },
                    "geometry":
                    {
                        "type": "Point",
                        "coordinates": Object.values(elem)
                    }
                }
            })
        })
    }, [coord, htmlData])
    
    var geoData =
    {
        "type": "FeatureCollection",
        "features": geoLocations
    };

    const polylineRef = useRef(null);
    useEffect(() => {
        if (polylineRef.current) {
            mapplsClassObject.removeLayer({ map: map, layer: polylineRef.current });
        }
        polylineRef.current = mapplsClassObject.addGeoJson({
            map: map,
            data: geoData,
            strokeColor: "red",
            strokeOpacity: 1.0,
            strokeWeight: 10,
            fitbounds: true,
            cType: 0,
            animate: {
                speed: 5,
                icon_width: 50, // or as “25”
                icon_height: 100, // or as “50”,
                icon_url:
                    "http://www.mapmyindia.com/api/advanced-maps/doc/sample/map_sdk/car.png", //Place your icon url
                repeat: false, //false,
            },
        });
    },[map, geoData]);
};


const MAPLayout = ({ data, htmlData ,heights }) => {
    console.log("MAPLayoutData", data, htmlData, heights);
    const map = useRef(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    
    // Map Style
    const styleMap = { width: '99%', height: heights || '73vh', display: 'inline-block', border: '1px solid #F6F9FF' }
    // const style_map = {
    //     position:"absolute",
    //     top:"10px",
    //     left:"10px"
    // }
    const mapIntiliaze = () => {
        mapplsClassObject.initialize("8d4096e4ba1c3cfabb2feb542bd4782c", { map: true }, () => {
            if (map.current) {
                map.current.remove();
            }
            map.current = mapplsClassObject.Map({
                id: "map",
                properties: {
                    center: [19.7515, 75.7139],
                    zoom: 7,
                },
            });
            map.current.on("load", () => {
                setIsMapLoaded(true);
            });
        });
    }
    useEffect(() => {
        mapIntiliaze();
    }, []);

    
    return (
        <div
            id="map"
            style={styleMap}
        >
            {!isMapLoaded &&
                <div className="" style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center', height: '69vh' }}>
                    <Grid
                        visible={true}
                        height="80"
                        width="80"
                        color="#000af"
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperClass="grid-wrapper"
                    />
                    <div style={{ fontWeight: '500', fontSize: '14px' }}>Loading Map...</div>
                </div>
            }
            {isMapLoaded && data && <PolylineComponent map={map.current} coord={data} htmlData={htmlData ?? ''} />}
            
        </div>
    );
};

export default MAPLayout;



{/* <div className="select_map_style">
                <label htmlFor="viewModeSelect">Select View Mode: </label>
                <select
                id="viewModeSelect"
                onChange={(e) =>  handleViewModeChange(e)}
                >
                    <option value="">Standard View</option>
                    <option value="standard-satellite">Satellite View</option>
                </select>
            </div> */}