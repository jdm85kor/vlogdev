import { makeAutoObservable } from 'mobx';

class Vlog {
  channels: any[] = [];
  videos: { [key: string]: any[] } = {};
  latestVideos: any[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setChannels = (channels: any[]) => {
    this.channels = channels;
  };
  addVideos = (id: string, videos: any[]) => {
    this.videos[id] = videos;
  };
  addChannels = (channels: any[]) => {
    this.channels = [
      ...this.channels,
      ...channels,
    ];
  };
  setLatestVideos = (videos: any[]) => {
    this.latestVideos = videos;
  };
}

export default Vlog;