export interface IMusicApi {
  artist: string;
  id: string;
  title: string;
}

export class MusicFromApiMapper {
  public readonly artist: string;

  public readonly id: string;

  public readonly title: string;

  public constructor(item?: IMusicApi) {
    const artist: string = String(item?.artist || '');
    const title: string = String(item?.title || '');

    this.artist = artist;
    this.id = String(item?.id || '');
    this.title = title;
  }
}

export interface IMusicWithTransformation extends MusicFromApiMapper {
  img: string;
  url: string;
}
