export interface Post {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: Content;
}

export interface Content {
  title: string;
  link: string;
  timestamp: string;
  date_modified: string;
  content: string;
}
