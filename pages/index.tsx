import type {NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {useEffect, useState} from "react";
import {getCatsCategories} from '../src/services/api.service';

const HomePage: NextPage = () => {

    const [categories, setCategories] = useState<Array<{ params: {id: string }}>>([]);


    useEffect( async () => {
        getCatsCategories()
            .then(data => setCategories(data));
    }, [])


    return (
        <>
            <Head>
                <title>Next.js Demo</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.png"/>
            </Head>

            <p className='main--p'>Show me pictures of <strong>cats</strong> with...</p>
            {categories.map(category => (
                <Link passHref={true} href={`category/${category.params.id}`} key={category.params.id}>
                    <div className='main--box main--nav'>{category.params.id}</div>
                </Link>
            ))}

        </>
    )
}

export default HomePage