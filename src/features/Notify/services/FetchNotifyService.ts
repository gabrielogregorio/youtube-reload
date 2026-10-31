import { NotifyMapper } from '@/features/Notify/mappers';
import { INotifyApi, NotifyFromApiMapper } from '@/features/Notify/mappers/fromApi';
import { ApiReload } from '@/modules/musicCards/services/api/Reload';

export class FetchNotifyService {
  public static async fetch(): Promise<NotifyFromApiMapper[]> {
    return ApiReload.searchNotify().then((res: INotifyApi[]) => {
      return NotifyMapper.fromApi(res);
    });
  }
}
