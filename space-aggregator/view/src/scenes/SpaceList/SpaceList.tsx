import React, {useState} from 'react'
import { School } from 'space-aggregator-types'
import {Pagination} from 'antd'

const SpaceList = ({
	spaces,
	setSpaces
}: {
	spaces: School[],
	setSpaces: React.Dispatch<React.SetStateAction<School[]>>
}) => {
	const [page, setPage] = useState(0)
	const [pageSize, setPageSize] = useState(20)

	const visibleSpaces = spaces.slice(page * pageSize, (page + 1) * pageSize)

return <>
	<Pagination current={page} onChange={(page, pageSize) => {
		setPage(page)
		pageSize && setPageSize(pageSize)
	}} />
	<ul>{
		visibleSpaces.map((space) => {
		return <li key={space.organizationNumber}>
			<SpaceListElement
				space={space}
			/>
		</li>
		})
	}
	</ul>
</>
}

const SpaceListElement = ({space}: {space: School}) => {
	return <>
		<h3>{space.name}</h3>
		<p>{space.public ? 'Offentlig skole' : 'Privatskole'}, {space.types?.join(', ')}</p>
		<h4>Hvor:</h4>
		<ul>
			<li>{space.kommune} kommune</li>
			<li>{space.fylke} fylke</li>
			<li>
				{space.address?.street} <br />
				{space.address?.postnumber} {space.address?.poststed} 
			</li>
		</ul>
		<h4>Om skolen:</h4>
		
		<p>Skoletrinn: {space.skoleTrinn?.string}</p>
		<p>Elever: ca. {space.pupils}</p>
		<p>Ansatte: ca. {space.employees}</p>
		<h4>Kontaktinfo:</h4>
		<h5>Til skolen:</h5>
		<ul>
			<li>E-post: {space.contact && space.contact[0]?.email}</li>
			<li>Telefon: {space.contact && space.contact[0]?.phone}</li>
			<li>Nettside: {space.contact && space.contact[0]?.url}</li>
		</ul>
	
		<h5>Til rektor:</h5>
		<ul>
			<li>Navn: {space.contact && space.contact[1]?.name}</li>
			<li>E-post: {space.contact && space.contact[1]?.email}</li>
			<li>Telefon: {space.contact && space.contact[1]?.phone}</li>
		</ul>
	</>
}

export default SpaceList