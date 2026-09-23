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