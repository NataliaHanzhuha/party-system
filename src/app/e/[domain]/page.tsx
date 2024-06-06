'use client';

import style from './domain.module.css';

const Banner = ({name, date}: any) => <section className={style.banner}>
  <div className={style.bannerContent}>
    <h1>{name} Birthday</h1>
    <p className={style.plead}>{date}</p>
  </div>
</section>

const About = ({name, date, rsvpLink}: any) => <section className={style.about}>
  <div className={style.aboutContent}>
    <div className={style.aboutText}>
      <div className={style.aboutContentTitle}>
        <strong>{name} Birthday</strong>
        <p className={style.plead}>Join us on {date}</p>
      </div>

      <div className={style.aboutDescription}>
        <p>Enter your event description here...Pellentesque ullamcorper tortor ut auctor consequat. Nullam sed nisi massa. Aliquam eget
           enim nunc. Praesent blandit blandit ornare. Sed lacinia felis quis elit luctus, et tincidunt elit aliquam. Sed porttitor eros
           id purus sollicitudin, quis pellentesque nunc pulvinar. Ut accumsan a sem quis dignissim. Sed lacus mauris, efficitur ac
           lobortis id, faucibus at quam. Praesent quis metus hendrerit, vulputate nibh vel, eleifend nibh. Donec cursus, elit id auctor
           porta, orci felis condimentum est, ut bibendum lacus elit non mi.
        </p>
        <p>
          Pellentesque ullamcorper tortor ut auctor consequat. Nullam sed nisi massa. Aliquam eget enim nunc. Praesent blandit blandit
          ornare. Sed lacinia felis quis elit luctus, et tincidunt elit aliquam. Sed porttitor eros id purus sollicitudin, quis
          pellentesque nunc pulvinar. Ut accumsan a sem quis dignissim. Sed lacus mauris, efficitur ac lobortis id, faucibus at quam.
          Praesent quis metus hendrerit, vulputate nibh vel, eleifend nibh. Donec cursus, elit id auctor porta, orci felis condimentum
          est, ut bibendum lacus elit non mi.
        </p>
      </div>

    </div>

    <div className={style.aboutDetails}>
      <a rel="nofollow"
         href={rsvpLink}
         className={style.button + ' ' + style.buttonBlack}>RSVP Now</a>

      <div className={style.aboutDetailsContainer}>
        <h4>LOCATION</h4>
        <p>Location TBD</p>

        <h4>DATE & TIME</h4>
        <p>July 13, 2024, 10:42 PM</p>
      </div>
    </div>
  </div>
</section>

const CallToAction = ({date, rsvpLink}: any) => {
  return <section className={style.callToAction}>
    <div className={style.container}>
      <h2>Join us on {date}</h2>
      <p>We look forward to hosting you!</p>
      <a rel="nofollow"
         href={rsvpLink}
         className={style.button + ' ' + style.buttonWhite}>RSVP Now</a>
    </div>
  </section>;
}

const Footer = () => <footer className={style.footer}>
  <div className={style.container}>
    <p>© 2024. All Rights Reserved. </p>
  </div>
</footer>;

export default function EventPage() {
  const name = 'Sraka Motika';
  const date = 'September, 29';
  const rsvpLink: string = 'http://localhost:3000/e/dd/register-details';

  return <main className={style.website}>
    <Banner name={name}
            date={date}/>

    <About name={name}
           date={date}
           rsvpLink={rsvpLink}/>

    <CallToAction date={date}
                  rsvpLink={rsvpLink}/>

    <Footer />
  </main>;
}
