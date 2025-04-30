import { ArticleStatus } from './articleStatus.enum';
import { TimestampDate } from 'timestamp-date';
import {parseDate} from "../utils/datetime.utils";

export class News {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  image: string | null;
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
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.published_at = published_at;
  }

  static fromJSON(json: any): News {
    return new News(
      json.id,
      json.title,
      json.content,
      json.summary,
      json.author,
      json.image,
      json.status,
      parseDate(json.created_at),
      parseDate(json.updated_at),
      parseDate(json.published_at)
    );
  }
}
