/** From /enheter */ 
export interface NSR_Enhet {
			NSRId: number,
			OrgNr: string,
			Navn: string,
			Karakteristikk: string,
			FulltNavn: string,
			KommuneNavn: string,
			Epost: string,
			ErAktiv: boolean,
			ErSkole: boolean,
			ErSkoleEier: boolean,
			ErGrunnSkole: boolean,
			ErPrivatSkole: boolean,
			ErOffentligSkole: boolean,
			ErVideregaaendeSkole: boolean,
			VisesPaaWeb: boolean,
			KommuneNr: string,
			FylkeNr: string,
			EndretDato: Date
	}

/** From /enheter/enhet/foo */ 
export interface NSR_School {
  NSRId: number,
  OrgNr?: string,
  Navn?: string,
  Karakteristikk?: string,
  FulltNavn?: string,
  Kallenavn?: string,
  KommuneNavn?: string,
  Epost?: string,
  Url?: string,
  Maalform?: string,
  Leder?: string,
  LederFornavn?: string,
  LederEtternavn?: string,
  GsiId?: string,
  Telefon?: string,
  Mobil?: string,
  Fax?: string,
  PersonEpost?: string,
  PersonTelefon?: string,
  ErSkole?: boolean,
  ErSkoleEier?: boolean,
  ErGrunnSkole?: boolean,
  ErPrivatSkole?: boolean,
  ErOffentligSkole?: boolean,
  ErVideregaaendeSkole?: boolean,
  VisesPaaWeb?: boolean,
  ErAktiv?: boolean,
  Elevtall?: number,
  AnsatteFra?: number,
  AnsatteTil?: number,
  SkoleTrinnFra?: number,
  SkoleTrinnTil?: number,
  EtfStatus?: {
    Godkjenningslov?: string,
    GodkjentStatus?: string,
    GodkjentStatusTekst?: string,
    Aktiv?: number
  },
  DatoFoedt?: Date,
  SistEndretDato?: Date,
  OpprettetDato?: Date
  Besoksadresse?: {
    Adress?: string,
    Postnr?: string,
    Poststed?: string,
    Land?: string
  },
  Nacekoder?: [
    {
      Kode?: string,
      Navn?: string,
      Versjon?: string
    }
  ],
  Postadresse?: {
    Adress?: string,
    Postnr?: string,
    Poststed?: string,
    Land?: string
  },
  Fylke?: {
    Fylkesnr?: string,
    Navn?: string,
    OrgNr?: string,
    OrgNrFylkesmann?: string
  },
  EnhetsType?: {
    Type?: string,
    Navn?: string,
    Offentlig?: boolean
  },
  SektorType?: {
    Navn?: string,
    Id?: string
  },
  SkoleTyper?: [
    {
      Navn?: string,
      NavnTekst?: string,
      Id?: string,
      ErSystemType?: boolean
    }
  ],
  Kommune?: {
    ErNedlagt?: boolean,
    KommuneGruppe?: {
      Gruppe?: number,
      Navn?: string
    },
    Kommunenr?: string,
    Navn?: string,
    OrgNr?: string,
    Fylkesnr?: string
  },
  Koordinater?: {
    Zoom?: number,
    Lengdegrad?: number,
    Breddegrad?: number,
    GeoKvalitet?: string
  },
  Utgaattype?: {
    EnumId?: string,
    Name?: string
  },
  ParentRelasjoner?: [
    {
      Enhet?: {
        NSRId?: number,
        Navn?: string,
        Karakteristikk?: string,
        FulltNavn?: string,
        Kallenavn?: string,
        OrgNr?: string,
        Epost?: string,
        Poststed?: string,
        Kommune?: string,
        Kommunenr?: string,
        Fylke?: string,
        Fylkesnr?: string,
        BesoksAdresse?: string,
        Telefon?: string,
        NaceKode1?: string,
        NaceKode2?: string,
        NaceKode3?: string,
        Zoom?: number,
        Lengdegrad?: number,
        Breddegrad?: number,
        GeoKvalitet?: string
      },
      RelasjonsType?: {
        Beskrivelse?: string,
        Navn?: string,
        Id?: string,
        ErSystemRelasjon?: boolean
      }
    }
  ],
  ChildRelasjoner?: [
    {
      Enhet?: {
        NSRId?: number,
        Navn?: string,
        Karakteristikk?: string,
        FulltNavn?: string,
        Kallenavn?: string,
        OrgNr?: string,
        Epost?: string,
        Poststed?: string,
        Kommune?: string,
        Kommunenr?: string,
        Fylke?: string,
        Fylkesnr?: string,
        BesoksAdresse?: string,
        Telefon?: string,
        NaceKode1?: string,
        NaceKode2?: string,
        NaceKode3?: string,
        Zoom?: number,
        Lengdegrad?: number,
        Breddegrad?: number,
        GeoKvalitet?: string
      },
      RelasjonsType?: {
        Beskrivelse?: string,
        Navn?: string,
        Id?: string,
        ErSystemRelasjon?: boolean
      }
    }
  ]
}
