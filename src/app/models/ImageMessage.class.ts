import {parseDate} from "../utils/datetime.utils";

export class ImageMessage {
  id: string;
  src: string;
  alt: string;
  created_at: Date;
  updated_at: Date;
  constructor(
    id: string,
    src: string,
    alt: string,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.src = src;
    this.alt = alt;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromJSON(json: any): ImageMessage {
    return new ImageMessage(
      json.id,
      json.image,
      json.alt,
      parseDate(json.created_at),
      parseDate(json.updated_at)
    );
  }
}
