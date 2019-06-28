import { titleCase } from '../utils/title_case';

export class NPPESTaxonomy {
  state!: string;
  code!: string;
  primary!: boolean;
  license!: string;
  desc!: string;

  get display_name(): string {
    return this.desc
  }

  constructor(init?: NPPESTaxonomy) {
    Object.assign(this, init)
  }
}

export class NPPESAddress {
  address_1!: string;
  address_2!: string;
  city!: string;
  state!: string;
  postal_code!: string;
  telephone_number!: string;
  fax_number!: string;
  country_code!: string;
  country_name!: string;
  address_type!: string;
  address_purpose!: string;

  get display_name(): string  {
    return `${titleCase(this.address_1)}${this.address_2 && ', '+titleCase(this.address_2)}${this.city && ', '+titleCase(this.city)}${this.state && ' '+this.state.toUpperCase()}`
  }

  get phone(): string {
    return this.telephone_number
  }

  get fax(): string {
    return this.fax_number
  }

  constructor(init: any) {
    Object.assign(this, init || {})
  }
}

export class NPPESIdentifier {
  code!: string;
  issuer!: string;
  state!: string;
  identifier!: string;
  desc!: string;

  constructor(init?: any) {
    Object.assign(this, init)
  }
}

export class NPPESBasic {
  status!: string;
  credential!: string;
  first_name!: string;
  last_name!: string;
  middle_name!: string;
  name!: string;
  sole_proprietor!: string;
  gender!: string;
  last_updated!: string;
  name_prefix!: string;
  enumeration_date!: string;

  constructor(init?: any) {
    Object.assign(this, init)
  }
}

export class NPPES {
  private _taxonomies: NPPESTaxonomy[] = [];
  public get taxonomies(): NPPESTaxonomy[] {
    return this._taxonomies;
  }
  public set taxonomies(value: NPPESTaxonomy[]) {
    this._taxonomies = value.map(x => new NPPESTaxonomy(x));
  }
  // taxonomies: Taxonomy[];


  public get taxonomy(){
    return this.taxonomies.find(x => x.primary);
  }


  private _addresses: NPPESAddress[] = [];
  public get addresses(): NPPESAddress[] {
    return this._addresses;
  }
  public set addresses(value: NPPESAddress[]) {
    this._addresses = value.map(x => new NPPESAddress(x));
  }

  public get address() {
    return this.addresses.find(x => x.address_purpose === 'PRIMARY')
      || this.addresses.find(x => x.address_purpose === 'LOCATION')
      || this.addresses.find(x => x.address_purpose === 'MAILING')
      || this.addresses.find(x => x.address_purpose === 'SECONDARY');
  }

  created_epoch!: number;

  private _identifiers: NPPESIdentifier[] = [];
  public get identifiers(): NPPESIdentifier[] {
    return this._identifiers;
  }
  public set identifiers(value: NPPESIdentifier[]) {
    this._identifiers = value.map(x => new NPPESIdentifier(x));
  }
  // identifiers: Identifier[];
  other_names!: any[];
  number!: number;
  last_updated_epoch!: number;

  private _basic!: NPPESBasic
  get basic(): NPPESBasic {
    return this._basic;
  }
  set basic(value: NPPESBasic) {
    this._basic = new NPPESBasic(value);
  }
  enumeration_type!: string;

  get display_name(): string {
    return this.enumeration_type === 'NPI-1'
      ? `${titleCase(this.basic.first_name)}${this.basic.middle_name ? ' ' + titleCase(this.basic.middle_name) : ''} ${this.basic.last_name.toUpperCase()}`
      : this.basic.name
  }

  get display_name_with_credential(): string {
    return `${this.display_name}${this.basic.credential && ' (' + this.basic.credential + ')'}`
  }

  constructor(init?: any) {
    Object.assign(this, init)
  }
}
