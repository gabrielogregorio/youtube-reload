export interface INotifyApi {
  id: number;
  title: string;
  date: string;
  emoji: string;
}

export class NotifyFromApiMapper {
  public readonly id: number;

  public readonly title: string;

  public readonly date: string;

  public readonly emoji: string;

  public constructor(data?: INotifyApi) {
    this.id = data?.id || 0;
    this.title = data?.title || '';
    this.date = data?.date || '';
    this.emoji = data?.emoji || '';
  }
}
