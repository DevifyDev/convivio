export default function SvgFilter() {
  return (
    <svg width='0' height='0' style={{ position: 'absolute' }}>
      <filter id='roughen'>
        <feTurbulence
          type='fractalNoise'
          baseFrequency='0.02 0.15'
          numOctaves='3'
          seed='4'
          result='noise'
        />
        <feDisplacementMap
          in='SourceGraphic'
          in2='noise'
          scale='6'
          xChannelSelector='R'
          yChannelSelector='G'
        />
      </filter>

      <filter id='roughen-reviews'>
        <feTurbulence
          type='fractalNoise'
          baseFrequency='0.02 0.3'
          numOctaves='3'
          seed='4'
          result='review-noise'
        />
        <feDisplacementMap
          in='SourceGraphic'
          in2='review-noise'
          scale='5'
          xChannelSelector='R'
          yChannelSelector='G'
        />
      </filter>
    </svg>
  )
}