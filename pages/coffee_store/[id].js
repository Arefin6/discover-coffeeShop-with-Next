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
    
    const handleCreateCoffeeStore = async (coffeeStore) => {
      try {
        const { fsq_id, name, imageUrl,location } = coffeeStore;
        const response = await fetch("/api/createCoffeeStore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id:fsq_id,
            name,
            vote: 0,
            imageUrl:imageUrl,
            neighborhood: location.neighborhood[0] || "",
            address: location.address || "",
          }),
        });
        const dbCoffeeStore = await response.json();
      } catch (err) {
        console.error("Error creating coffee store", err);
      }
    }; 

    useEffect(()=>{
      if (isEmpty(initialProps.coffeeStore)) {
        if (coffeeStores.length > 0) {
          const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
            return coffeeStore.id.toString() === id; //dynamic id
          });
  
          if (coffeeStoreFromContext) {
            setCoffeeStore(coffeeStoreFromContext);
            handleCreateCoffeeStore(coffeeStoreFromContext);
          }
        }
      } else {
        // SSG
        handleCreateCoffeeStore(initialProps.coffeeStore);
      }
    },[id, initialProps, initialProps.coffeeStore, coffeeStores])

    if (router.isFallback) {
      return <div>Loading...</div>;
    }
  
    const {name,location,imageUrl} = coffeeStore;

 

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
              src={
                imageUrl ||
                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              }
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