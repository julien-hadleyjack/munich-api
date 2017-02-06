
export class Movie {

  constructor(
    private $key: string,
    public orginal_language: boolean,
    public subtitles: boolean,
    public title: boolean) {
  }

  static fromJson({$key, original_language, subtitles, title}) {
    return new Movie($key, original_language, subtitles, title);
  }

  static fromJsonArray(json : any[]) : Movie[] {
    return json.map(Movie.fromJson);
  }

}
