import { State } from 'common/store'

export const getAsRootReducer = (data: any): State => {
  return {
    currentUser: {
      accessToken: '',
    },
    game: {
      slug: '',
      openRound: false,
    },
    players: {
      players: [],
    },
    round: {
      playerNames: [],
      locked: false,
      finished: false,
      questions: [],
      picksChosen: false,
      roundPicks: [],
    },
    ...data,
  }
}
