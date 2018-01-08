import { GET_CHANNELS, CLEAN_CHANNELS } from '../constants/channels'

export function getChannels () {
	return {
		type: GET_CHANNELS,
	}
}

export function cleanChannels () {
	return {
		type: CLEAN_CHANNELS,
	}
}

export function selectChannel(channel) {
  return {
    type: SELECT_CHANNEL,
    channel
  }
}