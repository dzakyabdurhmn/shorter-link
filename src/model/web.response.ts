export class WebResponse<T> {
  code: number;
  status: string;
  data: {
    id: number;
    long_url: string;
    short_url: string;
  };
}
