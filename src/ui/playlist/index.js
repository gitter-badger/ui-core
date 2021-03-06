/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import {Observable} from 'rx'
import isolate from '@cycle/isolate'
import PlayListItem from './PlayListItem'
import Proxy from '../../Utils/Proxy'

export default ({tracks$, DOM, audio}) => {
  const selectedTrackProxy$ = Proxy(() => selectedTrack$)
  const playlistItem$ = tracks$.map(tracks => tracks.map((track, i) =>
    isolate(PlayListItem, track.id.toString())({track, DOM, audio, selectedTrack$: selectedTrackProxy$}, i)
  ))
  const playlistItemVTree$ = playlistItem$.map(tracks => tracks.map(x => x.DOM))
  const playlistItemClick$ = playlistItem$.map(tracks => tracks.map(x => x.click$))
  const selectedTrack$ = playlistItemClick$.flatMapLatest(clicks => Observable.merge(clicks))
  return {
    DOM: playlistItemVTree$.flatMapLatest(tracks => Observable.combineLatest(tracks)).map(x => div({
      className: 'tracks',
      style: {backgroundColor: '#ECECEC'}},
      x
    )),
    selectedTrack$: selectedTrackProxy$
  }
}
