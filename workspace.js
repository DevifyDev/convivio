import fs from 'fs'
import path from 'path'

const files = [
  './package.json',
  './tsconfig.json',
  './next-config.ts',

  './src/app/globals.css',
  './src/app/layout.tsx',
  './src/app/page.tsx',
  './src/app/page.module.css',

  './src/components/About/About.jsx',
  './src/components/About/About.module.css',

  './src/components/Button/Button.jsx',
  './src/components/Button/Button.module.css',

  './src/components/Contact/Contact.jsx',
  './src/components/Contact/Contact.module.css',

  './src/components/Footer/Footer.jsx',
  './src/components/Footer/Footer.module.css',

  './src/components/Gallery/Gallery.jsx',
  './src/components/Gallery/Gallery.module.css',

  './src/components/Header/Header.jsx',
  './src/components/Header/Header.module.css',

  './src/components/Hero/Hero.jsx',
  './src/components/Hero/Hero.module.css',

  './src/components/Location/Location.jsx',
  './src/components/Location/Location.module.css',

  './src/components/Pricing.jsx',
  './src/components/Pricing.module.css',

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