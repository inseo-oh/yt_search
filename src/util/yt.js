import { DEMO_CHANNEL_ENTRY, DEMO_VIDEO_ENTRY, DEMO_SEARCH_RESULT } from "./ytDemoData";

const DEMO_ONLY_MODE = false;

function makeDemoSearchResult(count) {
  const oldItems = DEMO_SEARCH_RESULT.items;
  const result = { ...DEMO_SEARCH_RESULT };
  result.items = [];
  for (let n = 0; n < count; ++n) {
    result.items.push(oldItems[Math.floor(Math.random() * oldItems.length)])
  }

  return result;
}

function errorHandler(response, onError) {
  const err = JSON.parse(response.body);
  console.error("YT Data API error", err);
  onError(`요청에 실패하였습니다 (${response.status})`);
}

let videoInfoCache = {};

export function queryVideo(videoId, callback, onError) {
  if (DEMO_ONLY_MODE) {
    callback(DEMO_VIDEO_ENTRY);
    onError("데모 전용 모드입니다.");
    return;
  }
  if (videoInfoCache[videoId]) {
    return videoInfoCache[videoId];
  }
  gapi.client.youtube.videos.list({
    part: [
      "snippet,statistics"
    ],
    id: videoId
  }).then(
    function (response) {
      const parsed = JSON.parse(response.body);
      if (parsed.pageInfo.totalResults == 0) {
        onError("요청한 동영상을 찾을 수 없습니다", onError);
      } else {
        const result = JSON.parse(response.body).items[0];
        videoInfoCache[videoId] = result;
        callback(result);
      }
    }, function (response) {
      callback(DEMO_VIDEO_ENTRY);
      errorHandler(response, onError);
    });
}

let channelInfoCache = {};

export function queryChannel(channelId, callback, onError) {
  if (DEMO_ONLY_MODE) {
    callback(DEMO_CHANNEL_ENTRY);
    onError("데모 전용 모드입니다.");
    return;
  }
  if (channelInfoCache[channelId]) {
    return channelInfoCache[channelId];
  }
  gapi.client.youtube.channels.list({
    part: [
      "snippet,statistics,brandingSettings"
    ],
    id: channelId
  }).then(
    function (response) {
      const parsed = JSON.parse(response.body);
      if (parsed.pageInfo.totalResults == 0) {
        onError("요청한 채널을 찾을 수 없습니다", onError);
      } else {
        const result = JSON.parse(response.body).items[0];
        channelInfoCache[channelId] = result;
        callback(result);
      }
    }, function (response) {
      callback(DEMO_CHANNEL_ENTRY);
      errorHandler(response, onError);
    });
}

export function queryChannelRecentVideos(channelId, desiredPageToken, callback, onError) {
  if (DEMO_ONLY_MODE) {
    callback(makeDemoSearchResult(12));
    onError("데모 전용 모드입니다.");
    return;
  }
  gapi.client.youtube.search.list({
    part: [
      "snippet"
    ],
    maxResults: 12,
    channelId: channelId,
    pageToken: desiredPageToken != null ? desiredPageToken : undefined,
    order: "date",
    q: ""
  }).then(
    function (response) {
      const result = JSON.parse(response.body);
      callback(result);
    },
    function (response) {
      callback(makeDemoSearchResult(12));
      errorHandler(response, onError)
    });
}

export function search(query, options, callback, onError) {
  if (DEMO_ONLY_MODE) {
    callback(makeDemoSearchResult(options.maxResults ? options.maxResults : 12));
    onError("데모 전용 모드입니다.");
    return;
  }
  gapi.client.youtube.search.list({
    part: [
      'snippet'
    ],
    maxResults: 12,
    q: query,
    ...options,
  }).then(
    function (response) {
      callback(JSON.parse(response.body));
    },
    function (response) {
      callback(makeDemoSearchResult(options.maxResults ? options.maxResults : 12));
      errorHandler(response, onError)
    });
}

