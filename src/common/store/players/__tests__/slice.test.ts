import { getAsRootReducer } from 'tests/helpers'
import { playersSelectors, players } from '../slice'

describe('slice - players', () => {
  describe('getPlayersSortedByScore', () => {
    it('returns based on highest score', () => {
      const state = players.reducer(
        undefined,
        players.actions.setPlayers([
          {
            id: 1,
            user_name: 'abc',
            game_id: 1,
            score: 10,
          },
          {
            id: 2,
            user_name: 'abc2',
            game_id: 1,
            score: 15,
          },
          {
            id: 3,
            user_name: 'abc3',
            game_id: 1,
            score: 12,
          },
        ]),
      )

      const sortedPlayers = playersSelectors.getPlayersSortedByScore(
        getAsRootReducer({ players: state }),
      )

      expect(sortedPlayers.map((p) => p.score)).toEqual([15, 12, 10])
    })
  })
})
