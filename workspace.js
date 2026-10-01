import fs from 'fs'
import path from 'path'

const files = [
  // './package.json',
  // './tsconfig.json',
  // './next.config.ts',
  // './sanity.cli.js',
  // './sanity.config.ts',

  // './src/app/globals.css',
  // './src/app/layout.tsx',
  // './src/app/page.tsx',
  // './src/app/page.module.css',

  // './src/components/About/About.tsx',
  // './src/components/About/About.module.css',

  // './src/components/Button/Button.tsx',
  // './src/components/Button/Button.module.css',

  // './src/components/Events/Events.tsx',
  // './src/components/Events/Events.module.css',

  // './src/components/Faq/Faq.tsx',
  // './src/components/Faq/Faq.module.css',

  // './src/components/Footer/Footer.tsx',
  // './src/components/Footer/Footer.module.css',

  // './src/components/Gallery/Gallery.tsx',
  // './src/components/Gallery/Gallery.module.css',

  // './src/components/Header/Header.tsx',
  // './src/components/Header/Header.module.css',

  // './src/components/Hero/Hero.tsx',
  // './src/components/Hero/Hero.module.css',

  // './src/components/Location/Location.tsx',
  // './src/components/Location/Location.module.css',

  // './src/components/Menu/Menu.tsx',
  // './src/components/Menu/Menu.module.css',

  // './src/components/SectionHeading/SectionHeading.tsx',
  // './src/components/SectionHeading/SectionHeading.module.css',

  // './src/components/Staff/Staff.tsx',
  // './src/components/Staff/Staff.module.css',

  // './src/components/StructuredData/StructuredData.tsx',
  // './src/components/StructuredData/StructuredData.module.css',

//  './src/components/SvgFilter.tsx',

  // './src/components/Testimonials/Testimonials.tsx',
  // './src/components/Testimonials/Testimonials.module.css',

  // './src/components/ThemeSwitcher/ThemeSwitcher.tsx',
  // './src/components/ThemeSwitcher/ThemeSwitcher.module.css',

  //  './src/data/menuData.ts',

    //  './src/sanity/env.ts',
    //  './src/sanity/structure.ts',
      // './src/sanity/singletons.ts',

    //  './src/sanity/lib/client.ts',
    //  './src/sanity/lib/image.ts',
    //  './src/sanity/lib/live.ts',
    //  './src/sanity/lib/queries.ts',

    //  './src/sanity/schemaTypes/index.ts',

    //   './src/sanity/schemaTypes/documents/businessDetailsType.ts',
      // './src/sanity/schemaTypes/documents/eventsType.ts',
    //   './src/sanity/schemaTypes/documents/galleryType.ts',
      // './src/sanity/schemaTypes/documents/menuType.ts',
    //   './src/sanity/schemaTypes/documents/testimonialType.ts',
      // './src/sanity/schemaTypes/documents/staffType.ts',



    //  './src/sanity/schemaTypes/objects/galleryImageType.ts',
      // './src/sanity/schemaTypes/objects/menuCategoryType.ts',
      // './src/sanity/schemaTypes/objects/menuItemType.ts',
    //   './src/sanity/schemaTypes/objects/openingHoursType.ts',
      // './src/sanity/schemaTypes/objects/specialEventType.ts',
    //   './src/sanity/schemaTypes/objects/testimonialType.ts',
      // './src/sanity/schemaTypes/objects/weeklyEventType.ts',
        //  './src/sanity/schemaTypes/objects/staffMemberType.ts',

  //     './src/types/businessDetail.ts',

    ]

const output = []

output.push(`# Workspace Export`)
output.push(`Generated: ${new Date().toISOString()}`)

for (const file of files) {
  if (!fs.existsSync(file)) continue

  const ext = path.extname(file).slice(1) || 'txt'
  const content = fs.readFileSync(file, 'utf8')

  output.push(`\n## ${file}`)
  output.push(`\`\`\`${ext}`)
  output.push(content)
  output.push(`\`\`\``)
}

fs.writeFileSync('WORKSPACE.md', output.join('\n'))
console.log('Created WORKSPACE.md')