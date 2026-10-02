export const menuQuery = `
  {
    'food': *[_type == 'menu' && _id == 'menu'][0] {
      categories[] {
        _key,
        title,
        items[] {
          _key,
          name,
          foodLine1,
          description,
          price
        }
      }
    },

    'drinks': *[_type == 'drinksMenu' && _id == 'drinksMenu'][0] {
      categories[] {
        _key,
        title,
        items[] {
          _key,
          name,
          description,
          price
        },
        subcategories[] {
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
  
    'weeklyEvents': coalesce(weeklyOffers[] {
      _key,
      schedule,
      title,
      time,
      price,
      description
    }, []),

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
      rating,
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

export const staffQuery = `
  *[_type == 'staff' && _id == 'staff'][0] {
    'groupImage': groupImage.asset->url,
    groupImageAlt,
    'members': coalesce(members[] {
      _key,
      name,
      description
    }, [])
  }
`

export const faqQuery = `
  *[_type == 'faq' && _id == 'faq'][0] {
    'items': coalesce(items[] {
      _key,
      question,
      answer
    }, [])
  }
`

export const aboutQuery = `
  *[_id == 'about'][0] {
    'imageOne': imageOne.asset->url,
    imageOneAlt,
    'imageTwo': imageTwo.asset->url,
    imageTwoAlt
  }
`