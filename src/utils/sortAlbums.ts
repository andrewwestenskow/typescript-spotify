import { AlbumObjectFull, sortOptions } from 'types/spotify'
import { DateTime } from 'luxon'
import { AlbumsSection } from 'components/dashboard/context'

export const sortAlbums = (items: AlbumObjectFull[], sort: sortOptions) => {
  const albums = [...items]
  switch (sort) {
    case 'name': {
      albums.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })

      const separated = albums.reduce(
        (acc, album) => {
          if (!album.name[0].match(/[A-Za-z]/)) {
            acc[0].items.push(album)
          } else {
            if (
              album.name
                .toLowerCase()
                .startsWith(acc[acc.length - 1].heading.toLowerCase())
            ) {
              acc[acc.length - 1].items.push(album)
            } else {
              acc.push({ heading: album.name[0].toUpperCase(), items: [album] })
            }
          }
          return acc
        },
        [{ heading: '0 - 9', items: [] as AlbumObjectFull[] }]
      )

      return separated
    }
    case 'artist': {
      albums.sort((a, b) => {
        return a.artists[0].name.localeCompare(b.artists[0].name)
      })

      const separated = albums.reduce(
        (acc, album) => {
          if (!album.artists[0].name[0].match(/[A-Za-z]/)) {
            acc[0].items.push(album)
          } else {
            if (
              album.artists[0].name
                .toLowerCase()
                .startsWith(acc[acc.length - 1].heading.toLowerCase())
            ) {
              acc[acc.length - 1].items.push(album)
            } else {
              acc.push({
                heading: album.artists[0].name[0].toUpperCase(),
                items: [album],
              })
            }
          }
          return acc
        },
        [{ heading: '0 - 9', items: [] as AlbumObjectFull[] }]
      )

      return separated
    }
    case 'year': {
      const modifiedYears = albums.map((e) => ({
        ...e,
        release_date: DateTime.fromISO(e.release_date).year.toString(),
      }))
      modifiedYears.sort((a, b) => {
        return a.release_date.localeCompare(b.release_date)
      })

      const separated = modifiedYears.reduce((acc, album) => {
        if (acc.length && acc[acc.length - 1].heading === album.release_date) {
          acc[acc.length - 1].items.push(album)
        } else {
          acc.push({ heading: album.release_date, items: [album] })
        }
        return acc
      }, [] as AlbumsSection[])

      return separated
    }
    default: {
      throw new Error()
    }
  }
}
