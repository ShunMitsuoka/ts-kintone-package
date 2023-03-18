export class KintoneApiError  extends Error {
  readonly title: string;
  readonly subTitle: string;
  readonly errorDetails?: object;

  constructor(title : string, subTitle : string, errorDetails? : object) {
    super(title);
    this.name = "KintoneApiError";
    this.title = title;
    this.subTitle = subTitle;
    this.errorDetails = errorDetails;
  }
}