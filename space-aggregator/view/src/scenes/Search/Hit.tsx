import React from 'react';
import { Space, ContactInformation, Sourced, BookingService } from 'space-aggregator-types'
import prependHttp from 'prepend-http'

const fixUrl = (url: string) => {
return prependHttp(url, {https: false})
}

const ContactInfo = ({sourcedContactInfo}: {sourcedContactInfo: Sourced<ContactInformation>}) => {
  const contactInfo = sourcedContactInfo.info
  const source = sourcedContactInfo.source
  return <p>
      <strong>{contactInfo.name}</strong> {contactInfo.role}<br />
      {contactInfo.url && <><a href={fixUrl(contactInfo.url)}>{contactInfo.url}</a><br /></>}
      {contactInfo.email && <><a href={`mailto:` + contactInfo.email}>{contactInfo.email}</a><br /></>}
      {contactInfo.phone && <>Tel: <a href={`tel:` + contactInfo.phone}>{contactInfo.phone}</a><br /></>}
    </p>
}

const BookViaLenke = ({BookingService} : {BookingService: BookingService}) => {
  return <a href={BookingService.bookingUri}>Book gjennom {BookingService.type}</a>
}


const VisBookingLenker = ({fullData}: {fullData: Space}) => {
  if (fullData.connectedBookingServices) {
    return <>
      {fullData.connectedBookingServices.map(booking => <p><BookViaLenke BookingService={booking}/></p>)}
    </>
  }

  return <p>Ta kontakt for avtale</p>
}

const PropsToConsole = ({props}: any) => {
  return <button className="onlyForDevs" onClick={() => {console.log(props)}}>Props to console</button>
}

const Hit = (props: {hit: any}) => {
  console.log(props)
  const fullData = props.hit.fullData as Space
  const {
    contacts,
    address
  } = fullData
  const {
    description,
    title
  } = props.hit._highlightResult 
  
  return <article>
      <h3 dangerouslySetInnerHTML={{__html: title?.value}}></h3>
      <p>
        {address?.street}<br />
        {address?.postnumber} {address?.poststed}
      </p>
      <VisBookingLenker fullData={fullData} />
      <hr />
      <h4>Kontaktinfo:</h4>
      {contacts && contacts.map(contact => <ContactInfo sourcedContactInfo={contact} />)}
      <hr />
      {description?.value && <div dangerouslySetInnerHTML={{__html: description.value}}></div>}
      <p>
        <PropsToConsole props={props}/>
      </p>
    </article>
  
}


export default Hit