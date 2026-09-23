export const menuQuery = `
  *[_id == 'menu'][0] {
    categories[] {
      _key,
      title,
      items[] {
        _key,
        name,
        description,
        price
      }
    }
  }
`

export const galleryQuery = `
  *[_id == 'gallery'][0] {
    images[] {
      _key,
      alt,
      'src': image.asset->url
    }
  }
`