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
}

export default YouTube;
