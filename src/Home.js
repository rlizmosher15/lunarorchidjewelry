import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
  return (
    <div className="home">

    <div className="home__container">
      <img
        className="home__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        alt="Amazon Banner Image"
      />

      <div className="home__row">
        <Product
          id="1"
          title="Avocado Toast Plush Squeaky Toy"
          price={7.89}
          image="https://img.chewy.com/is/image/catalog/297252_MAIN._AC_SL1500_V1642086112_.jpg"
          rating={'⭐⭐⭐⭐'}
        />
        <Product
          id="2"
          title="Cactus Puppy Enrichment"
          price={12.99}
          image="https://m.media-amazon.com/images/I/71VmbDpjhQL._AC_SX679_.jpg"
          rating={'⭐⭐'}
        />
      </div>

      <div className="home__row">
        <Product
          id="3"
          title="Sketchy Acorn for Sketchy Puppies"
          price={10.0}
          image="https://m.media-amazon.com/images/I/61mnqN4FYdL._AC_SX679_.jpg"
          rating={'⭐⭐⭐⭐⭐'}
        />
        <Product
          id="4"
          title="Ramen (Fake)"
          price={15.01}
          image="https://m.media-amazon.com/images/I/81UkJ2hq1oL._AC_SL1500_.jpg"
          rating={'⭐⭐⭐⭐'}
        />
        <Product
          id="5"
          title="Starbarks Coffee"
          price={20.0}
          image="https://m.media-amazon.com/images/I/916E4dPwT0L._AC_SL1500_.jpg"
          rating={'⭐⭐⭐⭐⭐'}
        />
      </div>

      <div className="home__row">
        <Product
          id="6"
          title="Lick Croix"
          price={19.99}
          image="https://m.media-amazon.com/images/I/71K0FSlVcKL._AC_SL1500_.jpg"
          rating={'⭐⭐⭐⭐⭐'}
        />
        <Product
          id="7"
          title="White Paw"
          price={9.75}
          image="https://m.media-amazon.com/images/I/71RD7gAbNxL._AC_SL1500_.jpg"
          rating={'⭐'}
        />
        <Product
          id="8"
          title="Barker's Mark"
          price={17.08}
          image="https://m.media-amazon.com/images/I/71ea84aimYL._AC_SL1200_.jpg"
          rating={'⭐⭐⭐'}
        />
        <Product
          id="9"
          title="Snif"
          price={9.99}
          image="https://m.media-amazon.com/images/I/71eXQAPl4UL._AC_SL1500_.jpg"
          rating={'⭐⭐⭐⭐'}
        />
      </div>


    </div>

    </div>
  )
}

export default Home
