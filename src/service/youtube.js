class YouTube {
  constructor(httpURL) {
    this.youtube = httpURL;
    this.channels = [];
  }

  // 인기동영상 리스트 불러오기
  async popularList() {
    const response = await this.youtube.get('videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 32,
        regionCode: 'KR',
      },
    });

    // 함수 재실행될때 channels 배열 값 reset
    this.channels.splice(0, this.channels.length);

    response.data.items.map((item) => {
      const result = { ...item };
      return this.channels.push(
        this.getChannels(result.snippet.channelId, result)
      );
    });

    // this.channels 에 값이 다 들어온 후 return
    return Promise.all(this.channels).then((values) => values);
  }

  // 키워드 검색
  async search(keyword) {
    const response = await this.youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 32,
        q: keyword,
        type: 'video',
      },
    });

    if (response.data.items.length === 0) {
      this.channels.splice(0, this.channels.length);
    } else {
      response.data.items.map((item) => {
        const result = {
          ...item,
          id: item.id.videoId,
        };

        return this.channels.unshift(
          this.getChannels(result.snippet.channelId, result)
        );
      });

      return Promise.all(this.channels).then((values) => values);
    }
  }

  // channel 정보
  async getChannels(channelId, item) {
    const response = await this.youtube.get('channels', {
      params: {
        part: 'snippet',
        id: channelId,
      },
    });
    item.snippet.channels =
      response.data.items[0].snippet.thumbnails.medium.url;
    return item;
  }
}

export default YouTube;
