import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useContext,useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/coffee-store.module.css';
import cls from 'classnames';
import { fetchCoffeeStores } from '../../libs/coffeeStores';
import { StoreContext } from '../../context/store-context';
import {isEmpty} from '../../utils';


export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    const coffeeStores = await fetchCoffeeStores();
    const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
      return coffeeStore.fsq_id.toString() === params.id; //dynamic id
    });
    return {
      props: {
        coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
      },
    };
  }

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();
    const paths = coffeeStores.map((coffeeStore) => {
      return {
        params: {
          id: coffeeStore.fsq_id.toString(),
        },
      };
    });
    return {
      paths,
      fallback: true,
    };
  }

const CoffeeStore = (initialProps) => {
    const router = useRouter();
    const id = router.query.id;
    const [coffeeStore, setCoffeeStore] = useState(
      initialProps.coffeeStore || {}
    );
    const {
      state: { coffeeStores },
    } = useContext(StoreContext);
    
    useEffect(()=>{
     if(isEmpty(initialProps.coffeeStore)){
       if(coffeeStores.length>0){
        const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
          return coffeeStore.fsq_id.toString() === id; //dynamic id
        });
        setCoffeeStore(findCoffeeStoreById);
       }
     }
    },[id, initialProps, initialProps.coffeeStore, coffeeStores])

   

    const {name,location,imageUrl} = coffeeStore;

    if (router.isFallback) {
      return <div>Loading...</div>;
    }

    const handleUpVoteButton =() =>{

    }
    return (
        <div className={styles.layout}>
        <Head>
          <title>{name}</title>
          <meta name="description" content={`${name} coffee store`}></meta>
        </Head>
        <div className={styles.container}>
          <div className={styles.col1}>
            <div className={styles.backToHomeLink}>
              <Link href="/">
                <a>← Back to home</a>
              </Link>
            </div>
            <div className={styles.nameWrapper}>
              <h1 className={styles.name}>{name}</h1>
            </div>
            <Image
              src={imageUrl}
              width={600}
              height={360}
              className={styles.storeImg}
              alt={name}
            ></Image>
          </div>
  
          <div className={cls("glass", styles.col2)}>
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="places icon"
              />
              <p className={styles.text}>{location.address}</p>
            </div>
               
              {location.neighborhood && 
                <div className={styles.iconWrapper}>
                <Image
                  src="/static/icons/nearMe.svg"
                  width="24"
                  height="24"
                  alt="near me icon"
                />
                <p className={styles.text}>{location.neighborhood}</p>
              </div>
              } 
              

            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/stars.svg"
                width="24"
                height="24"
                alt="star icon"
              />
              <p className={styles.text}>1</p>
            </div>
  
            <button className={styles.upVoteButton} onClick={handleUpVoteButton}>
              Up vote!
            </button>
          </div>
        </div>
      </div>
    );
};

export default CoffeeStore;