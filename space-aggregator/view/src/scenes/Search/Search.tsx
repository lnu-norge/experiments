import React from 'react';

import Hit from './Hit'
import {
  InstantSearch,
  Hits,
  SearchBox,
	Pagination,
	RefinementList,
	HitsPerPage,
	RangeInput,
	CurrentRefinements,
} from 'react-instantsearch-dom'
import './Search.css'
import searchClient from '../../connections/searchClient'
import SearchByMap from './Map';



const ToogleBinary = (attribute: string, trueLabel = "Ja", falseLabel = "Nei") => <RefinementList 
attribute={attribute} 
transformItems={(items: any) => sortItemsBySize(items.map((item: any) => ({
	...item, 
	label: item.label === "true" ? trueLabel : falseLabel
})))}
/>

const sortItemsBySize = (items: any[]) => {
	return items.sort((a, b) => a.count > b.count ? -1 : 1)
}

const Search = () => {
	 return <div>
        <header className="header">
          <h1 className="header-title">
            <a href="/">typesense-instantsearch-demo</a>
          </h1>
          <p className="header-subtitle">
            using{' '}
            <a href="https://github.com/algolia/react-instantsearch">
              React InstantSearch
            </a>
          </p>
        </header>

        <div className="container">
          <InstantSearch searchClient={searchClient} indexName="spaces">

            <div className="search-panel">
						<div className="search-panel__filters">
						<h4>Fritekst:</h4>
						<SearchBox
									// @ts-ignore No className on SearchBox, but still works
                  className="searchbox"
                  translations={{
                    placeholder: '',
                  }}
                />
						<h4>Hvordan bookes det:</h4>
							{ToogleBinary('includesLinkToBookingPage','Bookingsystem', 'Kontakt for avtale')}
							<h4>Hvor mange er det plass til:</h4>
							<h5>Mennesker:</h5>
						<RangeInput 
							attribute="fitsPeople" 
							/>
						<h5>Kvadratmeter:</h5>
						<RangeInput 
							attribute="sizeInSqm" 
							/>
						<h4>Type:</h4>
						{ToogleBinary('wholeBuildning','Hel bygning', 'Annet')}

						<h4>Fylke:</h4>
						<RefinementList 
							searchable
							attribute="fylke" 
							operator="or"
							limit={20}
							transformItems={sortItemsBySize}
							/>
						<h4>Kommune:</h4>
						<RefinementList 
								searchable
								attribute="kommune" 
								operator="or"
						/>
						<h4>Valgte filter:</h4>
						<CurrentRefinements />
						
						</div>
              <div className="search-panel__results">
                
								{/* <SearchByMap 
									
								/> */}
                <Hits hitComponent={Hit} />


                <div className="pagination">
                  <Pagination />
									<HitsPerPage
											defaultRefinement={10}
											items={[
												{ value: 10, label: '10 per side' },
												{ value: 50, label: '50 per side' },
											]}
										/>
                </div>
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
}

export default Search