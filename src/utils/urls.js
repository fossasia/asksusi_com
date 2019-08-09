function check() {
  if (process && process.env.REACT_APP_LOCAL_ENV === 'true') {
    return 'http://' + window.location.hostname + ':4000';
  }
  return 'https://api.susi.ai';
}

const urls = {
  API_URL: check(),
  SOUND_SERVER_API_URL: 'http://0.0.0.0:7070',
  CHAT_URL: 'https://susi.ai/chat',
  SKILL_URL: 'https://susi.ai/skills',
  HOME_URL: 'https://susi.ai',
  GITHUB_URL: 'https://github.com/fossasia/susi.ai',
  GITHUB_AVATAR_URL: 'https://avatars.githubusercontent.com',
  GRAVATAR_URL: 'https://www.gravatar.com/avatar',
  GITHUB_API: 'https://api.github.com',
  ANDROID_APP_URL:
    'https://play.google.com/store/apps/details?id=ai.susi&hl=en',
  IOS_APP_URL: 'https://github.com/fossasia/susi_iOS',
};

export default urls;
