import type {NextPage} from 'next'
import Head from 'next/head'
import {useEffect, useState} from "react";
import {getCatsFavourite, removeCatAsFavourite, setCatAsFavourite} from "../../src/services/api.service";
import Image from 'next/image';

const FavouritesPage: NextPage = () => {

    const [favourites, setFavourites] = useState<Array<any>>([]);

    const removeCat = (catId: string) => {
        setFavourites(favourites.filter(fv => fv.id !== catId))
        removeCatAsFavourite(catId);
    }
    useEffect(() => {
        getCatsFavourite().then((favouriteCatsData: any) => {
            setFavourites(favouriteCatsData);
        });
    }, []);



    return (
        <>
            <Head>
                <title>Next.js Demo | Favourites</title>
                <link rel="icon" href="/favicon.png"/>
            </Head>

            <p className='main--p'> {(favourites||[]).length} favourite cats </p>
            {(favourites||[]).map(cat => (
                <div className='main--box main--image active'
                     onClick={() => removeCat(cat.id)}
                     key={cat.id}>
                    <Image
                        alt={`cat pic id ${cat.id}`}
                        src={cat.url}
                        width={300}
                        height={300}
                        layout='responsive'
                    />
                    <button/>
                </div>
            ))}

        </>
    )
}

export default FavouritesPage;
