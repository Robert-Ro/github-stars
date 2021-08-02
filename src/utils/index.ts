const TIME_INTERVAL = 10000
const VALID_CHANNELS = ['timer-end', 'rest-end']
const calculateTimeText = (ms: number): string => {
  const s = (ms / 1000).toFixed(0)
  const second = +s % 60
  const min = (+s / 60).toFixed(0)
  return `${min.padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}

export { TIME_INTERVAL, VALID_CHANNELS, calculateTimeText }
