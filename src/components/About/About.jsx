import './About.css';
import avatar from '../../assets/Ready4Ch.png';
import reactLogo from '../../assets/react.svg';

function About() {
  return (
    <section className='about'>
      <div className='about__imagewrapper'>
        <img className='about__image' src={avatar} alt='Author photo' />
      </div>
      <div className='about__card'>
        <h2 className='about__title'>About the site and the author</h2>
        <p className='about__description'>
          This news explorer created by Sasha Pankov as his diploma project at{' '}
          <a
            className='about__link'
            href='https://tripleten.com/'
            target='_blank'
          >
            TripleTen
          </a>{' '}
          Software Engineering program on{' '}
          <a
            className='about__link'
            href='https://react.dev/blog/2023/03/16/introducing-react-dev'
            target='_blank'
          >
            <img src={reactLogo} className='about__reactLogo' alt='React' />
            <span className='about__reactTitle'>React</span>
          </a>{' '}
          and{' '}
          <a
            className='about__link'
            href='https://newsapi.org/'
            target='_blank'
          >
            News API
          </a>
        </p>
      </div>
    </section>
  );
}

export default About;
