import {child, get, getDatabase, ref, set, remove} from "@firebase/database";
import {initializeApp} from "firebase/app";
import firebaseConfig from "../config/firebase.config";
import catApiKey from '../config/catapi.config';

const app = initializeApp(firebaseConfig);
const firebaseDB = getDatabase(app);

export const getCatsFavourite = (() => {
    const dbRef = ref(firebaseDB, '/');
    return get(child(dbRef, `cats`)).then((snapshot: any) => {
        if (snapshot.exists()) {
            const catsIds = Object.keys(snapshot.val());
            return Promise.all(catsIds.map(async (catId: string) => getCatById(catId).then(catData => catData)));
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
});


export const removeCatAsFavourite = (catId: string) => {
    const dbRef = ref(firebaseDB, '/cats/');
    remove(child(dbRef, catId))
        .then(function () {
            console.log("Remove succeeded.")
        })
        .catch(function (error) {
            console.log("Remove failed: " + error.message)
        });
}


export const getCatsCategories = (() => {
    return fetch('https://api.thecatapi.com/v1/categories')
        .then(res => res.json())
        .then(data => data.map((category: { name: string }) => ({params: {id: category.name}})));
});

export const getCatsByCategoryId = ((categoryName: string) => {
    const categoriesMap = {
        "boxes": 5,
        "clothes": 15,
        "hats": 1,
        "sinks": 14,
        "space": 2,
        "sunglasses": 4,
        "ties": 7,
    }
    // @ts-ignore
    const categoryId = `category_ids=${categoriesMap[categoryName]}`;
    const limit = 'limit=12&order=Desc&page=0';
    const apiKey = `api_key=${catApiKey}`;
    return fetch(`https://api.thecatapi.com/v1/images/search?${limit}&${categoryId}&${apiKey}`)
        .then(response => response.json())
});

export const setCatAsFavourite = (catId: string) => {
    set(ref(firebaseDB, '/cats/' + catId), Date.now());
}


export const getCatById = (catId: string) => {
    const headers = {
        headers: {
            'X-Api-Key': catApiKey
        },
    };
    return fetch(`https://api.thecatapi.com/v1/images/${catId}`, headers).then(response => {
        return response.json();
    })
}

