export class Museum {


  static fromJson({$key, name, address, price}) {
    return new Museum($key, name, address, price);
  }

  static fromJsonArray(json: any[]): Museum[] {
    return json.map(Museum.fromJson);
  }


  constructor(private $key: string,
              public name: string,
              public address: string,
              public price: any) {
  }

}
