import React, { ReactComponentElement } from 'react'
import GoogleMapReact from 'google-map-react';

interface SearchByMapProps {
	markers?: MapMarkerProps[],
	defaultPosition?: {
		center: {
			lat: number,
			lng: number
		}, 
		zoom: number
	} 

}

interface MapMarkerProps {
	lat: number,
	lng: number,
	text: JSX.Element | string
}

const MapMarker = ({
	lat,
	lng,
	text
}: MapMarkerProps) => {
	return <>{text}</>
}

const SearchByMap = ({
	defaultPosition,
	markers
}: SearchByMapProps) => {

	if (!defaultPosition) {
		defaultPosition = {
			center: {
				lat: 64.324883,
				lng: 12.416439
			},
			zoom: 5
		}
	}

	return <div style={{ height: '100vh', width: '100%' }}>
		<GoogleMapReact 
			defaultCenter={defaultPosition.center}
			defaultZoom={defaultPosition.zoom}
		>
			{markers && markers.map(marker => 
				<MapMarker 
					lat={marker.lat}
					lng={marker.lng}
					text={marker.text}
				/>
			)}
		</GoogleMapReact>
	</div>
}


export default SearchByMap