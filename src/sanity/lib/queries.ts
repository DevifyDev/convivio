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

export const eventsQuery = `
  *[_id == 'events'][0] {
    weeklyEvents {
      monday {
        title,
        time,
        description
      },
      tuesday {
        title,
        time,
        description
      },
      wednesday {
        title,
        time,
        description
      },
      thursday {
        title,
        time,
        description
      },
      friday {
        title,
        time,
        description
      },
      saturday {
        title,
        time,
        description
      },
      sunday {
        title,
        time,
        description
      }
    },

    specialEvents[] {
      _key,
      date,
      time,
      title,
      description,
      price,
      imageAlt,
      'image': image.asset->url
    }
  }
`
export const testimonialsQuery = `
  *[_id == 'testimonials'][0] {
    reviews[] {
      _key,
      quote,
      name,
      source
    }
  }
`

export const businessDetailsQuery = `
  *[_id == 'businessDetails'][0] {
    phone,
    email,
    openingHours {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday
    },
    bookingUrl,
    giftCardUrl,
    instagramUrl,
    facebookUrl
  }
`
