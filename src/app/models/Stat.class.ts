import {StatStatus} from './statStatus.enum';

export class Stat {
  id: string;
  name: string;
  status: StatStatus;
  image: string;

  constructor(
    id: string,
    name: string,
    status: StatStatus,
    image: string,
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.image = image;
  }

  static fromJSON(json: any): Stat {
    return new Stat(
      json.id,
      json.name,
      json.status,
      json.image,
    );
  }
}
