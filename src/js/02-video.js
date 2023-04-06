import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

const onPlay = function (data) {
  console.log(data.seconds);
};

const savePlayerTime = data => {
  console.log(data.seconds);
  localStorage.setItem('videoplayer-current-time', data.seconds);
};

player.on('timeupdate', throttle(savePlayerTime, 1000));
player.on('ended', () => {
  localStorage.removeItem('videoplayer-current-time');
  player.unload();
});

const getLocalTime = () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime === 0) return 0;

  const parsedTime = JSON.parse(savedTime);
  return Number(parsedTime);
};
const resumePlayerOnLastTime = () => {
  const lastPlayedTime = getLocalTime();
  player.setCurrentTime(lastPlayedTime);
};

resumePlayerOnLastTime();
