import { mappls } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
import { Grid } from "react-loader-spinner";

const mapplsClassObject = new mappls();

const PolylineComponent = ({ map, coord, htmlData = '' }) => {
	
	
	
	const polylineRef = useRef(null);

	
		if (polylineRef.current) {
			mapplsClassObject.removeLayer({ map: map, layer: polylineRef.current });
		}
		
        polylineRef.current = mapplsClassObject.Polyline({
			map: map,
			path: coord,
			strokeColor: "blue",
			strokeOpacity: 0.5,
			strokeWeight: 2,
			fitbounds: true,
		});
        
        if(coord.length > 0){
            const markerObject = mapplsClassObject.Marker({
                map:  map,
                position:{lat:coord[coord.length-1][0], lng:coord[coord.length-1][1]},
                
            });
                
        }
        
	
};

const MAPLayoutTrails = ({ data, htmlData,heights }) => {

    const cordinatesArray = data?.map((item) => [item?.latitude, item?.longitude])
    
	const map = useRef(null);
	const [isMapLoaded, setIsMapLoaded] = useState(false);

	// Map Style
	const styleMap = { width: '99%', height: heights || '73vh', display: 'inline-block', border: '1px solid #f6f9ff' }

	useEffect(() => {
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
			{isMapLoaded && data && <PolylineComponent map={map.current} coord={cordinatesArray} htmlData={htmlData ?? ''} />}
		</div>
	);
};
export default MAPLayoutTrails;