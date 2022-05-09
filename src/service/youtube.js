import axios from 'axios';

class YouTube {
  constructor(key) {
    this.youtube = axios.create({
      baseURL: 'https://content-youtube.googleapis.com/youtube/v3',
      params: {
        key: key,
      },
    });
  }

  // 인기동영상 리스트 불러오기
  async popularList() {
    const response = await this.youtube.get('videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 30,
        regionCode: 'KR',
      },
    });
    return response.data.items;
  }

  // 키워드 검색
  async search(keyword) {
    const response = await this.youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 30,
        q: keyword,
        type: 'video',
      },
    });
    return response.data.items.map((item) => ({
      ...item,
      id: item.id.videoId,
    }));
  }
}

export default YouTube;
