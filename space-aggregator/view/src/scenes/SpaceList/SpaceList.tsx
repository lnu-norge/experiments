import React, {useState} from 'react'
import { School } from 'space-aggregator-types'
import {Pagination, Card} from 'antd'

import './SpaceList.css'

const SpaceList = ({
	spaces,
	setSpaces
}: {
	spaces: School[],
	setSpaces: React.Dispatch<React.SetStateAction<School[]>>
}) => {
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const visibleSpaces = spaces.slice((page -1) * pageSize, (page) * pageSize)

	const PaginationElement =	<Pagination 
	current={page} 
	pageSize={pageSize}
	total={Math.ceil((spaces.length) + 1 / pageSize) + 1}
	onChange={(page, pageSize) => {
		setPage(page)
		pageSize && setPageSize(pageSize)
	}} 
/>
return <>
	{PaginationElement}
	{
		visibleSpaces.map((space) => {
		return <SpaceListElement
				space={space}
				key={space.organizationNumber!}
			/>
		})
	}
		{PaginationElement}

</>
}

const SpaceListElement = ({space, key}: {space: School, key: string}) => {
	// @ts-ignore Just WIP data anyway
	const index = space.index as number
	return <Card
		hoverable
		key={key}
		className="SpaceListElement__Card"
	>
		<div>

		<header>
		<h3>#{index} {space.name}</h3>
		<p>{space.public ? 'Offentlig skole' : 'Privatskole'}, {space.types?.join(', ')}</p>
		</header>
		<main>
		<section>
		<h4>Hvor:</h4>
		<p>{space.kommune} kommune, {space.fylke}</p>
		<p>
				{space.address?.street} <br />
				{space.address?.postnumber} {space.address?.poststed} 
			</p>
		</section>
		<section>

		<h4>Om skolen:</h4>
		
		<p>Skoletrinn: {space.skoleTrinn?.string}
		{space.pupils ? <><br />Elever: {space.pupils}</> : null}
		{space.employees ? <><br />Ansatte: {space.employees}</> : null }
		</p>
		</section>
		<section>
		<h4>Kontaktinfo:</h4>
		<ul>
			<li>{space.name}</li>
			{space.contact && space.contact[0]?.url && <li><a href={'http://' + space.contact[0].url}>{space.contact[0].url}</a></li>}
			{space.contact && space.contact[0]?.email && <li><a href={"mailto:" + space.contact[0].email}>{space.contact[0].email}</a></li> }
			{space.contact && space.contact[0]?.phone && <li><a href={"tel:" + space.contact[0].phone}>{space.contact[0].phone}</a></li>  }
		</ul>
	
	{space.contact && space.contact[1] &&
		<><h5>Rektor:</h5>
		<ul>
		{space.contact[1].name && <li>{space.contact && space.contact[1]?.name}</li> }
		{space.contact && space.contact[1]?.email && <li><a href={"mailto:" + space.contact[1].email}>{space.contact[1].email}</a></li> }
			{space.contact && space.contact[1]?.phone && <li><a href={"tel:" + space.contact[1].phone}>{space.contact[1].phone}</a></li>  }
		</ul>
	</> }
		</section>
		</main>
		
		</div>
	</Card>
}

export default SpaceList