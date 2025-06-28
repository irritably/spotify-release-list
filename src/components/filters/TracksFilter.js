import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deferred } from 'helpers'
import { setFilters } from 'state/actions'
import { getFiltersMinTracks, getFiltersMaxTracks } from 'state/selectors'
import { Input, Button } from 'components/common'

/**
 * Render tracks count filter
 */
function TracksFilter() {
  const dispatch = useDispatch()
  const minTracks = useSelector(getFiltersMinTracks)
  const maxTracks = useSelector(getFiltersMaxTracks)
  const [minValue, setMinValue] = useState(minTracks || '')
  const [maxValue, setMaxValue] = useState(maxTracks || '')

  useEffect(() => {
    const min = minValue ? parseInt(minValue, 10) : null
    const max = maxValue ? parseInt(maxValue, 10) : null
    
    if (min !== minTracks || max !== maxTracks) {
      deferred(dispatch, setFilters({ minTracks: min, maxTracks: max }))()
    }
  }, [minValue, maxValue, minTracks, maxTracks, dispatch])

  useEffect(() => {
    setMinValue(minTracks || '')
    setMaxValue(maxTracks || '')
  }, [minTracks, maxTracks])

  const reset = () => {
    setMinValue('')
    setMaxValue('')
    deferred(dispatch, setFilters({ minTracks: null, maxTracks: null }))()
  }

  const hasFilter = minTracks || maxTracks

  return (
    <div className="TracksFilter Filters__filter">
      <div className="TracksFilter__inputs">
        <Input
          type="number"
          placeholder="Min tracks"
          value={minValue}
          onChange={(e) => setMinValue(e.target.value)}
          min="1"
          className="TracksFilter__input"
        />
        <span className="TracksFilter__separator">-</span>
        <Input
          type="number"
          placeholder="Max tracks"
          value={maxValue}
          onChange={(e) => setMaxValue(e.target.value)}
          min="1"
          className="TracksFilter__input"
        />
      </div>
      {hasFilter && (
        <Button title="Reset" className="reset" onClick={reset} text />
      )}
    </div>
  )
}

export default TracksFilter