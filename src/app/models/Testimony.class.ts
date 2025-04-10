import { ArticleStatus } from './articleStatus.enum';
import {parseDate} from "../utils/datetime.utils";

export class Testimony {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  image: string | null;
  audio_url: string | null;
  status: ArticleStatus;
  created_at: Date;
  updated_at: Date;
  published_at: Date;

  constructor(
    id: string,
    title: string,
    content: string,
    summary: string,
    author: string,
    image: string | null,
    audio_url: string | null,
    status: ArticleStatus,
    created_at: Date,
    updated_at: Date,
    published_at: Date
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.summary = summary;
    this.author = author;
    this.image = image;
    this.audio_url = audio_url;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.published_at = published_at;
  }

  static fromJSON(json: any): Testimony {
    return new Testimony(
      json.id,
      json.title,
      json.content,
      json.summary,
      json.author,
      json.image,
      json.audio,
      json.status,
      parseDate(json.created_at),
      parseDate(json.updated_at),
      parseDate(json.published_at)
    );
  }
}
