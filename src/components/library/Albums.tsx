import { useDashboardContext } from 'components/dashboard/context'
import { getLibraryAlbums } from 'api/spotify'
import { useEffect, useState } from 'react'
import { Select, Option } from 'elements/inputs'
import { FlexWrap } from 'elements/containers'
import { Album } from './Album'
import { sortAlbums } from 'utils/sortAlbums'
import { sortOptions } from 'types/spotify'
import { Title } from 'elements/text'

const options = [
  {
    text: 'Name',
    value: 'name',
  },
  {
    text: 'Artist',
    value: 'artist',
  },
  {
    text: 'Release',
    value: 'year',
  },
]

export const LibraryAlbums = () => {
  const {
    state: { albums },
    dispatch,
  } = useDashboardContext()

  const [sortOrder, setSortOrder] = useState<sortOptions>('name')

  useEffect(() => {
    const { sections, count } = albums
    getLibraryAlbums(count).then((res) => {
      if (res) {
        const albums = sortAlbums(res, sortOrder)
        dispatch({
          type: 'LIBRARY_ALBUMS',
          payload: { sections: albums, count: res.length },
        })
      } else {
        const sortedAlbums = sortAlbums(
          sections.flatMap((e) => e.items),
          sortOrder
        )
        dispatch({
          type: 'LIBRARY_ALBUMS',
          payload: { sections: sortedAlbums, count: count },
        })
      }
    })
  }, [albums, sortOrder, dispatch])

  return (
    <div>
      <Select onChange={(e) => setSortOrder(e.target.value as sortOptions)}>
        {options.map((e) => (
          <Option value={e.value}>{e.text} </Option>
        ))}
      </Select>
      <div>
        {albums.sections.map((section) => {
          return (
            <>
              <Title> {section.heading} </Title>
              <FlexWrap>
                {section.items.map((album) => {
                  return <Album item={album} key={album.id} />
                })}
              </FlexWrap>
            </>
          )
        })}
      </div>
    </div>
  )
}
